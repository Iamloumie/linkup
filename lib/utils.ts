import { RemoveUrlQueryParams, UrlQueryParams } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g. 'Mon')
    month: 'short', // abbreviated month name (e.g. 'Jan')
    day: 'numeric', // numeric day of the month (e.g. '1')
    hour: 'numeric', // numeric hour (e.g. '8')
    minute: 'numeric', // numeric minute (e.g. '30')
    hour12: true, // 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric', // numeric day of the month (e.g. '04')
    weekday: 'short', // abbreviated weekday name (e.g. 'Mon')
    month: 'short', // abbreviated month name (e.g. 'Jan')
    year: 'numeric', // numeric year (e.g. '2025')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g. '8')
    minute: 'numeric', // numeric minute (e.g. '30')
    hour12: true, // 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleDateString('en-US', dateTimeOptions)
  const formattedDate: string = new Date(dateString).toLocaleDateString('en-US', dateOptions)
  const formattedTime: string = new Date(dateString).toLocaleTimeString('en-US', timeOptions)

  return  {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime
  }
}

export const convertFileToURl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}


export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,    }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  )
}

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}