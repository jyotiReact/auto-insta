import React from 'react';

interface FileInputProps {
  label: string;
  className?: string; // Optional custom styles for the input
  labelClassName?: string; // Optional custom styles for the label
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  className = '',
  labelClassName = '',
  disabled = false,
  onChange,
}) => {
  return (
    <div>
      <label className={`mb-3 block text-black dark:text-white ${labelClassName}`}>
        {label}
      </label>
      <input
        type="file"
        className={`w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary ${className}`}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
