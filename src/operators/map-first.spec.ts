import {marbles} from 'rxjs-marbles';
import {mapFirst} from './map-first';

describe('operators/mapFirst', () => {
    it('should map the first value', marbles(m => {
        const source = m.cold('a-b-c-d|').pipe(mapFirst(v => `!${v}!`));
        const result = 'a-b-c-d|';
        m.expect(source).toBeObservable(result, {
            a: '!a!',
            b: 'b',
            c: 'c',
            d: 'd'
        });
    }));
});
