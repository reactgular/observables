import {merge, Observable, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function mergeTrim<O1>(o1: Observable<O1>): Observable<O1>;
export function mergeTrim<O1, O2>(o1: Observable<O1>, o2: Observable<O2>): Observable<O1 | O2>;
export function mergeTrim<O1, O2, O3>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>): Observable<O1 | O2 | O3>;
export function mergeTrim<O1, O2, O3, O4>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>, o4: Observable<O4>): Observable<O1 | O2 | O3 | O4>;
export function mergeTrim<O1, O2, O3, O4, O5>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>, o4: Observable<O4>, o5: Observable<O5>): Observable<O1 | O2 | O3 | O4 | O5>;
export function mergeTrim<O1, O2, O3, O4, O5, O6>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>, o4: Observable<O4>, o5: Observable<O5>, o6: Observable<O6>): Observable<O1 | O2 | O3 | O4 | O5 | O6>;
export function mergeTrim<T>(...observables: Observable<T>[]): Observable<T>;
/* tslint:enable:max-line-length */

export function mergeTrim<T>(...observables: Observable<T>[]): Observable<T> {
    const done$ = new Subject<void>();
    const mergeTrim$ = observables.map(o => o.pipe(
        finalize(() => done$.next())
    ));
    return merge(...mergeTrim$).pipe(
        takeUntil(done$),
        finalize(() => done$.complete())
    );
}
