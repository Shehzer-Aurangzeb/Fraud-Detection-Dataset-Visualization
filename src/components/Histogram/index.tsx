/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { twMerge } from "tailwind-merge"
import { ParsedGraphData } from "@/context/AppProvider"

interface IChartProps{
    title:string,
    data:ParsedGraphData,
    dateRange:string,
    className?:string
    addDollarSign?:boolean
   

}
const processHistogramData = (data: any,addDollarSign:boolean) => {
    const binSize = 50; // Adjust bin size as needed
    const bins: number[] = [];
    const labels: string[] = [];
  
    // Generate bins and format the labels
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      const binIndex = Math.floor(value / binSize);
      if (!bins[binIndex]) {
        bins[binIndex] = 0;
      }
      bins[binIndex]++;
    }
  
    // Generate bin labels in the "$0-$50" format
    for (let i = 0; i < bins.length; i++) {
      const start = i * binSize;
      const end = (i + 1) * binSize;
      if(addDollarSign){
        labels.push(`$${start} - $${end}`);

      }
      else{
        labels.push(`${start} - ${end}`);
      }
    }
  
    return { bins, labels };
}

export function HistogramChart({title,dateRange,className,data,addDollarSign=false}:IChartProps) {

    const { bins, labels } = processHistogramData(data.data.datasets[0].data,addDollarSign);
    const chartData = {
        labels: labels, // Labels for bins (e.g., "0-50", "50-100", etc.)
        datasets: [
          {
            label: 'Frequency',
            data: bins, 
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1,
          },
        ],
    };
    const options = {
    responsive: true,
    plugins: {
        legend: {
        display: false,
        },
        tooltip: {
        callbacks: {
            label: (tooltipItem:any) => `Count: ${tooltipItem.raw}`, // Custom tooltip label
        },
        },
        datalabels: {
            display: false,
        },
    },
    scales: {
        x: {
            title: {
              display: true,
              text: 'Amount Range',
            },
            
        },
        y: {
        title: {
            display: true,
            text: 'Frequency',
        },
        beginAtZero: true,
        },
    },
    };



  return (
    <Card className={twMerge("flex flex-col",className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Bar 
          data={chartData}
          redraw={true}
          options={options}
        />
      </CardContent>
   
    </Card>
  )
}
