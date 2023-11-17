import { useEffect, useState } from "preact/hooks";

export default function Counter({ endTime }: { endTime: number }) {
  const [timerId, setTimerId] = useState<number>();
  const calculateTimeLeft = () => {
    const currentTime = new Date().getTime();
    const difference = endTime - currentTime;
    if (difference < 0) {
      clearInterval(timerId);
      return {
        minutes: 0,
        seconds: 0,
      };
    }
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    setTimerId(timer);
    return () => clearInterval(timer);
  }, []);

  return (
    <div class="bg-white p-1 px-3 rounded flex items-center gap-1 absolute top-4 right-4">
      <div>
        <span class="text-xl text-primary">{timeLeft.minutes}</span>
        <span class="text-sm">min</span>
      </div>
      <div>
        <span class="text-xl text-primary">{timeLeft.seconds}</span>
        <span class="text-sm">sec</span>
      </div>
    </div>
  );
}
