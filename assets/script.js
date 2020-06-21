// Assignment code here
/* jshint esversion: 6 */
var getLength = function() { // get a length (number between 8 and 128)
  var length;
  while(!length) {
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
  var seen = {}; // building prompt text and a hashmap of what keys have already been seen at the same time so we only loop once
  var promptStr = 'What kinds of characters should be used? Enter one or more of the following (not case sensitive),';
  promptStr += ' separated by spaces: '; 
  for(var key in CHARSET) {
    seen[key] = false;
    promptStr += `"${key}", `;
  }
  var chars = '';
  var outStr = 'Selected character types: ';
  while(chars.length == 0) {
    promptCharTypes = window.prompt(promptStr);
    if(promptCharTypes == null) { // abort if cancel is clicked
      return null;
    }
    charTypes = promptCharTypes.replace(/\s+/g, ' ').trim().toLowerCase(); // trim spaces, convert to lowercase
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
      outStr += `"${charType}" `;
    }
    if(chars.length == 0) {
      window.alert('No valid character types specified: please try again.');
    } else {
      window.alert(outStr);
    }
  }
  return chars;
};

var generatePassword = function() {
  // get/santize length from user (min:8, max: 128)
  var length = getLength();
  if(!length) { // user clicked the cancel button on the input
    return null; 
  }
  // get/santize character set choice from user (some combination of uppercase, lowercase, numeric, and special characters)
  // build a string of all possible password characters from character set choice
  var pwdChars = getPwdChars();
  if(!pwdChars) { // user clicked the cancel button on the input
    return null;
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
