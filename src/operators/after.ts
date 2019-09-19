import {MonoTypeOperatorFunction, Observable, of} from 'rxjs';
import {mergeMap, pairwise} from 'rxjs/operators';

/**
 * Emits the value that came after the value that passed the provided condition.
 */
export function after<T>(cond: (current: T, next: T) => boolean): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            pairwise(),
            mergeMap(([current, next]) => cond(current, next) ? of(next) : of<T>())
        );
    };
}
