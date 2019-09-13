import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

/**
 * Conditionally apply a throttle time operator.
 */
export function throttleTimeIf<T>(cond: boolean, duration: number): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return cond ? source.pipe(throttleTime(duration)) : source;
    };
}
