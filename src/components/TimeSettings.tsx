import { useEffect, useState } from 'react';
import { timeInHours, timeInMinutes } from '../utils/timeGenerator';

interface TimeSettingsProps {
  timeSetter: React.Dispatch<React.SetStateAction<string | null>>;
  isOpen: boolean;
}

const TimeSettings = ({ timeSetter, isOpen }: TimeSettingsProps) => {
  const [time, setTimer] = useState<{ hour: number; minutes: number }>({
    /** Setting the default hour and minutes */
    hour: Number(new Date().toISOString().slice(11, 13)),
    minutes: Number(new Date().toISOString().slice(14, 16)),
  });

  useEffect(() => {
    timeSetter(
      () =>
        /* Check of the date still has the prefix 0 */
        `${time.hour < 10 ? `0${time.hour}` : time.hour}:${
          time.minutes < 10 ? `0${time.minutes}` : time.minutes
        }`
    );
  }, [time.hour, time.minutes, timeSetter]);

  return (
    <>
      {isOpen ? (
        <div className='custom-scrollbar absolute -top-[350%] z-20 flex h-[25rem] w-full overflow-hidden  rounded-md border border-gray-100 bg-white p-3 text-sm shadow-lg lg:top-[calc(100%+8px)]'>
          {/* Hours */}
          <div className='flex max-h-[98%] overflow-hidden w-full items-center'>
            <ul className='custom-scrollbar flex h-[25rem] flex-1 flex-col items-end overflow-y-scroll py-5 p-2'>
              {timeInHours.map((hour) => (
                <li key={`${hour}hours`}>
                  <a
                    onClick={() => setTimer(() => ({ ...time, hour }))}
                    aria-selected={hour === time.hour}
                    className="flex cursor-pointer p-1 hover:bg-secondary hover:text-white rounded-md [&[aria-selected='true']]:bg-secondary [&[aria-selected='true']]:text-white"
                  >
                    {hour < 10 ? `0${hour}` : hour}
                  </a>
                </li>
              ))}
            </ul>

            {/* Minutes */}
            <ul className='custom-scrollbar flex h-[25rem] flex-1 flex-col items-center overflow-y-scroll py-5 p-2'>
              {timeInMinutes.map((minutes) => (
                <li key={`${minutes}mins`}>
                  <a
                    onClick={() =>
                      setTimer(() => ({
                        ...time,
                        minutes,
                      }))
                    }
                    aria-selected={minutes === time.minutes}
                    className="flex cursor-pointer p-1 hover:bg-secondary hover:text-white rounded-md [&[aria-selected='true']]:bg-secondary [&[aria-selected='true']]:text-white"
                  >
                    {minutes < 10 ? `0${minutes}` : minutes}
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
export default TimeSettings;
