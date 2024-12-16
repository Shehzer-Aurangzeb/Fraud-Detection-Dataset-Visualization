/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { ParsedGraphData } from '@/context/AppProvider';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface IChartProps {
  title: string;
  data: ParsedGraphData;
  dateRange: string;
  className?: string;
}

const AmountByProductChart = ({ title, dateRange, className, data }: IChartProps) => {
  // Ensure the dataset has correct values and structure
  console.log(data.data); // Debugging to see the structure of the data

  const chartData = {
    labels: data.data.labels,
    datasets: [
      {
        label: 'Max Amount',
        data: data.data.datasets[0].data.map((dataset: any) => dataset.max), // Map max values
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false, // Disable filling
      },
      {
        label: 'Mean Amount',
        data: data.data.datasets[0].data.map((dataset: any) => dataset.mean), // Map mean values
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false, // Disable filling
      },
      {
        label: 'Median Amount',
        data: data.data.datasets[0].data.map((dataset: any) => dataset.median), // Map median values
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false, // Disable filling
      },
      {
        label: 'Min Amount',
        data: data.data.datasets[0].data.map((dataset: any) => dataset.min), // Map min values
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false, // Disable filling
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: data.title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
        <Line data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default AmountByProductChart;
