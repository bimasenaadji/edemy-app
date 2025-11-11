import arrowIcon from "../../assets/arrow_icon.svg";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-5 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-sm md:text-base font-normal text-desc text-center">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam <br /> aliqua proident excepteur commodo do ea.
      </p>
      <div className="flex gap-4">
        <button className="px-10 py-3 rounded-md text-white bg-surface font-medium">
          Get started
        </button>
        <button className="flex items-center font-medium gap-2 text-cta">
          Learn more <img src={arrowIcon} />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
