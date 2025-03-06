import React from "react";
import stylings from "./stylings.js"
import Card from "./card.jsx";
import Image from "next/image.js";
import bannerImg from "../images/bannerVeryDark.png"
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';


// Data for line chart
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

// Simple Chart data
const uDataStacked = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pDataStacked = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtDataStacked = [2400, 2210, 0, 2000, 2181, 2500, 2100];
const xLabelsStacked = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const colDiv = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "1.5rem",
}

const rowDiv = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "1.5rem",
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
                    <Card>
                        <div style={{
                            position: "relative",
                            width: "100%",
                            height: "250px", // Set a fixed height or percentage
                            backgroundImage: `url(${bannerImg.src})`, // Set the background image
                            backgroundSize: "cover", // Ensure the image covers the entire div
                            backgroundPosition: "center", // Center the image
                            backgroundRepeat: "no-repeat", // Prevent the image from repeating
                            //opacity: "0.7" // Optional: Make the image slightly transparent
                            padding: "3rem",
                            color: "white"
                        }}>
                            <span style={{fontWeight: "800", fontSize: "3rem"}}>Hi, Brice Patchou!</span>
                            <br></br>
                            <div style={{ paddingLeft: "0.2rem", fontSize: "1rem", opacity: "0.8"}}>
                            Welcome to the Demand Forecasting Dashboard! Explore real-time analytics, 
                            predictive models, and actionable data to optimize your supply chain strategies!
                            </div>
                        </div>
                    </Card>
                    <div style={{...rowDiv}}>
                        <Card>
                        <PieChart
                            series={[
                                {
                                data: [
                                    { id: 0, value: 10, label: 'Series A' },
                                    { id: 1, value: 15, label: 'Series B' },
                                    { id: 2, value: 20, label: 'Series C' },
                                ],
                                },
                            ]}
                            width={400}
                            height={200}
                            colors={['#FF291F', '#FC4D36', '#FF8979']}
                            // Configure label styling here
                            slotProps={{
                                legend: {
                                labelStyle: {
                                    fill: 'white',
                                },
                                },
                                arcLabel: {
                                style: {
                                    fill: 'white',
                                    fontSize: 14,
                                },
                                },
                            }}
                            sx={{
                                marginLeft: '-5rem',
                                padding: '1rem',
                            }}
                            />
                        </Card>
                        <Card>
                            <div style={{
                                width: "100%", 
                                height: "100%", 
                                backgroundColor: stylings.mainred, 
                                color: stylings.mainWhite,
                                fontSize: "1.2rem",
                                fontWeight: "600",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "1rem",
                            }}>
                                This is some more relevent news or information
                            </div>
                        </Card>
                    </div>
                </div>
                <div style={{...rowDiv}}>
                    <Card>
                        <div style={{width: "fit-content"}}>
                            <span>Could also just be another news thing(white), could actually link to article</span>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                width={300}
                                height={300}
                            />
                        </div>
                    </Card>
                    <Card>
                        News/Article (red)
                    </Card>
                </div>
            </div>
            
            {/* Second Row */}
            <div style={{...rowDiv}}>
                <Card>
                <LineChart
                    width={600}
                    height={250}
                    series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                    ]}
                    xAxis={[{ 
                        scaleType: 'point', 
                        data: xLabels,
                        tickLabelStyle: {
                            fill: 'white',
                        },
                    }]}
                    yAxis={[{
                        tickLabelStyle: {
                            fill: 'white',
                        },
                    }]}
                    sx={{
                        padding: "1rem",
                        '& .MuiChartsAxis-line': {
                            stroke: 'white',
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: 'white',
                        },
                        '& .MuiChartsAxis-label': {
                            fill: 'white',
                        },
                        '& .MuiChartsLegend-label': {
                            fill: 'white',
                        },
                    }}
                    colors={['#FF291F', '#FC4D36', '#FF8979']}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fill: 'white',
                            },
                        },
                    }}
                />
                </Card>
                <Card>
                <LineChart
                    width={600}
                    height={250}
                    series={[
                        { data: uDataStacked, label: 'uv', area: true, stack: 'total', showMark: false },
                        { data: pDataStacked, label: 'pv', area: true, stack: 'total', showMark: false },
                        { data: amtDataStacked, label: 'amt', area: true, stack: 'total', showMark: false },
                    ]}
                    xAxis={[{ 
                        scaleType: 'point', 
                        data: xLabelsStacked,
                        tickLabelStyle: {
                            fill: 'white',
                        },
                    }]}
                    yAxis={[{
                        tickLabelStyle: {
                            fill: 'white',
                        },
                    }]}
                    sx={{
                        padding: "1rem",
                        '& .MuiChartsAxis-line': {
                            stroke: 'white',
                        },
                        '& .MuiChartsAxis-tick': {
                            stroke: 'white',
                        },
                        '& .MuiChartsAxis-label': {
                            fill: 'white',
                        },
                        '& .MuiChartsLegend-label': {
                            fill: 'white',
                        },
                        [`& .${lineElementClasses.root}`]: {
                            display: 'none',
                        },
                    }}
                    colors={['#FF291F', '#FC4D36', '#FF8979']}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fill: 'white',
                            },
                        },
                    }}
                />
                </Card>
            </div>
        </section>
    );
}

export default Dashboard;
