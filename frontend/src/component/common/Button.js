import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props 
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
    };

    const variants = {
        primary: {
            backgroundColor: '#3498db',
            color: '#ffffff',
            border: '2px solid #3498db',
            ':hover': {
                backgroundColor: '#2980b9',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
        },
        secondary: {
            backgroundColor: 'transparent',
            color: '#3498db',
            border: '2px solid #3498db',
            ':hover': {
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
        },
        danger: {
            backgroundColor: '#e74c3c',
            color: '#ffffff',
            border: '2px solid #e74c3c',
            ':hover': {
                backgroundColor: '#c0392b',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
        },
    };

    const sizes = {
        small: {
            padding: '8px 16px',
            fontSize: '14px',
        },
        medium: {
            padding: '10px 20px',
            fontSize: '16px',
        },
        large: {
            padding: '12px 24px',
            fontSize: '18px',
        },
    };

    const buttonStyle = {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
    };

    return (
        <button
            type={type}
            style={buttonStyle}
            onClick={onClick}
            disabled={disabled}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 