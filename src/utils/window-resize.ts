import {fromEvent, Observable} from 'rxjs';
import {debounceTime, map, mapTo, startWith} from 'rxjs/operators';

/**
 * Emits changes in the window size with optional debounce time.
 */
export function windowResize(debounce?: number, wnd?: Window): Observable<{ innerWidth: number, innerHeight: number }> {
    const w = wnd || window;
    let resize$ = fromEvent(w, 'resize').pipe(
        mapTo(w),
        map(({innerWidth, innerHeight}) => ({innerWidth, innerHeight}))
    );
    if (debounce) {
        resize$ = resize$.pipe(debounceTime(debounce));
    }
    return resize$.pipe(
        startWith({innerWidth: w.innerWidth, innerHeight: w.innerHeight})
    );
}
