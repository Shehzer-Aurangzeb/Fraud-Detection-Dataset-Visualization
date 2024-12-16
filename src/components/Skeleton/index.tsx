import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <>
    <div
    className={
      "flex flex-col sm:flex-row gap-3 justify-between w-full border-y items-center border-b-[#e4e4e4] px-8 py-5"
    }>
       <Skeleton className="h-6 w-[300px] rounded-[5px]" />
        <div className="flex flex-row gap-x-3">
        <Skeleton className="h-6 w-[100px] rounded-[5px]" />
        <Skeleton className="h-6 w-[100px] rounded-[5px] "/>
        <Skeleton className="h-6 w-[100px] rounded-[5px]" />
        </div>
    </div>
    <div className="flex flex-row gap-x-4 px-8 py-5">
      <Skeleton className="h-[78px] w-[300px] rounded-[5px]" />
      <Skeleton className="h-[78px] w-[300px] rounded-[5px]" />
      <Skeleton className="h-[78px] w-[300px] rounded-[5px]" />
      <Skeleton className="h-[78px] w-[300px] rounded-[5px]" />

    </div>
    <div className="grid grid-cols-2 gap-3 px-8 py-5">
      <Skeleton className="h-[300px] w-full rounded-[5px]" />
      <Skeleton className="h-[300px] w-full rounded-[5px]" />
    </div>
    <div className="px-8">
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />
      <Skeleton className="h-[30px] w-full rounded-[5px] mb-1" />

    </div>
    </>
    // <div className="p-6 space-y-6">
    //   {/* Top Cards */}
    //   <Skeleton className="h-6 w-24" />

    //   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Total Transactions</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-6 w-16" />
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Transaction Amount Summary</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-6 w-24" />
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Transaction Range</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-6 w-24" />
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Transaction Percentiles</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-6 w-24" />
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* Charts Section */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     {/* Bar Chart Skeleton */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Transaction Distribution by Day</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-48 w-full" />
    //       </CardContent>
    //     </Card>

    //     {/* Pie Charts */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Card Type Distribution</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-48 w-full rounded-full" />
    //       </CardContent>
    //     </Card>
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Email Domain Categories</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Skeleton className="h-48 w-full rounded-full" />
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* Table Skeleton */}
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Transactions Table</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="space-y-2">
    //         <Skeleton className="h-8 w-full" />
    //         <Skeleton className="h-8 w-full" />
    //         <Skeleton className="h-8 w-full" />
    //         <Skeleton className="h-8 w-full" />
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
};

export default DashboardSkeleton;
