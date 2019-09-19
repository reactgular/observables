import {marbles} from 'rxjs-marbles';
import {combineFirst} from './combine-first';

describe('combineFirst', () => {
    it('should emit first', marbles(m => {
        const o1 = m.cold('a----|');
        const o2 = m.cold('1----|');
        const o3 = m.cold('w----|');
        const expected = '(a|)';
        const source = combineFirst([o1, o2, o3]);
        m.expect(source).toBeObservable(expected, {a: ['a', '1', 'w']});
    }));

    it('should emit first delayed values', marbles(m => {
        const o1 = m.cold('1s a 1s b 1s c|');
        const o2 = m.cold('2s 1 5s 2 5s 3|');
        const o3 = m.cold('10s w 10s x 10s y 10s z|');
        const expected = '10s (a|)';
        const source = combineFirst([o1, o2, o3]);
        m.expect(source).toBeObservable(expected, {a: ['a', '1', 'w']});
    }));

    it('should emit an empty array', marbles(m => {
        const expected = '(a|)';
        const source = combineFirst([]);
        m.expect(source).toBeObservable(expected, {a: []});
    }));

    it('should emit an empty array', marbles(m => {
        m.expect(combineFirst([])).toBeObservable('(a|)', {a: []});
    }));
});
