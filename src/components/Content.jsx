import "./index.css";

export function Content() {
  return (
    <div className="doc fixed ">
      <div className="h-screen flex content text-white justify-around items-center">
        <div id="left">
          <h1 className="text-6xl">Greetings</h1>
          <h1 scale={0.2} position={[-3.5, 1.5, 0]}>
            Travaler from beyond the universal
          </h1>
          <h1 scale={0.2} position={[-3.5, 1.0, 0]}>
            Thanks for enjoying yongchin's demo
          </h1>
          <p>The quick brown fox...</p>
        </div>
        <div id="right"></div>
      </div>
    </div>
  );
}

export default Content;
