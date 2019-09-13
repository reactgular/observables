import {fromEvent, Observable} from 'rxjs';
import {map, mapTo, startWith} from 'rxjs/operators';
import {debounceTimeIf} from '../operators/debounce-time-if';

/**
 * Emits changes in the window size with optional debounce time.
 */
export function windowResize(debounce?: number): Observable<{ innerWidth: number, innerHeight: number }> {
    return fromEvent(window, 'resize').pipe(
        startWith({innerWidth: window.innerWidth, innerHeight: window.innerHeight}),
        debounceTimeIf(Boolean(debounce), debounce),
        mapTo(window),
        map(({innerWidth, innerHeight}) => ({innerWidth, innerHeight}))
    );
}
