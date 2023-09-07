import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

const Wrapper = ({ children, className, fluid, ...props }: WrapperProps) => {
  return (
    <section
      className={`${fluid ? 'w-full' : 'w-[90vw] mx-auto '} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Wrapper;
