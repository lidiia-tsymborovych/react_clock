import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');
  const prevClockName = useRef(clockName);

  const onRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setHasClock(false);
  };

  const onLeftClick = () => {
    setHasClock(true);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', onRightClick);
    document.addEventListener('click', onLeftClick);

    return () => {
      document.removeEventListener('contextmenu', onRightClick);
      document.removeEventListener('click', onLeftClick);
    };
  }, []);

  useEffect(() => {
    if (!hasClock) {
      return;
    }

    const timerId = window.setInterval(() => {
      setClockName(() => getRandomName());
    }, 3300);

    return () => clearInterval(timerId);
  }, [hasClock]);

  useEffect(() => {
    if (prevClockName.current === clockName) {
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(`Renamed from ${prevClockName.current} to ${clockName}`);
    prevClockName.current = clockName;
  }, [clockName]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && <Clock name={clockName} />}
    </div>
  );
};
