import { useQuery } from "@tanstack/react-query";
import RunningMarathonCard from "../RunningMarathonCard/RunningMarathonCard";

const Marathons = () => {
  const {
    data: marathons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["marathon"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/allmarathons`);
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
    <section className="py-10 px-4 lg:px-20 bg-gray-50">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-2">
          Explore All Marathons
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Find the perfect marathon for you and join the running community
          today!
        </p>
      </div>

      {/* Marathon Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <RunningMarathonCard key={marathon._id} marathon={marathon} />
        ))}
      </div>
    </section>
  );
};

export default Marathons;
