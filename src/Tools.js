import { Link } from "react-router-dom";

function Tools() {
  return (
    <div>
      <div>
        <Link to={"/exchange-rate/"}>Exchange Rate</Link>
      </div>
    </div>
  );
}

export default Tools;
