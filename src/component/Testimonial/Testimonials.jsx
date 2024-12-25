import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
  const {
    data: reviews,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(`../testimonial.json`);
      return res.json();
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 lg:px-20 bg-white">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-2">
          What Our Users Say
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Hear from participants and organizers who love our platform.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews?.map((review, index) => (
          <div
            key={index}
            className="p-6 bg-base-100 shadow-xl border border-gray-200 rounded-lg text-center"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {review.name}
            </h2>
            <p className="text-sm text-gray-500 italic">{review.role}</p>
            <p className="text-gray-600 mt-4">{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
