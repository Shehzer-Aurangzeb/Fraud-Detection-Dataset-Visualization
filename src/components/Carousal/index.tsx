import * as React from "react"
import {
  Carousel,
  CarouselContent,

  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ICarousalProps{
    children:React.ReactNode
}
export function CarouselDemo({children}:ICarousalProps) {
  return (
    <Carousel className="w-full relative">
      <CarouselContent>
        {children}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[10px] bg-black opacity-[1] text-white" />
      <CarouselNext className="absolute right-[10px] bg-black opacity-[1] text-white"/>
    </Carousel>
  )
}
