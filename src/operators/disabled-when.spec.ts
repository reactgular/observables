import {BehaviorSubject, of, Subject} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {disabledWhen} from './disabled-when';

describe(disabledWhen.name, () => {
    it('should not emit when disabled', done => {
        of(1, 2, 3, 4, 5).pipe(
            disabledWhen(of(true)),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([]));
    });

    it('should emit', done => {
        of(1, 2, 3, 4, 5).pipe(
            disabledWhen(of(false)),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 3, 4, 5]));
    });

    it('should toggle disabled state', done => {
        const disabled$ = new BehaviorSubject(false);
        const subject$ = new Subject<number>();

        subject$.pipe(
            disabledWhen(disabled$),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 3, 7, 8, 9]));

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
        subject$.complete();
    });
});
