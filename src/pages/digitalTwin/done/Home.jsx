import Cardone from "./components/Cardone";
import Cardtwo from "./components/Cardtwo";
import BarList from "./components/charts/BarList";
import styles from "./index.module.css";

export function Home() {
  return (
    <div className={`${styles.doc} flex flex-col justify-between`}>
      <div className={`${styles.header} text-white text-center h-38`}>
        <div className={styles.content}>
          <p className={`${styles["head-title"]}`}>全国经济大数据</p>
          <p className={`${styles["head-subtext"]}`}>quan guo jing ji da shu ju</p>
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

      <div className="footer min-h-24">footer</div>
    </div>
  );
}

export default Home;
