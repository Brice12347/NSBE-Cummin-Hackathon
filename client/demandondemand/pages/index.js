import Dashboard from "./components/dashboard";
import ReportGenerator from "./components/reportGenerator";
import Sidebar from "./components/sidebar";
import React, {useState, useEffect} from "react";

export default function Home() {
  const [pageToLoad, setPageToLoad] = useState("dashboard");
  const [page, setPage] = useState(<Dashboard/>)


  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  const answerPrompt = async () => {
    try {
      // Show loading state
      setIsLoading(true);
      
      // Get the user's question from the input field
      const userQuestion = prompt;
      
      // Make the API call to your Flask backend
      const response = await fetch("http://127.0.0.1:8080/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userQuestion
        }),
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      // Update the UI with the answer
      setChatResponse(data.answer);
      
      // If there are sources, display them as well
      if (data.sources && data.sources.length > 0) {
        setSources(data.sources);
      } else {
        setSources([]);
      }
      
      // Add the exchange to the chat history
      setChatHistory(prevHistory => [
        ...prevHistory,
        { question: userQuestion, answer: data.answer, sources: data.sources || [] }
      ]);
      
      // Clear the input field for the next question
      setPrompt("");
    } catch (error) {
      console.error("Error fetching answer:", error);
      setChatResponse("Sorry, there was an error processing your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (pageToLoad === "dashboard") {
      setPage(<Dashboard />);
    } else if (pageToLoad === "reportGenerator") {
      setPage(<ReportGenerator />);
    }
  }, [pageToLoad]);

  return (
    <div className="" 
      style={{
        display: "flex",
        flexDirection: "row",
        overflowY: "scroll",
        height: "100vh"
      }}>
      <Sidebar/>
      { page }
      
    </div>
  );
}