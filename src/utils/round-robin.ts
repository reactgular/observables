import {Observable} from 'rxjs';
import {filter, map, scan} from 'rxjs/operators';
import {mergeTrim} from './merge-trim';

/* tslint:disable:max-line-length */
export function roundRobin<O1>(o1: Observable<O1>): Observable<O1>;
export function roundRobin<O1, O2>(o1: Observable<O1>, o2: Observable<O2>): Observable<O1 | O2>;
export function roundRobin<O1, O2, O3>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>): Observable<O1 | O2 | O3>;
export function roundRobin<O1, O2, O3, O4>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>, o4: Observable<O4>): Observable<O1 | O2 | O3 | O4>;
export function roundRobin<O1, O2, O3, O4, O5>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>, o4: Observable<O4>, o5: Observable<O5>): Observable<O1 | O2 | O3 | O4 | O5>;
export function roundRobin<O1, O2, O3, O4, O5, O6>(o1: Observable<O1>, o2: Observable<O2>, o3: Observable<O3>, o4: Observable<O4>, o5: Observable<O5>, o6: Observable<O6>): Observable<O1 | O2 | O3 | O4 | O5 | O6>;
export function roundRobin<T>(...observables: Observable<T>[]): Observable<T>;
/* tslint:enable:max-line-length */

export function roundRobin<T>(...observables: Observable<T>[]): Observable<T> {
    const SKIP_VALUE: T = Object.freeze({}) as any as T;
    const scanFunc = <T>(acc: [number, T], next: [number, T]): [number, T] => {
        const [accIndex] = acc;
        const [nextIndex, nextValue] = next;
        if (accIndex === nextIndex) {
            const next = nextIndex === observables.length - 1 ? 0 : nextIndex + 1;
            return [next, nextValue as any as T];
        }
        return [accIndex, SKIP_VALUE as any as T];
    };
    const ignoredValues = ([, value]: [number, T]) => value !== SKIP_VALUE;
    const unwrapValue = ([, value]: [number, T]) => value;
    const indexed$ = observables.map((o, indx) => o.pipe(map<T, [number, T]>(v => [indx, v])));
    return mergeTrim(...indexed$).pipe(
        scan(scanFunc, [0, SKIP_VALUE]),
        filter(ignoredValues),
        map(unwrapValue)
    );
}
