import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

/**
 * Maps an array to a tuple of the original and sorted.
 */
export const mapToSorted = <T>(arr: T): [T, T] => [arr, Array.isArray(arr) ? [...arr].sort() as any as T : undefined];

/**
 * Unmaps the tuple of the original and sorted back to just the original.
 */
export const unmapSorted = <T>([arr]: [T, T]): T => arr as T;

/**
 * Sorts the two arrays before comparing if they contain the same values. This function is used internally, and expects
 * the arguments to contain both the original array value, and the sorted variant of that value. The code doesn't assert
 * this for performance reasons.
 */
export function sortedEqual<T>(a: [T, T], b: [T, T]): boolean {
    if (!Array.isArray(a[0]) || !Array.isArray(b[0])) {
        return false;
    }

    if (a[0] === b[0]) {
        return true;
    }

    const length = a[0].length;
    if (length !== b[0].length) {
        return false;
    }

    for (let i = length; i-- !== 0;) {
        if (a[1][i] !== b[1][i]) {
            return false;
        }
    }

    return true;
}

/**
 * Only emits when an array contains different values than the last and ignores the order of those values.
 */
export function distinctArray<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            map(mapToSorted),
            distinctUntilChanged((prev, next) => sortedEqual(prev, next)),
            map(unmapSorted)
        );
    };
}
