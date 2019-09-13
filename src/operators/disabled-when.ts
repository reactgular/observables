import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {defaultIfEmpty, distinctUntilChanged, filter, map, withLatestFrom} from 'rxjs/operators';

/**
 * Disables emitting of values while the passed observable emits true.
 */
export function disabledWhen<T>(disabled$: Observable<boolean>): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            withLatestFrom(disabled$.pipe(
                defaultIfEmpty<boolean>(false),
                map(v => Boolean(v)),
                distinctUntilChanged()
            )),
            filter(([, disabled]) => !disabled),
            map(([value]) => value)
        );
    };
}

