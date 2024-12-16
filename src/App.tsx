import Header from "@/components/Header"
import Card from "./components/Card"
import { CircleStackIcon } from "@heroicons/react/16/solid"
import { ArrowLeftRight, ChartPie, TrendingUp } from "lucide-react"
import { TableDemo } from "./components/Table"
import { BarChartContainer } from "@/components/BarChart"
import { PieChartContainer } from "@/components/PieChart"
import { LineChartContainer } from "@/components/LineChart"
import {CarouselDemo as Carousel} from "@/components/Carousal"
import { CarouselItem } from "./components/ui/carousel"
import { useApp } from "./context/AppProvider"
import { formatDateRange } from "./utils"
import { HistogramChart } from "./components/Histogram"
import AmountByProductChart from "./components/MultiLine"
import { DistanceDistributionHistogram } from "./components/DistanceDistribution"
import DashboardSkeleton from "./components/Skeleton"

function App() { 

  const {graphsData,date,stats,tableData,isLoading} = useApp()
  return (
    <>
      {isLoading? <DashboardSkeleton/>
      :
      <div className='flex flex-col w-full'>
        <Header/>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 px-8 py-4">
          <Card title="Total Transactions" text={stats.count} Icon={<CircleStackIcon height={18} width={18}/>}/>
          <Card title="Transaction Amount Summary" text={
            <div className="flex flex-row w-full gap-x-3 items-center"> 
              <div className="flex flex-col">
                <span>${stats.mean}</span>
                <span className="ml-1 text-gray-500 text-xs font-normal">Mean</span>
              </div>
              <span className="h-[48px]">|</span>
              <div className="flex flex-col">
                <span>${stats.std}</span>
                <span className="ml-1 text-gray-500 text-xs font-normal">Std Dev</span>
              </div>
            </div>
            }  
            
            Icon={<TrendingUp height={18} width={18}/>}/>
          <Card title="Transaction Range" text={
            <div className="flex flex-row w-full gap-x-3 items-center"> 
              <div className="flex flex-col">
                <span>${stats.min}</span>
                <span className="ml-1 text-gray-500 text-xs font-normal">Min</span>
              </div>
              <span className="h-[48px]">|</span>
              <div className="flex flex-col">
                <span>${stats.max}</span>
                <span className="ml-1 text-gray-500 text-xs font-normal">Max</span>
              </div>
            </div>
          } Icon={<ArrowLeftRight height={18} width={18}/>} />
          <Card title="Transaction Percentiles" text={
              <div className="flex flex-row w-full gap-x-3 items-center"> 
                <div className="flex flex-col">
                  <span>${stats['25%']}</span>
                  <span className="ml-1 text-gray-500 text-xs font-normal">Q1</span>
                </div>
                <span className="h-[48px]">|</span>
                <div className="flex flex-col">
                  <span>${stats.median}</span>
                  <span className="ml-1 text-gray-500 text-xs font-normal">Median</span>
                </div>
                <span className="h-[48px]">|</span>
                <div className="flex flex-col">
                <span>${stats['75%']}</span>
                  <span className="ml-1 text-gray-500 text-xs font-normal">Q3</span>
                </div>
              </div>
          } Icon={<ChartPie height={18} width={18}/>} />
        </div>
        <Carousel>
          <CarouselItem key={1} className="w-full">
            <div className="grid gap-4 lg:grid-cols-2 px-8">
              {graphsData['daily_distribution'] && Object.keys(graphsData['daily_distribution']).length>0 &&  
                  <BarChartContainer className="h-fit" title={graphsData['daily_distribution'].title} 
                  data={graphsData['daily_distribution']} 
                  dateRange={formatDateRange(date)}/>
                }
              <div className="grid grid-cols-2 grid-row-2 gap-2">
                {graphsData['card_type_distribution'] && Object.keys(graphsData['card_type_distribution']).length>0 && 
                  <PieChartContainer title={graphsData['card_type_distribution'].title} dateRange={formatDateRange(date)} data={graphsData['card_type_distribution']}/>
                }
                {graphsData['email_domain_categories'] && Object.keys(graphsData['email_domain_categories']).length>0 && 
                  <PieChartContainer 
                  title={graphsData['email_domain_categories'].title} 
                  dateRange={formatDateRange(date)} 
                  data={graphsData['email_domain_categories']}/>
                }
                <div className="col-span-2">
                {graphsData['hourly_distribution'] && Object.keys(graphsData['hourly_distribution']).length>0 && 
                  <LineChartContainer title={graphsData['hourly_distribution'].title} dateRange={formatDateRange(date)}
                    data={graphsData['hourly_distribution']}/>
                  }
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem key={2} className="w-full">
            <div className="grid gap-4 lg:grid-cols-2 px-8">
              {graphsData["amount_by_product"] && Object.keys(graphsData["amount_by_product"]).length>0 && 
                <AmountByProductChart title={graphsData["amount_by_product"].title} dateRange={formatDateRange(date)}
                  data={graphsData["amount_by_product"]}/>
                }
              <div className="grid grid-cols-2 grid-row-1 gap-2">
                {graphsData["product_code_distribution"] && Object.keys(graphsData["product_code_distribution"]).length>0 && 
                  <PieChartContainer title={graphsData["product_code_distribution"].title} dateRange={formatDateRange(date)} data={graphsData["product_code_distribution"]}/>
                }
                {graphsData["device_type_distribution"] && Object.keys(graphsData["device_type_distribution"]).length>0 && 
                  <PieChartContainer 
                  title={graphsData["device_type_distribution"].title} 
                  dateRange={formatDateRange(date)} 
                  data={graphsData["device_type_distribution"]}/>
                }
                <div className="col-span-2">
                  {graphsData["card_category_distribution"] && Object.keys(graphsData["card_category_distribution"]).length>0 &&  
                    <BarChartContainer className="h-fit" title={graphsData["card_category_distribution"].title} 
                    data={graphsData["card_category_distribution"]} 
                    dateRange={formatDateRange(date)}/>
                  }
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem key={3} className="w-full">
            <div className="grid gap-4 grid-rows-2 lg:grid-cols-2 px-8">
              {graphsData["amount_distribution"] && Object.keys(graphsData["amount_distribution"]).length>0 && 
                  <HistogramChart title={graphsData["amount_distribution"].title} dateRange={formatDateRange(date)}
                    data={graphsData["amount_distribution"]} addDollarSign/>
                }
                {graphsData["log_amount_distribution"] && Object.keys(graphsData["log_amount_distribution"]).length>0 && 
                  <HistogramChart title={graphsData["log_amount_distribution"].title} dateRange={formatDateRange(date)}
                    data={graphsData["log_amount_distribution"]} addDollarSign/>
                  }
                {graphsData["card_issuer_distribution"] && Object.keys(graphsData["card_issuer_distribution"]).length>0 &&  
                    <BarChartContainer className="h-fit" title={graphsData["card_issuer_distribution"].title} 
                    data={graphsData["card_issuer_distribution"]} 
                    dateRange={formatDateRange(date)}/>
                  }
                  {graphsData[ "email_provider_distribution"] && Object.keys(graphsData[ "email_provider_distribution"]).length>0 &&  
                    <BarChartContainer className="h-fit" title={graphsData[ "email_provider_distribution"].title} 
                    data={graphsData[ "email_provider_distribution"]} 
                    dateRange={formatDateRange(date)}/>
                  }
            </div>
          </CarouselItem>
          <CarouselItem key={5} className="w-full">
            <div className="grid gap-4 lg:grid-cols-2 px-8">
              {graphsData["address_distribution"] && Object.keys(graphsData["address_distribution"]).length>0 && 
                <BarChartContainer className="h-fit" title={graphsData['address_distribution'].title} 
                  data={graphsData['address_distribution']} 
                  dateRange={formatDateRange(date)}/>
                }
                {graphsData["distance_distribution"] && Object.keys(graphsData["distance_distribution"]).length>0 &&  
                    <DistanceDistributionHistogram className="h-fit" title={graphsData["distance_distribution"].title} 
                    data={graphsData["distance_distribution"]} 
                    dateRange={formatDateRange(date)}/>
                  }
            </div>
          </CarouselItem>
        </Carousel>
        <div className="flex flex-col gap-y-4 px-8 py-4">
          <h2 className="text-xl font-medium leading-[28.80px]" suppressHydrationWarning>
          Fraudulent Transaction Details
          </h2> 
          {tableData && tableData.length>0 &&
            <TableDemo tableData={tableData}/>
          }
        </div>
      </div>
      }
    </>
  )
}

export default App
