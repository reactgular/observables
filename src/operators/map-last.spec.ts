import {marbles} from 'rxjs-marbles';
import {mapLast} from './map-last';

describe('operators/mapLast', () => {
    it('should map the last value', marbles(m => {
        const source = m.cold('a-b-c-d-|').pipe(mapLast(v => `!${v}!`));
        const result = '       --a-b-c-(d|)';
        m.expect(source).toBeObservable(result, {
            a: 'a',
            b: 'b',
            c: 'c',
            d: '!d!'
        });
    }));

    it('should not emit any values if observable emits only one and never completes', marbles(m => {
        const source = m.cold('a').pipe(mapLast(v => `!${v}!`));
        m.expect(source).toBeObservable('');
    }));

    it('should not emit last value if observable never completes', marbles(m => {
        const source = m.cold('a-b-c-d').pipe(mapLast(v => `!${v}!`));
        const result = '       --a-b-c)';
        m.expect(source).toBeObservable(result);
    }));

    it('should emit last value for single value and completes', marbles(m => {
        const source = m.cold('a|').pipe(mapLast(v => `!${v}!`));
        const result = '-(a|)';
        m.expect(source).toBeObservable(result, {a: '!a!'});
    }));
});
