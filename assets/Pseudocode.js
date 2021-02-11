
// PSEUDOCODE FOR PASSWORD GENERATOR

/*
Check for valid length between 8 & 128 characters

Need variables for each criteria chosen:
var upperCaseChosen = true; //window.confirm()
var lowerCaseChosen = true;
var specialCharChosen = true;
var numbersChosen = true;

Need arrays for each criteria: lowercase, uppercase, numeric, or special characters.

Prompt is OK / Cancel (true, false).

Create function that based on Chosen characters, determine an array that concatenates the True values to make random password:

"For Loop" from 1 up to length of password characters chosen.

Use math.floor / math.random * passwordLength to choose characters randomly from the criteria arrays

Use Array.push to add randomly selected characters into Final Password array.

Use Array.join to make the final password one string instead of separate charaters.

Array.join('')

Display final password in Alert or written to page through HTML

*/