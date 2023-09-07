import { useEffect, useState } from 'react';
import { generateYearsArray, getDaysInMonth } from '../../utils/timeGenerator';
import { months } from '../../utils/calender';

interface IDateSettings {
  dateSetter: React.Dispatch<React.SetStateAction<string | null>>;
  isOpen: boolean;
}

const DateSettings = ({ dateSetter, isOpen }: IDateSettings) => {
  const [time, setTimer] = useState<{
    month: number;
    day: number;
    year: number;
  }>({
    /** Setting the default month, day and year to the current day's date */
    month: Number(new Date().toISOString().slice(5, 7)),
    day: Number(new Date().toISOString().slice(8, 10)),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    dateSetter(
      () =>
        /* Check of the date still has the prefix 0 */
        `${time.year}-${time.month < 10 ? `0${time.month}` : time.month}-${
          time.day < 10 ? `0${time.day}` : time.day
        }`
    );
  }, [dateSetter, time.day, time.month, time.year]);

  return (
    <>
      {isOpen ? (
        <div className='custom-scrollbar absolute -top-[300%] z-20 flex h-[25rem] w-[calc(200%)] md:w-[calc(130%)] max-w-[18rem] overflow-hidden rounded-md border border-gray-100 bg-white p-3 text-sm shadow-lg lg:top-[calc(100%+8px)]'>
          {/* Months */}
          <div className='flex w-full h-full overflow-y-hidden items-center'>
            <ul className='custom-scrollbar flex h-fit flex-1 flex-col items-end overflow-y-scroll py-[1rem] pr-[0.25rem]'>
              {months.map((month, idx) => (
                <li key={`${month}month`}>
                  <a
                    onClick={() =>
                      setTimer(() => ({
                        ...time,
                        month: idx + 1,
                      }))
                    }
                    aria-selected={idx + 1 === time.month}
                    className="flex cursor-pointer p-1 hover:bg-secondary hover:text-white [&[aria-selected='true']]:bg-secondary rounded-md [&[aria-selected='true']]:text-white"
                  >
                    {month.slice(0, 3)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Days in the selected month */}
            <ul className='custom-scrollbar flex h-[25rem] flex-1 flex-col items-center overflow-y-scroll py-[1rem] pr-[0.25rem]'>
              {getDaysInMonth(time.month).map((day) => (
                <li
                  aria-disabled={false}
                  className="[&[aria-disabled='true']]:pointer-events-none [&[aria-disabled='true']]:opacity-40"
                  key={`${day.value}mins`}
                >
                  <a
                    onClick={() =>
                      setTimer(() => ({
                        ...time,
                        day: day.value,
                      }))
                    }
                    aria-selected={day.value === time.day}
                    className="flex cursor-pointer p-1 hover:bg-secondary hover:text-white rounded-md [&[aria-selected='true']]:bg-secondary [&[aria-selected='true']]:text-white"
                  >
                    {day.value < 10 ? `0${day.value}` : day.value}
                  </a>
                </li>
              ))}
            </ul>

            {/* Years */}
            <ul className='custom-scrollbar flex h-[25rem] flex-1 flex-col items-center overflow-y-scroll py-[1rem] pr-[0.25rem]'>
              {generateYearsArray().map((year) => (
                <li key={`${year.value}mins`}>
                  <a
                    onClick={() =>
                      setTimer(() => ({
                        ...time,
                        year: year.value,
                      }))
                    }
                    aria-selected={year.value === time.year}
                    className="flex cursor-pointer p-1 hover:bg-secondary hover:text-white rounded-md [&[aria-selected='true']]:bg-secondary [&[aria-selected='true']]:text-white"
                  >
                    {year.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DateSettings;
