import {Observable, OperatorFunction} from 'rxjs';
import {scan} from 'rxjs/operators';

/**
 * Emits an array that starts with the current value followed by previous values. Pass a count number to limit the
 * length of the array, otherwise the array will continue to grow in length until the observable completes.
 */
export function historyBuffer<T>(count?: number): OperatorFunction<T, T[]> {
    return (source: Observable<T>): Observable<T[]> => {
        return source.pipe(
            scan((acc, next) => {
                return count === undefined
                    ? [next, ...acc]
                    : [next, ...acc].slice(0, count);
            }, [])
        );
    };
}
