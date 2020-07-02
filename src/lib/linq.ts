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
import { BiSelector, Predicate, Selector, EqualityCheck, BiPredicate, Comparator, defaultComparator, defaultEqualityCheck, Action } from './types';
import { LeftJoinIterable } from './iterables/join/left-join-iterable';
import { OrderedIterable } from './iterables/ordered-iterable';
import { Ordering } from './iterables/ordering/ordering';
import { OuterJoinIterable } from './iterables/join/outer-join-iterable';
import { ReverseIterable } from './iterables/reverse-iterable';
import { SelectManyIterable } from './iterables/select-many-iterable';
import { SkipWhileIterable } from './iterables/skip-while-iterable';
import { TakeWhileIterable } from './iterables/take-while-iterable';
import { BatchIterable } from './iterables/batch-iterable';
import { InsertIterable } from './iterables/insert-iterable';

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
     * Returns whether at least the given amount of elements match the given predicate. If no predicate is given, it returns whether there are the given amount of elements in the sequence.
     * @param count The amount of elements the predicate should match at least
     * @param predicate The predicate to be checked
     * @returns True if at least the given count of elements match the predicate
     */
    atLeast(count: number, predicate?: Predicate<T>): boolean;

    /**
     * Returns whether at most the given amount of elements match the given predicate. If no predicate is given, it returns whether there are no more the given amount of elements in the sequence.
     * @param count The amount of elements the predicate should match at most
     * @param predicate The predicate to be checked
     * @returns True if at most the given count of elements match the predicate
     */
    atMost(count: number, predicate?: Predicate<T>): boolean;

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
     * Splits the sequence into batches of the given size, and returns the batches in a sequence.
     * @param batchSize The maximal size of one batch
     * @returns A sequence containing the batches
     */
    batch(batchSize: number): Iterable<Iterable<T>>;

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

    /**
     * Get the element of the sequence at the given position.
     * @param index The index of the element
     * @throws An error if the index is out of the bounds of the sequence
     * @returns The element at the given index
     */
    elementAt(index: number): T;

    endsWith(otherIterable: Iterable<T>, equalityCheck?: EqualityCheck<T>): boolean;

    /**
     * Determines whether exactly the given amount of elements match the predicate. If no predicate is given it determines whether there are exactly the given amount of elements in the sequence.
     * @param count The amount of elements that should be checked
     * @param predicate The predicate to be checked
     * @returns True if exactly the given amount of elements match the predicate
     */
    exactly(count: number, predicate?: Predicate<T>): boolean;

    /**
     * Gets the first element of the sequence that matches the given predicate, or the first element if no predicate is given.
     * @param predicate The predicate to be checked or undefined
     * @throws An error if the sequence is empty of no elements match the predicate
     * @returns The first element that matches the predicate or the first element
     */
    first(predicate?: Predicate<T>): T;

    /**
     * Gets the first element of the sequence that matches the given predicate, or the first element if no predicate is given, or null if the sequence is empty or no elements match the predicate.
     * @param predicate The predicate to be checked or undefined
     * @returns The first element the matches the predicate, the first element, or null
     */
    firstOrNull(predicate?: Predicate<T>): T | null;

    /**
     * Groups the elements of the sequence by the selected key.
     * @param keySelector The selector that selects the key to group by
     * @param equalityCheck A function that checks whether 2 keys are equal
     * @returns A sequence containing the groupings
     */
    groupBy<K>(keySelector: Selector<T, K>, equalityCheck?: EqualityCheck<K>): Iterable<Grouping<K, T>>;

    /**
     * Joins the elements of 2 sequences that match the given condition.
     * @param otherIterable The other sequence
     * @param condition A condition that defines when to perform a join on 2 elements
     * @param selector A function that maps the elements into the result element
     * @returns A sequence containing the joined elements
     */
    innerJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T, O, R>
    ): Iterable<R>;

    /**
     * Inserts an element into the given index of the source sequence.
     * @param index The index where the element should be inserted to
     * @param element The element to be inserted
     * @throws Error if the index is negative, or more than the amount of elements in the sequence
     * @returns A sequence containing the inserted element
     */
    insert(index: number, element: T): Iterable<T>;

    /**
     * Inserts multiple elements into the given index of the source sequence.
     * @param index The index where the element should be inserted to
     * @param elements The elements to be inserted
     * @throws Error if the index is negative, or more than the amount of elements in the sequence
     * @returns A sequence containing the inserted elements
     */
    insertMany(index: number, elements: Iterable<T>): Iterable<T>;

    /**
     * Gets the intersection of 2 sequences.
     * @param otherIterable The other sequence
     * @param equalityCheck A function that determines whether 2 elements are considered equal
     * @returns A sequence containing the elements that are in both of the sequences
     */
    intersect(otherIterable: Iterable<T>, equalityCheck?: EqualityCheck<T>): Iterable<T>;

    /**
     * Gets the last element in the sequence that matches the predicate, or the last element if no predicate is specified.
     * @param predicate The predicate to be tested
     * @throws An error if there are no elements in the sequence or no elements match the predicate
     * @returns The last element that matches the predicate or the last element
     */
    last(predicate?: Predicate<T>): T;

    /**
     * Gets the last element in the sequence that matches the predicate, or the last element if no predicate is specified, or null.
     * @param predicate The predicate to be tested
     * @returns The last element that matches the predicate, or the last element, or null
     */
    lastOrNull(predicate?: Predicate<T>): T | null;

    /**
     * Performs a left join operation with the given join condition. If an element in the current sequence can not be joined to any elements of the other sequence, it is joined with null.
     * @param otherIterable The other sequence
     * @param condition The condition that defines whether 2 elements should be joined
     * @param selector A function that maps the elements into the result element
     * @returns A sequence containing the joined elements
     */
    leftJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T, O | null, R>
    ): Iterable<R>;
    
    /**
     * Returns the maximum of the elements in the sequence.
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns The greatest element
     */
    max(comparator?: Comparator<T>): T;

    /**
     * Returns the element of the sequence which has the maximum of the value selected by the selector.
     * @param selector Selects a value for each element that will be checked
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns The element with the greatest selected value
     */
    maxBy<P>(selector: Selector<T, P>, comparator?: Comparator<P>): T;

    /**
     * Returns the greatest value selected by the selector for each element.
     * @param selector Selects a value for each element that will be checked
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns The greatest selected value
     */
    maxOf<P>(selector: Selector<T, P>, comparator?: Comparator<P>): P;

    merge(otherIterable: Iterable<T>, comparator?: Comparator<T>): Iterable<T>;

    /**
     * Returns the minimum of the elements in the sequence.
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns The smallest element
     */
    min(comparator?: Comparator<T>): T;

    /**
     * Returns the element of the sequence which has the minimum of the value selected by the selector.
     * @param selector Selects a value for each element that will be checked
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns The element with the smallest selected value
     */
    minBy<P>(selector: Selector<T, P>, comparator?: Comparator<P>): T;

    /**
     * Returns the smallest value selected by the selector for each element.
     * @param selector Selects a value for each element that will be checked
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns The smallest selected value
     */
    minOf<P>(selector: Selector<T, P>, comparator?: Comparator<P>): P;

    /**
     * Orders the elements of the sequence by a selected value ascending.
     * @param selector The selector that selects the value to order the elements by
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns A sequence ordered by the selected values
     */
    orderBy<P>(selector: Selector<T, P>, comparator?: Comparator<P>): OrderedIterable<T>;

    /**
     * Orders the elements of the sequence by a selected value descending.
     * @param selector The selector that selects the value to order the elements by
     * @param comparator A function that compares two elements and decides their relation (<, =, >)
     * @returns A sequence ordered by the selected values
     */
    orderByDescending<P>(selector: Selector<T, P>, comparator?: Comparator<P>): OrderedIterable<T>;

    /**
     * Performs a full outer join on 2 sequences with the given condition.
     * @param otherIterable The other sequence
     * @param condition The condition that defines whether 2 elements should be joined
     * @param selector A function that maps the elements into the result element
     * @returns A sequence containing the joined elements
     */
    outerJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T | null, O | null, R>
    ): Iterable<R>;

    pipe(action: Action<T>): Iterable<T>;

    /**
     * Creates a sequence that starts by the given element and contains the elements of the current sequence.
     * @param element The element to be added to the front
     * @returns A sequence containing the element and the elements of this sequence
     */
    prepend(element: T): Iterable<T>;

    /**
     * Creates a sequence that starts with the elements of the given sequence followed by the elements of the current sequence.
     * @param iterable The elements to be added to the front
     * @returns A sequence containing the elements of the other sequence and the current sequence
     */
    prependMany(iterable: Iterable<T>): Iterable<T>;

    position(element: T, equalityCheck?: EqualityCheck<T>): number;

    repeat(repeatCount: number): Iterable<T>;

    /**
     * Returns a sequence that contains the elements of the current sequence in reverse.
     * @returns A sequence containing the elements of this sequence in reverse
     */
    reverse(): Iterable<T>;

    /**
     * Performs a right join operation with the given join condition. If an element in the other sequence can not be joined to any elements of the current sequence, it is joined with null.
     * @param otherIterable The other sequence
     * @param condition The condition that defines whether 2 elements should be joined
     * @param selector A function that maps the elements into the result element
     * @returns A sequence containing the joined elements
     */
    rightJoin<O, R>(
      otherIterable: Iterable<O>,
      condition: BiPredicate<T, O>,
      selector: BiSelector<T | null, O, R>
    ): Iterable<R>;

    /**
     * Maps the elements of the current sequence into a new form
     * @param selector A function that performs the mapping for each element
     * @returns A sequence that contains the mapped elements
     */
    select<R>(selector: Selector<T, R>): Iterable<R>;

    /**
     * Projects the elements of the sequence into subcollections, then flattens the result.
     * @param collectionSelector Selects a subcollection for each element
     * @param selector Optionally maps each element with a subcollection element
     * @returns A sequence containing the flattened elements
     */
    selectMany<C, R = C>(collectionSelector: Selector<T, Iterable<C>>, selector?: BiSelector<T, C, R>): Iterable<R>;

    /**
     * Checks whether 2 sequences contain only the same elements.
     * @param sequence The other sequence
     * @param equalityCheck A function that determines whether 2 elements are considered equal
     * @returns Whether 2 sequences contain only the same elements
     */
    sequenceEqual(sequence: Iterable<T>, equalityCheck?: EqualityCheck<T>): boolean;

    shuffle(): Iterable<T>;

    /**
     * Returns a single element that matches the given predicate. If no predicate is given it returns the single element in the sequence.
     * @param predicate The predicate to be checked
     * @throws An error if the sequence is empty or has no element that matches the predicate, or more than one elements match the predicate
     * @returns The single element that matches the predicate, or the single element in the sequence
     */
    single(predicate?: Predicate<T>): T;

    /**
     * Returns a single element that matches the given predicate. If no predicate is given it returns the single element in the sequence. If no elements match it returns null.
     * @param predicate The predicate to be checked
     * @returns The single element that matches the predicate, or the single element in the sequence or null
     */
    singleOrNull(predicate?: Predicate<T>): T | null;

    /**
     * Skips the given amount of elements from the front of the sequence.
     * @param count The number of elements to be skipped
     * @returns A sequence without the first count elements
     */
    skip(count: number): Iterable<T>;

    skipEvery(n: number): Iterable<T>;

    /**
     * Skips the given amount of elements from the end of the sequence.
     * @param count The number of elements to be skipped
     * @returns A sequence without the last count elements
     */
    skipLast(count: number): Iterable<T>;

    /**
     * Skips the elements of the sequence while the given predicate is satisfied.
     * @param predicate The predicate to be checked
     * @returns A sequence without the skipped elements
     */
    skipWhile(predicate: BiPredicate<T, number>): Iterable<T>;

    startsWith(otherIterable: Iterable<T>, equalityCheck?: EqualityCheck<T>): boolean;

    /**
     * Gets the sum of the elements of the sequence if the sequence contains a number.
     * @throws An error if not all the elements of the sequence are numbers
     * @returns The sum of the elements of the sequence
     */
    sum(): number;

    /**
     * Gets the sum of the values mapped by the selector.
     * @param selector The selector that maps the elements into the value
     * @returns The sum of the mapped elements
     */
    sumOf(selector: Selector<T, number>): number;

    /**
     * Takes the given amount of the elements from the front of the sequence.
     * @param count The amount of elements to be taken
     * @returns A sequence with the taken elements
     */
    take(count: number): Iterable<T>;

    takeEvery(n: number): Iterable<T>;

    /**
     * Takes the given amount of the elements from the end of the sequence.
     * @param count The amount of elements to be taken
     * @returns A sequence with the taken elements
     */
    takeLast(count: number): Iterable<T>;

    /**
     * Takes the elements of the sequence while the given predicate is true.
     * @param predicate The predicate to be checked
     * @returns A sequence with the taken elements
     */
    takeWhile(predicate: BiPredicate<T, number>): Iterable<T>;

    /**
     * Enumerates the elements of the sequence and returns them in an array.
     * @returns An array that contains the elements of the sequence
     */
    toArray(): T[];

    /**
     * Enumerates the elements of the sequence and retuns the in a map with the given key and value selecting mechanism.
     * @param keySelector A function that selects a key for each element
     * @param valueSelector A function that selects a value for each element
     * @returns The map containing the keys and values
     */
    toMap<K, V>(keySelector: Selector<T, K>, valueSelector: Selector<T, V>): Map<K, V>;

    /**
     * Enumerates the elements of the sequence and returns them in a set.
     * @returns A Set containing the elements of the sequence
     */
    toSet(): Set<T>;

    /**
     * Gets the union of the elements of the 2 sequences.
     * @param otherIterable The other sequence
     * @param equalityCheck A function that determines whether 2 elements are considered equal
     * @returns A sequence containing the distinct elements of both collections
     */
    union(otherIterable: Iterable<T>, equalityCheck?: EqualityCheck<T>): Iterable<T>;

    /**
     * Returns a sequence filtered by the given predicate, keeping the elements that match the predicate.
     * @param predicate The predicate to be checked
     * @returns A sequence filtered by the given predicate
     */
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

Iterable.prototype.atLeast = function <T>(
  this: Iterable<T>,
  count: number,
  predicate: Predicate<T> = element => true
): boolean {
  if (count < 0) {
    throw new Error('The count must be a non-negative number.');
  }

  let matches = 0;
  for (const element of this) {
    if (predicate(element)) {
      matches++;
    }
    if (matches >= count) {
      return true;
    }
  }

  return false;
}

Iterable.prototype.atMost = function <T>(
  this: Iterable<T>,
  count: number,
  predicate: Predicate<T> = element => true
): boolean {
  let matches = 0;
  for (const element of this) {
    if (predicate(element)) {
      matches++;
    }
    if (matches > count) {
      return false;
    }
  }

  return true;
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

Iterable.prototype.batch = function <T>(this: Iterable<T>, batchSize: number): Iterable<Iterable<T>> {
  if (batchSize < 1) {
    throw new Error('The batch size must be a positive number.');
  }

  return new BatchIterable(this, batchSize);
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

Iterable.prototype.exactly = function <T>(this: Iterable<T>, count: number, predicate: Predicate<T> = () => true): boolean {
  return this.count(predicate) === count;
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

Iterable.prototype.groupBy = function <T, K>(
  this: Iterable<T>,
  keySelector: Selector<T, K>,
  equalityCheck: EqualityCheck<K> = defaultEqualityCheck
): Iterable<Grouping<K, T>> {
  return new GroupingIterable(this, keySelector, equalityCheck);
}

Iterable.prototype.innerJoin = function <T, O, R>(
  this: Iterable<T>,
  otherIterable: Iterable<O>,
  condition: BiPredicate<T, O>,
  selector: BiSelector<T, O, R>
) {
  return new InnerJoinIterable(this, otherIterable, condition, selector);
}

Iterable.prototype.insert = function <T>(this: Iterable<T>, index: number, element: T): Iterable<T> {
  return this.insertMany(index, [element]);
}

Iterable.prototype.insertMany = function <T>(this: Iterable<T>, index: number, elements: Iterable<T>): Iterable<T> {
  return new InsertIterable(this, index, elements);
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

export function empty<T>(): Iterable<T> {
  return new EmptyIterable();
}

export function from<T>(...elements: T[]): Iterable<T> {
  return elements;
}

export function generate<T>(count: number, generator: Selector<number, T>): Iterable<T> {
  return range(0, count).select(generator);
}

export function random(count: number, minimum: number, maximum: number): Iterable<number> {
  return range(0, count).select(() => Math.random() * maximum + minimum);
}

export function range(from: number, count: number): Iterable<number> {
  return new RangeIterable(from, count);
}
