Emits objects that describe the loading of data from a remote resource (like making a HTTP request). The objects
contain the *status* property which can be either `"start"`, `"value"` or `"error"`, and a *value* property which
holds the first data emitted by the outer observable.
 
> This operator only reads the *first* value from the outer observable, and then completes.

There is always a *start* object emitted first followed by either a *value* or *error* object. The *error* object
can be a thrown error or the result of the outer observable *completing* without any results.

```typescript
export interface LoadFirst<T> {
    status: string;
    value: T | undefined;
}

loadFirst<T, S, E>(start?: S, empty?: E): OperatorFunction<T, LoadFirst<T | S | E>>
```

Example:

```typescript
of("Hello World").pipe(
    loadFirst()
).subscribe(v => console.log(v));
// prints 
// {state: "start", value: undefined}
// {state: "value", value: "Hello World"}
```

You can use this operator to make loading indicators for Angular components.

Example:

```typescript
import {loadFirst, LoadFirst} from '@reactgular/observable/operators';

@Component({
    selector: 'example',
    template: `
        <ng-container *ngIf="load$ | async as load" [ngSwitch]="load.status">
            <div *ngSwitchCase='"start"'>
                Please wait while loading...
            </div>
            <div *ngSwitchCase='"value"'>
                {{load.value}}
            </div>
            <div *ngSwitchCase='"error"'>
                There was an error loading data...
            </div>
        </ng-container>`
})
export class ExampleComponent implements OnInit {
    public load$: Observable<LoadFirst<any>>;
   
    public constructor(private http: HttpClient) { }
   
    public ngOnInit() {
        this.data$ = this.http
            .get('https://example.com/api')
            .pipe(loadFirst());    
    }
}
```
