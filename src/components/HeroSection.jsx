import {
  BiBriefcase,
  BiPaperPlane,
  BiUserPlus,
  BiNetworkChart,
} from "react-icons/bi";

const HeroSection = () => {
  return (
    <div className="h-48 container border-b-2 border-stone-100 px-2 py-4">
      <div className="text-l font-normal tracking-wide py-2 ">
        Hey, what do you feel like doing today?
      </div>
      <div className="h-30 grid grid-cols-4 gap-4 py-4 px-4">
        <div className="py-2 flex flex-col items-center shadow-lg hover:border-2 border-stone-100 hover:shadow-none">
          <BiPaperPlane className="text-4xl text-sky-500" />
          Post
        </div>
        <div className="py-2 flex flex-col items-center shadow-lg hover:border-2 border-stone-100 hover:shadow-none">
          <BiBriefcase className="text-4xl text-sky-500" />
          Jobs
        </div>
        <div className="py-2 flex flex-col items-center shadow-lg hover:border-2 border-stone-100 hover:shadow-none">
          <BiUserPlus className="text-4xl text-sky-500" />
          Networks
        </div>
        <div className="py-2 flex flex-col items-center shadow-lg hover:border-2 border-stone-100 hover:shadow-none">
          <BiNetworkChart className="text-4xl text-sky-500" />
          Party
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
