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

interface IChartProps {
    title: string,
    data: ParsedGraphData,
    dateRange: string,
    className?: string
}

export function DistanceDistributionHistogram({ title, dateRange, className, data }: IChartProps) {
    // Extract labels (distance values) and data (frequency) from the provided dataset
    const labels = data.data.labels;
    const frequencyData = data.data.datasets[0].data;

    // Prepare chart data
    const chartData = {
        labels: labels, // Use the distance values as labels
        datasets: [
            {
                label: 'Frequency',
                data: frequencyData, 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)', 
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend for simplicity
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => `Frequency: ${tooltipItem.raw}`, // Customize tooltip to show frequency
                },
            },
            datalabels:{
                display:false
            }
        },
        scales: {
            x: {
                type: 'linear' as const, // Explicitly set axis type to 'linear'
                title: {
                    display: true,
                    text: 'Distance (units)', // Label for the x-axis (distance values)
                },
                ticks: {
                    callback: function (value: number) {
                        return value.toFixed(2); // Format the distance values with 2 decimal places
                    },
                },
            },
            y: {
                beginAtZero: true, // Ensure the y-axis starts from 0
                title: {
                    display: true,
                    text: 'Frequency', // Label for the y-axis (frequency)
                },
            },
        },
    };

    return (
        <Card className={twMerge("flex flex-col", className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{dateRange}</CardDescription>
            </CardHeader>
            <CardContent>
                <Bar 
                    data={chartData} 
                    options={options as any}
                />
            </CardContent>
        </Card>
    );
}
