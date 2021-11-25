import './App.css';
import React, { useState, useEffect} from 'react';      
import { interval, Subject } from "rxjs";
import { takeUntil} from "rxjs/operators"             

import DisplayComponent from './components/DisplayComponent';
import ButtonComponent from './components/ButtonComponent';


function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);
 
  var _Clicked = false;
  var timeout;

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

  ///
  const handleWait = () => {

    if(_Clicked) {
     _Clicked = false;
      setWatchOn(timeout);
     }
     _Clicked = true;
     timeout = setTimeout(() => {
      _Clicked = false;
      setWatchOn(false);
      setStatus(0);
     }, 300);
   
  }
    
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