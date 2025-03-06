import React from "react";
import Image from "next/image.js";
import stylings from "./stylings.js";
import cumminsLogo from "../images/cumminsLogo.png"
import homeIcon from "../images/homeIcon.png"
import reportIcon from "../images/reportIcon.png"
import { motion } from "motion/react"

const iconSize = 40;

function Sidebar(){

    return(
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }} 
        style={{
            backgroundColor: stylings.secondaryBackground,
            width: "fit-content",
            padding: "2.5rem 1.2rem",
            margin: "0rem 2rem",
            borderRadius: "2.5rem",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
        }}>
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ 
                scale: 1.2,  // Scale up the div
                rotate: 10,  // Slightly rotate on hover
                opacity: 0.9, // Decrease opacity a little on hover
                backgroundColor: stylings.mainBackground,
              }}
            style={{padding: "0.8rem", borderRadius: "1rem", cursor: "pointer"}}>
                <Image src={cumminsLogo} width={iconSize} height={iconSize}/>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ 
                scale: 1.2,  // Scale up the div
                rotate: 0,  // Slightly rotate on hover
                opacity: 0.9, // Decrease opacity a little on hover
                backgroundColor: stylings.mainBackground,
              }}
            style={{padding: "0.8rem", borderRadius: "1rem", cursor: "pointer"}}>
                <Image src={homeIcon} width={iconSize} height={iconSize}/>
            </motion.div>
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ 
                scale: 1.2,  // Scale up the div
                rotate: 0,  // Slightly rotate on hover
                opacity: 0.9, // Decrease opacity a little on hover
                backgroundColor: stylings.mainBackground,
              }}
            style={{padding: "0.8rem", borderRadius: "1rem", cursor: "pointer"}}>
                <Image src={reportIcon} width={iconSize} height={iconSize}/>
            </motion.div>
        </motion.div>
    );
}

export default Sidebar;