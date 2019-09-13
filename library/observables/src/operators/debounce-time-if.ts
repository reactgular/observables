import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

/**
 * Conditionally apply a debounce time operator.
 */
export function debounceTimeIf<T>(cond: boolean, duration: number): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return cond ? source.pipe(debounceTime(duration)) : source;
    };
}
