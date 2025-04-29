import Fannel from "./components/charts/Fannel";
import BarSimple from "./components/charts/BarSimple";
import BarMulti from "./components/charts/BarMulti";
import BarHorizon from "./components/charts/BarHorizon";
import AreaSmooth from "./components/charts/AreaSmooth";
import AreaStep from "./components/charts/AreaStep";
import styles from "./index.module.css";

export function Home() {
  return (
    <div className={`${styles.doc} flex flex-col justify-between`}>
      <div className={`${styles.header} text-white text-center`}>
        <div className={styles.content}>
          <p className={`${styles["head-title"]}`}>全国经济大数据</p>
          <p className={`${styles["head-subtext"]}`}>
            quan guo jing ji da shu ju
          </p>
        </div>
      </div>

      <div className="body text-white h-full flex justify-between">
        <div id="left" className="flex flex-col justify-between">
          <BarSimple />
          <BarMulti />
          <AreaSmooth />
        </div>
        <div id="right" className="flex flex-col justify-between">
          <Fannel />
          <BarHorizon />
          <AreaStep />
        </div>
      </div>

      <div className="footer min-h-24">footer</div>
    </div>
  );
}

export default Home;
