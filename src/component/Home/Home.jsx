import Banner from "../Banner/Banner";
import JoinOurCommunity from "../JoinOurCommunity/JoinOurCommunity";
import Marathons from "../Marathons/Marathons";
import Testimonials from "../Testimonial/Testimonials";
import UpcomingMarathon from "../UpcomingMarathon/UpcomingMarathon";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  AOS.init();
  return (
    <div>
      <Banner />
      <Marathons />
      <UpcomingMarathon />
      <div
        data-aos="fade-right"
        data-aos-offset="100"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-anchor-placement="top-center"
      >
        <JoinOurCommunity />
      </div>

      <div
        data-aos="fade-left"
        data-aos-offset="100"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-anchor-placement="top-center"
      >
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
