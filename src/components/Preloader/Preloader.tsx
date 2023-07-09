import {useEffect, useState} from "react";
import s from "./Preloader.module.scss";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        return newProgress <= 100 ? newProgress : prevProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.preloader}>
      Loading... {progress}%
    </div>
  );
};