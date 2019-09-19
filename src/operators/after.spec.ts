import {of} from 'rxjs';
import {marbles} from 'rxjs-marbles';
import {toArray} from 'rxjs/operators';
import {after} from './after';

describe('after', () => {
    it('should never emit for an empty observable', marbles(m => {
        m.expect(m.cold('|').pipe(after(() => true))).toBeObservable('|');
        m.expect(m.cold('-').pipe(after(() => true))).toBeObservable('-');
    }));

    it('should never emit for a single value', marbles(m => {
        m.expect(m.cold('a|').pipe(after(() => true))).toBeObservable('-|');
        m.expect(m.cold('(a|)').pipe(after(() => true))).toBeObservable('|');
        m.expect(m.cold('a').pipe(after(() => true))).toBeObservable('-');
    }));

    it('should never emit the last value', marbles(m => {
        m.expect(m.cold('a-b-c-d|').pipe(after(() => true))).toBeObservable('--b-c-d|');
        m.expect(m.cold('a-b-c-d').pipe(after(() => true))).toBeObservable('--b-c-d');
        m.expect(m.cold('(abcd)').pipe(after(() => true))).toBeObservable('(bcd)');
    }));

    it('should emit the value that came after', marbles(m => {
        m.expect(m.cold('a-b-c-d|').pipe(after(v => v === 'b'))).toBeObservable('----c--|');
        m.expect(m.cold('a-b-c-d').pipe(after(v => v === 'b'))).toBeObservable('----c');
    }));

    it('should never emit if always false', marbles(m => {
        m.expect(m.cold('a-b-c-d|').pipe(after(() => false))).toBeObservable('-------|');
        m.expect(m.cold('|').pipe(after(() => false))).toBeObservable('|');
        m.expect(m.cold('').pipe(after(() => false))).toBeObservable('');
    }));

    it('should be passed next and previous values', async () => {
        const called: Array<number[]> = [];
        const values = await of(1, 2, 3, 4, 5).pipe(
            after((...args: any[]) => {
                called.push(args);
                return true;
            }),
            toArray()
        ).toPromise();
        expect(values).toEqual([2, 3, 4, 5]);
        expect(called).toEqual([[1, 2], [2, 3], [3, 4], [4, 5]]);
    });
});
