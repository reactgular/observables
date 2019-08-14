import {Observable, OperatorFunction} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

export function distinctStringify<T>(): OperatorFunction<T, T> {
    return function (source: Observable<T>): Observable<T> {
        return source.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)));
    };
}
