import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {negate} from './negate';
import {disabledWhen} from './disabled-when';

/**
 * Enables emitting of values while the passed observable emits true.
 */
export function enabledWhen<TType>(enabled: Observable<boolean>): MonoTypeOperatorFunction<TType> {
    return (source: Observable<TType>): Observable<TType> => source.pipe(disabledWhen(enabled.pipe(negate())));
}
