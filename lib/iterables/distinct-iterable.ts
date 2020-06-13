import { Iterable } from '../iterable';

export class DistinctIterable<T, P> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private selector: (element: T) => P,
    private equalityCheck: (left: P, right: P) => boolean
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