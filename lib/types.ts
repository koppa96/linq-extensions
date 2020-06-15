export type Predicate<T> = (element: T) => boolean;
export type BiPredicate<T, O> = (left: T, right: O) => boolean;
export type Selector<T, R> = (element: T) => R;
export type BiSelector<T, O, R> = (left: T, right: O) => R;
export type EqualityCheck<T> = (left: T, right: T) => boolean;