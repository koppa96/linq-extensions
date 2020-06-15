import { Iterable } from "../iterable";

export class ReverseIterable<T> extends Iterable<T> {
  constructor(private originalIterable: Iterable<T>) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    const elements = this.originalIterable.toArray();
    for (let i = elements.length - 1; i >= 0; i--) {
      yield elements[i];
    }
  }
}
