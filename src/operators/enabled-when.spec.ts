import {BehaviorSubject, of, Subject} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {enabledWhen} from './enabled-when';

describe(enabledWhen.name, () => {
    it('should emit when enabled', done => {
        of(1, 2, 3, 4, 5).pipe(
            enabledWhen(of(true)),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 3, 4, 5]));
    });

    it('should not emit when not enabled', done => {
        of(1, 2, 3, 4, 5).pipe(
            enabledWhen(of(false)),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([]));
    });

    it('should toggle enabled state', done => {
        const enabled$ = new BehaviorSubject(true);
        const subject$ = new Subject<number>();

        subject$.pipe(
            enabledWhen(enabled$),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 3, 7, 8, 9]));

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
        subject$.complete();
    });

});
