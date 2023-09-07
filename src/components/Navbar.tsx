import { useRef, useState } from 'react';
import {
  LogoMobile,
  NavMenuIcon,
  NotificationIcon,
  SettingsIcon,
} from '../assets/icons/svg-icons';
import profileImg from '../assets/img/avatar.png';
import Wrapper from './bits/Wrapper';
import { useClickAway } from '../hooks/useClickAway';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const closeNavMenu = () => {
    setShowMenu(false);
  };

  useClickAway(navRef, closeNavMenu);
  return (
    <Wrapper
      fluid
      className='shrink-0 flex items-center h-[6.062rem] border-[1px] border-solid border-gray-200 sticky top-0 bottom-0 left-0 right-0 bg-white mb-[0.75rem] z-10 '
    >
      <nav
        className='w-full md:w-[90vw] mx-auto flex justify-between items-center py-[0.75rem] pl-[1rem] pr-[0.5rem]'
        ref={navRef}
      >
        <hgroup className='text-black text-md font-bold font-secondary flex gap-[0.625rem] '>
          <LogoMobile className='md:hidden' />
          <span>ToDo</span>
        </hgroup>
        <div className='flex'>
          <NavMenuIcon
            className='block md:hidden relative'
            onClick={() => setShowMenu((prev) => !prev)}
          />

          <hgroup
            className={` md:flex md:bg-transparent md:gap-[0.5rem] md:relative md:flex-row md:top-0 md:right-0 [&>*]:cursor-pointer  h-fit p-4 flex-col items-center justify-center gap-[1rem]   ${
              showMenu
                ? 'w-[5rem]before:content-[""] bg-gray-400 flex rounded-lg rounded-tr-md  border-solid before:absolute before:-top-[.45rem] before:right-[.1rem] before:border-l-[.8rem] before:border-r-[1rem] before:border-b-[1.2rem] before:border-solid before:border-b-gray-400 before:border-x-transparent md:flex md:w-full md:before:hidden top-[4.5rem] right-[1rem] absolute z-10 '
                : 'hidden md:flex'
            } `}
          >
            <SettingsIcon />
            <NotificationIcon />
            <img
              src={profileImg}
              alt='profile-img'
              className='flex-auto shrink-0 block object-cover'
            />
          </hgroup>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
