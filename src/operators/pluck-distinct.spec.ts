import {marbles} from 'rxjs-marbles';
import {pluckDistinct} from './pluck-distinct';

describe('pluckDistinct', () => {
    it('should pluck a property value', marbles(m => {
        const o$ = m.cold('a|', {a: {name: 'John Smith'}}).pipe(pluckDistinct('name'));
        const result = '   a|';
        m.expect(o$).toBeObservable(result, {a: 'John Smith'});
    }));

    it('should pluck nested property', marbles(m => {
        const o$ = m.cold('a|', {a: {person: {name: 'John Smith'}}}).pipe(pluckDistinct('person', 'name'));
        const result = '   a|';
        m.expect(o$).toBeObservable(result, {a: 'John Smith'});
    }));

    it('should emit unique values', marbles(m => {
        const values = {
            a: {name: 'John Smith'},
            b: {name: 'John Smith'},
            c: {name: 'John Smith'},
            d: {name: 'Jane Doe'},
            e: {name: 'Jane Doe'},
            f: {name: 'Mike Smith'},
            g: {name: 'John Smith'},
            h: {name: 'Jason Doe'}
        };
        const o$ = m.cold('a-b-c-d-e-f-g-h|', values).pipe(pluckDistinct('name'));
        const result = '   a-----d---f-g-h|';
        m.expect(o$).toBeObservable(result, {
            a: 'John Smith',
            d: 'Jane Doe',
            f: 'Mike Smith',
            g: 'John Smith',
            h: 'Jason Doe'
        });
    }));
});
