import React from 'react';

interface TextAreaProps {
  label: string;
  placeholder?: string;
  rows?: number;
  className?: string; // Optional custom styles for the textarea
  labelClassName?: string; // Optional custom styles for the label
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextAreaProps> = ({
  label,
  placeholder = 'Enter text...',
  rows = 6,
  disabled = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {label}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary "
        disabled={disabled}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default Textarea;
