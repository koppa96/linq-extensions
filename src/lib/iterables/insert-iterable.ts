import { Iterable } from '../iterable';

export class InsertIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private index: number,
    private iterableToBeInserted: Iterable<T>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let i = 0;
    for (const element of this.originalIterable) {
      if (i !== this.index) {
        yield element;
      } else {
        for (const otherElement of this.iterableToBeInserted) {
          yield otherElement;
        }
      }
    }
  }
}