import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, setYear, setMonth } from 'date-fns';
import { ru } from 'date-fns/locale';

const Calendar = ({ highlightedDates }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentMonth.getMonth());

    useEffect(() => {
        setCurrentMonth(setYear(setMonth(new Date(), selectedMonth), selectedYear));
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        setSelectedYear(currentMonth.getFullYear());
        setSelectedMonth(currentMonth.getMonth());
    }, [currentMonth]);

    const firstDayOfMonth = startOfMonth(currentMonth);
    const lastDayOfMonth = endOfMonth(currentMonth);
    const calendarDates = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const firstDayOfWeek = 1;
    const emptyDaysAtStart = (calendarDates[0].getDay() + 6) % 7;
    const adjustedCalendarDates = Array(emptyDaysAtStart).fill(null).concat(calendarDates);

    const totalCells = 42;
    const remainingCells = totalCells - adjustedCalendarDates.length;
    const nextMonthDates = Array.from({ length: remainingCells }, (_, i) => i + 1);
    const finalCalendarDates = adjustedCalendarDates.concat(nextMonthDates);

    const isHighlighted = (day) => {
        if (day === null || typeof day === 'number') {
            return false;
        }
        return highlightedDates.some(dateString => {
            const date = parseDate(dateString);
            return date && isSameDay(day, date);
        });
    };

    const parseDate = (dateString) => {
        try {
            const parts = dateString.split('.').map(Number);
            if (parts.length === 3) {
                const [day, month, year] = parts;
                return new Date(year, month - 1, day);
            }
            return null;
        } catch (error) {
            console.error("Error parsing date:", dateString, error);
            return null;
        }
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const monthDate = new Date(2000, i, 1); // Use a dummy year
        return {
            value: i,
            label: format(monthDate, "LLLL", { locale: ru }),
        };
    });

    const yearOptions = Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() - 5 + i;
        return year;
    });

    return (
        <div className="bg-[var(--second-background-color)] rounded-[11px] p-[15px] flex flex-col gap-[12px]">
            <div className="flex justify-between flex-grow">
                <div className="flex gap-[0.7rem] w-full">
                    <select
                        className="font-bold text-[var(--second-background-color)] rounded-[0.6rem] p-2 flex-grow"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        style={{width: 0}}
                    >
                        {monthOptions.map((month) => (
                            <option key={month.value} value={month.value} className="font-bold">
                                {month.label}
                            </option>
                        ))}
                    </select>
                    <select
                        className="font-bold bg-white  text-[var(--second-background-color)] rounded-[0.6rem] p-2 flex-grow"
                        value={selectedYear}
                        onChange={handleYearChange}
                        style={{width: 0}}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year} className="font-bold">
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-[0.6rem]">
                {daysOfWeek.map((day) => (
                    <div key={day} className="bg-white  text-[var(--second-background-color)] text-center font-[500] rounded-[0.6rem]">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-[0.8rem]">
                {finalCalendarDates.map((day, index) => (
                    <div
                        key={index}
                        className={`font-bold text-white text-center rounded-[0.6rem] px-2 py-1 ${
                            day === null || typeof day === 'number'
                                ? 'text-gray-600 cursor-not-allowed'
                                : 'cursor-pointer'
                        } 
                        ${
                            isHighlighted(day)
                                ? 'text-white'  // Убрал bg-green-* классы
                                : (day === null || typeof day === 'number') ? 'bg-gray-800 opacity-50' : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                        style={{ background: isHighlighted(day) ? 'linear-gradient(180deg, #28EA61 0%, #1CB742 100%)' : 'black' }}
                    >
                        {typeof day === 'number' ? day : (day ? format(day, "d") : '')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;