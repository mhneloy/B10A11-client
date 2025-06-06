import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import JoinOurCommunity from "../JoinOurCommunity/JoinOurCommunity";
import Marathons from "../Marathons/Marathons";
import Testimonials from "../Testimonial/Testimonials";
import UpcomingMarathon from "../UpcomingMarathon/UpcomingMarathon";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Marathon-GuidLine | Home</title>
      </Helmet>
      <Banner />
      <Marathons />
      <UpcomingMarathon />
      <JoinOurCommunity />
      <Testimonials />
    </div>
  );
};

export default Home;
