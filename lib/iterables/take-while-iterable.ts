import { Iterable } from '../iterable';
import { BiPredicate } from '../types';

export class TakeWhileIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private predicate: BiPredicate<T, number>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let index = 0;
    for (const element of this.originalIterable) {
      if (this.predicate(element, index)) {
        yield element;
        index++;
      } else {
        return;
      }
    }
  }
}