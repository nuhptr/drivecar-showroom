type ICarProps = {
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

type IFilterProps = {
   manufacturer?: string
   year?: number
   model?: string
   limit?: number
   fuel?: string
}

// TASK: Fetch cars from the API
export async function fetchCars(filters: IFilterProps) {
   const { manufacturer, year, model, limit, fuel } = filters

   // Set the required headers for the API request
   const headers: HeadersInit = {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
   }

   const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      { headers: headers }
   )

   const result = await response.json()
   return result
}

// TASK: Fetch car details from the API
export const generateCarImageUrl = (car: ICarProps, angle?: string) => {
   const url = new URL("https://cdn.imagin.studio/getimage")
   const { make, model, year } = car

   url.searchParams.append("customer", process.env.NEXT_PUBLIC_IMAGIN_API_KEY || "")
   url.searchParams.append("make", make)
   url.searchParams.append("modelFamily", model.split(" ")[0])
   url.searchParams.append("zoomType", "fullscreen")
   url.searchParams.append("modelYear", `${year}`)
   // url.searchParams.append('zoomLevel', zoomLevel);
   url.searchParams.append("angle", `${angle}`)

   return `${url}`
}

// TASK: Calculate the rental price per day
export const calculateCarRent = (city_mpg: number, year: number) => {
   const basePricePerDay = 50 // Base rental price per day in dollars
   const mileageFactor = 0.1 // Additional rate per mile driven
   const ageFactor = 0.05 // Additional rate per year of vehicle age

   // Calculate additional rate based on mileage and age
   const mileageRate = city_mpg * mileageFactor
   const ageRate = (new Date().getFullYear() - year) * ageFactor

   // Calculate total rental rate per day
   const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

   return rentalRatePerDay.toFixed(0)
}

// USE: Update search params in the URL
export const updateSearchParams = (type: string, value: string) => {
   // Get the current URL search params
   const searchParams = new URLSearchParams(window.location.search)
   // Set the specified search parameter to the given value
   searchParams.set(type, value)
   // Set the specified search parameter to the given value
   const newPathname = `${window.location.pathname}?${searchParams.toString()}`

   return newPathname
}

// USE: Delete search params from the URL
export const deleteSearchParams = (type: string) => {
   // Set the specified search parameter to the given value
   const newSearchParams = new URLSearchParams(window.location.search)
   // Delete the specified search parameter
   newSearchParams.delete(type.toLocaleLowerCase())
   // Construct the updated URL pathname with the deleted search parameter
   const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`

   return newPathname
}
