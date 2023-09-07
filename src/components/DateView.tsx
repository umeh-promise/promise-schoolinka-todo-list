import dayjs from 'dayjs';
import { daysNamesAbr, generateDate } from '../utils/calender';

const DateView = () => {
  const { arrayOfCurrentDates } = generateDate(dayjs().month(), dayjs().year());

  return (
    <div className='flex w-full gap-[1rem] overflow-x-scroll hide-scrollbar'>
      {/* arrayOfCurrentDate returns all the dates in the current month, so in order to only show the date
            from today to eleven(11) days ahead i am slicing from today to 11 days ahead */}
      {arrayOfCurrentDates
        .slice(dayjs().date() - 1)
        .map(({ date, today }, index) => {
          return (
            <hgroup
              key={index}
              aria-current={today}
              className="flex h-[4.25rem] min-w-[3.875rem] flex-col items-center justify-center gap-[0.5rem] rounded-lg border border-gray-300 shadow-sm hover:bg-primary [&[aria-current='true']]:bg-secondary [&[aria-current='true']]:text-white leading-1.25"
            >
              <span className='text-sm font-semibold'>
                {daysNamesAbr[date.day()]}
              </span>
              <span className='text-sm font-semibold'>{date.date()}</span>
            </hgroup>
          );
        })}
    </div>
  );
};

export default DateView;
