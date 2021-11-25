import {useCallback, useRef} from 'react';
export function useDoubleClick(callback) {
    const timer = useRef(null);
    const handler = useCallback((event) => {
        if(!timer.current) {
            timer.current = setTimeout(() => {
                timer.current = null;
            }, 300);
        }
        else {
            clearTimeout(timer.current);
            timer.current = null;
            callback && callback(event);
        }
    }, [callback]);
    return handler;
}