import sketch from "../../assets/sktech.svg";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-10 md:pt-36 px-7 md-px-0 space-y-7 text-center bg-linear-to-b from-cyan-100/70 to-white">
      <h1 className="text-home-heading-small md:text-home-heading-large font-bold relative max-w-3xl mx-auto ">
        Empower your future with the courses designed to{" "}
        <span className="text-surface">fit your choice.</span>
        <img
          src={sketch}
          alt="Sketch"
          className="hidden md:block absolute -bottom-7 right-0 "
        />
      </h1>
      <p className="hidden md:block font-normal text-base text-desc max-w-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
