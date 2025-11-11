import type { Course, EnrolledStudent } from "../types";
import { dummyCourses, dummyStudentEnrolled } from "../data/dummyData";

export const fetchAllCourses = async (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyCourses);
    }, 1000);
  });
};

export const fetchCourseById = async (id: string): Promise<Course | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = dummyCourses.find((c) => c._id === id) || null;
      resolve(course);
    }, 1000);
  });
};

export const fetchAllEnrolledCourses = async (): Promise<EnrolledStudent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyStudentEnrolled);
    }, 1000);
  });
};
