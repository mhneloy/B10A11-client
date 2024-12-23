import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const DetailsPage = () => {
  const marathon = useLoaderData();
  const {
    _id,
    title,
    location,
    startRegistrationDate,
    endRegistrationDate,
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

  return (
    <div className="container mx-auto">
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

          {/* Registration Dates */}
          <p className="text-sm text-gray-500 mt-2">
            Registration:{" "}
            <span className="font-medium text-gray-700">
              {startRegistrationDate} - {endRegistrationDate}
            </span>
          </p>
          {/* Registation Count */}
          <p className="text-sm text-gray-500 mt-2">
            Registation Count:{" "}
            <span className="font-medium text-gray-700">
              {totalRegistationCount}
            </span>
          </p>
          {/* created At */}
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
              {creator ? `${creator}` : `undefine`}
            </span>
          </p>

          {/* registation button */}

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
