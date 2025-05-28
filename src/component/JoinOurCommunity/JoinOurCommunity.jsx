import { FaRunning, FaUsers, FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";

const JoinOurCommunity = () => {
  const benefits = [
    {
      icon: <FaRunning className="text-primary text-4xl" />,
      title: "Connect with Runners",
      description:
        "Join a thriving community of marathon enthusiasts and share your running experiences.",
    },
    {
      icon: <FaUsers className="text-primary text-4xl" />,
      title: "Expand Your Network",
      description:
        "Meet like-minded individuals who share your passion for fitness and marathons.",
    },
    {
      icon: <FaHandshake className="text-primary text-4xl" />,
      title: "Exclusive Perks",
      description:
        "Gain access to special marathon events, training sessions, and exclusive discounts.",
    },
  ];

  return (
    <section className="py-10 px-4 lg:px-20 bg-primary text-white">
      {/* Title Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold mb-2">
          Join Our Community
        </h1>
        <p className="text-sm lg:text-base">
          Be part of a growing network of runners and enthusiasts.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-6 bg-white text-gray-800 rounded-lg shadow-xl text-center"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h2 className="text-xl font-semibold">{benefit.title}</h2>
            <p className="mt-2 text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to={"/marathons"}
          className="btn btn-outline border-[#264653] text-black  hover:text-white hover:bg-[#264653] transition-all duration-300"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
};

export default JoinOurCommunity;
