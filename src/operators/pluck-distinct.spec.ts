import {of} from 'rxjs';
import {finalize, toArray} from 'rxjs/operators';
import {pluckDistinct} from './pluck-distinct';

describe(pluckDistinct.name, () => {
    it('should pluck a property value', done => {
        of({name: 'John Smith'}).pipe(
            pluckDistinct('name'),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual(['John Smith']));
    });

    it('should pluck nested property', done => {
        of({person: {name: 'John Smith'}}).pipe(
            pluckDistinct('person', 'name'),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual(['John Smith']));
    });

    it('should emit unique values', done => {
        of(
            {name: 'John Smith'},
            {name: 'John Smith'},
            {name: 'John Smith'},
            {name: 'Jane Doe'},
            {name: 'Jane Doe'},
            {name: 'Mike Smith'},
            {name: 'Jason Doe'}
        ).pipe(
            pluckDistinct('name'),
            toArray(),
            finalize(() => done())
        ).subscribe(v => expect(v).toEqual(['John Smith', 'Jane Doe', 'Mike Smith', 'Jason Doe']));
    });
});
