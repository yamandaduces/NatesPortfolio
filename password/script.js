// Assignment Code
var generateBtn = document.querySelector("#generate");
var upperCase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
var lowerCase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "[",
  "]",
  "{",
  "}",
];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Write password to the #password input
function writePassword() {
  var passwordList = [];
  var initPassword = "";
  var passwordLength = prompt(
    "How many characters do you want to use in your password?"
  );
  if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    alert(
      "You need to pass an actual number AND a pssword length of at least 8 characters and at most 128 characters"
    );
    writePassword();
    return;
  }
  if (window.confirm("Do you want capital letters in your password?")) {
    passwordList = passwordList.concat(upperCase);
    initPassword += upperCase[Math.floor(Math.random() * upperCase.length)];
  }

  if (window.confirm("Do you want lower case letters in your password?")) {
    passwordList = passwordList.concat(lowerCase);
    initPassword += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  }

  if (window.confirm("Do you want special characters in your password?")) {
    passwordList = passwordList.concat(specialCharacters);
    initPassword +=
      specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
  }

  if (window.confirm("Do you want numbers in your password?")) {
    passwordList = passwordList.concat(numbers);
    initPassword += numbers[Math.floor(Math.random() * numbers.length)];
  }

  var password = generatePassword(passwordLength, passwordList, initPassword);

  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword(
  passwordLength,
  acceptableCharacters,
  initialPassword
) {
  newPassword = initialPassword;
  console.log(acceptableCharacters);
  for (let i = 0; i < passwordLength - initialPassword.length; i++) {
    newPassword +=
      acceptableCharacters[
        Math.floor(Math.random() * acceptableCharacters.length)
      ];
  }
  return newPassword;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
