import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {negate} from './negate';
import {disabledWhen} from './disabled-when';

/**
 * Enables emitting of values while the passed observable emits true.
 */
export function enabledWhen<T>(enabled: Observable<boolean>): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(disabledWhen(enabled.pipe(negate())));
}
