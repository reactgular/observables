import {of, Subject} from 'rxjs';
import {finalize, timeout} from 'rxjs/operators';
import {forkJoinFirst} from './fork-join-first';

describe(forkJoinFirst.name, () => {
    it('should never emit for an empty array', done => {
        forkJoinFirst([]).pipe(
            timeout(100),
            finalize(() => done())
        ).subscribe(
            () => done.fail(),
            err => expect(err).toBeTruthy()
        );
    });

    it('should never emit for an empty object', done => {
        forkJoinFirst({}).pipe(
            timeout(100),
            finalize(() => done())
        ).subscribe(
            () => done.fail(),
            err => expect(err).toBeTruthy()
        );
    });

    it('should never emit for observables that do not complete', done => {
        forkJoinFirst([new Subject(), new Subject(), new Subject()]).pipe(
            timeout(100),
            finalize(() => done())
        ).subscribe(
            () => done.fail(),
            err => expect(err).toBeTruthy()
        );
    });

    it('should never emit for observables that do not complete', done => {
        forkJoinFirst({
            a: new Subject(),
            b: new Subject(),
            c: new Subject()
        }).pipe(
            timeout(100),
            finalize(() => done())
        ).subscribe(
            () => done.fail(),
            err => expect(err).toBeTruthy()
        );
    });

    it('should emit the first values only', done => {
        forkJoinFirst([
            of(1, 2, 3, 4),
            of('one', 'two', 'three', 'four')
        ]).pipe(
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([1, 'one']));

        forkJoinFirst({
            a: of(1, 2, 3, 4),
            b: of('one', 'two', 'three', 'four')
        }).pipe(
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual({a: 1, b: 'one'}));
    });
});
