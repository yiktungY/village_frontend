import { BiX } from "react-icons/bi";

const PopUp = ({ children, action }) => {
  return (
    <div className="absolute top-0 w-screen h-screen bg-zinc-300 z-50">
      <div className="absolute bg-white top-0 w-screen h-screen">
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
