import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { CloseXSmallIcon } from '../assets/icons/svg-icons';

type AlertType = 'error' | 'success' | 'warning' | 'danger';

interface NotificationProps {
  title?: React.ReactNode;
  body?: React.ReactNode;
  duration?: number;
  type?: AlertType;
  onClose?: () => void;
}

const Notification = () => {
  const renderNotification = ({
    title = 'Alert!',
    body = 'This is an alert element',
    duration = 5000,
  }: NotificationProps) => {
    /* Checking if there is an old portal that is still being rendered  before rendering a new one -
        all the add and remove classes is just to animate the
        portal while removing it from the DOM, one could use framer-motion to animate the presence, but this also works. 😎 */
    const oldElement = document.body.querySelector('#root-portal');

    /**  Creating a new instance of the alert/portal element that will be added to the DOM upon calling it */
    const element = document.createElement('div');
    element.id = 'root-portal';

    if (oldElement) {
      oldElement.classList.remove('top-4');
      oldElement.classList.add('top-32');
      document.body.appendChild(element);
    }

    document.body.appendChild(element);
    element.className =
      'fixed z-60 shadow-lg rounded-[0.5rem] right-[-100vw] top-4 transition-all duration-[100ms]';
    // This part is to animate the portal upon entry
    setTimeout(() => {
      element.classList.remove('right-[-100vw]');
      element.classList.add('right-4');
    }, 500);

    /** The basic structure of the alert element/component */
    const NotificationElement = () => {
      return (
        <div className='flex min-h-[100px] w-[300px] flex-col bg-white p-[1rem] border-b-[.5rem] rounded-lg border-secondary'>
          <div className='flex justify-between gap-3 text-base font-[600] '>
            <span>{title}</span>

            <CloseXSmallIcon
              onClick={() => document.body.removeChild(element)}
              className='cursor-pointer'
            />
          </div>
          <div className='mt-2 text-sm font-[500] text-black/60'>{body}</div>
        </div>
      );
    };

    // Initiating the portal which adds it to the DOM
    createRoot(element).render(
      ReactDOM.createPortal(<NotificationElement />, element)
    );

    // Removes the portal after the specified duration has elapsed
    setTimeout(() => {
      document.body.removeChild(element);
    }, duration);
  };

  return renderNotification;
};

export default Notification;
