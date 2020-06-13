import { Iterable } from '../iterable';

export class AppendIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private elements: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const element of this.originalIterable) {
      yield element;
    }
    for (const element of this.elements) {
      yield element;
    }
  }
}