import {MonoTypeOperatorFunction, Observable, of} from 'rxjs';
import {mergeMap, pairwise} from 'rxjs/operators';

/**
 * Emits the previous value when the current value passes a provided condition.
 */
export function before<T>(cond: (current: T, prev: T) => boolean): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            pairwise(),
            mergeMap(([prev, current]) => cond(current, prev) ? of(prev) : of<T>())
        );
    };
}
