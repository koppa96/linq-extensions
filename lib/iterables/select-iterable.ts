import { Iterable } from '../iterable';

export class SelectIterable<T, R> extends Iterable<R> {
  constructor(
    private originalIterable: Iterable<T>,
    private selector: (element: T) => R
  ) {
    super();
  }
  
  *[Symbol.iterator](): IterableIterator<R> {
    for (const element of this.originalIterable) {
      yield this.selector(element);
    }
  }
}