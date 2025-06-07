import { useState } from 'react';

export default function InputField({
  label,
  name,
  type = 'text',
  textarea = false,
  regex,
  required = false,
  placeholder,
  optional = false,
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function validate(val) {
    if (required && !val.trim()) {
      return 'Este campo é obrigatório.';
    }
    if (regex) {
      const pattern = new RegExp(regex);
      if (!pattern.test(val)) {
        return 'Formato inválido.';
      }
    }
    return '';
  }

  function handleChange(e) {
    const val = e.target.value;
    setValue(val);
    if (error) {
      const validationError = validate(val);
      setError(validationError);
    }
  }

  function handleBlur() {
    const validationError = validate(value);
    setError(validationError);
  }

  const commonProps = {
    id: name,
    name,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: placeholder || '',
    className: `mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
      error ? 'border-red-500' : 'border-gray-300'
    }`,
    required,
  };

  return (
    <div className={textarea ? 'md:col-span-2' : ''}>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}{' '}
        {required && <span className="text-red-500">*</span>}
        {!required && optional && (
          <span className="text-gray-400 ml-1 text-xs">(Opcional)</span>
        )}
      </label>

      {textarea ? (
        <textarea {...commonProps} rows={4}></textarea>
      ) : (
        <input type={type} {...commonProps} />
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
