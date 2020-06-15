import { Iterable } from '../iterable';
import { Predicate } from '../types';

export class WhereIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private predicate: Predicate<T>
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
