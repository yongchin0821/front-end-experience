import "./index.css";

export function Content() {
  return (
    <div className="doc">
      <div className="h-screen flex content text-white justify-around items-center">
        <div id="left">
          <p className="text-9xl">Greetings</p>
          <p className="text-5xl">Thank you for browsing yongchin's demo</p>
          {/* <p className="text-5xl">The quick brown fox...</p> */}
        </div>
        <div id="right">
        <p className="text-9xl">Greetings</p>

        </div>
      </div>
    </div>
  );
}

export default Content;
