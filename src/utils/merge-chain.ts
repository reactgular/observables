import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function mergeChain<O1, O2>(o1: Observable<O1>, c1: (arg1: O1) => Observable<O2>): Observable<[O1, O2]>;
export function mergeChain<O1, O2, O3>(o1: Observable<O1>, c1: (a1: O1) => Observable<O2>, c2: (a1: O2, a2: O1) => Observable<O3>): Observable<[O1, O2, O3]>;
export function mergeChain<O1, O2, O3, O4>(o1: Observable<O1>, c1: (a1: O1) => Observable<O2>, c2: (a1: O2, a2: O1) => Observable<O3>, c3: (a1: O3, a2: O2, a3: O1) => Observable<O4>): Observable<[O1, O2, O3, O4]>;
export function mergeChain<O1, O2, O3, O4, O5>(o1: Observable<O1>, c1: (a1: O1) => Observable<O2>, c2: (a1: O2, a2: O1) => Observable<O3>, c3: (a1: O3, a2: O2, a3: O1) => Observable<O4>, c4: (a1: O4, a2: O3, a3: O2, a4: O1) => Observable<O5>): Observable<[O1, O2, O3, O4, O5]>;
export function mergeChain<O1, O2, O3, O4, O5, O6>(o1: Observable<O1>, c1: (a1: O1) => Observable<O2>, c2: (a1: O2, a2: O1) => Observable<O3>, c3: (a1: O3, a2: O2, a3: O1) => Observable<O4>, c4: (a1: O4, a2: O3, a3: O2, a4: O1) => Observable<O5>, c5: (a1: O5, a2: O4, a3: O3, a4: O2, a5: O1) => Observable<O6>): Observable<[O1, O2, O3, O4, O5, O6]>;
export function mergeChain<T, R>(source: Observable<T>, ...mergeTo: Array<(...values: any[]) => Observable<any>>): Observable<R>;
/* tslint:enable:max-line-length */

export function mergeChain<T, R>(source: Observable<T>, ...mergeTo: Array<(...values: any[]) => Observable<any>>): Observable<R> {
    const source$ = source.pipe(map(v => [v]));
    return mergeTo.reduce((acc: Observable<any>, switcher: (...values: any[]) => Observable<any>) => {
        return acc.pipe(
            mergeMap((value: any): Observable<any> => {
                return switcher(...value).pipe(
                    map(v => [v, ...value])
                );
            })
        );
    }, source$);
}
