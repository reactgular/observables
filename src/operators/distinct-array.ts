import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

/**
 * Only emits when an array contains different values than the last and ignores the order of those values.
 */
export function distinctArray<T>(): MonoTypeOperatorFunction<T[]> {
    return (source: Observable<T[]>): Observable<T[]> => {
        return source.pipe(
            map(arr => ([arr, Array.isArray(arr) ? [...arr].sort() : arr])),
            distinctUntilChanged((prev, next) => sortedEqual(prev[0], prev[1], next[0], next[1])),
            map(([arr]) => arr)
        );
    };
}

/**
 * Sorts the two arrays before comparing if they contain the same values.
 */
function sortedEqual<T>(a: T[], sortA: T[], b: T[], sortB: T[]): boolean {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        return false;
    }

    if (a === b) {
        return true;
    }

    const length = a.length;
    if (length !== b.length) {
        return false;
    }

    for (let i = length; i-- !== 0;) {
        if (sortA[i] !== sortB[i]) {
            return false;
        }
    }

    return true;
}
