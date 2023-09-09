import { useEffect, useMemo, useState } from 'react';
import Wrapper from './components/bits/Wrapper';
import Navbar from './components/Navbar';
import Calendar from './components/Calender';
import Button from './components/bits/Button';
import { MicrophoneIcon, NoTodoData, PlusIcon } from './assets/icons/svg-icons';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import TodoDetail from './components/TodoDetail';
import EditTodo from './components/EditTodo';
import { Todo } from './redux/slices/todoSlice';
import { useAppSelector } from './redux/app/hooks';
import TodoItem from './components/TodoItem';
import useMediaQuery from './hooks/useMediaQuery';
import Pagination from './components/Pagination';

const pageSize = 7;

const App = () => {
  const [greeting, setGreeting] = useState('morning');
  const [currentView, setCurrentView] = useState<string>('calender');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { todos } = useAppSelector((state) => state.todo);

  const currentTodosData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return todos.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, todos]);

  const isMobile = useMediaQuery('(min-width: 768px)');

  const todosData = isMobile ? currentTodosData : todos;

  useEffect(() => {
    const displayGreeting = () => {
      const date = new Date();
      const hour = date.getHours();

      if (hour >= 12 && hour < 18) {
        setGreeting('afternoon');
      } else if (hour >= 18) {
        setGreeting('evening');
      }
    };
    displayGreeting();
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper className='md:py-[0.75rem] md:pl-[1rem] md:pr-[0.5rem] flex flex-col gap-[2rem] my-[2rem] min-h-full '>
        <header className='flex gap-[0.25rem] justify-between items-center '>
          <hgroup className='flex flex-col gap-[0.25rem]'>
            <h2 className='font-secondary text-gray-900 text-md font-semibold leading-2 '>
              Good {greeting}!
            </h2>

            <p className='text-base font-light '>You got some task to do.</p>
          </hgroup>
          <Button
            className='text-sm font-semibold leading-1.25 box-shadow bg-secondary border-secondary border-[1px] border-solid rounded-[0.5rem] hidden md:flex items-center justify-center px-[1rem] py-[0.625rem] text-white gap-[0.5rem] disabled:bg-gray-300 disabled:border-gray-300 outline-none'
            onClick={() => setCurrentView('addTodo')}
            disabled={
              currentView === 'editTodo' || currentView === 'todoDetail'
            }
          >
            <PlusIcon />
            <span className='flex'>Create tasks</span>
          </Button>
        </header>

        <div className='flex h-full w-full '>
          {/* Todos Container */}
          <Todos
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            currentView={currentView}
          >
            {/* TodoItem */}
            <h2 className='text-gray-900 font-semibold text-base '>My Tasks</h2>
            <ul className='w-full flex flex-col gap-[1rem]  '>
              {todosData?.length > 0 ? (
                todosData?.map((todo: Todo) => (
                  <TodoItem
                    todo={todo}
                    key={todo.id}
                    onSetTodoView={(id: string) => setCurrentView(id)}
                  />
                ))
              ) : (
                <Button
                  onClick={() => setCurrentView('addTodo')}
                  className=' flex  flex-col gap-[1rem] items-center justify-center h-full mb-[2rem]'
                >
                  <NoTodoData />
                  <h4 className='text-md leading-1.75 text-gray-900 font-semibold'>
                    Todo list is empty
                  </h4>
                </Button>
              )}
            </ul>

            {/* Mobile Microphone Input */}
            <div className='flex bg-secondary w-full '>
              <hgroup
                className='w-[90vw] px-[0.75rem] py-[0.5rem] flex items-center rounded-[0.5rem] border-[1.5px] border-solid gap-[0.5rem] h-[3rem] border-gray-300 bg-gray-50 box-shadow md:hidden fixed bottom-[1rem]'
                onClick={() => setCurrentView('addTodo')}
              >
                <input
                  type='text'
                  defaultValue='Input task'
                  className='w-full outline-none border-none bg-transparent'
                />
                <MicrophoneIcon />
              </hgroup>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalCount={todos.length}
              pageSize={pageSize}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </Todos>
          <Wrapper
            fluid
            className={`flex-[32%] flex w-full shrink-0 flex-col before:bg-[#00000066] fixed lg:static bottom-0 left-0 z-40 lg:z-0 before:absolute lg:before:static before:inset-0 before:-top-full before:-z-10 ${
              currentView === 'calender' && 'before:bg-transparent z-0'
            }`}
          >
            <div
              className={`h-[30rem] lg:pl-[1.5rem]  ${
                currentView === 'calender'
                  ? 'bg-transparent h-px'
                  : 'bg-white rounded-t-[1.75rem] '
              } `}
            >
              {/* View Different states based on currentView state  */}
              {isMobile && currentView === 'calender' && <Calendar />}
              {currentView === 'addTodo' && (
                <AddTodo onSetTodoView={(id: string) => setCurrentView(id)} />
              )}
              {currentView === 'editTodo' && (
                <EditTodo onSetTodoView={(id: string) => setCurrentView(id)} />
              )}
              {currentView == 'todoDetail' && (
                <TodoDetail
                  onSetTodoView={(id: string) => setCurrentView(id)}
                />
              )}
            </div>
          </Wrapper>
        </div>
      </Wrapper>
    </>
  );
};

export default App;
