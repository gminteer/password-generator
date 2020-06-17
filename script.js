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

var getPwdChars = function() { // generate a string of possible password characters based on user input
  const CHARSET = { // the character categories
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numeric: '1234567890',
    special: '~`-=!@#$%^&*()_+[]\\{}|;\'",./<>?' 
  };
  CHARSET.upper = CHARSET.lower.toUpperCase();
  var seen = {};
  var promptStr = 'What kinds of characters should be used? Enter one or more of the following (not case sensitive),';
  prompStr += ' separated by spaces: '; 
  for(var key in CHARSET) {
    seen[key] = false;
    promptStr += `"${key}", `;
  }
  var chars = '';
  while(chars.length == 0) {
    promptCharTypes = window.prompt(promptStr);
    if(promptCharTypes == null) { // abort if cancel is clicked
      return null;
    }
    charTypes = promptCharTypes.replace(/\s+/g, ' ').trim().toLowerCase(); // trim spaces, lowercase-ify
    charTypes = charTypes.split(' ');
    for(var charType of charTypes) {
      if(!(charType in CHARSET)) {
        console.warn(`skipping unknown character type: "${charType}"`);
        continue;
      }
      if(seen[charType]) {
        console.warn(`skipping duplicate character type: "${charType}"`);
        continue;
      }
      chars += CHARSET[charType];
      seen[charType] = true;
    }
    if(chars.length == 0) {
      window.alert('No valid character types specified: please try again.');
    }
  }
  return chars;
};

var generatePassword = function() {
  // get/santize length from user (min:8, max: 128)
  length = getLength();
  if(!length) { // user clicked the cancel button on the input
    return '(password generation cancelled by user request)'; /* the writePassword() function further down in the read-only part of this 
                                                                 exercise just blindly applies whatever this function returns, so at least 
                                                                 this way it doesn't look like an error when the user clicks cancel on the
                                                                 pop-up */
  }
  // get/santize character set choice from user (some combination of uppercase, lowercase, numeric, and special characters)
  // build a string of all possible password characters from character set choice
  pwdChars = getPwdChars();
  if(!pwdChars) { // user clicked the cancel button on the input
    return '(password generation cancelled by user request)'; /* I'd likely at least return false here and make writePassword() responsible
                                                                 for explaining to the user nothing happened because cancel was clicked, 
                                                                 but this is better than endlessly looping looping until the user clicks 
                                                                 "OK" or closes their browser window. */
  }
  // randomly pick characters from possible characters string until it's the chosen length
  // return generated password
  var randomPassword = '';
  for(var i = 0; i < length; i++) {
    randomPassword += pwdChars[Math.floor(Math.random() * pwdChars.length)];
  }
  return randomPassword;
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
