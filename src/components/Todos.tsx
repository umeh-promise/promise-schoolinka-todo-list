import dayjs from 'dayjs';
import Pagination from './Pagination';
import Wrapper from './bits/Wrapper';
import DateView from './DateView';
import { months } from '../utils/calender';
import { useAppSelector } from '../redux/app/hooks';

interface TodosProps {
  children: React.ReactNode;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  currentView?: string;
}

const currentDate = dayjs();

const Todos = ({
  children,
  currentPage,
  setCurrentPage,
  pageSize,
  currentView,
}: TodosProps) => {
  const today = currentDate;

  const { todos } = useAppSelector((state) => state.todo);

  return (
    <Wrapper
      fluid
      className={`flex relative flex-col gap-[2rem] md:flex-[65%] pr-0 md:pr-[1.5rem]  overflow-hidden lg:border-r-[1px] border-solid border-gray-200 ${
        (currentView === 'addTodo' || currentView === 'editTodo') &&
        'disabled:pointer-events-none opacity-[0.6] pointer-events-none'
      }`}
    >
      <hgroup className='w-full flex flex-col gap-[0.8rem] '>
        <h4 className='text-gray-900 font-secondary text-sm font-semibold leading-md '>
          {months[today.month()]} {today.year()}
        </h4>

        <DateView />
      </hgroup>

      <h2 className='text-gray-900 font-semibold text-base '>My Tasks</h2>
      {/* TodoItem  */}
      {children}

      <Pagination
        currentPage={currentPage}
        totalCount={todos.length}
        pageSize={pageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Wrapper>
  );
};

export default Todos;
