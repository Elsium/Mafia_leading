import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = ({ children, ...rest }: IProps) => {
    return (
        <button {...rest} className='flex justify-center items-center font-bold font-poppins xl:text-xl md:text-lg text-sm rounded-2xl xl:p-5 md:p-3 p-2 bg-blue-300 hover:bg-blue-500 active:bg-blue-300 transition-colors duration-300 disabled:bg-gray-300'>
            {children}
        </button>
    );
};

export default Button;