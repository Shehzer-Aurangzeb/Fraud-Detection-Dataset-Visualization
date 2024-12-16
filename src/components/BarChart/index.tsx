/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { twMerge } from "tailwind-merge"

import { ParsedGraphData } from "@/context/AppProvider"
import { CHART_COLORS } from "@/utils";


interface IChartProps{
    title:string,
    data:ParsedGraphData,
    dateRange:string,
    className?:string
   

}

export function BarChartContainer({title,dateRange,className,data}:IChartProps) {


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, 
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const datasetsWithColors = data.data.datasets.map((dataset:any, index:number) => ({
    ...dataset,
    backgroundColor: CHART_COLORS[index % CHART_COLORS.length], 
    borderColor: CHART_COLORS[index % CHART_COLORS.length], 
    borderWidth: 1,
  }));
  const chartConfig = {
    labels: data.data.labels,
    datasets: datasetsWithColors,
  };



  return (
    <Card className={twMerge("flex flex-col",className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Bar 
          data={chartConfig}
          redraw={true}
          options={options}
        />
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
