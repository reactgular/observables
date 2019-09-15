import {forkJoin, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

/* tslint:disable:max-line-length */
export function forkJoinFirst<A>(sources: [Observable<A>]): Observable<[A]>;
export function forkJoinFirst<A, B>(sources: [Observable<A>, Observable<B>]): Observable<[A, B]>;
export function forkJoinFirst<A, B, C>(sources: [Observable<A>, Observable<B>, Observable<C>]): Observable<[A, B, C]>;
export function forkJoinFirst<A, B, C, D>(sources: [Observable<A>, Observable<B>, Observable<C>, Observable<D>]): Observable<[A, B, C, D]>;
export function forkJoinFirst<A, B, C, D, E>(sources: [Observable<A>, Observable<B>, Observable<C>, Observable<D>, Observable<E>]): Observable<[A, B, C, D, E]>;
export function forkJoinFirst<A, B, C, D, E, F>(sources: [Observable<A>, Observable<B>, Observable<C>, Observable<D>, Observable<E>, Observable<F>]): Observable<[A, B, C, D, E, F]>;
export function forkJoinFirst<A extends Observable<any>[]>(sources: A): Observable<any[]>;

export function forkJoinFirst(sourcesObject: {}): Observable<never>;
export function forkJoinFirst<T, K extends keyof T>(sourcesObject: T): Observable<{ [O in keyof T]: T[K] }>;
/* tslint:disable:max-line-length */

/**
 *
 */
export function forkJoinFirst(sources: Observable<any>[] | { [key: string]: Observable<any> }): Observable<any> {
    if (sources instanceof Array) {
        return forkJoin(sources.map(o$ => o$.pipe(first())));
    } else if (typeof sources === 'object') {
        return forkJoin(
            Object.entries(sources)
                .reduce((acc, [key, o$]) => (acc[key] = o$.pipe(first())), {})
        );
    } else {
        throw new Error('unexpected value');
    }
}
