import { useEffect, useState } from "react";
import type { Course } from "../../types";
import { useAppContext } from "../../context/AppContext";
import { fetchAllCourses } from "../../services/course.service";
import Loading from "../../components/student/Loading";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const { calculateCourseDuration } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { navigate } = useAppContext();
  const [progressArray, _setProgressArray] = useState<any[]>([
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 1,
      totalLectures: 5,
    },
    {
      lectureCompleted: 3,
      totalLectures: 6,
    },
    {
      lectureCompleted: 4,
      totalLectures: 4,
    },
    {
      lectureCompleted: 0,
      totalLectures: 3,
    },
    {
      lectureCompleted: 5,
      totalLectures: 7,
    },
    {
      lectureCompleted: 6,
      totalLectures: 8,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchAllCourses();
        setEnrolledCourses(response);
        setLoading(false);
      } catch (error) {
        throw new Error("Course cannot finded");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [enrolledCourses]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="px-8 pt-10 md:px-36">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="table-fixed md:table-auto w-full overflow-hidden border mt-10">
          <thead className="text-sm  text-left max-sm:hidden text-gray-900 border border-b border-gray-500/20">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index}>
                <td className="md:px-4 pl-2 md:pl-4 py-2 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted /
                              progressArray[index].totalLectures) *
                            100
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-2 max-sm:hidden">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted} /
                      ${progressArray[index].totalLectures}`}{" "}
                  <span>Lectures</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    onClick={() => navigate(`/player/${course._id}`)}
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-surface max-sm:text-xs text-white text-sm"
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalLectures ===
                      1
                      ? "Completed"
                      : "In Progress"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
