import type { Testimonial } from "../types";
import { dummyTestimonial } from "../data/dummyData";

export const fetchAllTestimonials = async (): Promise<Testimonial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyTestimonial);
    }, 1000);
  });
};
