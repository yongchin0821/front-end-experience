import SpotlightCard from "./components/SpotlightCard";
import Cardone from "./components/Cardone";
import Cardtwo from "./components/Cardtwo";
import BarList from "./components/charts/BarList";
import styles from "./index.module.css";

export function Home() {

  return (
    <div className={`${styles.doc} flex flex-col justify-between`}>
      <div className={`${styles.header} text-white text-center`}>
        <div id="content">
          <p className="text-9xl">Greetings</p>
        </div>
      </div>

      <div className="body text-white h-full flex justify-between">
        <div id="left" className="flex flex-col justify-between">
          <BarList />
          <Cardtwo />
        </div>
        <div id="right" className="flex flex-col justify-between">
          <Cardone />
          <Cardtwo />
        </div>
      </div>

      <div className="footer min-h-24">dsdsad</div>
    </div>
  );
}

export default Home;
