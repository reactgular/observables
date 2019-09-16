import {of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {counter} from './counter';

describe(counter.name, () => {
    it('should increment a number for each value', async () => {
        const v = await of('a', 'b', 'c', 'd', 'e').pipe(
            counter(),
            toArray()
        ).toPromise();

        expect(v).toEqual([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [4, 'd'],
            [5, 'e']
        ]);
    });
});
