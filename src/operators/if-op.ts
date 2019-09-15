import {Observable, OperatorFunction} from 'rxjs';

export function ifOp<T, R>(cond: boolean, operator: OperatorFunction<T, R>): OperatorFunction<T, T | R> {
    return (source: Observable<T>): Observable<T | R> => {
        return cond ? source.pipe(operator) : source;
    };
}
