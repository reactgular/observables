import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

/**
 * Emits all items emitted by the source Observable that are distinct by comparison using JSON.stringify() on each value.
 */
export function distinctStringify<T>(): MonoTypeOperatorFunction<T> {
    return function (source: Observable<T>): Observable<T> {
        return source.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));
    };
}
