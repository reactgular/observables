import {Observable, OperatorFunction} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

/**
 * Applies a mergeMap() to the outer observable, and maps the inner observable to an array that contains
 * the value of both the outer and inner observables as Observable<[outer, inner]>.
 */
export function withMergeMap<T, R>(inner: (x: T) => Observable<R>): OperatorFunction<T, [T, R]> {
    return (source: Observable<T>): Observable<[T, R]> => {
        return source.pipe(
            mergeMap(a => inner(a).pipe(map(b => [a, b] as [T, R])))
        );
    };
}
