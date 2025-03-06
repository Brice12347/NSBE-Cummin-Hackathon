import React from "react";
import stylings from "./stylings";
import { motion } from "motion/react"

function ReportGenerator(){
    return (
        <section style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <motion.textarea placeholder="Provide context to generate your forecasting report..."
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0 , scale: 1}}
                transition={{ duration: 0.2 }}
                style={{
                    width: "30rem",
                    height: "10rem",
                    border: `1px solid ${stylings.secondaryBackground}`,
                    textDecoration: "none",
                    borderRadius: "1.5rem",
                    padding: "1.2rem",
                    outline: "none",
                }}
                >
                </motion.textarea>
                <motion.button 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ 
                    scale: 1.2,  // Scale up the div
                    rotate: 10,  // Slightly rotate on hover
                    opacity: 1, // Decrease opacity a little on hover
                    //backgroundColor: stylings.mainBackground,
                  }}
                style={{
                    textDecoration: "none",
                    outline: "none",
                    border: `1px solid ${stylings.secondaryBackground}`,
                    borderRadius: "0.4rem",
                    padding: "0.5rem 1rem",
                    marginTop: "1rem",
                    width: "fit-content",
                    backgroundColor: stylings.mainred,
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    cursor: "pointer",
                }}>
                    Generate Report
                </motion.button>
            </div>
        </section>
    );
}

export default ReportGenerator;