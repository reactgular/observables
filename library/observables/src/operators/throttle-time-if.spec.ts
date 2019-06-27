import {throttleTimeIf} from './throttle-time-if';
import {fakeAsync, tick} from '@angular/core/testing';
import {of, Subject} from 'rxjs';
import {expect$} from '../../tests/observable.helper';

describe(throttleTimeIf.name, () => {
    it('should throttle values', fakeAsync(() => {
        const values = [];
        const subject$ = new Subject();
        const s = subject$.pipe(throttleTimeIf(true, 500)).subscribe(val => values.push(val));

        subject$.next(1);
        setTimeout(() => subject$.next(2), 250);
        tick(1000);
        subject$.next(3);

        expect(values).toEqual([1, 3]);

        s.unsubscribe();
    }));

    it('should not throttle values', () => {
        expect$(of(1, 2, 3, 4, 5).pipe(throttleTimeIf(false, 1000))).toEqual([1, 2, 3, 4, 5]);
    });
});
