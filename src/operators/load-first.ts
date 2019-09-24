import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, defaultIfEmpty, map, startWith, take} from 'rxjs/operators';

/**
 * A tracking object that describes the state of the observable and the emitted values.
 */
export interface LoadFirst<T> {
    /**
     * Holds either "start", "value" or "error"
     */
    status: string;
    /**
     * For "start" the initial value.
     * For "value" the outer observable value.
     * For "error" the error value.
     */
    value: T | undefined;
}

/**
 * Emits an Object with the properties status and value.
 * The status property will contain either "start", "value" or "error".
 */
export function loadFirst<T, S, E>(start?: S, empty?: E): OperatorFunction<T, LoadFirst<T | S | E>> {
    const toStatus = (status: string, value: T | S | E) => ({status, value});
    return (source: Observable<T>): Observable<LoadFirst<T | S | E>> => source.pipe(
        take(1),
        map(value => toStatus('value', value)),
        defaultIfEmpty(toStatus('error', empty)),
        startWith(toStatus('start', start)),
        catchError(err => of(toStatus('error', err)))
    );
}
