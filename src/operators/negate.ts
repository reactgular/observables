import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Maps values to an inverted boolean.
 */
export function negate<T>(): OperatorFunction<T, boolean> {
    return (source: Observable<T>): Observable<boolean> => source.pipe(
        map(val => !val)
    );
}
