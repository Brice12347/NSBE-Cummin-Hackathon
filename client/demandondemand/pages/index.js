import Dashboard from "./components/dashboard";
import ReportGenerator from "./components/reportGenerator";
import Sidebar from "./components/sidebar";
import React, {useState, useEffect} from "react";

export default function Home() {
  const [pageToLoad, setPageToLoad] = useState("dashboard");
  const [page, setPage] = useState(<Dashboard/>)

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