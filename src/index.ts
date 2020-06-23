export * from './lib/linq';
export * from './lib/types';

for (const element of [1, 2, 3, 4].where(x => x < 3).orderByDescending(x => x)) {
  console.log(element);
}