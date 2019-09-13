import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Maps values to an inverted boolean.
 */
export function negate(): MonoTypeOperatorFunction<boolean> {
    return (source: Observable<any>): Observable<boolean> => source.pipe(map(val => !val));
}
