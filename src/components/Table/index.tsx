/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useMemo, useState } from "react";
import { columnsToKeep } from "@/context/AppProvider";
  
  const rowsPerPage = 100;
  const maxVisiblePages = 3;

  
  export function TableDemo({tableData}:{tableData:never[]}) {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(tableData.length / rowsPerPage);
 
    const visiblePageNumbers = useMemo(() => {

      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
  
      const pages: (number | '...')[] = [];
  
      pages.push(1);
  
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
  
      if (start > 2) {
        pages.push('...');
      }
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      if (end < totalPages - 1) {
        pages.push('...');
      }
  
      pages.push(totalPages);
  
      return pages;
    }, [totalPages, currentPage]);


    const displayedInvoices = useMemo(()=>{
      return tableData.slice((currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage)
    },[tableData,currentPage]);

    const handlePageChange = (newPage:number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    
 
    return (
      <>
      <div className="w-full min-h-[calc(100vh_-_200px)]">
        <Table>
            <TableHeader className="bg-white sticky top-0 z-10">
              <TableRow>
                {columnsToKeep.map((col,index)=>(
                   <TableHead key={index} className="w-[100px]">{col}</TableHead>
                ))}
                {/* <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody className="w-full overflow-y-auto max-h-[100vh_-_200px]">
              {displayedInvoices.map((invoice,index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{invoice['ProductCD']}</TableCell>
                  <TableCell>{invoice['card1']??""}</TableCell>
                  <TableCell>{invoice['card2']??""}</TableCell>
                  <TableCell className="text-right">{invoice['card3']??""}</TableCell>
                  <TableCell className="text-right">{invoice['card4']??""}</TableCell>
                  <TableCell className="text-right">{invoice['card5']??""}</TableCell>
                  <TableCell className="text-right">{invoice['card6']??""}</TableCell>
                  <TableCell className="font-medium">{invoice['addr1']??""}</TableCell>
                  <TableCell>{invoice['addr2']??""}</TableCell>
                  <TableCell>{invoice['P_emaildomain']}</TableCell>
                  <TableCell className="text-right">{invoice['R_emaildomain']}</TableCell>
                  <TableCell className="text-right">{invoice['M1']}</TableCell>
                  <TableCell className="text-right">{invoice['M2']}</TableCell>
                  <TableCell className="text-right">{invoice['M3']}</TableCell>
                  <TableCell className="text-right">{invoice['M4']}</TableCell>
                  <TableCell className="text-right">{invoice['M5']}</TableCell>
                  <TableCell className="text-right">{invoice['M7']}</TableCell>
                  <TableCell className="text-right">{invoice['M8']}</TableCell>
                  <TableCell className="text-right">{invoice['M9']}</TableCell>
                  <TableCell className="text-right">{invoice['TransactionDT']}</TableCell>
                  <TableCell className="text-right">{invoice['TransactionID']??""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {visiblePageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
    )
  }
  