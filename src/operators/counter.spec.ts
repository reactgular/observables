import {marbles} from 'rxjs-marbles/jest';
import {counter} from './counter';

describe('counter', () => {
    it('should increment a number for each value', marbles(m => {
        const o$ = m.cold('a-b-c-d-e|').pipe(counter());
        const result = 'a-b-c-d-e|';
        m.expect(o$).toBeObservable(result, {
            a: [1, 'a'],
            b: [2, 'b'],
            c: [3, 'c'],
            d: [4, 'd'],
            e: [5, 'e']
        });
    }));
});
