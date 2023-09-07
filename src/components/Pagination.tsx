import { ArrowLeftIcon, ArrowRightIcon } from '../assets/icons/svg-icons';
import { usePagination, DOTS } from '../hooks/usePagination';

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <div className='hidden md:flex w-full justify-between'>
      <button
        className='flex self-end items-center justify-center gap-[0.5rem] disabled:pointer-events-none [&>*]:disabled:opacity-[.4]'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeftIcon className='' />
        <span className='leading-1.25 text-sm font-semibold text-gray-600'>
          Previous
        </span>
      </button>
      <div className='flex gap-[0.12rem] '>
        {paginationRange!.map((pageNumber: number | string, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <button
                key={index}
                className='flex w-[2.5rem] h-[2.5rem] justify-center items-center rounded-[1.25rem] text-sm font-medium leading-1.25 text-center dots'
              >
                &#8230;
              </button>
            );
          }

          return (
            <button
              key={index}
              className={`flex w-[2.5rem] h-[2.5rem] justify-center items-center rounded-[1.25rem] text-sm font-medium leading-1.25 text-center  ${
                pageNumber === currentPage && 'bg-gray-50'
              } `}
              onClick={() => onPageChange(Number(pageNumber))}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className='flex items-center justify-center gap-[0.5rem] disabled:pointer-events-none [&>*]:disabled:opacity-[.4]'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <span className='leading-1.25 text-sm font-semibold text-gray-600'>
          Next
        </span>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
