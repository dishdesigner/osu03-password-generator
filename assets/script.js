    // Event listener for button click to start the program
document.querySelector("#generate").addEventListener("click", displayPassword);

    // Display the generated password to the #password <textarea>
function displayPassword() {
  document.querySelector("#password").value = generatePassword(); // call generate function and place returned value into HTML <input>
}

/*************************************/
// Progressive Enhancement: Display modal user input form: password length, checkboxes for categories to include, labels with examples. Assign values returned from user form into userInput object's values instead of using prompts / confirms.
function generatePassword() {

  let generatedPassword = ""; // RETURN THIS VALUE
  let categoriesChosen = [];
  const numbers = "0123456789"; // 10 fixed
  const letters = "abcdefghijklmnopqrstuvwxyz"; // 26 fixed
  const chars = "!\#\$\%\'()+,-./:?@[\\]^_\`{}~"; // 24 fixed
        // chars checked against Oracle & Microsoft ActiveDirectory password requirements:
        // not allowed = ampersand, asterisk, semicolon, greaterthan, lessthan, equals, pipebar
  const dictionary = {
    numbers: Array.from(numbers),
    lowercases: Array.from(letters),
    uppercases: Array.from((letters).toUpperCase()),
    specials: Array.from(chars),
  };
  const userInput = {
    includeNums: confirm("Do you want to include numbers? (0 1 2 3...)"),
    includeLowers: confirm("Do you want to include lowercase letters? (a b c d...)"),
    includeUppers: confirm("Do you want to include uppercase letters? (A B C D...)"),
    includeSpecials: confirm("Do you want to include special characters? (# $ % @...)"),
    passwordLength: prompt("How many characters should the password contain? (8-128)", "Enter a number using digits between 8 and 128"),
  };

  // validate passwordLength
  while (isNaN(userInput.passwordLength) || !(8 <= userInput.passwordLength <= 128)) {
    userInput.passwordLength = prompt("You did not enter a number between 8 and 128!", "Enter a number using digits between 8 and 128")
  };

  // build array of chosen category names
  if (userInput.includeNums) {categoriesChosen.push("numbers")};
  if (userInput.includeLowers) {categoriesChosen.push("lowercases")};
  if (userInput.includeUppers) {categoriesChosen.push("uppercases")};
  if (userInput.includeSpecials) {categoriesChosen.push("specials")};

  // use a while loop to add random characters until generatedPassword.length === passwordLength
  while (generatedPassword.length < userInput.passwordLength) {
    for (let i = 0; i < categoriesChosen.length; i++) {
      let loopCategory = dictionary[categoriesChosen[i]];
      generatedPassword += loopCategory[Math.floor(Math.random() * (loopCategory.length))];
    };
  };
  return generatedPassword;
}
