import { ChangeEvent, useMemo, useState } from 'react';
import { DatePickerWithRange } from '@/components/DatePicker'
import { Input } from '@/components/ui/input'
import { DEFAULT_REQUEST_BODY, useApp } from '@/context/AppProvider';
import { DateRange } from 'react-day-picker';

function Header() {
    const {threadCount,setDataLimit,setThreadCount,dataLimit,date,setDate,fetchFraudData} = useApp()
    const [changedFields, setChangedFields] = useState<{
      date: boolean;
      threadCount: boolean;
      dataLimit: boolean;
    }>({
      date: false,
      threadCount: false,
      dataLimit: false
    });

    const handleThreadCountChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setThreadCount(value);
        setChangedFields(prev => ({ ...prev, threadCount: true }));
      }
    };
    const handleDataLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setDataLimit(value);
        setChangedFields(prev => ({ ...prev, dataLimit: true }));
      }
    };
    const handleDateChange = (newDate: DateRange|undefined) => {
      if(!newDate) return
      setDate(newDate as { from: Date; to: Date });
      setChangedFields(prev => ({ ...prev, date: true }));
      submitForm()
    };
    const {isThreadCountInvalid,isDataLimitInvalid} = useMemo(()=>{
      return {
        isThreadCountInvalid: threadCount !== "" && (Number(threadCount) < 8 || Number(threadCount)>25),
        isDataLimitInvalid: dataLimit !== "" && (Number(dataLimit) <1000 || Number(dataLimit)>15000)
      }
    },[threadCount,dataLimit])

    const isSubmitForm = useMemo(()=>{
      const isFormValid = 
      !isThreadCountInvalid &&
      !isDataLimitInvalid && date

    const hasChanges = 
      changedFields.threadCount || 
      changedFields.dataLimit || 
      changedFields.date;
      return isFormValid && hasChanges
    }
    ,[
      isThreadCountInvalid,isDataLimitInvalid,changedFields,date
    ]) 
    const submitForm = ()=>{
      if(!isSubmitForm) return 
      fetchFraudData({
        segment: threadCount || DEFAULT_REQUEST_BODY.segment,
        start_date: date?.from?.toISOString() || DEFAULT_REQUEST_BODY.start_date,
        end_date: date?.to?.toISOString() ||  DEFAULT_REQUEST_BODY.end_date,
        limit: Number(dataLimit) || 1000
      });
      setChangedFields({
        date: false,
        threadCount: false,
        dataLimit: false
      });
    }   
   
    return (
        <div
        className={
          "sticky top-0 bg-white z-[50] flex flex-col sm:flex-row gap-3 justify-between w-full border-y items-center border-b-[#e4e4e4] px-8 py-5"
        }>
        <div className="w-full">
          <h2 className="text-2xl font-medium leading-[28.80px]" suppressHydrationWarning>
            Dashbaord
          </h2> 
        </div>
        <form className='flex flex-col gap-y-3 sm:flex-row gap-x-2 flex-1 w-full'>
          <DatePickerWithRange date={date} handleDateChange={handleDateChange}/>
          <div className='flex flex-row gap-x-2 flex-1'>
            <div className='relative w-[130px]'>
              <Input value={threadCount} type="text" pattern="\d*" placeholder="Thread Count" 
              className={`w-full ${isThreadCountInvalid ? "border-red-500 focus-visible:ring-transparent focus-visible:border-red-500" : ""}`} 
              onChange={handleThreadCountChange} 
              onBlur={submitForm}/>
              <span className='text-[10px] text-gray-400 whitespace-nowrap absolute bottom-[-15px]'>Accepted range: 8 &ndash; 25</span>
            </div>
            <div className='relative  w-[160px]'>
              <Input value={dataLimit} type="text" pattern="\d*" placeholder="Data Limit" 
              className={`w-full ${isDataLimitInvalid ? "border-red-500 focus-visible:ring-transparent focus-visible:border-red-500" : ""}`} 
              onChange={handleDataLimitChange}
              onBlur={submitForm}
              />
              <span className='text-[10px] text-gray-400 whitespace-nowrap absolute bottom-[-15px]'>Accepted range: 1000 &ndash; 15,000</span>
            </div>
          </div>
        </form>
      </div>
    )
}

export default Header