import dayjs from 'dayjs';
import { useState } from 'react';
import { generateDate, months, monthsAbr } from '../utils/calender';
import Button from './bits/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../assets/icons/svg-icons';

import { useAppSelector } from '../redux/app/hooks';

const Calendar = () => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const { arrayOfDates } = generateDate(today.month(), today.year());

  const { todos } = useAppSelector((state) => state.todo);

  return (
    <div className='h-max flex flex-col gap-[0.75rem] min-w-full md:min-w-[25rem] rounded-[0.5rem] border-[1px] boder-solid border-gray-100 bg-white px-[1.5rem] py-[1.2rem] shadow-md'>
      <div className='flex w-full items-center justify-between'>
        <ChevronLeftIcon
          className='h-5 w-5 cursor-pointer'
          onClick={() => {
            setToday(today.month(today.month() - 1));
          }}
        />

        <h4 className='text-gray-700 font-secondary text-sm font-semibold leading-md '>
          {months[today.month()]} {today.year()}
        </h4>

        <ChevronRightIcon
          className='h-5 w-5 cursor-pointer transition-all hover:scale-105'
          onClick={() => {
            setToday(today.month(today.month() + 1));
          }}
        />
      </div>

      {/* Today's date  */}
      <div className='w-full flex items-stretch justify-between gap-[0.5rem]'>
        <span className='w-full flex-[70%] py-[0.5rem] px-[0.88rem] col-span-2 flex h-10 items-center rounded-[0.5rem] border-[1px] border-solid border-gray-300 disabled:bg-white placeholder:text-gray-900 text-base font-light leading-1.5 box-shadow select-none'>
          {`${monthsAbr[today.month()]} ${today.date()}, ${today.year()}`}
        </span>

        <Button
          onClick={() => {
            setToday(currentDate);
          }}
          className='w-full flex-[30%] justify-center items-cente rounded-[0.5rem] border-[1px] border-solid border-gray-300 font-sm font-semibold leading-1.25 box-shadow'
        >
          Today
        </Button>
      </div>

      {/* Weekdays */}
      <div className='grid grid-cols-7'>
        {days.map((day, index) => {
          return (
            <h5
              key={index}
              className='grid h-[2.5rem] w-[2.5rem] select-none place-content-center text-center py-[0.625rem] px-[0.5rem] text-sm font-medium leadind-1.25 text-gray-700 rounded-[1.25rem]'
            >
              {day}
            </h5>
          );
        })}
      </div>

      {/* All the days in the current month grid*/}
      <div className='grid grid-cols-7 gap-2'>
        {arrayOfDates.map(({ date, currentMonth, today }, index) => {
          const findMatchingUpcomingTodoDate = todos.find(
            (todo) =>
              dayjs(todo.updatedAt).format('YYYY-MM-DD') ===
                date.format('YYYY-MM-DD') && dayjs(todo.updatedAt).diff() >= 0
          );

          const findMatchingPastTodoDate = todos.find(
            (todo) =>
              dayjs(todo.updatedAt).format('YYYY-MM-DD') ===
                date.format('YYYY-MM-DD') && dayjs(todo.updatedAt).diff() < 0
          );
          return (
            <div key={index} className='grid  '>
              {/* Day in the current month */}
              <button
                className={`${currentMonth ? 'text-gray-700' : 'text-gray-300'} 
                ${findMatchingUpcomingTodoDate && 'bg-gray-100'}
                ${today ? 'bg-secondary text-white hover:bg-secondary' : ''}
                 h-[2.5rem] w-[2.5rem] select-none place-content-center text-center py-[0.625rem] px-[0.5rem] text-sm font-light leading-1.25 relative rounded-[1.25rem] hover:bg-gray-200`}
              >
                {date.date()}

                {/* To add a purple dot to todos that are upcoming */}
                {findMatchingUpcomingTodoDate && (
                  <span className='absolute bottom-1 left-1/2 flex h-[0.3rem] w-[0.3rem] -translate-x-1/2 rounded-full bg-secondary '></span>
                )}

                {/* To add a gray dot to todos that are in the past */}
                {findMatchingPastTodoDate && (
                  <span className='absolute bottom-1 left-1/2 flex h-[0.3rem] w-[0.3rem] -translate-x-1/2 rounded-full bg-gray-400'></span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
