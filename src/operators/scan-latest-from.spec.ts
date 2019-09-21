import {marbles} from 'rxjs-marbles';
import {scanLatestFrom} from './scan-latest-from';

describe('scanLatestFrom', () => {
    it('should accumulate values from first seed value', marbles(m => {
        const acc = (acc: any, next: any) => acc + next;
        const seed = m.cold('  1----|');
        const source = m.cold('a-b-c|').pipe(scanLatestFrom(acc, seed));
        const expect = '       a-b-c|';
        m.expect(source).toBeObservable(expect, {a: '1a', b: '1ab', c: '1abc'});
    }));

    it('should accumulate values from multiple seed values', marbles(m => {
        const acc = (acc: any, next: any) => acc + next;
        const seed = m.cold('  1-----2-----3|');
        const source = m.cold('a-b-c-d-e-f-g-h-i|').pipe(scanLatestFrom(acc, seed));
        const expect = '       a-b-c-d-e-f-g-h-i|';
        m.expect(source).toBeObservable(expect, {
            a: '1a', b: '1ab', c: '1abc',
            d: '2d', e: '2de', f: '2def',
            g: '3g', h: '3gh', i: '3ghi'
        });
    }));

    it('should emit nothing if seed never emits', marbles(m => {
        const source1 = m.cold('a-b-c-d-e-f|').pipe(scanLatestFrom((a, b) => a + b, m.cold('')));
        m.expect(source1).toBeObservable('-----------|');

        const source2 = m.cold('a-b-c-d-e-f|').pipe(scanLatestFrom((a, b) => a + b, m.cold('|')));
        m.expect(source2).toBeObservable('-----------|');

        const source3 = m.cold('a-b-c-d-e-f').pipe(scanLatestFrom((a, b) => a + b, m.cold('')));
        m.expect(source3).toBeObservable('');
    }));

    it('should emit error from the seed observable', marbles(m => {
        const acc = (acc: any, next: any) => acc + next;
        const seed = m.cold('#');
        const source = m.cold('a-b-c|').pipe(scanLatestFrom(acc, seed));
        const expect = '       #';
        m.expect(source).toBeObservable(expect);
    }));
});
