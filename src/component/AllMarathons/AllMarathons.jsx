import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RunningMarathonCard from "../RunningMarathonCard/RunningMarathonCard";

const AllMarathons = () => {
  const [sortOrder, setSortOrder] = useState("desc");

  const {
    data: marathons,
    isPending,
    error,
  } = useQuery({
    queryKey: ["marathons", sortOrder],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/allmarathons/marathons?sortOrder=${sortOrder}`
      );
      return res.json();
    },
  });

  if (isPending) {
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

      {/* Sorting Options */}
      <div className="text-center mb-6">
        <label className="mr-2 text-gray-600">Sort by:</label>
        <select
          className="select select-bordered w-40"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Marathon Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon, idx) => (
          <RunningMarathonCard key={idx} marathon={marathon} />
        ))}
      </div>
    </section>
  );
};

export default AllMarathons;
