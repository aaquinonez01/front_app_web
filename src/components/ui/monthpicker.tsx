// components/ui/MonthPicker.tsx
import { Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface MonthPickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const MonthPicker = ({ value, onChange }: MonthPickerProps) => {
  const start = startOfMonth(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {`${format(start, "MMMM yyyy")}`} {/* Ejemplo: "Enero 2025" */}
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
