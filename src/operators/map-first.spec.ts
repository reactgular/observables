import {marbles} from 'rxjs-marbles';
import {mapFirst} from './map-first';

describe('mapFirst', () => {
    it('should map the first value', marbles(m => {
        const source = m.cold('a-b-c-d|').pipe(mapFirst(() => 'FIRST'));
        const expect = 'a-b-c-d|';
        m.expect(source).toBeObservable(expect, {
            a: 'FIRST',
            b: 'b',
            c: 'c',
            d: 'd'
        });
    }));
});
