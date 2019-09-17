import {TestScheduler} from 'rxjs/testing';
import {counter} from './counter';

describe(counter.name, () => {
    it('should increment a number for each value', () => {
        const scheduler = new TestScheduler((a, e) => expect(a).toEqual(e));
        scheduler.run(({cold, expectObservable}) => {
            const o$ = cold('a-b-c-d-e|').pipe(counter());
            const expect = 'a-b-c-d-e|';
            expectObservable(o$).toBe(expect, {
                a: [1, 'a'],
                b: [2, 'b'],
                c: [3, 'c'],
                d: [4, 'd'],
                e: [5, 'e']
            });
        });
    });
});
