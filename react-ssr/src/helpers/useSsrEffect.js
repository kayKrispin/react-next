import { useEffect } from "react";
import { useSelector } from "react-redux";


function useSsrEffect(action, dependencies) {
  useEffect(action, dependencies);

  const shouldTrack = useSelector(state => state.films.shouldTrack);
  if (!shouldTrack) return;

  action();
}

export default useSsrEffect;
