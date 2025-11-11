import logo from "../../assets/logo.svg";
import facebookIcon from "../../assets/facebook_icon.svg";
import twitterIcon from "../../assets/twitter_icon.svg";
import instagramIcon from "../../assets/instagram_icon.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse md:flex-row items-center justify-between text-left w-full px-8 border-t ">
      <div className="flex items-center gap-4">
        <img src={logo} alt="" className="hidden md:block w-20" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © Edemy . All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4 ">
        <a href="#">
          <img src={facebookIcon} alt="" />
        </a>
        <a href="#">
          <img src={twitterIcon} alt="" />
        </a>
        <a href="#">
          <img src={instagramIcon} alt="" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
