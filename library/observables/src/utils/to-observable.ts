import {isObservable, Observable, of} from 'rxjs';

/**
 * Converts the parameter to an observable, or returns the value if already an observable.
 */
export function toObservable<TType>(value: TType | Observable<TType>): Observable<TType> {
    return isObservable(value) ? value : of(value);
}
