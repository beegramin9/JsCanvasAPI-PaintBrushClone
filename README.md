# Latest Release (2021/06/28)
![Generic badge](https://img.shields.io/badge/build-passing-green.svg)

This is to announce the completion of Javascript code challange form Nomad Coder. This repository also contains tracks of learning ES6 grammar.
The current stable version is v0.0.1.

# Overview
## Code Challenge
## ES6
- Destructuring
```js
- const developer = {
    firstName: 'Nathan',
    lastName: 'Sebhastian',
    developer: true,
    age: 25,
}
 
const { firstName : name} = developer;
/* deconstruct object 'developer', allocate key 'firstName' to variable 'name' 
variable 'name' returns now the value of the key 'firstName', string 'Nathan' */

const { firstName, lastName } = developer;
/* deconstruct as same process as above, not allocating them to any variables 
keys 'firstName', 'lastName' return the values, 'Nathan', 'Sebhastian'*/

/* Array */
const numbers = [1,2,3,4,5];
const [zero, one] = numbers;
/* allocate index-accordingly
zero = numbers[0], 
one = numbers[1] */

/* can skip through certain keys using , */
const [first, second, , fourth] = numbers
```
# Technology Stack

&nbsp;&nbsp;
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>

# Features
built reponsive web with @media
covers all design with CSS3, no other framework such as Bootstrap used
navigation bar button with toggle feature supported by Javascript
moves onto sections with a click of the menu on navigation bar
supports highlighting with CSS3 effects
