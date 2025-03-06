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
  
  

  useEffect(() => {
    if (pageToLoad === "dashboard") {
      console.log("work1")
      setPage(<Dashboard />);
    } else if (pageToLoad === "reportGenerator") {
      setPage(<ReportGenerator />);
      console.log("work2")
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
      <Sidebar setPageToLoad={setPageToLoad}/>

      {page}
      
    </div>
  );
}