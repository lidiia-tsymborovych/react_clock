import React, { useEffect, useState } from 'react';

type ClockProps = { name: string };

export const Clock: React.FC<ClockProps> = ({ name }) => {
  const time = new Date().toUTCString().slice(-12, -4);

  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const newTime = new Date().toUTCString().slice(-12, -4);

      // eslint-disable-next-line no-console
      console.log(newTime);
      setCurrentTime(newTime);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="Clock">
      <strong className="Clock__name">{name}</strong> time is{' '}
      <span className="Clock__time">{currentTime}</span>
    </div>
  );
};
