import { Iterable } from '../iterable';
import { Selector, BiSelector } from '../types';

export class SelectManyIterable<T, C, R> extends Iterable<R> {
  constructor(
    private iterable: Iterable<T>,
    private collectionSelector: Selector<T, Iterable<C>>,
    private resultSelector: BiSelector<T, C, R>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<R> {
    for (const element of this.iterable) {
      for (const collectionElement of this.collectionSelector(element)) {
        yield this.resultSelector(element, collectionElement);
      }
    }
  }
}