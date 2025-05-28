import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
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
    <div className=" relative rounded-md overflow-hidden group">
      {/* Image Section */}
      <figure className="relative">
        <img
          src={marathonImage}
          alt={title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </figure>

      {/* Card Body */}
      <div className="p-2 card-body absolute -bottom-1/2 left-0 w-full h-1/2 group-hover:bottom-0 group-hover:bg-gray-800 group-hover:bg-opacity-50 group-hover:transition-all text-gray-900">
        {/* Marathon Title */}
        <h2 className="card-title text-lg font-semibold text-white">{title}</h2>

        {/* Location */}
        <div className="flex items-center text-sm text-white">
          <FaMapMarkerAlt className="mr-2 text-primary" />
          {location}
        </div>

        {/* Registration Dates */}
        <p className="text-sm text-white mt-2">
          Registration:{" "}
          <span className="font-medium text-white">
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
