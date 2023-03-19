import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <Link to={"/exchange-rate/"}>Exchange Rate</Link>
      <Link to={"/redux-test/"}>Redux Test</Link>
      <Link to={"/redux-test2/"}>Redux Test2</Link>
    </div>
  );
}

export default Main;
