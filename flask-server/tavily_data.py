from tavily import TavilyClient

tavily_client = TavilyClient(api_key="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")
policy_response = tavily_client.search("What are the recent, ongoing, and policies in the United States that are in development that can affect the trucking manufacturing industry") # prompt engineer this
fuel_response = tavily_client.search("What are the recent, current, and predicted fuel cost fluctuations in the United States that are affecting the trucking industry. What might be causing these fluctuations if there are any")
tariff_response = tavily_client.search("How are the United State's relations to other countries and how that can lead to tariff spikes that can affect the trucking industry")
cost_cutting = tavily_client.search("Are there any recent, ongoing, or future plans for interest rate cuts that impact the truck engine manufacturing industry")

content = []
content.append(policy_response)
content.append(fuel_response)
content.append(tariff_response)
content.append(cost_cutting)

content_str = ""

for i in range(len(content)):
    for j in range(len(content[i]["results"])):
        if "https" not in content[i]["results"][j]["content"]:
            content_str += content[i]["results"][j]["content"]