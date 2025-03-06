import React, { useState } from "react";
import stylings from "./stylings";
import { motion, AnimatePresence } from "motion/react"

function ReportGenerator(){
    const [isPromptVisible, setIsPromptVisible] = useState(true);

    const handleGenerateButton = () => {
        setIsPromptVisible(false);
    }

    return (
        <section style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "relative", // Add this for absolute positioning context
        }}>
            <AnimatePresence mode="wait"> {/* Add mode="wait" to ensure one exits before the other enters */}
                {isPromptVisible ? (
                    <motion.div 
                        key="promptForm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute", // Position absolutely
                            top: "40%", // Center vertically
                            left: "30%", // Center horizontally
                            transform: "translate(-50%, -50%)", // Adjust for true centering
                        }}
                    >
                        <motion.textarea placeholder="Provide context to generate your forecasting report..."
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
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
                        onClick={handleGenerateButton}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ 
                            scale: 1.2,
                            rotate: 10,
                            opacity: 1,
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
                    </motion.div>
                ) : (
                    <motion.div
                        key="reportContent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            backgroundColor: "white",
                            padding: "2rem",
                            borderRadius: "0.5rem",
                            width: "80%",
                            maxWidth: "800px",
                            minHeight: "500px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                            color: "#333",
                            position: "absolute", // Position absolutely
                            top: "20%", // Center vertically
                            left: "20%", // Center horizontally
                            transform: "translate(-50%, -50%)", // Adjust for true centering
                        }}
                    >
                        <h2 style={{ 
                            fontSize: "1.8rem", 
                            color: stylings.mainred,
                            marginBottom: "1.5rem" 
                        }}>
                            Demand Forecasting Report
                        </h2>
                        
                        <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                            <p>Based on your input, we've generated the following forecasting insights:</p>
                            
                            <h3 style={{ 
                                marginTop: "1.5rem", 
                                fontSize: "1.4rem",
                                color: stylings.mainred
                            }}>
                                Key Findings
                            </h3>
                            
                            <ul style={{ marginLeft: "1.5rem" }}>
                                <li>Projected 12% increase in fuel demand over next quarter</li>
                                <li>Seasonal variations indicate peak usage in summer months</li>
                                <li>Regional demand patterns suggest focusing distribution in western markets</li>
                                <li>Price elasticity analysis shows minimal impact from recent cost fluctuations</li>
                            </ul>
                            
                            <h3 style={{ 
                                marginTop: "1.5rem", 
                                fontSize: "1.4rem",
                                color: stylings.mainred
                            }}>
                                Recommendations
                            </h3>
                            
                            <p>Consider increasing inventory levels by 15% to accommodate projected growth while maintaining optimal service levels. Implement dynamic pricing strategies in non-elastic markets to maximize margin opportunities.</p>
                        </div>
                        
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: stylings.mainBackground,
                            }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsPromptVisible(true)}
                            style={{
                                marginTop: "2rem",
                                padding: "0.6rem 1.2rem",
                                backgroundColor: stylings.mainred,
                                color: "white",
                                border: "none",
                                borderRadius: "0.4rem",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                        >
                            Generate New Report
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default ReportGenerator;