import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import type { Chapter, Course } from "../types";
import humanizeDuration from "humanize-duration";

interface AppContextType {
  navigate: NavigateFunction;
  calculateRating: (course: Course) => number;
  isEducator: boolean;
  setIsEducator: React.Dispatch<React.SetStateAction<boolean>>;
  calculateCourseDuration: (course: Course) => string;
  calculateChapterTime: (chapter: Chapter) => string;
  calculateNoOfLectures: (course: Course) => number;
}

const AppContext = createContext<AppContextType | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isEducator, setIsEducator] = useState<boolean>(true);
  const navigate = useNavigate();

  const calculateRating = (course: Course): number => {
    if (course.courseRatings.length === 0) return 0;

    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });

    return totalRating / course.courseRatings.length;
  };

  // Function to calculate total duration of a chapter
  const calculateChapterTime = (chapter: Chapter): string => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate total duration of a course
  const calculateCourseDuration = (course: Course): string => {
    let time = 0;

    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate total number of lectures in a chapter
  const calculateNoOfLectures = (course: Course): number => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  const value = {
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateCourseDuration,
    calculateChapterTime,
    calculateNoOfLectures,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("useAppContext must be used inside an AppProvider");
  }
  return context;
};
