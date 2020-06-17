// Assignment code here
/* jshint esversion: 6 */

var getLength = function() { // get a length (number between 8 and 128) from the user via window.prompt()
  var length = 0;
  while(!length) { // the length is only set in the loop when it's been validated, don't need to check for anything except not zero here.
    promptLength = window.prompt('How long should the password be? Enter a number between 8 and 128.');
    if(promptLength == null) { // abort if cancel is clicked
      return null;
    }
    parsed = Number(promptLength);
    if(8 <= parsed && parsed <= 128) {
      length = parsed;
    } else if(parsed < 8) {
      window.alert(`"${parsed}" is too small: please choose a number larger than 8.`);
    } else if(parsed > 128) {
      window.alert(`"${parsed}" is too large: please choose a number smaller than 128.`);
    } else if(isNaN(parsed)) {
      window.alert(`Sorry, I didn\'t understand "${promptLength}". Please try again.`);
    }
  }
  return length;
};


var generatePassword = function() {
  // get/santize length from user (min:8, max: 128)
  length = getLength();
  if(!length) { // user clicked the cancel button on the input
    return '(password generation cancelled by user request)';
  }
  console.log(`Chosen length is ${length} characters.`);
  // get/santize character set choice from user (some combination of uppercase, lowercase, numeric, and special characters)
  // build a string of all possible password characters from character set choice
  //pwdChars = getPwdChars();
  //if(!pwdChars) { // user clicked the cancel button on the input
  //  return '(password generation cancelled by user request)';
  //}
  console.log(`Possible password characters: "${pwdChars}"`);
  // randomly pick characters from possible characters string until it's the chosen length
  // return generated password
};

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
