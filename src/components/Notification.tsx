import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { CloseXSmallIcon } from '../assets/icons/svg-icons';

interface NotificationProps {
  title: React.ReactNode;
  body: React.ReactNode;
  duration: number;
  type: 'error' | 'success' | 'warning' | 'danger';
  onClose?: () => void;
}

const Notification = () => {
  const renderNotification = ({
    title = 'Alert!',
    body = 'This is an alert element',
    duration = 3000,
  }: NotificationProps) => {
    /* Checking if there is an old portal that is still being rendered  before rendering a new one -
        all the add and remove classes is just to animate the
        portal while removing it from the DOM, one could use framer-motion to animate the presence, but this also works. 😎 */
    const oldPortalElement = document.body.querySelector('#root-portal');

    /**  Creating a new instance of the alert/portal element that will be added to the DOM upon calling it */
    const portalElement = document.createElement('div');
    portalElement.id = 'root-portal';

    if (oldPortalElement) {
      oldPortalElement.classList.remove('top-4');
      oldPortalElement.classList.add('top-32');
      document.body.appendChild(portalElement);
    }

    document.body.appendChild(portalElement);
    portalElement.className =
      'fixed z-60 shadow-lg rounded-[0.5rem] right-[-100vw] top-4 transition-all duration-[100ms]';
    // This part is to animate the portal upon entry
    setTimeout(() => {
      portalElement.classList.remove('right-[-100vw]');
      portalElement.classList.add('right-4');
    }, 500);

    /** The basic structure of the alert element/component */
    const NotificationElement = () => {
      return (
        <div className='flex min-h-[100px] w-[300px] flex-col bg-white p-[1rem] border-b-[.5rem] rounded-lg border-secondary'>
          <div className='flex justify-between gap-3 text-base font-[600] '>
            <span>{title}</span>

            <CloseXSmallIcon
              onClick={() => document.body.removeChild(portalElement)}
              className='cursor-pointer'
            />
          </div>
          <div className='mt-2 text-sm font-[500] text-black/60'>{body}</div>
        </div>
      );
    };

    // Initiating the portal which adds it to the DOM
    createRoot(portalElement).render(
      createPortal(<NotificationElement />, portalElement)
    );

    // Removes the portal after the specified duration has elapsed
    setTimeout(() => {
      document.body.removeChild(portalElement);
    }, duration);
  };

  return renderNotification;
};

export default Notification;
