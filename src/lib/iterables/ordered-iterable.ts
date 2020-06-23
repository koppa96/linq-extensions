import { Iterable } from '../iterable';
import { Ordering } from './ordering/ordering';
import { Selector, Comparator, defaultComparator } from '../types';

export class OrderedIterable<T> extends Iterable<T> {
  orderings: Array<Ordering<T, any>> = [];

  constructor(
    private originalIterable: Iterable<T>,
    ordering: Ordering<T, any>
  ) {
    super();
    this.orderings.push(ordering);
  }

  thenBy<P>(selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): OrderedIterable<T> {
    this.orderings.push(new Ordering(selector, comparator, 'asc'));
    return this;
  }

  thenByDescending<P>(selector: Selector<T, P>, comparator: Comparator<P> = defaultComparator): OrderedIterable<T> {
    this.orderings.push(new Ordering(selector, comparator, 'desc'));
    return this;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    let result = this.originalIterable;
    for (let i = this.orderings.length - 1; i >= 0; i--) {
      result = this.orderings[i].execute(result);
    }
    
    for (const element of result) {
      yield element;
    }
  }
}