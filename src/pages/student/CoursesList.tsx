import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router";
import type { Course } from "../../types";
import { fetchAllCourses } from "../../services/course.service";
import CourseCard from "./CourseCard";
import crossIcon from "../../assets/cross_icon.svg";
import Footer from "../../components/student/Footer";
import Loading from "../../components/student/Loading";

const CoursesList = () => {
  const { navigate } = useAppContext();
  const { input } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchAllCourses();
        setCourses(response);
        setFilteredCourses(response);
        setLoading(false);
      } catch (error) {
        throw new Error("Error fetching courses");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    let tempCourses = [...courses];

    if (input) {
      tempCourses = tempCourses.filter((course) =>
        course.courseTitle.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCourses(tempCourses);
    }

    setFilteredCourses(tempCourses);
  }, [courses, input]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative px-8 md:px-36 pt-20 text-left">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between w-full ">
          <div>
            <h1 className="text-4xl font-semibold text-heading ">
              Course List
            </h1>
            <p className="text-desc font-normal text-sm">
              {" "}
              <span
                onClick={() => navigate("/")}
                className="text-surface cursor-pointer"
              >
                Home
              </span>{" "}
              / Course List
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-desc">
            <p>{input}</p>
            <img
              onClick={() => navigate("/courses-list")}
              className="cursor-pointer"
              src={crossIcon}
              alt="Clear Search"
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
