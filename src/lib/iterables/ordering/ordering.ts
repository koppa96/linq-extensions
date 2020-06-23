import { Selector, Comparator } from '../../types';
import { Iterable } from '../../iterable';

export type OrderingDirectiron = 'asc' | 'desc';

export class Ordering<T, P> {
  constructor(
    private selector: Selector<T, P>,
    private comparator: Comparator<P>,
    direction: OrderingDirectiron
  ) {
    if (direction === 'desc') {
      this.comparator = (left, right) => comparator(right, left);
    }
  }

  execute(iterable: Iterable<T>): Iterable<T> {
    const array = iterable.toArray();
    this.quickSort(array, 0, array.length - 1);
    return array;
  }

  private quickSort(array: T[], start: number, end: number) {
    if (start < end) {
      const partitionIndex = this.partition(array, start, end);
      this.quickSort(array, start, partitionIndex - 1);
      this.quickSort(array, partitionIndex + 1, end);
    }
  }

  private partition(array: T[], start: number, end: number): number {
    let pivot = this.selector(array[end]);
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (this.comparator(this.selector(array[j]), pivot) < 0) {
        i++;
        this.swap(array, i, j);
      }
    }
    this.swap(array, i + 1, end);
    return i + 1;
  }

  private swap(array: any[], i: number, j: number) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
}
