import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';

/**
 * A tracking object that describes the state of the observable and the emitted values.
 */
export interface TrackStatus<T> {
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
export function trackStatus<T, S>(start?: S): OperatorFunction<T, TrackStatus<T | S>> {
    const toStatus = (status: string, value: T | S) => ({status, value});
    return (source: Observable<T>): Observable<TrackStatus<T | S>> => source.pipe(
        map(value => toStatus('value', value)),
        startWith(toStatus('start', start)),
        catchError(err => of(toStatus('error', err)))
    );
}
