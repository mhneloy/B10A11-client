import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const DetailsPage = () => {
  const { id } = useParams();

  const axiosInstance = useAxiosSecure();
  const {
    data: marathon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["marathon"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/details/${id}`);
      return res.data;
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
  const {
    _id,
    title,
    location,
    startRegistrationDate,
    endRegistrationDate,
    marathonStartDate,
    marathonImage,
    createdAt,
    description,
    creator,
    totalRegistationCount,
  } = marathon;

  const currentDate = new Date();

  const startDate = new Date(startRegistrationDate);
  const endDate = new Date(endRegistrationDate);

  const isRegistationOpen = currentDate >= startDate && currentDate <= endDate;

  // Get the time remaining until the marathon start date
  const timeRemaining = new Date(marathonStartDate) - currentDate;

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Marathon-GuidLine | Details</title>
      </Helmet>
      <div className="card bg-base-100 shadow-xl w-full border border-gray-200">
        {/* Image Section */}
        <figure className="relative">
          <img
            src={marathonImage}
            alt={title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </figure>

        {/* Card Body */}
        <div className="card-body">
          {/* Marathon Title */}
          <h2 className="card-title text-lg font-semibold text-gray-800">
            {title}
          </h2>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            {location}
          </div>

          {/* Countdown Timer */}
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700">
              Countdown to Marathon Start:
            </h3>
            <CountdownCircleTimer
              isPlaying
              duration={timeRemaining / 1000}
              colors={["#004777", "#F7B801", "#A30000"]}
              colorsTime={[10, 5, 0]}
              size={120}
              trailColor="#d3d3d3"
            >
              {({ remainingTime }) => {
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const days = Math.floor(remainingTime / (3600 * 24));
                return (
                  <div>
                    <div>{days} Days</div>
                    <div>{hours} Hours</div>
                    <div>{minutes} Minutes</div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>

          {/* Registration Dates */}
          <p className="text-sm text-gray-500 mt-2">
            Registration:{" "}
            <span className="font-medium text-gray-700">
              {startRegistrationDate} - {endRegistrationDate}
            </span>
          </p>
          {/* Registration Count */}
          <p className="text-sm text-gray-500 mt-2">
            Registration Count:{" "}
            <span className="font-medium text-gray-700">
              {totalRegistationCount}
            </span>
          </p>
          {/* Created At */}
          <p className="text-sm text-gray-500 mt-2">
            Created At:{" "}
            <span className="font-medium text-gray-700">{createdAt}</span>
          </p>
          {/* Description */}
          <p className="text-sm text-gray-500 mt-2">
            Description:{" "}
            <span className="font-medium text-gray-700">{description}</span>
          </p>
          {/* Creator Email */}
          <p className="text-sm text-gray-500 mt-2">
            Creator:{" "}
            <span className="font-medium text-gray-700">
              {creator ? `${creator}` : `undefined`}
            </span>
          </p>

          {/* Registration button */}
          <Link
            to={`/registrationform/${_id}`}
            className="btn btn-primary mt-4"
            disabled={!isRegistationOpen}
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
