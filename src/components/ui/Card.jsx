import React from 'react';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={`
        bg-white 
        rounded-lg 
        shadow-md 
        border 
        border-gray-200 
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ children, className, ...props }) => {
    return (
        <div
            className={`
        p-4 
        border-b 
        border-gray-200 
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

const CardTitle = ({ children, className, ...props }) => {
    return (
        <h2
            className={`
        text-xl 
        font-semibold 
        text-gray-800 
        ${className}
      `}
            {...props}
        >
            {children}
        </h2>
    );
};

const CardContent = ({ children, className, ...props }) => {
    return (
        <div
            className={`
        p-4 
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardContent };
