/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/api/config';
import { data } from '@/temp/data';
import React, { createContext, useEffect, useContext, useCallback, useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';

type AppContextType = {
 threadCount:string;
 setThreadCount: React.Dispatch<React.SetStateAction<string>>
 dataLimit: string
 setDataLimit: React.Dispatch<React.SetStateAction<string>>
 tableData:never[],
 setTableData:React.Dispatch<React.SetStateAction<never[]>>
 error:string|null;
 date: DateRange | undefined
 setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
 isLoading:boolean
 fetchFraudData:(requestBody?: Partial<FraudDataRequestBody>) => Promise<void>
 graphsData: {[key:string]:ParsedGraphData},
 stats:any,
 setStatsData:any,
};
export const DEFAULT_REQUEST_BODY: FraudDataRequestBody ={
  segment: "8",
  start_date: "2017-01-17T23:06:00.000Z",
  end_date: "2017-11-19T23:06:00.000Z",
  limit: 1000
}


interface IProps {
  children: React.ReactNode;
}
export interface FraudDataRequestBody {
  segment: string;
  start_date: string;
  end_date: string;
  limit: number;
}

export const columnsToKeep = [
  "ProductCD",
  "card1", "card2", "card3", "card4", "card5", "card6",
  "addr1", "addr2",
  "P_emaildomain", "R_emaildomain",
  "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9",
  "TransactionDT", "TransactionID"
];
const AppContext = createContext<AppContextType>({
  threadCount:"",
  setThreadCount:()=>{},
  dataLimit:"",
  setDataLimit:()=>{},
  tableData:[],
  setTableData:()=>{},
  error:null,
  date:{
    from: new Date(DEFAULT_REQUEST_BODY.start_date),
    to: new Date(DEFAULT_REQUEST_BODY.end_date)
  },
  setDate:()=>{},
  isLoading:false,
  fetchFraudData:async () => Promise.resolve(),
  graphsData:{},
  stats:{},
  setStatsData:{}

});

export type ParsedGraphData = {
  name: string;
  type: string;
  title: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
};

function AppProvider({ children }: IProps) {

  const [threadCount, setThreadCount] = useState("");
  const [dataLimit, setDataLimit] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(DEFAULT_REQUEST_BODY.start_date),
    to: new Date(DEFAULT_REQUEST_BODY.end_date)
  })
  const [tableData,setTableData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [graphsData,setGraphsData] = useState<{[key:string]:ParsedGraphData}>({})
  const [stats,setStatsData] = useState({})
  
  const parseGraphData = (serverData: any): {[key:string]:ParsedGraphData} => {
    // console.log('server :>> ', serverData.data.analysis);
    const parsedServerData =  serverData.data.analysis.map((graph:any) => {
      if(graph.graphName==="statistical_summary"){
        setStatsData(graph.values.stats)
      }
      return{
        name: graph.graphName,
        type: graph.graphType,
        title: graph.values.title,
        data: {
          labels: graph.values.labels,
          datasets: graph.values.datasets?.map((dataset: any) => ({
            label: dataset.label,
            data: dataset.data,
          })),
        },
      }
    });
    const keyedGraphsData = parsedServerData.reduce((acc:any, graph:any) => {
      acc[graph.name] = graph;
      return acc;
    }, {} as Record<string, typeof graphsData[0]>);
    return keyedGraphsData
  };

  function filterColumns(serverData:any) {
    // Define the columns to keep
   
  
    return serverData.data.raw_data.map((row:any) => {
      // Create a new object with only the columns to keep
      const filteredRow:any = {};
      columnsToKeep.forEach(col => {
        if (row.hasOwnProperty(col)) {
          filteredRow[col] = row[col];
        }
      });
      return filteredRow;
    });
  }
  
  

  //* functions
  const fetchFraudData = useCallback(async (requestBody: Partial<FraudDataRequestBody> = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const body = { ...DEFAULT_REQUEST_BODY, ...requestBody };
      const response = await api.post("fraud-data",body,{
        timeout: 31536000000
      });
      console.log('response.data :>> ', response.data);
      setGraphsData(parseGraphData(response.data))
      setTableData(filterColumns(response.data))

    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unknown error occurred while fetching fraud data';
      setError(errorMessage);
      setGraphsData(parseGraphData(data))
      setTableData(filterColumns(data))
      console.error('Failed to fetch fraud data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);


  // values
  const value = useMemo(
    () => ({
      threadCount,setThreadCount,
      dataLimit,setDataLimit,
      tableData,setTableData,
      isLoading,fetchFraudData,
      error,date,setDate,
      graphsData,
      stats,
      setStatsData
    }),
    [threadCount,setThreadCount,setDataLimit,
      dataLimit,tableData,
      setTableData,error,
      date,setDate,isLoading,fetchFraudData,graphsData,stats,setStatsData],
  );

  //* initialize the app.
  useEffect(() => {
    fetchFraudData(DEFAULT_REQUEST_BODY)
  }, [fetchFraudData,setTableData]);
console.log('tableData :>> ', tableData);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
export default AppProvider;