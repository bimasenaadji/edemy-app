import star from "../../assets/rating_star.svg";
import starBlank from "../../assets/star_dull_icon.svg";
import type { Course } from "../../types";
import { Link } from "react-router";
import { useAppContext } from "../../context/AppContext";

type CourseDetailProps = {
  course: Course;
};

const CourseCard: React.FC<CourseDetailProps> = ({ course }) => {
  const { calculateRating } = useAppContext();

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-input rounded-lg overflow-hidden pb-6"
    >
      <img className="w-full " src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="font-semibold text-base">{course.courseTitle}</h3>
        <p className="font-normal text-sm text-desc">{course.educator}</p>
        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                className="w-3.5 h-3.5"
                src={i < Math.floor(calculateRating(course)) ? star : starBlank}
                alt=""
                key={i}
              />
            ))}
          </div>
          <p className="text-desc">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          $
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
