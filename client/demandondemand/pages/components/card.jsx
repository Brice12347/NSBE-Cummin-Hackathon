import React from "react";
import stylings from "./stylings.js"
import { motion } from "motion/react"

function Card({ children }) {
    return (
        <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ 
            scale: 1.05,  // Scale up the div
            }}
        style={{
            backgroundColor: stylings.secondaryBackground,
            borderRadius: "1.2rem",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "clip",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {children || "Placeholder"}
        </motion.div>
    );
}

export default Card;