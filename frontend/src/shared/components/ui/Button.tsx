import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  const base =
    'px-5 py-2.5 font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-teal-500';
  const variants = {
    primary:
      'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl',
    secondary:
      'bg-white text-teal-600 border border-teal-500 hover:bg-teal-50',
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;