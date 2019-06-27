import {Observable, OperatorFunction} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

/**
 * Emits the inner observable value with the outer observable value as a pair array.
 */
export function withSwitchMap<T, R>(inner: (T) => Observable<R>): OperatorFunction<T, [T, R]> {
    return (source: Observable<T>): Observable<[T, R]> => {
        return source.pipe(
            switchMap(a => inner(a).pipe(map(b => [a, b] as [T, R])))
        );
    }
}
