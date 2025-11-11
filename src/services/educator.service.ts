import type { DashboardData, EnrolledStudent } from "../types";
import { dummyDashboardData, dummyStudentEnrolled } from "../data/dummyData";

export const fetchDashboardData = async (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyDashboardData);
    }, 1000);
  });
};

export const fetchEnrolledStudents = async (): Promise<EnrolledStudent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyStudentEnrolled);
    }, 1000);
  });
};
