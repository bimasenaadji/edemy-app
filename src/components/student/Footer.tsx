import logo from "../../assets/logo_dark.svg";

const Footer = () => {
  return (
    <footer className="bg-footer w-full text-left mt-10 md:px-36">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-footer-text">
        <div>
          <img src={logo} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-footer-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-footer-text md:space-y-2">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full ">
          <h2 className="font-semibold text-white mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-footer-text ">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-input bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded text-sm p-3"
            />
            <button className="bg-surface w-24 h-9 text-white rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-footer-text">
        Copyright 2024 © Edemy. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
