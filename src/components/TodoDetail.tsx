import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import Button from './bits/Button';
import { deleteTodo } from '../redux/slices/todoSlice';
import {
  CalenderIcon,
  ClockIcon,
  CloseXBigIcon,
} from '../assets/icons/svg-icons';
import Wrapper from './bits/Wrapper';
import { addSuffixToTime } from '../helpers/formatTime';

interface TodoDetailsProps {
  onSetTodoView: (id: string) => void;
}

const TodoDetail = ({ onSetTodoView }: TodoDetailsProps) => {
  const { todo } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  return (
    <Wrapper
      fluid
      className='h-full lg:h-fit rounded-t-[1.75rem] lg:rounded-[0.5rem] bg-white p-[1rem] shadow-none lg:shadow-md flex flex-col py-[1.25rem] px-[1.5rem] gap-[1rem] self-stretch 
       border-[1px] border-solid border-gray-100'
    >
      <CloseXBigIcon
        className='cursor-pointer flex self-end mb-[1rem]'
        onClick={() => onSetTodoView('calender')}
      />

      <h4 className='font-secondary text-[1.125rem] text-bold leading-[1.35rem] text-gray mb-[2rem] '>
        {todo?.title}
      </h4>

      <div className='flex flex-col gap-[0.5rem] mb-[2.2rem] '>
        <hgroup className='flex items-center gap-[0.5rem]'>
          <CalenderIcon className='stroke-secondary' />
          <span className='text-base font-medium leading-1.2 text-gray '>
            {dayjs(todo?.todoDate).format('D MMMM, YYYY')}
          </span>
        </hgroup>

        <hgroup className='flex items-center gap-[0.5rem]'>
          <ClockIcon className='stroke-secondary' />
          <span className='text-gray text-base font-medium leading-1.2 uppercase'>
            {addSuffixToTime(todo?.time?.startTime as string)} -{' '}
            {addSuffixToTime(todo?.time?.endTime as string)}
          </span>
        </hgroup>
      </div>
      <div className='w-full flex gap-[0.75rem] items-start'>
        <Button
          onClick={() => {
            if (todo === null) return;
            dispatch(deleteTodo({ id: Number(todo.id) }));
            onSetTodoView('calender');
          }}
          className='flex px-[1rem] py-[0.625rem] items-center justify-center gap-[0.5rem] flex-1 rounded-[0.5rem] border-[1px] border-solid border-gray-300 bg-white box-shadow text-gray-700 font-secondary font-semibold text-base leading-1.25 '
        >
          Delete
        </Button>

        <Button
          onClick={() => onSetTodoView('editTodo')}
          className='flex px-[1rem] py-[0.625rem] items-center justify-center gap-[0.5rem] flex-1 rounded-[0.5rem] border-[1px] border-solid border-secondary bg-secondary text-white box-shadow  disabled:pointer-events-none disabled:bg-gray-300 disabled:border-gray-300 font-sm font-semibold leading-1.25'
        >
          Edit
        </Button>
      </div>
    </Wrapper>
  );
};

export default TodoDetail;
