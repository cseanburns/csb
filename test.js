// Use modern JS
"use strict";

// Mutable variables
let user = "Sean";
let age = 66;
let message = "Howdy, Sean!";
// Immutable variables
const myBirthday = "19.04.1952";

// Embedding variables using backticks
let phrase = `can embed ${user}`;
alert(phrase);
alert(`the result of ${10.4 / 2.4}`);

// Get type
let value = true;
alert(typeof value);
alert(typeof phrase);
alert(typeof age);
alert(typeof myBirthday);

// String concatenation
alert(user + " is " + age + " years old.");

// Convert strings to numbers
let apples = "2";
let oranges = "3";
alert(+apples + +oranges);

// Adding
let counter = 2;
counter++;
alert(counter)
alert(2 * counter++);
alert(2 * ++counter);

// Subtracting
let sub = 2;
sub--;
alert(sub)

// Comparisons
alert(2 > 1);
alert(2 == 1);
alert(2 != 1);

// Interaction, 100 is supplying a default value
let agedness = prompt("How old are you?", 100);
alert(`You are ${agedness} years old!`);
// Show cancel button with confirm
// confirm(`You are ${agedness} years old!`);

// Conditionals: if
let year = prompt("When were you born?");
if (year <= 1980) alert("You are old!");

// Conditionals: multiple statements, use curly braces
let sun = prompt("Is the sun a star?", "yes");
if (sun == "yes") {
  alert("That's correct!");
  alert("You are so smart!");
}

// Conditionals: if else
let planet = prompt("What planet are you on?", "Earth");
if (planet == "Earth") {
  alert("You know it!");
} else {
  alert("Uh, are you an alien?");
}

// Conditionals: if, else if, else 
let officeNumber = prompt("Confirm that this your office number?", 327);
if (officeNumber > 327) {
  alert("Uh, no!");
} else if (officeNumber < 327) {
  alert("Uh, no!");
} else {
  alert("Exactly!");
}
