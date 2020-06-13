import { Iterable } from './iterable';
import { WhereIterable } from './iterables/where-iterable';
import { AppendIterable } from './iterables/apped-iterable';
import { DistinctIterable } from './iterables/distinct-iterable';
import { RangeIterable } from './iterables/range-iterable';
import { EmptyIterable } from './iterables/empty-iterable';
import { SelectIterable } from './iterables/select-iterable';
import { Grouping } from './grouping/grouping';
import { GroupingIterable } from './iterables/grouping-iterable';

declare module './iterable' {
  export interface Iterable<T> {
    aggregate<A>(seed: A, accumulator: (accumulate: A, element: T) => A): A;
    all(predicate: (element: T) => boolean): boolean;
    any(predicate: (element: T) => boolean): boolean;
    append(element: T): Iterable<T>;
    appendMany(iterable: Iterable<T>): Iterable<T>;
    asIterable(): Iterable<T>;
    average(): number;
    averageOf(selector: (element: T) => number): number;
    count(predicate?: (element: T) => boolean): number;
    distinct(equalityCheck?: (left: T, right: T) => boolean): Iterable<T>;
    distinctBy<P>(selector: (element: T) => P, equalityCheck?: (left: P, right: P) => boolean): Iterable<T>;
    elementAt(index: number): T;
    first(predicate?: (element: T) => boolean): T;
    firstOrNull(predicate?: (element: T) => boolean): T | null;
    groupBy<K>(keySelector: (element: T) => K): Iterable<Grouping<K, T>>;
    // innerJoin<O>(iterable: Iterable<O>): Join<T, O>;
    intersect(equalityCheck?: (left: T, right: T) => boolean): Iterable<T>;
    last(predicate?: (element: T) => boolean): T;
    lastOrNull(predicate?: (element: T) => boolean): T | null;
    // leftJoin<O>(iterable: Iterable<O>): Join<T, O>;
    max(): T;
    maxBy<P>(selector: (element: T) => P): T;
    maxOf<P>(selector: (element: T) => P): P;
    min(): T;
    minBy<P>(selector: (element: T) => P): T;
    minOf<P>(selector: (element: T) => P): P;
    // outerJoin<O>(iterable: Iterable<O>): Join<T, O>;
    prepend(element: T): Iterable<T>;
    prependMany(iterable: Iterable<T>): Iterable<T>;
    reverse(): Iterable<T>;
    // rightJoin<O>(iterable: Iterable<O>): Join<T, O>;
    select<R>(selector: (element: T) => R): Iterable<R>;
    selectMany<C, R = C>(collectionSelector: (element: T) => Iterable<C>, selector?: (element: T, collectionElement: C) => R): Iterable<R>;
    sequenceEqual(sequence: Iterable<T>): boolean;
    single(predicate?: (element: T) => boolean): T;
    singleOrNull(predicate?: (element: T) => boolean): T | null;
    skip(count: number): Iterable<T>;
    skipLast(count: number): Iterable<T>;
    skipWhile(predicate: (element: T) => boolean): Iterable<T>;
    sum(): number;
    sumOf(selector: (element: T) => number): number;
    take(count: number): Iterable<T>;
    takeLast(count: number): Iterable<T>;
    takeWhile(predicate: (element: T) => boolean): Iterable<T>;
    toArray(): T[];
    toMap<K, V>(keySelector: (element: T) => K, valueSelector: (element: T) => V): Map<K, V>;
    toSet(): Set<T>;
    where(predicate: (element: T) => boolean): Iterable<T>;
  }
}

declare global {
  export interface Array<T> extends Iterable<T> { }
  export interface Set<T> extends Iterable<T> { }
  export interface Map<K, V> extends Iterable<[K, V]> { }
}

Iterable.prototype.aggregate = function<T, A>(
  this: Iterable<T>,
  seed: A,
  accumulator: (accumulate: A, element: T) => A
): A {
  let accumulate = seed;
  for (const element of this) {
    accumulate = accumulator(accumulate, element);
  }
  return accumulate;
}

Iterable.prototype.all = function<T>(this: Iterable<T>, predicate: (element: T) => boolean): boolean {
  for (const element of this) {
    if (!predicate(element)) {
      return false;
    }
  }
  return true;
}

Iterable.prototype.any = function<T>(this: Iterable<T>, predicate: (element: T) => boolean): boolean {
  return !this.all(element => !predicate(element));
}

Iterable.prototype.append = function<T>(this: Iterable<T>, element: T): Iterable<T> {
  return this.appendMany([element]);
}

Iterable.prototype.appendMany = function<T>(this: Iterable<T>, elements: Iterable<T>): Iterable<T> {
  return new AppendIterable(this, elements);
}

Iterable.prototype.asIterable = function<T>(this: Iterable<T>): Iterable<T> {
  return this;
}

Iterable.prototype.average = function<T>(this: Iterable<T>): number {
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

Iterable.prototype.averageOf = function<T>(this: Iterable<T>, selector: (element: T) => number): number {
  return this.select(selector).average();
}

Iterable.prototype.count = function<T>(this: Iterable<T>, predicate?: (element: T) => boolean): number {
  let count = 0;
  predicate = predicate ? predicate : element => true;
  for (const element of this) {
    if (predicate(element)) {
      count++;
    }
  }
  return count;
}

Iterable.prototype.distinct = function<T>(this: Iterable<T>, equalityCheck?: (left: T, right: T) => boolean): Iterable<T> {
  return this.distinctBy(x => x, equalityCheck);
}

Iterable.prototype.distinctBy = function<T, P>(
  this: Iterable<T>,
  selector: (element: T) => P,
  equalityCheck?: (left: P, right: P) => boolean
): Iterable<T> {
  return new DistinctIterable(
    this,
    selector,
    equalityCheck ? equalityCheck : (left, right) => left === right
  )
}

Iterable.prototype.elementAt = function<T>(this: Iterable<T>, index: number): T {
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

Iterable.prototype.first = function<T>(this: Iterable<T>, predicate?: (element: T) => boolean): T {
  const firstOrNull = this.firstOrNull(predicate);
  if (firstOrNull !== null) {
    return firstOrNull;
  } else {
    throw new Error('The sequence contains no matching element.');
  }
}

Iterable.prototype.firstOrNull = function<T>(this: Iterable<T>, predicate?: (element: T) => boolean): T | null {
  predicate = predicate ? predicate : element => true;
  for (const element of this) {
    if (predicate(element)) {
      return element;
    }
  }
  return null;
}

Iterable.prototype.groupBy = function<T, K>(this: Iterable<T>, keySelector: (element: T) => K): Iterable<Grouping<K, T>> {
  return new GroupingIterable(this, keySelector);
}

Iterable.prototype.select = function<T, R>(this: Iterable<T>, selector: (element: T) => R): Iterable<R> {
  return new SelectIterable(this, selector);
}

Iterable.prototype.where = function<T>(this: Iterable<T>, predicate: (element: T) => boolean): Iterable<T> {
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
