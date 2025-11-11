import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import profileImg from "../../assets/profile_img.png";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <img src={logo} alt="" className="w-28 lg:w-32" />
      </Link>

      <div className="flex items-center gap-5 text-gray-500">
        <p>Hi! {user ? user.fullName : "Developers"}</p>
        {user ? (
          <UserButton />
        ) : (
          <img src={profileImg} alt="Profile" className="w-8" />
        )}
      </div>
    </div>
  );
};
export default Navbar;
