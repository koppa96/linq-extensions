# linq-extensions
A collection of extension methods with lazy evaluation for builtin JavaScript collections inspired by Linq from C#.
This library aims to extend the builtin collections of JavaScript with new lazily evaluated collection manipulation methods in a type safe manner.
The library is written in TypeScript and has full type definitions avaliable.

## Setup
The full setup requires an extra step for TypeScript users. Since this library heavily relies on Iterators and Generators it is recommended to add `ES2015` to the `lib` section of your `tsconfig.json`.

If you want to use the Iterables returned by the Linq operators in for-of loops you need to set the `downlevelIteration` flag true in your `tsconfig.json`. This is optional, and not necessary if you do not use the Iterables in for-of loops.

## Usage
The usage of the library is very simple. Just import the library where you wish to use the extension methods.
```typescript
import 'linq-extensions';

for (const element of people.where(x => x.age < 30).orderByDescending(x => x.age).select(x => x.name)) {
  // ..
}
```
This line is very important since this runs the code that adds the new methods to the prototype of the builtin collections. You can use `require()` in node js when writing JavaScript code.

## Extension method documentations
For the documentations please visit the wiki page of the repository.
