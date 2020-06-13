import './lib/linq';

interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  {
    name: 'Test',
    age: 19
  },
  {
    name: 'Test2',
    age: 25
  },
  {
    name: 'Test3',
    age: 19
  },
  {
    name: 'Test4',
    age: 21
  },
  {
    name: 'Test5',
    age: 19
  }
];

console.log(people.select(x => x.age).toSet());