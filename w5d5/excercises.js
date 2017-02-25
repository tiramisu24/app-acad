// function sumAr(...args){
//   let sum = 0;
//   args.forEach( x => sum +=x );
//   return sum;
// }
// console.log(sumAr(1, 2, 3, 4, 5) === 15);
//
// Function.prototype.myBind = function(context,...args){
//   console.log(args);
//   return (...other) => {
//
//     console.log(other);
//     this.apply(context,args.concat(other));
//   };
// };
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// // markov.says("meow", "Ned");
// // // Markov says meow to Ned!
// // // true
//
// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
// //
// // no bind time args (other than context), call time args are "meow" and "me"
// markov.says.myBind(breakfast)("meow", "a tree")();
// // Breakfast says meow to a tree!
// // true
//
// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true
//
//
//

function curriedSum(num) {
  let numbers = [];
  const _curriedSum = function (n) {
    numbers.push(n);
    if (numbers.length === num) {
      let sum = 0;
      numbers.forEach( el => sum += el );
      return sum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
}

const addNumbers = curriedSum(4);
console.log(addNumbers(5)(30)(20)(1));


Function.prototype.curry = function (numArgs) {
  let arr = [];
  const _func = (arg) => {
      arr.push(arg);
      console.log(arr);
    if (arr.length < numArgs) {
      return _func;
    } else {
      return this.apply(null,arr);
    }
  };
  return _func;
};

const sqr = (arg) => { console.log(arg);};
const words = sqr.curry(3);
words("a")("b")("c");
