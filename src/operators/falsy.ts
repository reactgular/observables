import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Emits only falsy values. Performs a filter(v => !v) operator internally.
 */
export function falsy<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        filter<T>(v => !v)
    );
}
