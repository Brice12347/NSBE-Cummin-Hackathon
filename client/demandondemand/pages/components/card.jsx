import React from "react";
import stylings from "./stylings.js"

function Card() {
    return (
        <div style={{
            backgroundColor: stylings.secondaryBackground,
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "100%",
        }}>
            {"Placeholder"}
        </div>
    );
}

export default Card;