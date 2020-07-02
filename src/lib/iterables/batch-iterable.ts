import { Iterable } from '../iterable';

export class BatchIterable<T> extends Iterable<Iterable<T>> {
  constructor(
    private originalIterable: Iterable<T>,
    private batchSize: number
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<Iterable<T>> {
    const iterator = this.originalIterable[Symbol.iterator]();

    while (true) {
      let i = 0;
      let current = iterator.next();
      const batch: T[] = [];
      while (i < this.batchSize && !current.done) {
        batch.push(current.value);
        i++;
        current = iterator.next();
      }
      yield batch;
      
      if (current.done) {
        return;
      }
    }
  }
}