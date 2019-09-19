import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {historyBuffer} from './historyBuffer';

/**
 * Emits values that came before an error. You can specify how many values to emit upon an error, and the default is `1`.
 */
export function beforeError<T>(count: number = 1): OperatorFunction<T, T[]> {
    return (source: Observable<T>): Observable<T[]> => {
        const ERROR_TOKEN = Object.freeze({});
        return source.pipe(
            catchError(() => of(ERROR_TOKEN)),
            historyBuffer(count + 1),
            filter(items => items[0] === ERROR_TOKEN),
            map(items => items.slice(1) as T[])
        );
    };
}
