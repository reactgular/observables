import {disabledWhen} from './disabled-when';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {expect$} from '../tests/observable.helper';

describe(disabledWhen.name, () => {
    it('should not emit when disabled', () => {
        const S1 = of(1, 2, 3, 4, 5).pipe(disabledWhen(of(true)));
        expect$(S1).toEqual([]);
    });

    it('should emit when not disabled', () => {
        const S1 = of(1, 2, 3, 4, 5).pipe(disabledWhen(of(false)));
        expect$(S1).toEqual([1, 2, 3, 4, 5]);
    });

    it('should toggle disabled state', () => {
        const disabled$ = new BehaviorSubject(false);
        const subject$ = new Subject();
        const S1 = subject$.pipe(disabledWhen(disabled$));

        const values = [];
        S1.subscribe(v => values.push(v));

        subject$.next(1);
        subject$.next(2);
        subject$.next(3);
        disabled$.next(true);
        subject$.next(4);
        subject$.next(5);
        subject$.next(6);
        disabled$.next(false);
        subject$.next(7);
        subject$.next(8);
        subject$.next(9);

        expect(values).toEqual([1, 2, 3, 7, 8, 9]);
    });
});
