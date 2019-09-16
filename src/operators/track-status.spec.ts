import {of, throwError} from 'rxjs';
import {catchError, map, toArray} from 'rxjs/operators';
import {trackStatus} from './track-status';

describe(trackStatus.name, () => {
    it('should emit a start status', async () => {
        const v = await of().pipe(
            trackStatus(),
            toArray()
        ).toPromise();
        expect(v).toEqual([{status: 'start', value: undefined}]);
    });

    it('should emit a start status before value status', async () => {
        const v = await of(1, 2, 3).pipe(
            trackStatus(4),
            toArray()
        ).toPromise();
        expect(v).toEqual([
            {status: 'start', value: 4},
            {status: 'value', value: 1},
            {status: 'value', value: 2},
            {status: 'value', value: 3}
        ]);
    });

    it('should emit a start value of a different type', async () => {
        const v = await of(1, 2, 3).pipe(
            trackStatus('four'),
            toArray()
        ).toPromise();
        expect(v).toEqual([
            {status: 'start', value: 'four'},
            {status: 'value', value: 1},
            {status: 'value', value: 2},
            {status: 'value', value: 3}
        ]);
    });

    it('should emit a start value before an error', async () => {
        const v = await throwError('Expected').pipe(
            trackStatus(),
            toArray()
        ).toPromise();
        expect(v).toEqual([
            {status: 'start', value: undefined},
            {status: 'error', value: 'Expected'}
        ]);
    });

    it('should silent errors so they are not catchable', async () => {
        const v = await throwError('Expected').pipe(
            trackStatus(),
            catchError(() => {
                throw new Error('Unexpected error was caught');
            }),
            toArray()
        ).toPromise();

        expect(v).toEqual([
            {status: 'start', value: undefined},
            {status: 'error', value: 'Expected'}
        ]);
    });

    it('should stop emitting after an error', async () => {
        const v = await of(1, 2, 3, 4, 5).pipe(
            map(num => {
                if (num === 3) {
                    // tslint:disable-next-line:no-string-throw
                    throw 'Bad Number';
                }
                return num;
            }),
            trackStatus(),
            toArray()
        ).toPromise();

        expect(v).toEqual([
            {status: 'start', value: undefined},
            {status: 'value', value: 1},
            {status: 'value', value: 2},
            {status: 'error', value: 'Bad Number'}
        ]);
    });
});
