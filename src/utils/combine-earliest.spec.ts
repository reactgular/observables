import {marbles} from 'rxjs-marbles';
import {combineEarliest} from './combine-earliest';

describe('combineEarliest', () => {
    it('should emit the first values from each observable', marbles(m => {
        const o1 = m.cold('a----|');
        const o2 = m.cold('1----|');
        const o3 = m.cold('w----|');
        const expected = ' (abc)|';
        const source = combineEarliest([o1, o2, o3]);
        m.expect(source).toBeObservable(expected, {
            a: ['a', undefined, undefined],
            b: ['a', '1', undefined],
            c: ['a', '1', 'w']
        });
    }));

    it('should emit combined values only observables', marbles(m => {
        const o1 = m.cold('a-----b-----c----|');
        const o2 = m.cold('--1-----2-----3--|');
        const o3 = m.cold('----w-----x-----y|');
        const expected = ' a-b-c-d-e-f-g-h-i|';
        const source = combineEarliest([o1, o2, o3]);
        m.expect(source).toBeObservable(expected, {
            a: ['a', undefined, undefined],
            b: ['a', '1', undefined],
            c: ['a', '1', 'w'],
            d: ['b', '1', 'w'],
            e: ['b', '2', 'w'],
            f: ['b', '2', 'x'],
            g: ['c', '2', 'x'],
            h: ['c', '3', 'x'],
            i: ['c', '3', 'y']
        });
    }));

    it('should emit an empty array', marbles(m => {
        m.expect(combineEarliest([])).toBeObservable('(a|)', {a: []});
    }));
});
