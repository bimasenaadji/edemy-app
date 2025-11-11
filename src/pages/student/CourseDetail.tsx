import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Course } from "../../types";
import { fetchCourseById } from "../../services/course.service";
import { useAppContext } from "../../context/AppContext";
import star from "../../assets/star_dull_icon.svg";
import starBlank from "../../assets/star_dull_icon.svg";
import downArrowIcon from "../../assets/down_arrow_icon.svg";
import playIcon from "../../assets/play_icon.svg";
import humanizeDuration from "humanize-duration";
import clockIcon from "../../assets/time_left_clock_icon.svg";
import Footer from "../../components/student/Footer";
import Youtube from "react-youtube";
import Loading from "../../components/student/Loading";

const CourseDetail = () => {
  const { id } = useParams();
  const {
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useAppContext();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAlreadyEnrolled, _setIsAlreadyEnrolled] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<any>(null);
  console.log(playerData);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        if (id) {
          const courseData = await fetchCourseById(id);
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading || !course) {
    return <Loading />;
  }

  const handleToggleSection = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-10 relative items-start justify-between px-8 pt-10 text-left md:px-36 ">
        <div className="absolute top-0 left-0 w-full -z-1 h-[500px] bg-linear-to-b from-cyan-100/70"></div>
        {/* Left column */}
        <div className="max-w-xl z-10 text-heading">
          <h1 className="text-course-detail-small md:text-course-detail-large text-heading font-semibold">
            {course?.courseTitle}
          </h1>
          <p
            className="pt-4 text-sm md:text-base "
            dangerouslySetInnerHTML={{
              __html: String(course?.courseDescription),
            }}
          ></p>
          {/* Rating */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm ">
            <p>{calculateRating(course)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-3.5 h-3.5"
                  src={
                    i < Math.floor(calculateRating(course)) ? star : starBlank
                  }
                  alt=""
                  key={i}
                />
              ))}
            </div>
            <p className="text-surface">
              ({course.courseRatings.length}{" "}
              {course.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p className="text-desc">
              {course.enrolledStudents.length}{" "}
              {course.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p>
            Course by: <span className="text-surface">{course.educator}</span>
          </p>
          <div className="pt-8 ">
            <h2 className="text-xl "> Course Structure</h2>
            <div className="pt-5">
              {course.courseContent.map((chapter, index) => (
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
                              src={playIcon}
                              alt=""
                              className="w-4 h-4 mt-1"
                            />
                            <div className="flex items-center justify-between w-full text-heading text-xs md:text-default">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2">
                                {lecture.isPreviewFree && (
                                  <p
                                    onClick={() =>
                                      setPlayerData({
                                        videoId: lecture.lectureUrl
                                          .split("/")
                                          .pop(),
                                      })
                                    }
                                    className="text-surface cursor-pointer"
                                  >
                                    Preview
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
          </div>
          <div className="py-20 text-sm md:text-default">
            <h3 className="font-semibold text-xl text-heading">
              Course Description
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: String(course.courseDescription),
              }}
              className="text-default text-desc pt-3"
            ></p>
          </div>
        </div>
        {/* Right Column */}
        <div className="max-w-[424px] z-10 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] shadow-card">
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={course.courseThumbnail} alt="" />
          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img src={clockIcon} alt="" className="w-3.5" />
              <p className="text-danger">
                5 days <span className="font-medium">left at this price!</span>{" "}
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-heading text-2xl md:text-4xl font-semibold ">
                $
                {(
                  course.coursePrice -
                  (course.discount * course.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="text-desc line-through">$ {course.coursePrice}</p>
              <p className="text-desc">$ {course.discount}% off</p>
            </div>
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-desc">
              <div className="flex items-center gap-1">
                <img src={star} alt="" />
                <p>{calculateRating(course)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={clockIcon} alt="" className="w-3.5" />
                <p>{calculateCourseDuration(course)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={clockIcon} alt="" className="w-3.5" />
                <p>{calculateNoOfLectures(course)}</p>
              </div>
            </div>
            <button className="mt-4 md:mt-6 w-full py-3 rounded bg-surface text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="text-lg md:text-xl font-medium text-heading">
                What’s in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-desc">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
