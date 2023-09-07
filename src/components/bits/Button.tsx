import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => onClick?.()}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
