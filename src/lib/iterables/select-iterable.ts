import { Iterable } from '../iterable';
import { Selector } from '../types';

export class SelectIterable<T, R> extends Iterable<R> {
  constructor(
    private originalIterable: Iterable<T>,
    private selector: Selector<T, R>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<R> {
    for (const element of this.originalIterable) {
      yield this.selector(element);
    }
  }
}