import React from 'react';

const Button = ({
                    className,
                    variant = 'default',
                    size = 'default',
                    children,
                    ...props
                }) => {
    const variantStyles = {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    };

    const sizeStyles = {
        default: 'px-4 py-2 text-base',
        sm: 'px-2 py-1 text-sm',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`
        rounded-md 
        transition-colors 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-300
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export { Button };
