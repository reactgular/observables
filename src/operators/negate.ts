import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Maps truthy values to false, and falsy values to true. Performs a map(v => !v) internally.
 */
export function negate<T>(): OperatorFunction<T, boolean> {
    return (source: Observable<T>): Observable<boolean> => source.pipe(
        map(val => !val)
    );
}
