// Blueprint Educator
export interface Educator {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Blueprint Student
export interface Student {
  _id: string;
  name: string;
  imageUrl: string;
}

// Blueprint Testimonial
export interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  feedback: string;
}

// Blueprint data siswa terdaftar
export interface EnrolledStudent {
  student: Student;
  courseTitle: string;
  purchaseDate: string;
}

// Tipe data Lecture
export interface Lecture {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
}

// Tipe data Chapter
export interface Chapter {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
  collapsed?: boolean;
}

// Tipe data Rating
export interface Rating {
  userId: string;
  rating: number;
  _id: string;
}

// Tipe Data Course
export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: Chapter[];
  educator: string;
  enrolledStudents: string[];
  courseRatings: Rating[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseThumbnail: string;
}

// Blueprint satu 'enrolled student data'
export interface EnrolledStudentData {
  courseTitle: string;
  student: Student;
}

// Blueprint untuk seluruh data dashboardData
export interface DashboardData {
  totalEarnings: number;
  enrolledStudentsData: EnrolledStudentData[];
  totalCourses: number;
}
