import {marbles} from 'rxjs-marbles';
import {distinctArray, mapToSorted, sortedEqual, unmapSorted} from './distinct-array';

describe('operators/distinctArray', () => {
    it('should emit unique arrays ignoring order of values', marbles(m => {
        const values = {a: [1, 2, 3], b: [3, 2, 1], c: [5, 6, 7], d: [6, 5, 7], e: [1, 2, 3]};
        const source = m.cold('a-b-c-d-e|', values).pipe(distinctArray());
        const result = '       a---c---e|';
        m.expect(source).toBeObservable(result, values);
    }));

    it('should emit arrays if different lengths', marbles(m => {
        const values = {a: [1], b: [1, 2], c: [1, 2, 3], d: [1, 2, 3, 4], e: [1, 2, 3, 4, 5]};
        const source = m.cold('a-b-c-d-e|', values).pipe(distinctArray());
        const result = '       a-b-c-d-e|';
        m.expect(source).toBeObservable(result, values);
    }));

    it('should not deeply match arrays', marbles(m => {
        const values = {a: [1, [1]], b: [1, [1]]};
        const source = m.cold('a-b|', values).pipe(distinctArray());
        const result = '       a-b|';
        m.expect(source).toBeObservable(result, values);
    }));

    it('should not deeply match object values', marbles(m => {
        const values = {a: [1, {a: 1}], b: [1, {a: 1}]};
        const source = m.cold('a-b|', values).pipe(distinctArray());
        const result = '       a-b|';
        m.expect(source).toBeObservable(result, values);
    }));

    it('should not distinct values that are not arrays', marbles(m => {
        const source = m.cold('a-a-c-c-e|').pipe(distinctArray());
        const result = '       a-a-c-c-e|';
        m.expect(source).toBeObservable(result);
    }));
});

describe('operators/mapToSorted', () => {
    const varies = [0, undefined, NaN, {}, [], 'FooBar'];

    it('should always return an array', () => {
        varies.forEach(value => {
            const m = mapToSorted(value);
            expect(m instanceof Array).toBe(true);
            expect(m.length).toBe(2);
        });
    });

    it('should always return the original value as first value', () => {
        varies.forEach(value => {
            const m = mapToSorted(value);
            expect(m[0]).toBe(value);
        });
    });

    it('should set second value as undefined', () => {
        [0, undefined, NaN, {}, 'FooBar'].forEach(value => {
            const m = mapToSorted(value);
            expect(m[0]).toBe(value);
            expect(m[1]).toBeUndefined();
        });
    });

    it('should sort the array as second value', () => {
        [
            [[1, 2, 3], [1, 2, 3]],
            [[4, 2, 3, 1], [1, 2, 3, 4]],
            [['a', 'c', 'q', 'r'], ['a', 'c', 'q', 'r']]
        ].forEach(([first, second]) => {
            const m = mapToSorted(first);
            expect(m[0]).toBe(first);
            expect(m[1]).not.toBe(first);
            expect(m[1]).toEqual(second);
        });
    });
});

describe('operators/unmapSorted', () => {
    it('should return first array value', () => {
        [
            [1, 2],
            ['first', 'second'],
            [NaN, undefined]
        ].forEach(value => {
            expect(unmapSorted(value as any)).toBe(value[0]);
        });
    });
});

describe('operators/sortedEqual', () => {
    it('should return false for non arrays', () => {
        const notArray = [0, undefined, NaN, {}, 'FooBar'];
        notArray.forEach(value => {
            expect(sortedEqual([value, undefined], [value, undefined])).toBe(false);
            expect(sortedEqual([value, undefined], [[1, 2, 3], [1, 2, 3]])).toBe(false);
            expect(sortedEqual([[1, 2, 3], [1, 2, 3]], [value, undefined])).toBe(false);
        });
    });

    it('should return true for identical array references', () => {
        const values = [[], [1], ['a'], [undefined]];
        values.forEach(value => {
            expect(sortedEqual([value, [...value]], [value, [...value]])).toBe(true);
        });
    });

    it('should return false for arrays of different length', () => {
        const values = [[], [1], ['a'], [undefined]];
        values.forEach(value => {
            const v1 = [[...value], [...value]] as any;
            const v2 = [[...value, 0], [...value, 0]] as any;
            expect(sortedEqual(v1, v2)).toBe(false);
        });
    });

    it('should return false for arrays with different values', () => {
        const sizes = [1, 3, 5, 10];
        sizes.forEach(size => {
            const v1 = Array(size).fill(0).map(() => Math.random());
            const v2 = v1.map(v => v + 1);
            expect(sortedEqual(mapToSorted(v1), mapToSorted(v2))).toBe(false);
        });
    });

    it('should return true for arrays with same values, but in different orders', () => {
        const sizes = [3, 5, 10, 15, 20];
        sizes.forEach(size => {
            let v1, v2;
            while (JSON.stringify(v1) === JSON.stringify(v2)) {
                v1 = Array(size).fill(0).map(() => Math.random());
                v2 = [...v1].sort(() => Math.random());
            }
            expect(sortedEqual(mapToSorted(v1), mapToSorted(v2))).toBe(true);
        });
    });
});
