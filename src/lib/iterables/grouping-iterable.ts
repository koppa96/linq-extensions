import { Iterable } from '../iterable';
import { Grouping } from '../grouping/grouping';
import { Selector, EqualityCheck } from '../types';

export class GroupingIterable<K, V> extends Iterable<Grouping<K, V>> {
  constructor(
    private originalIterable: Iterable<V>,
    private keySelector: Selector<V, K>,
    private equalityCheck: EqualityCheck<K>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<Grouping<K, V>> {
    const keys = this.originalIterable.select(this.keySelector).distinct(this.equalityCheck);
    for (const key of keys) {
      yield new Grouping(key, this.originalIterable.where(x => this.keySelector(x) === key));
    }
  }
}