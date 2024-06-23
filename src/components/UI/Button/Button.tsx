import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = ({ children, ...rest }: IProps) => {
    return (
        <button {...rest} className='flex justify-center items-center font-bold font-poppins text-xl rounded-2xl p-5 bg-blue-300 hover:bg-blue-500 transition-colors duration-300 disabled:bg-gray-300'>
            {children}
        </button>
    );
};

export default Button;