import { useState, useEffect } from "react";

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

export const Button = ({ action, handleAction, disable }) => {
  return (
    <button
      type="submit"
      onClick={handleAction}
      disabled={!disable}
      className={`text-white focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 my-4  focus:outline-none  ${
        !disable ? "bg-neutral-300" : " bg-sky-700 hover:bg-sky-800 "
      }`}
    >
      {action}
    </button>
  );
};

export const Loader = () => {
  return (
    <div role="status" className="w-full flex justify-center">
      <svg
        aria-hidden="true"
        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const Alert = ({ title, message }) => {
  return (
    <div
      className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">{title}</span>
      <div>
        <span className="font-medium">Danger alert!</span> {message}
      </div>
    </div>
  );
};

export const Notification = ({ success, action, message }) => {
  const [show, setShow] = useState(success);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [success]);

  return (
    <>
      {show && (
        <div
          className="absolute top-4 right-6 flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 animate-fade duration-100 ease-out"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{action} Success!</span>
            {message}
          </div>
        </div>
      )}
    </>
  );
};
