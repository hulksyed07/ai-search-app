import React from 'react';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={`
        w-full 
        px-3 
        py-2 
        border 
        rounded-md 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        ${className}
      `}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export { Input };