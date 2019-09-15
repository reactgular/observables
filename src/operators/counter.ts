import {Observable, OperatorFunction} from 'rxjs';
import {scan} from 'rxjs/operators';

export function counter<T>(): OperatorFunction<T, [number, T]> {
    return (source: Observable<T>): Observable<[number, T]> => source.pipe(
        scan((acc, next) => [acc[0] + 1, next], [0, undefined])
    );
}
