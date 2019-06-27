import {Observable} from 'rxjs';
import {toArray} from 'rxjs/operators';

/**
 * Assumes that the observable is synchronise and returns all emitted values as an array.
 */
export function syncToArray<TType>($: Observable<TType>): TType[] {
    let value;
    $.pipe(toArray()).subscribe(val => value = val);
    return value;
}
