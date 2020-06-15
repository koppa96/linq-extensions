import { Iterable } from '../iterable';
import { Selector, EqualityCheck } from '../types';

export class DistinctIterable<T, P> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private selector: Selector<T, P>,
    private equalityCheck: EqualityCheck<P>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    const iteratedElements: P[] = [];
    for (const element of this.originalIterable) {
      const mappedElement = this.selector(element);
      if (iteratedElements.all(x => !this.equalityCheck(x, mappedElement))) {
        iteratedElements.push(mappedElement);
        yield element;
      }
    }
  }
}