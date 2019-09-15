import {of, Subject} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {throttleTimeIf} from './throttle-time-if';

describe(throttleTimeIf.name, () => {
    it('should throttle values', done => {
        const subject$ = new Subject<number>();
        subject$.pipe(
            throttleTimeIf(true, 500),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 3]));

        subject$.next(1);
        subject$.next(2);
        setTimeout(() => {
            subject$.next(3);
            subject$.complete();
        }, 250);
    });

    it('should not throttle values', done => {
        of(1, 2, 3, 4, 5).pipe(
            throttleTimeIf(false, 1000),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 3, 4, 5]));
    });
});
