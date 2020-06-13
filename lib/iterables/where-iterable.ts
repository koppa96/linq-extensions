import { Iterable } from '../iterable';

export class WhereIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private predicate: (element: T) => boolean
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const element of this.originalIterable) {
      if (this.predicate(element)) {
        yield element;
      }
    }
  }
}
