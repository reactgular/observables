import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {negate} from './negate';

describe(negate.name, () => {
    it('should invert boolean values', done => {
        of(true, false, false, true).pipe(
            negate(),
            toArray(),
            finalize(() => done())
        ).subscribe((v: any[]) => expect(v).toEqual([false, true, true, false]));
    });

    it('should emit false for truthy values', done => {
        of(true, {}, 'hello', 1, []).pipe(
            negate(),
            toArray(),
            finalize(() => done())
        ).subscribe((v: any[]) => expect(v).toEqual([false, false, false, false, false]));
    });

    it('should emit true for falsy values', done => {
        of<any>(false, 0, '', NaN, null, undefined).pipe(
            negate(),
            toArray(),
            finalize(() => done())
        ).subscribe((v: any[]) => expect(v).toEqual([true, true, true, true, true, true]));
    });
});
