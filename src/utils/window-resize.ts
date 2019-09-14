import {fromEvent, Observable} from 'rxjs';
import {map, mapTo, startWith} from 'rxjs/operators';
import {debounceTimeIf} from '../operators/debounce-time-if';

/**
 * Emits changes in the window size with optional debounce time.
 */
export function windowResize(debounce?: number, wnd?: Window): Observable<{ innerWidth: number, innerHeight: number }> {
    const w = wnd || window;
    return fromEvent(w, 'resize').pipe(
        startWith({innerWidth: w.innerWidth, innerHeight: w.innerHeight}),
        debounceTimeIf(Boolean(debounce), debounce),
        mapTo(w),
        map(({innerWidth, innerHeight}) => ({innerWidth, innerHeight}))
    );
}
