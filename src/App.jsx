import SignMessage from "./SignMessage";
import VerifyMessage from "./VerifyMessage";

// css
import "./index.css";

export default function App() {
  return (
    <div className="all">
      <div className="app">
        <div className="">
          <SignMessage />
        </div>
        <div className="">
          <VerifyMessage />
        </div>
      </div>
    </div>
  );
}
