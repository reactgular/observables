import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, filter, map, withLatestFrom} from 'rxjs/operators';

/**
 * Disables emitting of values while the passed observable emits true.
 */
export function disabledWhen<T>(disabled: Observable<boolean>): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            withLatestFrom(disabled.pipe(
                defaultIfEmpty(false),
                map(Boolean),
                distinctUntilChanged()
            )),
            filter(([value, disabled]) => !disabled),
            map(([value]) => value)
        );
    };
}

