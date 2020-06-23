import { Iterable } from '../../iterable';

export class LeftJoinIterable<L, R, J> extends Iterable<J> {
  constructor(
    private left: Iterable<L>,
    private right: Iterable<R>,
    private on: (left: L, right: R) => boolean,
    private into: (left: L, right: R | null) => J 
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<J> {
    for (const left of this.left) {
      let didJoin = false;

      for (const right of this.right) {
        if (this.on(left, right)) {
          didJoin = true;
          yield this.into(left, right);
        }
      }

      if (!didJoin) {
        yield this.into(left, null);
      }
    }
  }
}
