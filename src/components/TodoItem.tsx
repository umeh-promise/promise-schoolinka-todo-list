import dayjs from 'dayjs';
import relativeTime from 'dayjs//plugin/relativeTime';
import { useAppDispatch } from '../redux/app/hooks';
import { Todo, getTodo, updateTodo } from '../redux/slices/todoSlice';
import { addSuffixToTime, formatDate } from '../helpers/formatTime';

dayjs.extend(relativeTime);

interface TodoItemProps {
  todo: Todo;
  onSetTodoView: (id: string) => void;
}

const TodoItem = ({ todo, onSetTodoView }: TodoItemProps) => {
  const todoDateFromToday = dayjs(todo?.todoDate).fromNow();
  const dispatch = useAppDispatch();

  const handleChangeEvent = () => {
    dispatch(
      updateTodo({
        todo: { ...todo, completed: !todo.completed },
      })
    );
    onSetTodoView('calender');
  };

  return (
    <li
      key={todo.id}
      className='w-full px-[1rem] gap-[0.5rem] md:gap-[1rem] md:px-[1.5rem] py-[1rem]  border-b-[1px] border-solid border-gray-200 bg-gray-50 hover:bg-primary grid grid-cols-[1fr_4rem] md:grid-cols-[1fr_6rem] justify-between'
    >
      <hgroup
        className='w-full flex justify-between items-center shrink-0 gap-[0.75rem]'
        onClick={() => {
          dispatch(getTodo({ id: todo.id }));
          onSetTodoView('todoDetail');
        }}
      >
        <input
          type='checkbox'
          name='todo-checkbox'
          className="w-[1.25rem] h-[1.25rem] rounded-[0.375rem] bg-white border-gray-300 appearance-none border-solid border-[2px] checked:border-[2px] checked:border-secondary checked:bg-secondary-100 focus:outline-none peer cursor-pointer block relative before:content-[url('./assets/icons/check.svg')] before:absolute before:text-base before:left-[0.11rem] before-bg-cover before:invisible checked:before:visible before:-top-[.11rem] "
          value={todo.completed.toString()}
          checked={todo.completed}
          onChange={() => handleChangeEvent()}
        />
        <label
          className={`flex-1 cursor-pointer text-sm font-medium leading-1.25  ${
            todo.completed ? 'line-through font-secondary text-gray-300' : ''
          } `}
        >
          <p
            className={`text-sm font-medium leading-1.25 ${
              todo.completed ? 'text-gray-300' : 'text-gray-900'
            }`}
          >
            {todo.title}
          </p>

          <span
            className={`text-sm font-light leading-1.25 ${
              todo.completed ? 'text-gray-300' : 'text-gray-600'
            } `}
          >
            {addSuffixToTime(todo?.time?.startTime)} -{' '}
            {addSuffixToTime(todo?.time?.endTime)}
          </span>
        </label>
      </hgroup>
      <p
        className={`text-sm justify-start font-light leading-1.25 cursor-default text-left flex items-start ${
          todo.completed ? 'line-through font-secondary text-gray-300' : ''
        } `}
      >
        {formatDate(todoDateFromToday)}
      </p>
    </li>
  );
};

export default TodoItem;
