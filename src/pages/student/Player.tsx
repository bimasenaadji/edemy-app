import { useEffect, useState } from "react";
import type { Course } from "../../types";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router";
import { fetchCourseById } from "../../services/course.service";
import Loading from "../../components/student/Loading";
import downArrowIcon from "../../assets/down_arrow_icon.svg";
import playIcon from "../../assets/play_icon.svg";
import completedIcon from "../../assets/blue_tick_icon.svg";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { courseId } = useParams();
  const [enrolledCourses, setEnrolledCourses] = useState<Course | null>(null);
  const { calculateChapterTime } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        if (courseId) {
          const response = await fetchCourseById(courseId);
          setEnrolledCourses(response);
          setLoading(false);
        }
      } catch (error) {
        throw Error("Failed to fetch enrolled courses");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [courseId]);

  const handleToggleSection = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-16 xl:px-36">
        {/* Left Column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {enrolledCourses &&
              enrolledCourses.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    onClick={() => handleToggleSection(index)}
                    className="flex items-center justify-between px-4 py-2 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={downArrowIcon}
                        alt=""
                        className={`transition-transform transform ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium text-sm md:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out
                            ${
                              activeIndex === index
                                ? "grid-rows-[1fr] opacity-100" // <-- Terbuka: tinggi 1fr
                                : "grid-rows-[0fr] opacity-0" // <-- Tertutup: tinggi 0fr
                            }
                          `}
                  >
                    <div className="overflow-hidden">
                      {" "}
                      <ul className="list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300 ">
                        {chapter.chapterContent.map((lecture, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 py-1"
                          >
                            <img
                              src={false ? completedIcon : playIcon}
                              alt=""
                              className="w-4 h-4 mt-1"
                            />
                            <div className="flex items-center justify-between w-full text-heading text-xs md:text-default">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2">
                                {lecture.lectureUrl && (
                                  <p
                                    onClick={() =>
                                      setPlayerData({
                                        ...lecture,
                                        chapter: index + 1,
                                        lecture: index + 1,
                                      })
                                    }
                                    className="text-surface cursor-pointer"
                                  >
                                    Watch
                                  </p>
                                )}
                                <p>
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] }
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this course : </h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="text-surface">
                  {false ? "Completed" : "Mark Completed"}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={enrolledCourses ? enrolledCourses.courseThumbnail : ""}
              alt=""
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
