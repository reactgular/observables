import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Emits only falsy values. Identical to filter(v => !v) expect that the observable type is preserved.
 */
export function falsy<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        filter<T>(v => !v)
    );
}
