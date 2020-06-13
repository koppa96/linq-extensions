import { Iterable } from '../iterable';

export class RangeIterable extends Iterable<number> {
  constructor(
    private from: number,
    private amount: number
  ) {
    super();
    if (amount < 0) {
      throw new Error('The amount must be a non negative number.');
    }
  }

  *[Symbol.iterator](): IterableIterator<number> {
    for (let i = 0; i < this.amount; i++) {
      yield this.from + i;
    }
  }
}