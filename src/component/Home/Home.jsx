import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>We are in home now</h2>
      <Link to="/signIn">sign In</Link>
    </div>
  );
};

export default Home;
