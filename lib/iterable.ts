export abstract class Iterable<T> {
  abstract [Symbol.iterator](): IterableIterator<T>;
}