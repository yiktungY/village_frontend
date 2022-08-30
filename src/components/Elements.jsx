export const Input = ({
  type,
  id,
  label,
  icon,
  value,
  error,
  handleOnChange,
  handleOnBlur,
}) => {
  return (
    <>
      <div className="relative my-4">
        <div
          className={`flex absolute inset-y-0 right-4 text-2xl items-center pl-3 pointer-events-auto ${
            error.error ? "text-red-500" : "text-gray-500"
          }`}
        >
          {icon}
        </div>
        <input
          type={type}
          id={id}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none  focus:outline-none focus:ring-0  peer ${
            error.error
              ? "border-red-600"
              : "border-gray-300 focus:border-sky-600"
          }`}
          placeholder=" "
          value={value}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />

        <label
          htmlFor={id}
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
            error.error
              ? "text-red-500"
              : "text-gray-500 peer-focus:text-sky-600 "
          }`}
        >
          {label}
        </label>
      </div>
      {error.error && <div className="text-red-500">{error.errorMessage}</div>}
    </>
  );
};

export const Button = ({ action }) => {
  return (
    <button
      type="button"
      className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
    >
      {action}
    </button>
  );
};
