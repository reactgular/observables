import {Observable, OperatorFunction} from 'rxjs';
import {endWith, map, pairwise} from 'rxjs/operators';

export function mapLast<T, R>(project: (value: T) => R): OperatorFunction<T, T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        const LAST_TOKEN = Object.freeze({});
        return source.pipe(
            endWith<T | {}, {}>(LAST_TOKEN),
            pairwise(),
            map(([prev, next]) => {
                return next === LAST_TOKEN
                    ? project(prev as T)
                    : prev as T;
            })
        );
    };
}
