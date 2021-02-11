// Assignment Code
let generateBtn = document.querySelector("#generate");

// Event listener for button click to start program
generateBtn.addEventListener("click", writePassword); // run function writePassword upon button click

// Write password to the #password input
function displayPassword() {
  document.querySelector("#password").value = generatePassword(); // call generate function and place returned value into HTML <input>
}

/***********************************
    MY CODE GOES HERE
************************************/
function gatherInput() {
  let chooseNums = false;
  let chooseLowers
  // RETURN C
}

function generatePassword() {
  let generatedPassword = ""; // RETURN THIS VALUE
  const numbers = "0123456789"; // 10, fixed
  const letters = "abcdefghijklmnopqrstuvwxyz"; // 26, fixed
  const chars = "!\#\$\%\&\'()*+,-./:;<=>?@[\\]^_\`{|}~"; // 31, fixed
  const dictionary = {
    numbers: Array.from(numbers),
    lowercases: Array.from(letters),
    uppercases: Array.from((letters).toUpperCase()),
    specials: Array.from(chars),
  }

  // console.log(dictionary.numbers, dictionary.lowercase, dictionary.uppercase, dictionary.specials);

  // a reduce function will use an accumulator to build the password up to the charlength chosen

  // inside reduce function, a forEach loop through Object.keys(dictionary) will loop through each category

  // inside forEach loop, math

  return generatedPassword;
}
