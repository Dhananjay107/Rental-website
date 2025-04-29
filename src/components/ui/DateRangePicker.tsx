import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { DateRange } from '../../types';

interface DateRangePickerProps {
  availability: DateRange[];
  onDateRangeSelect: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ availability, onDateRangeSelect }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Flatten all available dates from the availability ranges
  const availableDates = availability.flatMap(range => {
    const dates = [];
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
    
    return dates;
  });

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.getDate() === date.getDate() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      // Make sure end date is after start date
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
        
        // Check if all dates in range are available
        let allDatesAvailable = true;
        for (let d = new Date(startDate); d <= date; d.setDate(d.getDate() + 1)) {
          if (!isDateAvailable(new Date(d))) {
            allDatesAvailable = false;
            break;
          }
        }
        
        if (allDatesAvailable) {
          onDateRangeSelect({
            startDate: startDate.toISOString(),
            endDate: date.toISOString(),
          });
        } else {
          setEndDate(null);
          // Could show a toast message here about unavailable dates in range
        }
      }
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar size={18} className="text-teal-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">Select Dates</h3>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="mx-2 text-sm font-medium">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => 
          day ? (
            <button
              key={i}
              onClick={() => handleDateClick(day)}
              disabled={!isDateAvailable(day)}
              className={`
                h-10 w-full rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${
                  !isDateAvailable(day)
                    ? 'text-gray-400 cursor-not-allowed'
                    : startDate && endDate && day >= startDate && day <= endDate
                    ? 'bg-teal-100 text-teal-800'
                    : (startDate && day.getTime() === startDate.getTime()) || (endDate && day.getTime() === endDate.getTime())
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-gray-100 text-gray-800'
                }
              `}
            >
              {day.getDate()}
            </button>
          ) : (
            <div key={i} className="h-10"></div>
          )
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="font-medium text-gray-800">From: </span>
            <span className="text-gray-600">
              {startDate ? startDate.toLocaleDateString() : 'Select date'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-800">To: </span>
            <span className="text-gray-600">
              {endDate ? endDate.toLocaleDateString() : 'Select date'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;