import {combineLatest, Observable, of} from 'rxjs';
import {skip, startWith} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function combineEarliest<O1, S>(sources: [Observable<O1>], substitute?: S): Observable<[O1]>;
export function combineEarliest<O1, O2, S>(sources: [Observable<O1>, Observable<O2>], substitute?: S): Observable<[O1, O2]>;
export function combineEarliest<O1, O2, O3, S>(sources: [Observable<O1>, Observable<O2>, Observable<O3>], substitute?: S): Observable<[O1, O2, O3]>;
export function combineEarliest<O1, O2, O3, O4, S>(sources: [Observable<O1>, Observable<O2>, Observable<O3>, Observable<O4>], substitute?: S): Observable<[O1, O2, O3, O4]>;
export function combineEarliest<O1, O2, O3, O4, O5, S>(sources: [Observable<O1>, Observable<O2>, Observable<O3>, Observable<O4>, Observable<O5>], substitute?: S): Observable<[O1, O2, O3, O4, O5]>;
export function combineEarliest<O1, O2, O3, O4, O5, O6, S>(sources: [Observable<O1>, Observable<O2>, Observable<O3>, Observable<O4>, Observable<O5>, Observable<O6>], substitute?: S): Observable<[O1, O2, O3, O4, O5, O6]>;
export function combineEarliest<O, S>(sources: O[]): Observable<O[]>;
/* tslint:enable:max-line-length */

/**
 * Unlike combineLatest() which does not emit a value until all observables emits at least one value.
 * The combineEarliest() emits immediately upon the first observable that emits a value substituting
 * a value (defaults to undefined) for any awaiting values from the other observables.
 */
export function combineEarliest<O, S, R>(observables: Observable<O>[], substitute?: S): Observable<R> {
    if (observables.length === 0) {
        return of([] as any);
    }
    const starts = observables.map(o => o.pipe(startWith<O, S | O>(substitute)));
    const combined = combineLatest<Observable<O>[], R>(starts);
    return combined.pipe(skip(1));
}
