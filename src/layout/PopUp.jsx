import { BiX } from "react-icons/bi";

const PopUp = ({ children, action }) => {
  return (
    <div className="absolute top-0 w-screen h-screen bg-zinc-300/70 z-50">
      <div className="absolute bg-white top-0 w-screen h-screen md:w-auto md:h-auto md:top-1/3 md:left-1/3">
        <div className="w-full flex justify-end">
          <BiX
            onClick={action}
            className="text-4xl hover:text-sky-600 hover:drop-shadow-lg cursor-pointer"
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
