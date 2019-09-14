import {of, Subject} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {debounceTimeIf} from './debounce-time-if';

describe(debounceTimeIf.name, () => {
    it('should debounce values', done => {
        const subject$ = new Subject<number>();

        subject$.pipe(
            debounceTimeIf(true, 500),
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

    it('should not debounce values', done => {
        of(1, 2, 3, 4, 5).pipe(
            debounceTimeIf(false, 1000),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 2, 3, 4, 5]));
    });
});
