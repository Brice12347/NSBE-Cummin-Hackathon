import React from "react";
import stylings from "./stylings.js"
import Card from "./card.jsx";

const colDiv = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "1rem",
}

const rowDiv = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "1rem",
}


function Dashboard(){
    return (
        <section style={{ 
            ...colDiv,
            width: "100%",
            padding: "2rem",
        }}>
            {/* First Row */}
            <div style={{...rowDiv}}>
                <div style={{...colDiv}}>
                    <Card/>
                    <div style={{...rowDiv}}>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
                <div style={{...rowDiv}}>
                    <Card/>
                    <Card/>
                </div>
            </div>
            
            {/* Second Row */}
            <div style={{...rowDiv}}>
                <Card/>
                <Card/>
            </div>
        </section>
    );
}

export default Dashboard;
