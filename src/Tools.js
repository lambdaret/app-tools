import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TITLE, setState as setTitle } from "./TopMenu/stateSlice";

function Tools() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle({ type: TITLE, value: "Tools" }));
  }, [dispatch]);

  return (
    <div>
      <div>
        <Link to={"/exchange-rate/"}>Exchange Rate</Link>
      </div>
    </div>
  );
}

export default Tools;
