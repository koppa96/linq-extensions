import { Iterable } from './iterable';
import { WhereIterable } from './iterables/where-iterable';
import { AppendIterable } from './iterables/apped-iterable';
import { DistinctIterable } from './iterables/distinct-iterable';
import { RangeIterable } from './iterables/range-iterable';
import { EmptyIterable } from './iterables/empty-iterable';
import { SelectIterable } from './iterables/select-iterable';
import { Grouping } from './grouping/grouping';
import { GroupingIterable } from './iterables/grouping-iterable';
import { InnerJoinIterable } from './iterables/join/inner-join-iterable';
import { BiSelector, Predicate, Selector, EqualityCheck, BiPredicate, Comparator, defaultComparator, defaultEqualityCheck } from './types';
import { LeftJoinIterable } from './iterables/join/left-join-iterable';
import { OrderedIterable } from './iterables/ordered-iterable';
import { Ordering } from './iterables/ordering/ordering';
import { OuterJoinIterable } from './iterables/join/outer-join-iterable';
import { ReverseIterable } from './iterables/reverse-iterable';
import { SelectManyIterable } from './iterables/select-many-iterable';
import { SkipWhileIterable } from './iterables/skip-while-iterable';
import { TakeWhileIterable } from './iterables/take-while-iterable';

declare module './iterable' {
  /**
   * Exposes an IterableIterator which allows iteration over the values of the sequence.
   */
  export interface Iterable<T> {
    /**
     * Calculates an aggregated value from the sequence.
     * @param seed The initial value of the aggregation
     * @param accumulator A function that calculates a new aggregated value from the current aggregated value and the current element
     * @returns The aggregated value
     */
    aggregate<A>(seed: A, accumulator: BiSelector<A, T, A>): A;

    /**
     * Determines whether all elements of the sequence satisfy the given predicate.
     * @param predicate The predicate to be checked
     * @returns True if all elements satisfy the predicate, false otherwise
     */
    all(predicate: Predicate<T>): boolean;

    /**
     * Determines whether any element of the sequence satisfies the given predicate.
     * @param predicate The predicate to be checked
     * @returns True if at least one element satisfies the predicate, false otherwise
     */
    any(predicate: Predicate<T>): boolean;

    /**
     * Creates a new sequence with the elements of this sequence and a new element. Note that this doesn't change the original sequence.
     * @param element The element to be appended
     * @returns The new sequence with the appended element
     */
    append(element: T): Iterable<T>;

    /**
     * Creates a new sequence with the elements of this sequence and the elements of an other sequence concatenated to the end. Note that tis doesn't change the original sequence.
     * @param iterable The sequence to be appended
     * @returns The new sequence with the appended elements
     */
    appendMany(iterable: Iterable<T>): Iterable<T>;

    /**
     * Returns the concrete sequence implementation as an abstract Iterable.
     * @returns The sequence as an abstract Iterable
     */
    asIterable(): Iterable<T>;

    /**
     * Calculates the average of the elements of the sequence, if the elements of the sequence are numbers.
     * @returns The average of the elements
     * @throws An error if one of the elements of the sequence is not a number
     */
    average(): number;

    /**
     * Calculates the average of a specified mapped value from the elements of the sequence.
     * @param selector A function that maps the element of the sequence into a number
     * @returns The average of the mapping results
     */
    averageOf(selector: Selector<T, number>): number;

    /**
     * Gets the count of the elements that satisfy the given predicate. If no predicate is given it returns the number of elements in the sequence.
     * @param predicate The predicate to be checked or undefined
     * @returns The count of elements that satisfy the given predicate, or the count of all the elements
     */
    count(predicate?: Predicate<T>): number;

    /**
     * Gets the distinct elements of the sequence according to the given equality check function. If no equality check is specified, it uses the default equality check (===).
     * @param equalityCheck A function that checks whether or not two elements of the sequence are equal
     * @returns A sequence containing the distinct elements
     */
    distinct(equalityCheck?: EqualityCheck<T>): Iterable<T>;

    /**
     * Gets the elements that are distinct by a specific mapping (e.g. id) according to tha given equality check function. If no equality check is specified, it uses the default equality check(===).
     * @param selector A function that maps the element
     * @param equalityCheck A function that check wheter or not two mapped elements are equal
     * @returns A sequence containing the elements that are distinct by the mapping
     */
    distinctBy<P>(selector: Selector<T, P>, equalityCheck?: EqualityCheck<P>): Iterable<T>;
    elementAt(index: number): T;
    first(predicate?: Predicate<T>): T;
    firstOrNull(predicate?: Predicate<T>): T | null;
    groupBy<K>(keySelector: Selector<T, K>): Iterable<Grouping<K, T>>;
    innerJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T, O, R>
    ): Iterable<R>;
    intersect(otherIterable: Iterable<T>, equalityCheck?: EqualityCheck<T>): Iterable<T>;
    last(predicate?: Predicate<T>): T;
    lastOrNull(predicate?: Predicate<T>): T | null;
    leftJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T, O | null, R>
    ): Iterable<R>;
    max(comparator?: Comparator<T>): T;
    maxBy<P>(selector: Selector<T, P>, comparator?: Comparator<P>): T;
    maxOf<P>(selector: Selector<T, P>, comparator?: Comparator<P>): P;
    min(comparator?: Comparator<T>): T;
    minBy<P>(selector: Selector<T, P>, comparator?: Comparator<P>): T;
    minOf<P>(selector: Selector<T, P>, comparator?: Comparator<P>): P;
    orderBy<P>(selector: Selector<T, P>, comparator?: Comparator<P>): OrderedIterable<T>;
    orderByDescending<P>(selector: Selector<T, P>, comparator?: Comparator<P>): OrderedIterable<T>;
    outerJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T | null, O | null, R>
    ): Iterable<R>
    prepend(element: T): Iterable<T>;
    prependMany(iterable: Iterable<T>): Iterable<T>;
    reverse(): Iterable<T>;
    rightJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T | null, O, R>
    ): Iterable<R>;
    select<R>(selector: Selector<T, R>): Iterable<R>;
    selectMany<C, R = C>(collectionSelector: Selector<T, Iterable<C>>, selector?: BiSelector<T, C, R>): Iterable<R>;
    sequenceEqual(sequence: Iterable<T>, equalityCheck?: EqualityCheck<T>): boolean;
    single(predicate?: Predicate<T>): T;
    singleOrNull(predicate?: Predicate<T>): T | null;
    skip(count: number): Iterable<T>;
    skipLast(count: number): Iterable<T>;
    skipWhile(predicate: BiPredicate<T, number>): Iterable<T>;
    sum(): number;
    sumOf(selector: Selector<T, number>): number;
    take(count: number): Iterable<T>;
    takeLast(count: number): Iterable<T>;
    takeWhile(predicate: BiPredicate<T, number>): Iterable<T>;
    toArray(): T[];
    toMap<K, V>(keySelector: Selector<T, K>, valueSelector: Selector<T, V>): Map<K, V>;
    toSet(): Set<T>;
    union(otherIterable: Iterable<T>, equalityCheck?: EqualityCheck<T>): Iterable<T>;
    where(predicate: Predicate<T>): Iterable<T>;
  }
}

declare global {
  export interface Array<T> extends Iterable<T> { }
  export interface Set<T> extends Iterable<T> { }
  export interface Map<K, V> extends Iterable<[K, V]> { }
}

Iterable.prototype.aggregate = function <T, A>(
  this: Iterable<T>,
  seed: A,
  accumulator: BiSelector<A, T, A>
): A {
  let accumulate = seed;
  for (const element of this) {
    accumulate = accumulator(accumulate, element);
  }
  return accumulate;
}

Iterable.prototype.all = function <T>(this: Iterable<T>, predicate: Predicate<T>): boolean {
  for (const element of this) {
    if (!predicate(element)) {
      return false;
    }
  }
  return true;
}

Iterable.prototype.any = function <T>(this: Iterable<T>, predicate: Predicate<T>): boolean {
  return !this.all(element => !predicate(element));
}

Iterable.prototype.append = function <T>(this: Iterable<T>, element: T): Iterable<T> {
  return this.appendMany([element]);
}

Iterable.prototype.appendMany = function <T>(this: Iterable<T>, elements: Iterable<T>): Iterable<T> {
  return new AppendIterable(this, elements);
}

Iterable.prototype.asIterable = function <T>(this: Iterable<T>): Iterable<T> {
  return this;
}

Iterable.prototype.average = function <T>(this: Iterable<T>): number {
  let sum = 0;
  let count = 0;
  for (const element of this) {
    if (typeof element !== 'number') {
      throw new Error('Average can only be calculated on sequences that only contain numbers.');
    }
    sum += element;
    count++;
  }
  return sum / count;
}

Iterable.prototype.averageOf = function <T>(this: Iterable<T>, selector: Selector<T, number>): number {
  return this.select(selector).average();
}

Iterable.prototype.count = function <T>(
  this: Iterable<T>,
  predicate: Predicate<T> = element => true
): number {
  let count = 0;
  for (const element of this) {
    if (predicate(element)) {
      count++;
    }
  }
  return count;
}

Iterable.prototype.distinct = function <T>(this: Iterable<T>, equalityCheck?: EqualityCheck<T>): Iterable<T> {
  return this.distinctBy(x => x, equalityCheck);
}

Iterable.prototype.distinctBy = function <T, P>(
  this: Iterable<T>,
  selector: Selector<T, P>,
  equalityCheck: EqualityCheck<P> = defaultEqualityCheck
): Iterable<T> {
  return new DistinctIterable(
    this,
    selector,
    equalityCheck
  )
}

Iterable.prototype.elementAt = function <T>(this: Iterable<T>, index: number): T {
  if (index < 0) {
    throw new Error('Index out of range.');
  }
  let i = 0;
  for (const element of this) {
    if (i === index) {
      return element;
    }
    i++;
  }
  throw new Error('Index out of range.');
}

Iterable.prototype.first = function <T>(this: Iterable<T>, predicate?: Predicate<T>): T {
  const firstOrNull = this.firstOrNull(predicate);
  if (firstOrNull !== null) {
    return firstOrNull;
  } else {
    throw new Error('The sequence contains no matching element.');
  }
}

Iterable.prototype.firstOrNull = function <T>(
  this: Iterable<T>,
  predicate: Predicate<T> = element => true
): T | null {
  for (const element of this) {
    if (predicate(element)) {
      return element;
    }
  }
  return null;
}

Iterable.prototype.groupBy = function <T, K>(this: Iterable<T>, keySelector: Selector<T, K>): Iterable<Grouping<K, T>> {
  return new GroupingIterable(this, keySelector);
}

Iterable.prototype.innerJoin = function <T, O, R>(
  this: Iterable<T>,
  otherIterable: Iterable<O>,
  condition: BiPredicate<T, O>,
  selector: BiSelector<T, O, R>
) {
  return new InnerJoinIterable(this, otherIterable, condition, selector);
}

Iterable.prototype.intersect = function <T>(
  this: Iterable<T>,
  otherIterable: Iterable<T>,
  equalityCheck: EqualityCheck<T> = defaultEqualityCheck
): Iterable<T> {
  return this.innerJoin(
    otherIterable,
    equalityCheck,
    (left, right) => left
  );
}

Iterable.prototype.last = function <T>(this: Iterable<T>, predicate?: Predicate<T>): T {
  const lastOrNull = this.lastOrNull(predicate);
  if (lastOrNull === null) {
    throw new Error('The sequence contains no matching element.');
  }
  return lastOrNull;
}

Iterable.prototype.lastOrNull = function <T>(this: Iterable<T>, predicate: Predicate<T> = element => true): T | null {
  let last = null;
  for (const element of this) {
    if (predicate(element)) {
      last = element;
    }
  }
  return last;
}

Iterable.prototype.leftJoin = function <T, O, R>(
  this: Iterable<T>,
  otherIterable: Iterable<O>,
  condition: BiPredicate<T, O>,
  selector: BiSelector<T, O | null, R>
) {
  return new LeftJoinIterable(this, otherIterable, condition, selector);
}

Iterable.prototype.max = function <T>(this: Iterable<T>, comparator: Comparator<T> = defaultComparator): T {
  let max: T | null = null;
  for (const element of this) {
    if (max === null || comparator(max, element) < 0) {
      max = element;
    }
  }
  
  if (max === null) {
    throw new Error('The sequence contains no elements.');
  }
  return max;
}

Iterable.prototype.maxBy = function <T, P>(this: Iterable<T>, selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): T {
  return this.select(x => ({ original: x, selected: selector(x) }))
    .max((left, right) => comparator(left.selected, right.selected)).original;
}

Iterable.prototype.maxOf = function <T, P>(this: Iterable<T>, selector: Selector<T, P>, comparator?: Comparator<P>): P {
  return this.select(selector).max(comparator);
}

Iterable.prototype.min = function <T>(this: Iterable<T>, comparator: Comparator<T> = defaultComparator): T {
  return this.max((left, right) => comparator(right, left));
}

Iterable.prototype.minBy = function <T, P>(this: Iterable<T>, selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): T {
  return this.maxBy(selector, (left, right) => comparator(right, left))
}

Iterable.prototype.maxOf = function <T, P>(this: Iterable<T>, selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): P {
  return this.maxOf(selector, (left, right) => comparator(right, left));
}

Iterable.prototype.orderBy = function <T, P>(this: Iterable<T>, selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): OrderedIterable<T> {
  return new OrderedIterable(this, new Ordering(selector, comparator, 'asc'));
}

Iterable.prototype.orderByDescending = function <T, P>(this: Iterable<T>, selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): OrderedIterable<T> {
  return new OrderedIterable(this, new Ordering(selector, comparator, 'desc'));
}

Iterable.prototype.outerJoin = function <T, O, R>(
  this: Iterable<T>,
  otherIterable: Iterable<O>,
  condition: BiPredicate<T, O>,
  selector: BiSelector<T | null, O | null, R>
): Iterable<R> {
  return new OuterJoinIterable(this, otherIterable, condition, selector);
}

Iterable.prototype.prepend = function <T>(this: Iterable<T>, element: T): Iterable<T> {
  return this.prependMany([element]);
}

Iterable.prototype.prependMany = function <T>(this: Iterable<T>, otherIterable: Iterable<T>): Iterable<T> {
  return otherIterable.appendMany(this);
}

Iterable.prototype.reverse = function <T>(this: Iterable<T>): Iterable<T> {
  return new ReverseIterable(this);
}

Iterable.prototype.rightJoin = function <T, O, R>(
  this: Iterable<T>,
  otherIterable: Iterable<O>,
  condition: BiPredicate<T, O>,
  selector: BiSelector<T | null, O, R>
): Iterable<R> {
  return otherIterable.leftJoin(this, (left, right) => condition(right, left), (left, right) => selector(right, left));
}

Iterable.prototype.select = function <T, R>(this: Iterable<T>, selector: Selector<T, R>): Iterable<R> {
  return new SelectIterable(this, selector);
}

Iterable.prototype.selectMany = function <T, C, R = C>(
  collectionSelector: Selector<T, Iterable<C>>,
  selector: BiSelector<T, C, R> = (left, right) => right as any
): Iterable<R> {
  return new SelectManyIterable(this, collectionSelector, selector);
}

Iterable.prototype.sequenceEqual = function <T>(
  this: Iterable<T>,
  otherIterable: Iterable<T>,
  equalityCheck: EqualityCheck<T> = defaultEqualityCheck
): boolean {
  const iterator1 = this[Symbol.iterator]();
  const iterator2 = otherIterable[Symbol.iterator]();

  while (true) {
    const result1 = iterator1.next();
    const result2 = iterator2.next();

    if (result1.done) {
      if (result2.done) {
        return true;
      } else {
        return false;
      }
    } else {
      if (result2.done) {
        return false;
      } else {
        if (!equalityCheck(result1.value, result2.value)) {
          return false;
        }
      }
    }
  }
}

Iterable.prototype.single = function <T>(this: Iterable<T>, predicate: Predicate<T>): T {
  const singleOrNull = this.singleOrNull();
  if (singleOrNull === null) {
    throw new Error('The sequence contains no matching element.');
  }
  return singleOrNull;
}

Iterable.prototype.skip = function <T>(this: Iterable<T>, count: number): Iterable<T> {
  return this.skipWhile((element, index) => index < count);
}

Iterable.prototype.skipLast = function <T>(this: Iterable<T>, count: number): Iterable<T> {
  const iterableCount = this.count();
  return this.takeWhile((element, index) => index < iterableCount - count);
}

Iterable.prototype.skipWhile = function <T>(this: Iterable<T>, predicate: BiPredicate<T, number>): Iterable<T> {
  return new SkipWhileIterable(this, predicate);
}

Iterable.prototype.sum = function <T>(this: Iterable<T>): number {
  let sum = 0;
  for (const element of this) {
    if (typeof element !== 'number') {
      throw new Error('Sum can only be calculated on sequences that only contain numbers.');
    }
    sum += element;
  }
  return sum;
}

Iterable.prototype.sumOf = function <T>(this: Iterable<T>, selector: Selector<T, number>): number {
  return this.select(selector).sum();
}

Iterable.prototype.take = function <T>(this: Iterable<T>, count: number): Iterable<T> {
  return this.takeWhile((element, index) => index < count);
}

Iterable.prototype.takeLast = function <T>(this: Iterable<T>, count: number): Iterable<T> {
  const iterableCount = this.count();
  return this.skipWhile((element, index) => index < iterableCount - count);
}

Iterable.prototype.takeWhile = function <T>(this: Iterable<T>, predicate: BiPredicate<T, number>): Iterable<T> {
  return new TakeWhileIterable(this, predicate);
}

Iterable.prototype.singleOrNull = function <T>(this: Iterable<T>, predicate: Predicate<T>): T | null {
  let result: T | null = null;
  for (const element of this) {
    if (predicate(element)) {
      if (result) {
        throw new Error('The sequence contains more than one matching element.');
      } else {
        result = element;
      }
    }
  }
  return result;
}

Iterable.prototype.toArray = function <T>(this: Iterable<T>): T[] {
  return Array.from(this);
}

Iterable.prototype.toMap = function <T, K, V>(
  this: Iterable<T>,
  keySelector: Selector<T, K>,
  valueSelector: Selector<T, V>
): Map<K, V> {
  return new Map<K, V>(this.select(x => [keySelector(x), valueSelector(x)]));
}

Iterable.prototype.toSet = function <T>(this: Iterable<T>): Set<T> {
  return new Set<T>(this);
}

Iterable.prototype.union = function <T>(
  this: Iterable<T>,
  otherIterable: Iterable<T>,
  equalityCheck?: EqualityCheck<T>
): Iterable<T> {
  return this.appendMany(otherIterable).distinct(equalityCheck);
}

Iterable.prototype.where = function <T>(this: Iterable<T>, predicate: Predicate<T>): Iterable<T> {
  return new WhereIterable(this, predicate);
}

Object.assign(Array.prototype, Iterable.prototype);
Object.assign(Set.prototype, Iterable.prototype);
Object.assign(Map.prototype, Iterable.prototype);

export function range(from: number, count: number): Iterable<number> {
  return new RangeIterable(from, count);
}

export function empty<T>(): Iterable<T> {
  return new EmptyIterable();
}
