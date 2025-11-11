import { Link } from "react-router";
import { useState, useEffect } from "react";
import type { Course } from "../../types";
import { fetchAllCourses } from "../../services/course.service";
import CourseCard from "./CourseCard";
import Loading from "../../components/student/Loading";

const CoursesSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("courses :", courses);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchAllCourses();
        console.log("Response :", response);
        setCourses(response);
      } catch (error) {
        throw Error("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-16 px-8  md:px-40 flex flex-col items-center">
      <h2 className="text-3xl font-medium text-heading ">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-desc mt-3 text-center">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>
      <div className="grid grid-cols-4 px-4 md:px-0 my-10 gap-4">
        {courses.slice(0, 4).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <Link
        className="text-desc border border-input px-10 py-3 rounded "
        to={"/courses-list"}
        onClick={() => scrollTo(0, 0)}
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
