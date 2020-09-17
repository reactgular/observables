import {marbles} from 'rxjs-marbles';
import {mergeTrim} from './merge-trim';

describe('utils/mergeTrim', () => {
    it('should complete when first observable completes', marbles(m => {
        const o1 = m.cold('a-----b-c-d');
        const o2 = m.cold('1-----2-3-4');
        const o3 = m.cold('x----|');
        const result = '   (a1x)|';
        const source = mergeTrim(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should emit values from all observables', marbles(m => {
        const o1 = m.cold('a-----b-----c----|');
        const o2 = m.cold('1-----2-----3----|');
        const o3 = m.cold('x-----y-----z----|');
        const result = '   (a1x)-(b2y)-(c3z)|';
        const source = mergeTrim(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should emit values no matter the order', marbles(m => {
        const o1 = m.cold('a---------b-----c|');
        const o2 = m.cold('--1-----2-----3--|');
        const o3 = m.cold('----x-y-----z----|');
        const result = '   a-1-x-y-2-b-z-3-c|';
        const source = mergeTrim(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should stop on first error', marbles(m => {
        const o1 = m.cold('a---------b-----c|');
        const o2 = m.cold('--1-----2-----3--|');
        const o3 = m.cold('----x-y-----#');
        const result = '   a-1-x-y-2-b-#';
        const source = mergeTrim(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));
});
