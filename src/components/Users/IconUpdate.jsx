import { Button } from "../Elements";

const IconUpdate = ({ icon, username, action }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <img
        className="p-1 w-40 h-40 rounded-full ring-2 ring-gray-300 animate-pulse"
        src={icon}
        alt={`${username} icon`}
      />
      <Button action="Update Icon" handleAction={action} disable={true} />
    </div>
  );
};

export default IconUpdate;
