import { useSelector } from "react-redux";
import { getState } from "../ReduxTest2/stateSlice";

const MyDiv = ({ onChange }) => {
  const s2 = useSelector(getState("s2"));
  return (
    <div>
      <input value={s2} onChange={onChange} />
    </div>
  );
};

export default MyDiv;
