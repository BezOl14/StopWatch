import './App.css';
import React, { useState, useEffect} from 'react';      //useMemo 
import { interval, Subject } from "rxjs";
import { takeUntil} from "rxjs/operators"              //map, buffer, debounceTime, filter

import DisplayComponent from './components/DisplayComponent';
import ButtonComponent from './components/ButtonComponent';


function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);
 
  // const click$ = useMemo(() => new Subject(), []);

  var Clicked = false;
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
  }

  const handleReset = () => {
    setTime(0);
    setWatchOn(false);
    setStatus(0);
  }
 const handleWait = () => {
   if(Clicked) {
    Clicked = false;
     setWatchOn(timeout);
      
     return;
   }
   Clicked = true;
   timeout = setTimeout(() => {
    Clicked = false;
   }, 300);
 }
    // const handleWait = click$.pipe(
    //   buffer(click$.pipe(debounceTime(300))),
    //   map((list) => list.length),
    //   filter((value) => value >= 2),
    // );
    
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
                resume={handleWait}
                status={status}
            />
          </div>
        </div>
  );
}

export default App;