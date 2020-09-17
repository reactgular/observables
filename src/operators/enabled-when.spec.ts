import {marbles} from 'rxjs-marbles/jest';
import {enabledWhen} from './enabled-when';

describe('operators/enabledWhen', () => {
    it('should not emit if source completes', marbles(m => {
        const s$ = m.cold('|');
        const o$ = m.cold('a-b-c-d-e|').pipe(enabledWhen(s$));
        const result = '   ---------|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should not emit if source never emits', marbles(m => {
        const s$ = m.cold('----------');
        const o$ = m.cold('a-b-c-d-e|').pipe(enabledWhen(s$));
        const result = '   ---------|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should not emit when disabled', marbles(m => {
        const s$ = m.cold('a---|', {a: false});
        const o$ = m.cold('a-b-c-d-e|').pipe(enabledWhen(s$));
        const result = '   ---------|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should emit all when source emits true and completes', marbles(m => {
        const s$ = m.cold('a|', {a: true});
        const o$ = m.cold('a-b-c-d-e|').pipe(enabledWhen(s$));
        const result = '   a-b-c-d-e|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should emit all when source emits true', marbles(m => {
        const s$ = m.cold('a---------', {a: true});
        const o$ = m.cold('a-b-c-d-e|').pipe(enabledWhen(s$));
        const result = '   a-b-c-d-e|';
        m.expect(o$).toBeObservable(result);
    }));

    it('should emit only when toggled to false', marbles(m => {
        const s$ = m.cold('a---b---c|', {a: false, b: true, c: false});
        const o$ = m.cold('a-b-c-d-e|').pipe(enabledWhen(s$));
        const result = '   ----c-d--|';
        m.expect(o$).toBeObservable(result);
    }));
});
