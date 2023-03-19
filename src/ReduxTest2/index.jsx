import { useSelector, useDispatch } from "react-redux";
import { setState, getState } from "../ReduxTest2/stateSlice";
import MyDiv from "./MyDiv";
const ReduxTest2 = () => {
  const s1 = useSelector(getState("s1"));

  const dispatch = useDispatch();

  return (
    <div>
      <h1>ReduxTest2</h1>
      <input
        id="s1"
        value={s1}
        onChange={(e) =>
          dispatch(setState({ type: "s1", value: e.target.value }))
        }
      />
      <div>
        <MyDiv
          // value={s2}
          onChange={(e) =>
            dispatch(setState({ type: "s2", value: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default ReduxTest2;
