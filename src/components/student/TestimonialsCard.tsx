import type { Testimonial } from "../../types";
import star from "../../assets/rating_star.svg";
import starBlank from "../../assets/star_dull_icon.svg";

type TestimonialProps = {
  testimonial: Testimonial;
};

const TestimonialsCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <div className="text-sm text-left border border-card-b pb-6 rounded-lg bg-white overflow-hidden">
      <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10 ">
        <img
          className="h-12 w-12 rounded-full"
          src={testimonial.image}
          alt=""
        />
        <div>
          <h1 className="text-base font-medium text-heading">
            {testimonial.name}
          </h1>
          <p className="text-gray-800/80">{testimonial.role}</p>
        </div>
      </div>
      <div className="p-5 pb-5">
        <div className="flex gap-0.5">
          {" "}
          {[...Array(5)].map((_, i) => (
            <img
              src={i < Math.floor(testimonial.rating) ? star : starBlank}
              key={i}
              className="w-3.5 h-3.5"
            />
          ))}
        </div>{" "}
        <p className="text-desc mt-5">{testimonial.feedback}</p>
      </div>

      <a href="#" className="text-surface underline px-5">
        Read More
      </a>
    </div>
  );
};

export default TestimonialsCard;
