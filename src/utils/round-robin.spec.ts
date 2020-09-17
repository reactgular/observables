import {marbles} from 'rxjs-marbles';
import {roundRobin} from './round-robin';

describe('utils/roundRobin', () => {
    it('should emit values in a round robin pattern', marbles(m => {
        const o1 = m.cold('----a---b---c---d--|');
        const o2 = m.cold('--1---2---3---4---5|');
        const o3 = m.cold('e---f---g---h---i--|');
        const result = '   ----a-2-g---c-4-i--|';
        const source = roundRobin(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should throw error when the first observable throws error', marbles(m => {
        const o1 = m.cold('----a---b---c---d--|');
        const o2 = m.cold('--1---2--#');
        const o3 = m.cold('e---f---g---h---i--|');
        const result = '   ----a-2-g#';
        const source = roundRobin(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should get stuck if an observable stops emitting', marbles(m => {
        const o1 = m.cold('----a---b---c---d--');
        const o2 = m.cold('--1---2------------');
        const o3 = m.cold('e---f---g---h---i--');
        const result = '   ----a-2-g---c------';
        const source = roundRobin(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));

    it('should complete when the first observable completes', marbles(m => {
        const o1 = m.cold('----a---b---c---d--|');
        const o2 = m.cold('--1---2--|');
        const o3 = m.cold('e---f---g---h---i--|');
        const result = '   ----a-2-g|';
        const source = roundRobin(o1, o2, o3);
        m.expect(source).toBeObservable(result);
    }));
});
