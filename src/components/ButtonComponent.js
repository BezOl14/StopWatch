import React from 'react';

function ButtonComponent({ start, stop, reset, wait, status }) {
  return (
      <div>
          {(status === 0) ?
            <div>
                <button onClick={start}>Start</button>
               
            </div> : ""                
          }

          {(status === 1) ?
              <div>
                  <button onClick={stop}>Stop</button>
                  <button onClick={reset}>Reset</button>                
              </div> : ""
          }

          {(status === 2) ?
              <div>         
                  <button onClick={reset}>Reset</button>
                  <button onClick={wait}>Wait</button>                    
              </div> : ""
          }
      </div>
  );
}

export default ButtonComponent;