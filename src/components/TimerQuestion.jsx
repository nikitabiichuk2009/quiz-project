import { useEffect, useState } from "react";

export default function Timer({ timeOut, onTimeout, mode }) {
  const [timeLeft, setTimeLeft] = useState(timeOut);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(() => {
      onTimeout();
    }, timeOut);

    return () => {
      clearTimeout(timer);
    };
  }, [timeOut, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={timeLeft} max={timeOut} className={mode} />;
}
