import {Observable, OperatorFunction} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function pluckDistinct<T, K1 extends keyof T>(k1: K1): OperatorFunction<T, T[K1]>;
export function pluckDistinct<T, K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): OperatorFunction<T, T[K1][K2]>;
export function pluckDistinct<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3): OperatorFunction<T, T[K1][K2][K3]>;
export function pluckDistinct<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFunction<T, T[K1][K2][K3][K4]>;
export function pluckDistinct<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): OperatorFunction<T, T[K1][K2][K3][K4][K5]>;
export function pluckDistinct<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;
export function pluckDistinct<T, R>(...properties: string[]): OperatorFunction<T, R>;
/* tslint:disable:max-line-length */

export function pluckDistinct<T, R>(...properties: string[]): OperatorFunction<T, R> {
    return (source: Observable<T>): Observable<R> => source.pipe(
        pluck<T, R>(...properties),
        distinctUntilChanged()
    );
}
