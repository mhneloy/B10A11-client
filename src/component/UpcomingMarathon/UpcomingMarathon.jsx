import { useQuery } from "@tanstack/react-query";
import UpMarathonCard from "../UpMarathonCard/UpMarathonCard";

const UpcomingMarathon = () => {
  const { data: marathons, isLoading } = useQuery({
    queryKey: ["marathons"],
    queryFn: async () => {
      const res = await fetch(`../upcommingMarathon.json`);
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

  return (
    <section className="py-10 px-4 lg:px-20 bg-gray-50">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-2">
          Upcoming Marathons
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          Explore exciting marathon events happening near you and be a part of
          the action!
        </p>
      </div>

      {/* Marathon Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons?.map((marathon, idx) => (
          <UpMarathonCard key={idx} marathon={marathon} />
        ))}
      </div>
    </section>
  );
};

export default UpcomingMarathon;
