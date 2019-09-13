import {Observable} from 'rxjs';
import {toArray} from 'rxjs/operators';
import ArrayLikeMatchers = jasmine.ArrayLikeMatchers;

/**
 * Assumes that the observable is synchronise and returns all emitted values as an array.
 */
export function expect$<TType>($: Observable<TType>): ArrayLikeMatchers<TType> {
    let value;
    $.pipe(toArray()).subscribe(val => value = val);
    return expect<TType>(value);
}
