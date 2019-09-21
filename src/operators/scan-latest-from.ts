import {Observable, OperatorFunction} from 'rxjs';
import {map, scan, withLatestFrom} from 'rxjs/operators';
import {counter} from './counter';

export function scanLatestFrom<T, R>(accumulator: (acc: R, value: T, index: number, reset: boolean) => R, latest: Observable<R>)
    : OperatorFunction<T, R> {
    return (source: Observable<T>): Observable<R> => {
        const flattenLatestCount = (v: [T, [number, R]]): [T, number, R] => [v[0], v[1][0], v[1][1]];
        const defaultAcc: [R, number, R] = [undefined, 0, undefined];
        const unwrapResult = (v: [R, number, R]) => v[0];
        return source.pipe(
            withLatestFrom(latest.pipe(counter())),
            map(flattenLatestCount),
            scan((acc: [R, number, R], next: [T, number, R], index: number): [R, number, R] => {
                const [accValue, accCount] = acc;
                const [nextValue, nextCount, nextLatest] = next;
                const result = accCount !== nextCount
                    ? accumulator(nextLatest, nextValue, index, true)
                    : accumulator(accValue, nextValue, index, false);
                return [result, nextCount, nextLatest];
            }, defaultAcc),
            map(unwrapResult)
        );
    };
}
