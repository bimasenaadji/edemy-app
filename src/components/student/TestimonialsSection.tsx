import TestimonialsCard from "./TestimonialsCard";
import { fetchAllTestimonials } from "../../services/testimonial.service";
import { useState, useEffect } from "react";
import type { Testimonial } from "../../types";
import Loading from "./Loading";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("testimonials :", testimonials);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchAllTestimonials();
        setTestimonials(response);
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
    <div className="py-16 px-8 md:px-40 flex flex-col items-center">
      <h2 className="text-3xl font-medium text-heading">Testimonials</h2>
      <p className="text-sm md:text-base text-desc mt-3 text-center">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>
      <div className="grid grid-cols-3 gap-8 mt-14">
        {testimonials.slice(0, 3).map((testimonial) => (
          <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
