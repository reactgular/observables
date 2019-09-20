import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Applies a given `project` function to the first value emitted by the source Observables, and emits the resulting value. Only the first
 * value is projected and subsequent values are emitted without projection.
 */
export function mapFirst<T, R>(project: (value: T) => R): OperatorFunction<T, T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return source.pipe(
            map((value, indx) => indx === 0 ? project(value) : value)
        );
    };
}
