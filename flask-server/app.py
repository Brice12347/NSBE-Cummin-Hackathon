import getpass
import os
# if not os.environ.get("GROQ_API_KEY"):
#     os.environ["GROQ_API_KEY"] = getpass.getpass("Enter API key for Groq: ")

from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chat_models import init_chat_model
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain import hub
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import START, StateGraph
from langchain_core.documents import Document
from typing_extensions import List, TypedDict
from flask_cors import CORS

from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

os.environ["GROQ_API_KEY"] = "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"
# Initialize components
llm = init_chat_model("llama3-8b-8192", model_provider="groq")

os.environ["TOKENIZERS_PARALLELISM"] = "false"
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2", )

# Load and split documents from all PDFs in the data folder
data_folder = "./data"
all_splits = []

for file in os.listdir(data_folder):
    if file.endswith(".pdf"):
        file_path = os.path.join(data_folder, file)
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        all_splits.extend(text_splitter.split_documents(docs))

# Create FAISS vector store correctly
vector_store = FAISS.from_documents(all_splits, embeddings)
_ = vector_store.add_documents(documents=all_splits)

from langgraph.graph import MessagesState, StateGraph

graph_builder = StateGraph(MessagesState)
from langchain_core.messages import SystemMessage
from langgraph.prebuilt import ToolNode, tools_condition 
from langchain_core.tools import tool


@tool(response_format="content_and_artifact")
def retrieve(query: str):
    """Retrieve information related to a query about Cummins financial reports. 
    Use this tool to search for any financial data including revenues, profits, etc."""
    retrieved_docs = vector_store.similarity_search(query, k=2)
    serialized = "\n\n".join(
        (f"Source: {doc.metadata}\n" f"Content: {doc.page_content}")
        for doc in retrieved_docs
    )
    return serialized, retrieved_docs


# Step 1: Generate an AIMessage that may include a tool-call to be sent.
def query_or_respond(state: MessagesState):
    """Generate tool call for retrieval or respond."""
    # Create a more explicit system message about available tools
    system_message = SystemMessage(content="""You are an assistant that helps answer questions about Cummins financial reports.
    You have access to only ONE tool:
    - retrieve: Use this tool to search for information related to the query.
    
    Do NOT attempt to use any other tools or functions like 'cummins_revenue'.
    Always use the retrieve tool first before answering financial questions.""")
    
    # Add system message to the beginning of the messages list
    messages_with_instruction = [system_message] + state["messages"]
    
    # Bind tools and invoke
    llm_with_tools = llm.bind_tools([retrieve])
    response = llm_with_tools.invoke(messages_with_instruction)
    
    return {"messages": [response]}


# Step 2: Execute the retrieval.
tools = ToolNode([retrieve])


# Step 3: Generate a response using the retrieved content.
def generate(state: MessagesState):
    """Generate answer."""
    # Get generated ToolMessages
    recent_tool_messages = []
    for message in reversed(state["messages"]):
        if message.type == "tool":
            recent_tool_messages.append(message)
        else:
            break
    tool_messages = recent_tool_messages[::-1]

    # Format into prompt
    docs_content = "\n\n".join(doc.content for doc in tool_messages)
    system_message_content = (
        "You are an Expert Financial Advisor for question-answering tasks. "
        "Use the following pieces of retrieved context about Cummins Full Year 2024 results to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Format the answer into 2 parts"
        "Key Findings and Recommendations"
        "\n\n"
        f"{docs_content}"
    )
    conversation_messages = [
        message
        for message in state["messages"]
        if message.type in ("human", "system")
        or (message.type == "ai" and not message.tool_calls)
    ]
    prompt = [SystemMessage(system_message_content)] + conversation_messages

    # Run
    response = llm.invoke(prompt)
    return {"messages": [response]}

from langgraph.graph import END
from langgraph.prebuilt import ToolNode, tools_condition

# Rebuild the graph with the updated functions
graph_builder = StateGraph(MessagesState)
graph_builder.add_node(query_or_respond)
graph_builder.add_node(tools)
graph_builder.add_node(generate)

graph_builder.set_entry_point("query_or_respond")
graph_builder.add_conditional_edges(
    "query_or_respond",
    tools_condition,
    {END: END, "tools": "tools"},
)
graph_builder.add_edge("tools", "generate")
graph_builder.add_edge("generate", END)

graph = graph_builder.compile()

# Instead of using the stream method with pretty_print
def get_chatbot_response(input_message):
    try:
        # Run the graph with the input message
        response = graph.invoke(
            {"messages": [{"role": "user", "content": input_message}]}
        )
        
        # Get the final AI message
        final_message = response["messages"][-1].content
        
        # Split final_message into key findings and recommendations
        key_findings, recommendations = extract_key_findings_and_recommendations(final_message)
        
        # Initialize response dictionary
        result = {
            "answer": {
                "key_findings": key_findings,
                "recommendations": recommendations
            },
            "sources": []
        }
        
        # Extract source information if tool messages exist
        tool_messages = [msg for msg in response["messages"] if msg.type == "tool"]
        if tool_messages:
            for tool_msg in tool_messages:
                if hasattr(tool_msg, 'content') and tool_msg.content:
                    sources = tool_msg.content.split("\n\n")
                    for source in sources:
                        if source.startswith("Source:"):
                            source_parts = source.split("Content:")
                            if len(source_parts) > 1:
                                file_info = source_parts[0].replace("Source: ", "").strip()
                                full_content = source_parts[1].strip()
                                
                                import ast
                                try:
                                    metadata = ast.literal_eval(file_info)
                                    filename = metadata.get('source', '').replace('./data/', '')
                                except:
                                    filename = file_info
                                
                                relevant_content = extract_relevant_content(input_message, full_content)
                                
                                result["sources"].append({
                                    "file": filename,
                                    "content": relevant_content
                                })
        print(result)
        return result
    except Exception as e:
        return {
            "answer": {
                "key_findings": "I'm sorry, I encountered an error while processing your question.",
                "recommendations": "Please try rephrasing your question or ask something else."
            },
            "sources": [],
            "error": str(e)
        }
def extract_relevant_content(query, content, max_length=150):
    """Extract the most relevant portion of content based on query keywords"""
    # Convert query to lowercase and split into keywords
    query_keywords = set(query.lower().split())
    
    # Remove common words that might not be helpful for matching
    stopwords = {"what", "where", "when", "who", "how", "does", "do", "is", "are", "the", "a", "an", "in", "at", "of", "for", "to", "with"}
    query_keywords = query_keywords - stopwords
    
    # Split content into sentences or lines
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    
    # Score each line based on query keyword matches
    line_scores = []
    for line in lines:
        score = 0
        line_lower = line.lower()
        for keyword in query_keywords:
            if keyword in line_lower:
                score += 1
        line_scores.append((score, line))
    
    # Sort by score (highest first)
    line_scores.sort(reverse=True)
    
    # Take the top-scoring lines
    relevant_lines = [line for score, line in line_scores if score > 0]
    
    # If no lines matched keywords, take the first 1-2 lines as default
    if not relevant_lines and lines:
        relevant_lines = lines[:2]
    
    # Combine and limit length
    result = " ".join(relevant_lines)
    if len(result) > max_length:
        result = result[:max_length] + "..."
    
    return result

def extract_key_findings_and_recommendations(text):
    """Splits the AI response into key findings and recommendations."""
    parts = text.split("Recommendations:")
    key_findings = parts[0].strip() if len(parts) > 0 else ""
    recommendations = parts[1].strip() if len(parts) > 1 else ""
    return key_findings, recommendations


# this is for a test
get_chatbot_response("What were Cummins 4th quarter revenues")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        response = get_chatbot_response(user_message)

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
