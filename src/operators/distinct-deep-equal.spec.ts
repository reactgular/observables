import {marbles} from 'rxjs-marbles';
import {deepEqual, distinctDeepEqual} from './distinct-deep-equal';

describe('distinctDeepEqual', () => {
    it('should distinguish between values', marbles(m => {
        const source = m.cold('-1--2-2---1-3-|').pipe(distinctDeepEqual());
        const result = '       -1--2-----1-3-|';
        m.expect(source).toBeObservable(result);
    }));

    it('should distinguish between array values', marbles(m => {
        const values = {a: [1, 2, 3], b: [1, 2, 3], c: [4, 5, 6]};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const result = '       -a--------c---|';
        m.expect(source).toBeObservable(result, {a: [1, 2, 3], c: [4, 5, 6]});
    }));

    it('should see array orders as being different', marbles(m => {
        const values = {a: [1, 2, 3], b: [1, 2, 3], c: [3, 2, 1]};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const result = '       -a--------c---|';
        m.expect(source).toBeObservable(result, {a: [1, 2, 3], c: [3, 2, 1]});
    }));

    it('should distinguish between object values', marbles(m => {
        const values = {a: {x: 1, y: 2, z: 3}, b: {x: 1, y: 2, z: 3}, c: {x: 4, y: 5, z: 6}};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const result = '       -a--------c---|';
        m.expect(source).toBeObservable(result, {a: {x: 1, y: 2, z: 3}, c: {x: 4, y: 5, z: 6}});
    }));

    it('should ignore the order of object properties', marbles(m => {
        const values = {a: {x: 1, y: 2, z: 3}, b: {z: 3, y: 2, x: 1}, c: {x: 1, z: 3, y: 2}};
        const source = m.cold('-a--b-b---c-c-|', values).pipe(distinctDeepEqual());
        const result = '       -a------------|';
        m.expect(source).toBeObservable(result, {a: {x: 1, y: 2, z: 3}});
    }));
});

describe('deepEqual', () => {
    it('should return true for same references', () => {
        const same = [{}, [], 0, undefined];
        same.forEach(value => expect(deepEqual(value, value)).toBe(true));
    });

    it('should return false for arrays of different length', () => {
        expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
    });

    it('should compare differences in array values', () => {
        expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(deepEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
        expect(deepEqual([1, 2, 3], [5, 6, 7])).toBe(false);
        expect(deepEqual(['a', 'b', 'c'], ['d', 'e', 'f'])).toBe(false);
    });

    it('should return false for two objects of different types', () => {
        const objValues = [[1, 2, 3], {}, new Date(), /regular/g];
        let pairs = objValues.map(v1 => objValues.map(v2 => [v1, v2]));
        pairs = [].concat.apply([], pairs);
        pairs = pairs.filter(([v1, v2]) => v1 !== v2);
        pairs.forEach(([v1, v2]) => {
            expect(deepEqual(v1, v2)).toBe(false);
            expect(deepEqual(v1, v1)).toBe(true);
            expect(deepEqual(v2, v2)).toBe(true);
        });
    });

    it('should return false for two NaN', () => {
        // unlike NaN === NaN, the function should see them as the same
        expect(deepEqual(NaN, NaN)).toBe(true);
    });

    it('should compare differences in object values', () => {
        expect(deepEqual({a: [1, 2, 3]}, {a: [1, 2, 3]})).toBe(true);
        expect(deepEqual({a: {b: 1}}, {a: {b: 1}})).toBe(true);
        expect(deepEqual({a: [1, 2, 3]}, {a: [4, 5, 6]})).toBe(false);
        expect(deepEqual({a: {b: 1}}, {a: {b: 2}})).toBe(false);
    });

    it('should compare arrays with different nested arrays', () => {
        expect(deepEqual([[1], [2], [3]], [[1], [2], [3]])).toBe(true);
        expect(deepEqual([['a'], ['b'], ['c']], [['a'], ['b'], ['c']])).toBe(true);
        expect(deepEqual([[1], [2], [3]], [[5], [6], [7]])).toBe(false);
        expect(deepEqual([['a'], ['b'], ['c']], [['d'], ['e'], ['f']])).toBe(false);
    });

    it('should compare date values', () => {
        expect(deepEqual(new Date('2019-08-11T15:42:21.606Z'), 'Not a date')).toBe(false);
        expect(deepEqual(new Date('2019-08-11T15:42:21.606Z'), new Date('2019-07-01T15:42:21.606Z'))).toBe(false);
        expect(deepEqual(new Date('2019-08-11T15:42:21.606Z'), new Date('2019-08-11T15:42:21.606Z'))).toBe(true);
    });

    it('should compare regular expressions', () => {
        expect(deepEqual(/abc/g, /efg/g)).toBe(false);
        expect(deepEqual(/abc/, /efg/)).toBe(false);
        expect(deepEqual(/abc/g, /abc/g)).toBe(true);
        expect(deepEqual(/abc/, /abc/)).toBe(true);
    });

    it('should compare objects with different properties', () => {
        expect(deepEqual({a: 1}, {b: 1})).toBe(false);
        expect(deepEqual({a: 1}, {a: 1, c: 2})).toBe(false);
    });
});
