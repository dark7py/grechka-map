import {useEffect, useState} from "react";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        return newProgress <= 100 ? newProgress : prevProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Разместите код для отображения прогресса загрузки */}
      Loading... {progress}%
    </div>
  );
};