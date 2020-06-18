import { Iterable } from '../iterable';
import { Predicate, BiPredicate } from '../types';

export class SkipWhileIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private predicate: BiPredicate<T, number>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let predicateFulfilled = true;
    let index = 0;
    for (const element of this.originalIterable) {
      if (!predicateFulfilled || !this.predicate(element, index)) {
        predicateFulfilled = false;
        yield element;
      }
      index++;
    }
  }
}