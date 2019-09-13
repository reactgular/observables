import {enabledWhen} from './enabled-when';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {expect$} from '../tests/observable.helper';

describe(enabledWhen.name, () => {
    it('should emit when enabled', () => {
        const S1 = of(1, 2, 3, 4, 5).pipe(enabledWhen(of(true)));
        expect$(S1).toEqual([1, 2, 3, 4, 5]);
    });

    it('should not emit when not enabled', () => {
        const S1 = of(1, 2, 3, 4, 5).pipe(enabledWhen(of(false)));
        expect$(S1).toEqual([]);
    });

    it('should toggle enabled state', () => {
        const enabled$ = new BehaviorSubject(true);
        const subject$ = new Subject();
        const S1 = subject$.pipe(enabledWhen(enabled$));

        const values = [];
        S1.subscribe(v => values.push(v));

        subject$.next(1);
        subject$.next(2);
        subject$.next(3);
        enabled$.next(false);
        subject$.next(4);
        subject$.next(5);
        subject$.next(6);
        enabled$.next(true);
        subject$.next(7);
        subject$.next(8);
        subject$.next(9);

        expect(values).toEqual([1, 2, 3, 7, 8, 9]);
    });

});
