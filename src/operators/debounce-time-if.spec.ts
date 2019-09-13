import {fakeAsync, tick} from '@angular/core/testing';
import {of, Subject} from 'rxjs';
import {expect$} from '../tests/observable.helper';
import {debounceTimeIf} from './debounce-time-if';

describe(debounceTimeIf.name, () => {
    it('should debounce values', fakeAsync(() => {
        const values = [];
        const subject$ = new Subject();
        const s = subject$.pipe(debounceTimeIf(true, 500)).subscribe(val => values.push(val));

        subject$.next(1);
        setTimeout(() => subject$.next(2), 250);
        tick(1000);
        subject$.next(3);
        tick(1000);

        expect(values).toEqual([2, 3]);

        s.unsubscribe();
    }));

    it('should not debounce values', () => {
        expect$(of(1, 2, 3, 4, 5).pipe(debounceTimeIf(false, 1000))).toEqual([1, 2, 3, 4, 5]);
    });
});
