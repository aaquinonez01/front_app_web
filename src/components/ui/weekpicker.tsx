// components/ui/WeekPicker.tsx
import { Calendar as CalendarIcon } from "lucide-react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface WeekPickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const WeekPicker = ({ value, onChange }: WeekPickerProps) => {
  const start = startOfWeek(value, { weekStartsOn: 1 }); // Lunes como inicio de semana
  const end = endOfWeek(value, { weekStartsOn: 1 });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {`${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`}
          <CalendarIcon className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => date && onChange(date)}
        />
      </PopoverContent>
    </Popover>
  );
};
