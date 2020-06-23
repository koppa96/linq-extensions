import { Iterable } from '../iterable';

export class EmptyIterable<T> extends Iterable<T> {
  *[Symbol.iterator](): IterableIterator<T> { }
}