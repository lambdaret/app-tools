import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <div>
        <Link to={"/exchange-rate/"}>Exchange Rate</Link>
      </div>
    </div>
  );
}

export default Main;
