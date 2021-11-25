import './App.css';
import React, { useState, useEffect} from 'react';      
import { interval, Subject } from "rxjs";
import { takeUntil} from "rxjs/operators" 
            
import DisplayComponent from './components/DisplayComponent';
import ButtonComponent from './components/ButtonComponent';
import {useDoubleClick} from './hooks/UseDoubleClick';

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(10)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
          if (watchOn) {
            setTime(val => val + 1);
          }
        });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);


  const handleStart = () => {
    setWatchOn(prevState => !prevState);
    setStatus(1);
  }

  const handleStop = () => {
    if (time !== 0) {
      setWatchOn(false);
    }
    setStatus(2);
    setTime(0);

  }

  const handleReset = () => {
    setTime(0);
    setWatchOn(false);
    setStatus(0);
    handleStart();
  }

  const handleWait = useDoubleClick((event) => {
    setWatchOn(false);
    setStatus(0);
  });
    
  return (
    <div className="App">
          <div>
            <DisplayComponent
                time={time}
            />
            <ButtonComponent
                start={handleStart}
                stop={handleStop}
                reset={handleReset}
                wait={handleWait}
                status={status}
            />
          </div>
        </div>
  );
}

export default App;