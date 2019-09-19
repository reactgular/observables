import {interval} from 'rxjs';
import {finalize, take, toArray} from 'rxjs/operators';
import {combineEarliest} from './combine-earliest';

describe('combineEarliest', () => {
    it('should emit earliest values', done => {
        combineEarliest([
            interval(100),
            interval(200),
            interval(300)
        ]).pipe(
            take(3),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual([
            [0, undefined, undefined],
            [0, undefined, undefined],
            [0, undefined, undefined]
        ]));
    });
});
