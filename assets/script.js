    // Event listeners for button clicks to generate or copy password and page load to clear password box content
document.querySelector("#generate").addEventListener("click", displayPassword);
document.querySelector("#copy").addEventListener("click", copyPassword);
window.addEventListener('load', (event) => {
  document.querySelector("#passwordBox").textContent = "Your password will appear here";
});


    // Display the generated password to the #password <textarea>
function displayPassword() {
  document.querySelector("#generate").blur(); // remove button focus so it doesn't hang there after password is displayed.
  document.querySelector("#passwordBox").value = generatePassword(); // call generate function and place returned value into HTML <input>
}

/*************************************/
// See "script4form.js" for solution using a form input instead of confirm/prompt dialogs.
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
    passwordLength: prompt("How many characters should the password contain? (8-128)"),
  };

  // validate userInput
  while (!userInput.includeNums && !userInput.includeLowers && !userInput.includeUppers && !userInput.includeSpecials) {
    alert("You must select at least one category of characters for your password");
    userInput.includeNums = confirm("Do you want to include numbers? (0 1 2 3...)");
    userInput.includeLowers = confirm("Do you want to include lowercase letters? (a b c d...)");
    userInput.includeUppers = confirm("Do you want to include uppercase letters? (A B C D...)");
    userInput.includeSpecials = confirm("Do you want to include special characters? (# $ % @...)");
  };
  while (isNaN(userInput.passwordLength) || (8 > userInput.passwordLength) || (userInput.passwordLength > 128)) {
    userInput.passwordLength = prompt("You did not enter a number between 8 and 128!", "Enter a number using digits between 8 and 128");
  };

  // build array of chosen category names
  if (userInput.includeNums) {categoriesChosen.push("numbers")};
  if (userInput.includeLowers) {categoriesChosen.push("lowercases")};
  if (userInput.includeUppers) {categoriesChosen.push("uppercases")};
  if (userInput.includeSpecials) {categoriesChosen.push("specials")};

  // Cycle through the chosen categories and add a random character from each until generatedPassword.length >= passwordLength
  while (generatedPassword.length < userInput.passwordLength) {
    for (let i = 0; i < categoriesChosen.length; i++) {
      let loopCategory = dictionary[categoriesChosen[i]];
      generatedPassword += loopCategory[Math.floor(Math.random() * (loopCategory.length))];
    };
  };
  // truncate the final password to the exact request length if it's longer
  return generatedPassword.substring(0, userInput.passwordLength);
}

function copyPassword() {
  var textarea = document.querySelector("#passwordBox");
  if (textarea.value === "Your password will appear here") {
    alert("There is no password to copy. Click the \"New Password\" button to generate new password first.");
    document.querySelector("#copy").blur();
  } else {
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    alert("Password Copied");
    textarea.blur();
  }
  // window.getSelection().removeAllRanges();
}
