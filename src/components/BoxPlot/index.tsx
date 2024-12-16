/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BoxPlotController } from "@sgratzl/chartjs-chart-boxplot";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BoxPlotController // Register the Boxplot controller
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
import { CHART_COLORS } from "@/utils";

interface IChartProps {
  title: string;
  data: ParsedGraphData;
  dateRange: string;
  className?: string;
}

export function BoxplotChartContainer({ title, dateRange, className, data }: IChartProps) {
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

  const datasetsWithColors = data.data.datasets.map((dataset: any, index: number) => ({
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
    <Card className={twMerge("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Chart 
          type="boxplot" // specify chart type as boxplot
          data={chartConfig}
          redraw={true}
          options={options}
        />
      </CardContent>
    </Card>
  );
}
