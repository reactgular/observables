import {Observable, OperatorFunction} from 'rxjs';
import {endWith, map, pairwise} from 'rxjs/operators';

/**
 * Applies a given `project` function to the last value emitted by the source Observables, and emits the resulting value. Only the last
 * value is projected and previous values are emitted without projection. This operator uses [pairwise()](https://rxjs.dev/api/operators/pairwise)
 * internally and emits each value only when a next value is emitted or the source observable completes.
 */
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
