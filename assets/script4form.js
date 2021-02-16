/**************************************************************/
// EVENT LISTENERS
let inputLength = document.querySelector("#inputLength");
let checkboxes = document.querySelectorAll("input[type=checkbox]");
let generateButton = document.querySelector("#generate");
let copyButton = document.querySelector("#copy");
let passwordBox = document.querySelector("#passwordBox");
let checkedBoxes = [];

// Page Load event listener to disable both buttons and refresh placeholder password text
window.addEventListener('load', (event) => {
  document.querySelector("#copy").disabled = true;
  document.querySelector("#generate").disabled = true;
  document.querySelector("#passwordBox").textContent = "Your password will appear here";
});

// Event listener for checkboxes that also builds the array of checked boxes
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    document.querySelector("#generate").disabled = false;
    checkedBoxes =
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.name); // Use Array.map to extract only the checkbox names from the array of objects.
    if (checkedBoxes.length === 0) {
      document.querySelector("#generate").disabled = true;
    }
  })
});

// Event listeners for button clicks
generateButton.addEventListener("click", displayPassword);
copyButton.addEventListener("click", copyPassword);

/**************************************************************/
// GLOBAL FUNCTIONS

/**************************************************************/
// Display the generated password to the #passwordBox <textarea>
function displayPassword() {
  document.querySelector("#generate").blur(); // remove button focus so it doesn't hang there after password is displayed.
  document.querySelector("#passwordBox").value = generatePassword(); // call generate function and place returned value into HTML <input>
}

/**************************************************************/
// Create new password after "New Password" button click
function generatePassword() {
  let generatedPassword = ""; // RETURN THIS VALUE

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

  // Cycle through the chosen categories and add a random character from each until generatedPassword.length >= passwordLength
  while (generatedPassword.length < inputLength.value) {
    for (let i = 0; i < checkedBoxes.length; i++) {
      let loopCategory = dictionary[checkedBoxes[i]];
      generatedPassword += loopCategory[Math.floor(Math.random() * (loopCategory.length))];
    };
  };
  // truncate the final password to the exact request length if it's longer
  document.querySelector("#copy").disabled = false;
  return generatedPassword.substring(0, inputLength.value);
}

/**************************************************************/
// Copy new password to Clipboard after "Copy Password" button click
function copyPassword() {
  var textarea = document.querySelector("#passwordBox");
  if (textarea.value === "Your password will appear here") {
    alert("There is no password to copy. Click the \"New Password\" button to generate new password first.");
    document.querySelector("#copy").blur();
  } else {
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    alert("Password Copied"); // instead, write this to an HTML element between buttons & <textarea>!
    textarea.blur();
  }
}
