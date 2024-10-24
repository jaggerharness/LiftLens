"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/shad-ui/button"
import { Calendar } from "@/components/shad-ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shad-ui/popover"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfWeek,
    to: endOfWeek
  })

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);

    const params = new URLSearchParams(searchParams);

    if (range) {
      params.set('start', range?.from?.toISOString() || '');
      params.set('end', range?.to?.toISOString() || '');
    }
    else {
      params.delete('start');
      params.delete('end');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'secondary'}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "EEE, MMM dd")} -{" "}
                  {format(date.to, "EEE, MMM dd")}
                </>
              ) : (
                format(date.from, "EEE, MMM dd")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            className="hidden md:block"
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => handleDateSelect(range)}
            numberOfMonths={2}
          />
          <Calendar
            className="block md:hidden"
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => handleDateSelect(range)}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}