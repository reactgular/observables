import {negate} from './negate';
import {of} from 'rxjs';
import {expect$} from '../tests/observable.helper';

describe(negate.name, () => {
    it('should invert boolean values', () => {
        const S1 = of(true, false, false, true).pipe(negate());
        expect$(S1).toEqual([false, true, true, false]);
    });

    it('should emit false for truthy values', () => {
        const S1 = of(true, {}, 'hello', 1, []).pipe(negate());
        expect$(S1).toEqual([false, false, false, false, false]);
    });

    it('should emit true for falsy values', () => {
        const S1 = of(false, 0, '', NaN, null, undefined).pipe(negate());
        expect$(S1).toEqual([true, true, true, true, true, true]);
    });
});
