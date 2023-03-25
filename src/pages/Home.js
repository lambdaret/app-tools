import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MENU_NM, setStateTopBar } from "components/TopBar/topBarSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStateTopBar(MENU_NM, "Home"));
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
