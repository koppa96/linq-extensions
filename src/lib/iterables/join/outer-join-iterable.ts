import { Iterable } from '../../iterable';
import { BiPredicate, BiSelector } from '../../types';

export class OuterJoinIterable<T, O, R> extends Iterable<R> {
  constructor(
    private left: Iterable<T>,
    private right: Iterable<O>,
    private on: BiPredicate<T, O>,
    private into: BiSelector<T | null, O | null, R>
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<R> {
    const unusedRightElements = this.right.toSet();
    for (const left of this.left) {
      let didJoin = false;
            
      for (const right of this.right) {
        if (this.on(left, right)) {
          didJoin = true;
          unusedRightElements.delete(right);
          yield this.into(left, right);
        }
      }

      if (!didJoin) {
        yield this.into(left, null);
      }
    }

    for (const element of unusedRightElements) {
      yield this.into(null, element);
    }
  }
}