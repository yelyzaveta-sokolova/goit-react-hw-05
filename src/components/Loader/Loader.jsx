import { ThreeCircles } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
    <ThreeCircles
      visible={true}
      height="75"
              width="75"
              radius={7}
      color="#00ffcc"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      </div>
  );
};

export default Loader;