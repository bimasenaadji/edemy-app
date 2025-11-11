import homeIcon from "../../assets/home_icon.svg";
import addIcon from "../../assets/add_icon.svg";
import myCourseIcon from "../../assets/my_course_icon.svg";
import personTickIcon from "../../assets/person_tick_icon.svg";
import { useAppContext } from "../../context/AppContext";
import { NavLink } from "react-router";

const Sidebar = () => {
  const { isEducator } = useAppContext();

  const menuItems: any[] = [
    {
      name: "Dashboard",
      path: "/educator",
      icon: homeIcon,
    },
    {
      name: "Add Course",
      path: "/educator/add-course",
      icon: addIcon,
    },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: myCourseIcon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: personTickIcon,
    },
  ];

  return (
    isEducator && (
      <div className="w-16 md:w-64 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center flex-col md:flex-row md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
                isActive
                  ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                  : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90"
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            <p className="md:block hidden text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
