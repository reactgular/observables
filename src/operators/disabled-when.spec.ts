import {marbles} from 'rxjs-marbles/jest';
import {disabledWhen} from './disabled-when';

describe('operators/disabledWhen', () => {
    it('should not emit if source completes', marbles(m => {
        const s$ = m.cold('|');
        const o$ = m.cold('a-b-c-d-e|').pipe(disabledWhen(s$));
        const result = '   ---------|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should not emit if source never emits', marbles(m => {
        const s$ = m.cold('----------');
        const o$ = m.cold('a-b-c-d-e|').pipe(disabledWhen(s$));
        const result = '   ---------|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should not emit when disabled', marbles(m => {
        const s$ = m.cold('a---|', {a: true});
        const o$ = m.cold('a-b-c-d-e|').pipe(disabledWhen(s$));
        const result = '   ---------|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should emit all when source emits false and completes', marbles(m => {
        const s$ = m.cold('a|', {a: false});
        const o$ = m.cold('a-b-c-d-e|').pipe(disabledWhen(s$));
        const result = '   a-b-c-d-e|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should emit all when source emits false', marbles(m => {
        const s$ = m.cold('a---------', {a: false});
        const o$ = m.cold('a-b-c-d-e|').pipe(disabledWhen(s$));
        const result = '   a-b-c-d-e|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should emit only when toggled to false', marbles(m => {
        const s$ = m.cold('a---b---c|', {a: true, b: false, c: true});
        const o$ = m.cold('a-b-c-d-e|').pipe(disabledWhen(s$));
        const result = '   ----c-d--|';
        m.expect(o$).toBeObservable(result);
    }));
});
