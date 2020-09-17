import {Observable} from 'rxjs';
import {marbles} from 'rxjs-marbles';
import {switchChain} from './switch-chain';

describe('utils/switchChain', () => {
    it('should emit an array of values in reserve order', marbles(m => {
        const source = switchChain(
            m.cold('a'),
            () => m.cold('1'),
            () => m.cold('x'),
            () => m.cold('z')
        );
        const result = 'a';
        m.expect(source).toBeObservable(result, {a: ['z', 'x', '1', 'a']});
    }));

    it('should complete if all observables complete', marbles(m => {
        const source = switchChain(m.cold('a|'), () => m.cold('1|'));
        const result = 'a|';
        m.expect(source).toBeObservable(result, {a: ['1', 'a']});
    }));

    it('should pass previous values to projector function', marbles(m => {
        const projector1 = jest.fn<Observable<string>, string[]>(() => m.cold('1'));
        const projector2 = jest.fn<Observable<string>, string[]>(() => m.cold('x'));
        const projector3 = jest.fn<Observable<string>, string[]>(() => m.cold('z'));
        const source = switchChain(
            m.cold('a'),
            projector1,
            projector2,
            projector3
        );
        const result = 'a';
        m.expect(source).toBeObservable(result, {a: ['z', 'x', '1', 'a']});
        m.flush();
        expect(projector1.mock.calls.length).toBe(1);
        expect(projector2.mock.calls.length).toBe(1);
        expect(projector3.mock.calls.length).toBe(1);
        expect(projector1.mock.calls[0]).toEqual(['a']);
        expect(projector2.mock.calls[0]).toEqual(['1', 'a']);
        expect(projector3.mock.calls[0]).toEqual(['x', '1', 'a']);
    }));
});
