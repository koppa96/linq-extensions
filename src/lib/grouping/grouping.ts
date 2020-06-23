import { Iterable } from '../iterable';

export class Grouping<K, V> extends Iterable<V> {
  constructor(
    public key: K,
    private values: Iterable<V>
  ) {
    super();
  }

  [Symbol.iterator](): IterableIterator<V> {
    return this.values[Symbol.iterator]();
  }
}