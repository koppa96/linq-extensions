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
    age: 59,
    pets: [
      'körte',
      'citrom',
      'banán'
    ]
  }
];

console.log(people.maxBy(x => x.age));