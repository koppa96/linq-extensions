import { Iterable } from "../iterable";
import { EqualityCheck } from "../types";

export class IntersectIterable<T> extends Iterable<T> {
  constructor(
    private originalIterable: Iterable<T>,
    private otherIterable: Iterable<T>,
    private equalityCheck: EqualityCheck<T> = (left, right) => left === right
  ) {
    super();
  }

  *[Symbol.iterator](): IterableIterator<T> {
    throw new Error("Method not implemented.");
  }
}