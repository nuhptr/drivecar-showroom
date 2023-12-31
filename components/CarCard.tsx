"use client"

import Image from "next/image"
import { useState } from "react"

import { calculateCarRent, generateCarImageUrl } from "@/utils"
import { CustomButton, CarDetails } from "@/components"

type ICarCardProps = {
   city_mpg: number
   class: string
   combination_mpg: number
   cylinders: number
   displacement: number
   drive: string
   fuel_type: string
   highway_mpg: number
   make: string
   model: string
   transmission: string
   year: number
}

type CarProps = {
   car: ICarCardProps
}

export default function CarCard({ car }: CarProps) {
   const carRent = calculateCarRent(car.city_mpg, car.year)

   const [isOpen, setIsOpen] = useState<boolean>(false)

   return (
      <div className="car-card group">
         <div className="car-card__content">
            <h2 className="car-card__content-title">
               {car.make} {car.model}
            </h2>
         </div>

         <p className="flex mt-6 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">$</span> {carRent}
            <span className="self-end text-[14px] font-semibold">/day</span>
         </p>

         <div className="relative object-contain w-full h-40 my-3">
            <Image src={generateCarImageUrl(car)} alt="Car Model" fill priority className="object-contain" />
         </div>

         {/* Engine Details */}
         <div className="relative flex w-full mt-2">
            <div className="flex justify-between w-full group-hover:invisible text-gray">
               <div className="flex flex-col items-center justify-center gap-2">
                  <Image src={"/steering-wheel.svg"} width={20} height={20} alt="Sterring Wheel" />
                  <p className="text-[14px]">{car.transmission === "a" ? "Automatic" : "Manual"}</p>
               </div>
               <div className="flex flex-col items-center justify-center gap-2">
                  <Image src={"/tire.svg"} width={20} height={20} alt="Sterring Wheel" />
                  <p className="text-[14px]">{car.drive.toUpperCase()}</p>
               </div>
               <div className="flex flex-col items-center justify-center gap-2">
                  <Image src={"/gas.svg"} width={20} height={20} alt="Sterring Wheel" />
                  <p className="text-[14px]">{car.city_mpg} MPG</p>
               </div>
            </div>

            <div className="car-card__btn-container">
               <CustomButton
                  title="View More"
                  containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                  textStyles="text-white text-[14px] leading-[17px] font-bold"
                  rightIcon="/right-arrow.svg"
                  handleClick={() => setIsOpen(true)}
               />
            </div>
         </div>

         <CarDetails car={car} closeModal={() => setIsOpen(false)} isOpen={isOpen} />
      </div>
   )
}
