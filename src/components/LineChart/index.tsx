/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import { ParsedGraphData } from "@/context/AppProvider";
import { Line } from "react-chartjs-2";
import { CHART_COLORS } from "@/utils";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface IChartProps{
    title:string,
    data:ParsedGraphData,
    dateRange:string
    className?:string


}

export function LineChartContainer({title,dateRange,className,data}:IChartProps) {
  const graphData = {
    labels: data.data.labels,
    datasets: [
      {
        label: data.data.datasets[0].label,
        data: data.data.datasets[0].data, 
        borderColor: CHART_COLORS[2],
        backgroundColor: "rgba(0, 123, 255, 0.2)", 
        tension: 0.4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Display the legend
        position: "top" as const, // Explicitly cast to the correct type for position
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem:any) => {
            const value = tooltipItem.raw;
            return `Transactions: ${value}`; 
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Card className={twMerge("",className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <Line data={graphData} options={options} />
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
