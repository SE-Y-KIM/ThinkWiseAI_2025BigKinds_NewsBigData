import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  disabled = false,
  required = false,
  className = '',
  size = 'medium',
  icon,
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClass = 'input-wrapper';
  const sizeClass = `input-wrapper--${size}`;
  const errorClass = error ? 'input-wrapper--error' : '';
  const disabledClass = disabled ? 'input-wrapper--disabled' : '';
  
  const wrapperClass = `${baseClass} ${sizeClass} ${errorClass} ${disabledClass} ${className}`.trim();

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      
      {error && <div className="input-error">{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

