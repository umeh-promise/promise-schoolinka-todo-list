import { useEffect, useRef, useState } from 'react';
import TimeSettings from './TimeSettings';
import { useClickAway } from '../hooks/useClickAway';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { updateTodo } from '../redux/slices/todoSlice';
import DateSettings from './bits/DateSettings';
import Button from './bits/Button';
import Wrapper from './bits/Wrapper';
import {
  BellIcon,
  CalenderIcon,
  ClockIcon,
  CloseXBigIcon,
  CloseXSmallIcon,
} from '../assets/icons/svg-icons';

interface EditTodoProps {
  onSetTodoView: (id: string) => void;
}

const initialDropDownState = {
  startTime: false,
  endTime: false,
  month: false,
};

const EditTodo = ({ onSetTodoView }: EditTodoProps) => {
  const { todo } = useAppSelector((state) => state.todo);

  /** The states for setting the date and time values */
  const [dateValue, setDateValue] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const [title, setTitle] = useState<string>(`${todo?.title}`);

  const closeDropDownSettings = () => {
    setDropDown(initialDropDownState);
  };

  /** The states for setting the date and time dropdown on/off */
  const [dropDown, setDropDown] = useState(initialDropDownState);
  const dateSettingsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  /** This hook monitors a click outside the specified ref and closes the dropdowns
   * if they are current toggled on */
  useClickAway(dateSettingsRef, closeDropDownSettings);

  const handleCloseTodo = () => {
    onSetTodoView('calender');
  };

  const handleUpdateToDo = () => {
    dispatch(
      updateTodo({
        todo: {
          id: todo!.id,
          title: title,
          todoDate: `${dateValue}`,
          updatedAt: new Date(new Date().setHours(24)).toISOString(),
          time: {
            startTime: `${startTime}`,
            endTime: `${endTime}`,
          },
          completed: todo!.completed,
        },
        todos: [],
      })
    );

    handleCloseTodo();
  };

  useEffect(() => {
    setDateValue(`${todo?.todoDate?.slice(0, 10)}`);
    setStartTime(`${todo?.time?.startTime}`);
    setEndTime(`${todo?.time?.endTime}`);
  }, [todo]);

  return (
    <Wrapper
      fluid
      className='h-full lg:h-fit rounded-t-[1.75rem] lg:rounded-[0.5rem] shadow-none bg-white p-[1rem] lg:shadow-md flex flex-col pt-[1.5rem] pb-0 px-[1rem] md:px-[1.5rem] gap-[1rem]'
    >
      <hgroup className='flex w justify-between items-center gap-[1rem] '>
        <h4 className='text-[1.125em] leading-1.75 text-gray-900 font-semibold'>
          Edit Task
        </h4>
        <CloseXBigIcon
          className='cursor-pointer'
          onClick={() => handleCloseTodo()}
        />
      </hgroup>

      <textarea
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        name='todo'
        className='min-h-[10rem] w-full resize-none rounded-[0.5rem] border border-gray-300 bg-gray-50 p-3 outline-none box-shadow'
      />

      <div
        ref={dateSettingsRef}
        className='w-full flex gap-[0.3rem] md:gap-[1rem] items-center'
      >
        <hgroup className='relative w-full left-0 flex-[40%]  '>
          <Button
            onClick={() =>
              setDropDown((prev) => ({ ...prev, month: !prev.month }))
            }
            className='w-full flex items-center justify-center box-shadow border-[1px] border-solid border-gray-300 bg-white rounded-[0.5rem] px-[0.5rem] md:px-[1rem] py-[0.62rem] text-sm font-semibold leading-1.25 text-gray-500'
          >
            <CalenderIcon className='stroke-gray-700 flex-[30%] ' />
            <span className='flex-[70%]'>{dateValue}</span>
          </Button>

          <DateSettings isOpen={dropDown.month} dateSetter={setDateValue} />
        </hgroup>

        <div className='w-full flex-[60%] flex gap-[.2rem] md:gap-[1rem] '>
          <hgroup className='relative w-full left-0'>
            <Button
              onClick={() =>
                setDropDown((prev) => ({ ...prev, startTime: !prev.startTime }))
              }
              className='w-full flex gap-[0.5rem] items-center justify-center box-shadow border-[1px] border-solid border-gray-300 bg-white rounded-[0.5rem] px-[1rem] py-[0.62rem] text-sm font-semibold leading-1.25 text-gray-500 '
            >
              <ClockIcon className='stroke-gray-700' />
              {startTime || '00:00'}
            </Button>

            {/* Start Time dropdown */}
            <TimeSettings
              isOpen={dropDown.startTime}
              timeSetter={setStartTime}
            />
          </hgroup>

          {/* End time */}
          <hgroup className='relative w-full'>
            <Button
              onClick={() =>
                setDropDown((prev) => ({ ...prev, endTime: !prev.endTime }))
              }
              className='w-full flex gap-[0.5rem] items-center justify-center box-shadow border-[1px] border-solid border-gray-300 bg-white rounded-[0.5rem] px-[1rem] py-[0.62rem] text-sm font-semibold leading-1.25 text-gray-500 '
            >
              <ClockIcon className='stroke-gray-700' />
              {endTime || '00:00'}
            </Button>

            <TimeSettings isOpen={dropDown.endTime} timeSetter={setEndTime} />
          </hgroup>
        </div>
      </div>

      <Button className='flex justify-between items-center '>
        <span className='flex gap-[0.5rem] items-center justify-center '>
          <BellIcon />
          <time className='text-gray-500 font-medium font-secondary text-base'>
            10 Minutes before
          </time>
        </span>
        <CloseXSmallIcon />
      </Button>

      <div className='w-full flex gap-[0.75rem] items-start pt-[1rem] pb-[1.5rem] '>
        <Button
          onClick={() => onSetTodoView('todoDetail')}
          className='flex px-[1.125rem] py-[0.625rem] items-center justify-center gap-[0.5rem] flex-1 rounded-[0.5rem] border-[1px] border-solid border-gray-300 bg-white box-shadow text-gray-700 font-secondary font-semibold text-base leading-1.25 '
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            handleUpdateToDo();
          }}
          className='flex px-[1.125rem] py-[0.625rem] items-center justify-center gap-[0.5rem] flex-1 rounded-[0.5rem] border-[1px] border-solid border-secondary bg-secondary text-white box-shadow  disabled:pointer-events-none disabled:bg-gray-300 disabled:border-gray-300 font-sm font-semibold leading-1.25'
        >
          Save
        </Button>
      </div>
    </Wrapper>
  );
};

export default EditTodo;
