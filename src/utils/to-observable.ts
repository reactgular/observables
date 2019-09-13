import {isObservable, Observable, of} from 'rxjs';

/**
 * Converts the parameter to an observable, or returns the value if already an observable.
 */
export function toObservable<T>(value: T | Observable<T>): Observable<T> {
    return isObservable(value) ? value : of(value);
}
