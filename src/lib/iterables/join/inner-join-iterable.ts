import { Iterable } from '../../iterable';

export class InnerJoinIterable<L, R, J> extends Iterable<J> {
  constructor(
    private left: Iterable<L>,
    private right: Iterable<R>,
    private on: (left: L, right: R) => boolean,
    private into: (left: L, right: R) => J
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<J> {
    for (const left of this.left) {
      for (const right of this.right) {
        if (this.on(left, right)) {
          yield this.into(left, right);
        }
      }
    }
  }
}
