import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user_icon.svg";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const isCourseListPage: boolean = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useAppContext();

  return (
    <div
      className={`flex items-center justify-between px-4 py-4 sm:px-10 md:px-14 lg:px-36 border-b border-desc ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-desc">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |<Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            className="bg-surface px-5 py-2 rounded-full text-white cursor-pointer"
            onClick={() => openSignIn()}
          >
            Create Account
          </button>
        )}
      </div>

      {/* For Small Devices */}
      <div className="text-sm  sm:text-base md:hidden flex items-center gap-2 sm:gap-5 text-desc">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |<Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={userIcon} alt="User Icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
