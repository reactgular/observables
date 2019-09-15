import {combineLatest, Observable} from 'rxjs';
import {skip, startWith} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function combineEarliest<O1 extends Observable<any>>(sources: [O1]): Observable<[O1]>;
export function combineEarliest<O1 extends Observable<any>, O2 extends Observable<any>>(sources: [O1, O2]): Observable<[O1, O2]>;
export function combineEarliest<O1 extends Observable<any>, O2 extends Observable<any>, O3 extends Observable<any>>(sources: [O1, O2, O3]): Observable<[O1, O2, O3]>;
export function combineEarliest<O1 extends Observable<any>, O2 extends Observable<any>, O3 extends Observable<any>, O4 extends Observable<any>>(sources: [O1, O2, O3, O4]): Observable<[O1, O2, O3, O4]>;
export function combineEarliest<O1 extends Observable<any>, O2 extends Observable<any>, O3 extends Observable<any>, O4 extends Observable<any>, O5 extends Observable<any>>(sources: [O1, O2, O3, O4, O5]): Observable<[O1, O2, O3, O4, O5]>;
export function combineEarliest<O1 extends Observable<any>, O2 extends Observable<any>, O3 extends Observable<any>, O4 extends Observable<any>, O5 extends Observable<any>, O6 extends Observable<any>>(sources: [O1, O2, O3, O4, O5, O6]): Observable<[O1, O2, O3, O4, O5, O6]>;
export function combineEarliest<O extends Observable<any>>(sources: O[]): Observable<O[]>;
/* tslint:enable:max-line-length */

export function combineEarliest<O extends Observable<any>, S, R>(observables: O[], substitute?: S): Observable<R> {
    const starts = observables.map(o => o.pipe(startWith<O, S | O>(substitute)));
    return combineLatest<O, R>(starts).pipe(skip(1));
}
