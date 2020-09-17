import {of} from 'rxjs';
import {marbles} from 'rxjs-marbles';
import {toArray} from 'rxjs/operators';
import {before} from './before';

describe('operators/before', () => {
    it('should never emit for an empty observable', marbles(m => {
        m.expect(m.cold('|').pipe(before(() => true))).toBeObservable('|');
        m.expect(m.cold('-').pipe(before(() => true))).toBeObservable('-');
    }));

    it('should never emit for a single value', marbles(m => {
        m.expect(m.cold('a|').pipe(before(() => true))).toBeObservable('-|');
        m.expect(m.cold('(a|)').pipe(before(() => true))).toBeObservable('|');
        m.expect(m.cold('a').pipe(before(() => true))).toBeObservable('-');
    }));

    it('should never emit the last value', marbles(m => {
        m.expect(m.cold('a-b-c-d|').pipe(before(() => true))).toBeObservable('--a-b-c|');
        m.expect(m.cold('a-b-c-d').pipe(before(() => true))).toBeObservable('--a-b-c');
        m.expect(m.cold('(abcd)').pipe(before(() => true))).toBeObservable('(abc)');
    }));

    it('should emit the value that came before', marbles(m => {
        m.expect(m.cold('a-b-c-d|').pipe(before(v => v === 'c'))).toBeObservable('----b--|');
        m.expect(m.cold('a-b-c-d').pipe(before(v => v === 'c'))).toBeObservable('----b');
    }));

    it('should never emit if always false', marbles(m => {
        m.expect(m.cold('a-b-c-d|').pipe(before(() => false))).toBeObservable('-------|');
        m.expect(m.cold('|').pipe(before(() => false))).toBeObservable('|');
        m.expect(m.cold('').pipe(before(() => false))).toBeObservable('');
    }));

    it('should be passed next and previous values', async () => {
        const called: Array<number[]> = [];
        const values = await of(1, 2, 3, 4, 5).pipe(
            before((...args: any[]) => {
                called.push(args);
                return true;
            }),
            toArray()
        ).toPromise();
        expect(values).toEqual([1, 2, 3, 4]);
        expect(called).toEqual([[2, 1], [3, 2], [4, 3], [5, 4]]);
    });
});
