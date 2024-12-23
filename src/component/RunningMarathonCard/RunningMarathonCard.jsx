import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const RunningMarathonCard = ({ marathon }) => {
  const {
    _id,
    title,
    location,
    startRegistrationDate,
    endRegistrationDate,
    marathonImage,
  } = marathon;

  return (
    <div className="card bg-base-100 shadow-xl w-full border border-gray-200">
      {/* Image Section */}
      <figure className="relative">
        <img
          src={marathonImage}
          alt={title}
          className="w-full h-48 object-cover"
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

        {/* Action Button */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/details/${_id}`} className="btn btn-primary w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RunningMarathonCard;
RunningMarathonCard.propTypes = {
  marathon: PropTypes.object,
};
