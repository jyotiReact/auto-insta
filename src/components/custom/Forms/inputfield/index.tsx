interface inputPropsTypes {
  placeholder: string;
  type: string;
  icon?: React.ReactNode;
  label: string;
}

const InputField: React.FC<inputPropsTypes> = ({
  icon,
  placeholder,
  type,
  label,
}) => {

  return (
    <div className="mb-5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
    </div>
  );
};

export default InputField;
