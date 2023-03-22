import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MENU_NM, setState as setMenuState } from "./TopMenu/stateSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuState({ type: MENU_NM, value: "Home" }));
  }, [dispatch]);

  return (
    <div>
      <div>
        <Link to={"/exchange-rate/"}>Exchange Rate</Link>
      </div>
    </div>
  );
}

export default Home;
