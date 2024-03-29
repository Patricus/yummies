import burger from "../images/burger.jpg";
import salad from "../images/salad.jpg";
import "./Splash.css";

function SplashPage() {
  return (
    <div className="body">
      <h1>Welcome to Yummies</h1>
      <div className="picText">
        <img src={burger} alt="burger" />
        <p>
          Browse many restaurants that users have created, or login and create your own restaurant!
        </p>
      </div>
      <div className="picText">
        <p>
          Read reviews and ratings that users have posted on each restaurant. Log in and write your
          own review!
        </p>
        <img src={salad} alt="salad" />
      </div>
    </div>
  );
}

export default SplashPage;
