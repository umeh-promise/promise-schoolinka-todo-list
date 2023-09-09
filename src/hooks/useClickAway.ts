import { useEffect } from 'react';

export const useClickAway = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickHandler = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickHandler);
    return () => {
      document.removeEventListener('mousedown', handleClickHandler);
    };
  }, [ref, callback]);
};
