import {Observable, OperatorFunction} from 'rxjs';
import {scan} from 'rxjs/operators';

/**
 * Increments a counter for each emitted value.
 */
export function counter<T>(): OperatorFunction<T, [number, T]> {
    return (source: Observable<T>): Observable<[number, T]> => source.pipe(
        scan((acc, next) => [acc[0] + 1, next], [0, undefined])
    );
}
