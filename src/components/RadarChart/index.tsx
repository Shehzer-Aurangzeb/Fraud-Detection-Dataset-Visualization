/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend, 
  ChartData
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend
);

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { twMerge } from "tailwind-merge";

import { ParsedGraphData } from "@/context/AppProvider";
import { useMemo } from 'react';

interface IChartProps {
  title: string;
  data: ParsedGraphData;
  dateRange: string;
  className?: string;
}

const transformRadarChartData = (inputData:any): ChartData<'radar', number[], string> => {
    // Default empty chart data
    const defaultChartData: ChartData<'radar', number[], string> = {
      labels: [],
      datasets: []
    };
  
    // Validate input data structure
    if (!inputData || !inputData.values || !inputData.values.datasets || !inputData.values.labels) {
      console.error('Invalid input data structure');
      return defaultChartData;
    }
  
    const { labels, datasets } = inputData.values;
    
    // Extract data from the first dataset (assuming single dataset)
    const dataPoints = datasets[0].data;
  
    return {
      labels,
      datasets: [
        {
          label: 'Maximum Amount',
          data: dataPoints.map((item:any) => item.max),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Mean Amount',
          data: dataPoints.map((item:any) => item.mean),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Median Amount',
          data: dataPoints.map((item:any) => item.median),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };
export function RadarChartContainer({ title, dateRange, className, data }: IChartProps) {
   
    const chartData = useMemo(() => {
        return transformRadarChartData(data);
    }, [data]);


    const options= {
        responsive: true,
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
            display: true,
            text: data.title
            }
        },
        scales: {
            r: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Amount'
            }
            }
        }
    };

  return (
    <Card className={twMerge("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Radar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
