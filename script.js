// Assignment code here

var generatePassword() {
  // get/santize length from user (min:8, max: 128)
  // get/santize character set choice from user (some combination of uppercase, lowercase, numeric, and special characters)
  // build a string of all possible password characters from character set choice
  // randomly pick characters from possible characters string until it's the chosen length
  // return generated password
}
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
