import React from 'react';

function ButtonComponent({ start, stop, reset, wait, status }) {
  return (
      <div>
          {(status === 0) ?
                <button onClick={start}>Start</button> : ""                  
          }

          {(status === 1) ?
              <div>
                  <button onClick={stop}>Stop</button>
                   <button onClick={wait}>Wait</button>  
                  <button onClick={reset}>Reset</button>               
              </div> : ""
          }

          {(status === 2) ?
              <div>     
                  <button onClick={start}>Start</button>     
                                               
              </div> : ""
          }
          {(status === 3) ?
            <div>
                <button onClick={wait}>Wait</button> 
                <button onClick={start}>Start</button> 
            </div> : ""
          }
      </div>
  );
}

export default ButtonComponent;