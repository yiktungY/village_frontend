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
    <div className="h-20">
      <div className="relative my-2">
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
      {error.error && (
        <div className="text-red-500 text-xs">{error.errorMessage}</div>
      )}
    </div>
  );
};

export const SearchInput = ({
  label,
  icon,
  type,
  id,
  value,
  handleOnChange,
}) => {
  return (
    <div className="h-20">
      <div className="relative my-2">
        <div className="flex absolute text-gray-500 inset-y-0 right-4 text-2xl items-center pl-3 pointer-events-auto">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          className={
            "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900  border-gray-300 focus:border-sky-600 bg-transparent rounded-lg border appearance-none  focus:outline-none focus:ring-0  peer"
          }
          placeholder=" "
          onChange={handleOnChange}
        />
        <label
          htmlFor={id}
          className="absolute text-sm duration-300 transform text-gray-500 peer-focus:text-sky-600 -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export const Button = ({ action, handleSignUp, disable }) => {
  return (
    <button
      type="submit"
      onClick={handleSignUp}
      disabled={!disable}
      className={`text-white focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 my-4  focus:outline-none  ${
        !disable ? "bg-neutral-300" : " bg-sky-700 hover:bg-sky-800 "
      }`}
    >
      {action}
    </button>
  );
};
