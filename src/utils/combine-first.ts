import {combineLatest, Observable, of} from 'rxjs';
import {first} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function combineFirst<O1>(sources: [Observable<O1>]): Observable<[O1]>;
export function combineFirst<O1, O2>(sources: [Observable<O1>, Observable<O2>]): Observable<[O1, O2]>;
export function combineFirst<O1, O2, O3>(sources: [Observable<O1>, Observable<O2>, Observable<O3>]): Observable<[O1, O2, O3]>;
export function combineFirst<O1, O2, O3, O4>(sources: [Observable<O1>, Observable<O2>, Observable<O3>, Observable<O4>]): Observable<[O1, O2, O3, O4]>;
export function combineFirst<O1, O2, O3, O4, O5>(sources: [Observable<O1>, Observable<O2>, Observable<O3>, Observable<O4>, Observable<O5>]): Observable<[O1, O2, O3, O4, O5]>;
export function combineFirst<O1, O2, O3, O4, O5, O6>(sources: [Observable<O1>, Observable<O2>, Observable<O3>, Observable<O4>, Observable<O5>, Observable<O6>]): Observable<[O1, O2, O3, O4, O5, O6]>;
export function combineFirst<O>(sources: O[]): Observable<O[]>;
/* tslint:enable:max-line-length */

export function combineFirst<O extends Observable<any>, R>(observables: O[]): Observable<R> {
    if (observables.length === 0) {
        return of([] as any);
    }
    return combineLatest<O, R>(observables.map(o => o.pipe(first())));
}
