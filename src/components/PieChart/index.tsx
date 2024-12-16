/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { twMerge } from "tailwind-merge"
import { ParsedGraphData } from "@/context/AppProvider";
import { CHART_COLORS } from "@/utils";


interface IChartProps{
    title:string,
    data:ParsedGraphData,
    dateRange:string
    className?:string
}



export function PieChartContainer({title,dateRange,className,data}:IChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // "top", "left", "right", or "bottom"
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem:any) {
            const value = tooltipItem.raw; // Gets the data value
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    
    },
  };
  const graphData = {
    labels: data.data.labels, // Labels for the Pie Chart
    datasets: [
      {
        data: data.data.datasets[0].data, // Extract the actual array of values
        backgroundColor: CHART_COLORS,
        hoverBackgroundColor: CHART_COLORS.map((color) => `${color}D9`), // Slightly lighter on hover
      },
    ],
  };

  return (
    <Card className={twMerge("flex flex-col",className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-0">
        <Pie data={graphData} options={options} />
      </CardContent>
    
    </Card>
  )
}
