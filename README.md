# linq-extensions
A collection of extension methods with lazy evaluation for builtin JavaScript collections inspired by Linq from C#.
This library aims to extend the builtin collections of JavaScript with new lazily evaluated collection manipulation methods in a type safe manner.
The library is written in TypeScript and has full type definitions avaliable.

## Usage
The usage of the library is very simple. Just import the library where you wish to use the extension methods.
```typescript
import 'linq-extensions';
```
This line is very important since this runs the code that adds the new methods to the prototype of the builtin collections. You can use `require()` in node js when writing JavaScript code.
