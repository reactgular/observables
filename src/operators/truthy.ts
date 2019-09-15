import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Emits only truthy values. Identical to filter(Boolean) expect that the observable type is preserved.
 */
export function truthy<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        filter<T>(v => Boolean(v))
    );
}
