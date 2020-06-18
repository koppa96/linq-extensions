import './lib/linq';

interface Person {
  name: string;
  age: number;
  pets: string[];
}

const people: Person[] = [
  {
    name: 'Test',
    age: 19,
    pets: [
      'alma',
      'barack'
    ]
  },
  {
    name: 'Test5',
    age: 19,
    pets: [
      'körte',
      'citrom',
      'banán'
    ]
  }
];

for (const pet of people.selectMany(x => x.pets)) {
  console.log(pet);
}