import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Emits only truthy values. This operator is an alias for filter(v => Boolean(v)), but most people write
 * filter(Boolean) because it's shorter. The problem with using filter(Boolean) is that the observable
 * type is changed to Boolean. So using truthy() is a shorter alias for the longer form that persists the
 * generic type.
 */
export function truthy<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        filter<T>(v => Boolean(v))
    );
}
