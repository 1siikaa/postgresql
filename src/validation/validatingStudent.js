// ----------------------------------------------------- validating name type ---------------------------------------------
const validateName = (name) => {
    if (typeof name === undefined || typeof name === null || name === "" ) {
        return false;
      }
      if (typeof name === "string" && name.trim().length > 0 ) {
        return true;
      }
}

// -------------------------------------------------- validating users name ------------------------------------
const forName = function (name) {
    let nameRegex =  /^[a-z ,.'-]+$/i
    if (nameRegex.test(name)) return true
  };

// -------------------------------------------------- validating email addresses ------------------------------------
const validateEmail = (email) => {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(email)) return true
}

// --------------------------------------------------- validating password -------------------------------------------
const validatePassword = (password) => {
    let passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/
    if (passwordregex.test(password)) return true
  
}
// ---------------------------------------------------- validating date ----------------------------------------------------
const validateDate = (date) => {
   let dateregex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
   if (dateregex.test(date)) return true
}

// ---------------------------------------------------- validating age --------------------------------------------------------------
const validateAge = (age) => {
if(age>=0 && age<=100){
  return true
}   
}

// ---------------------------------------------------- exports -----------------------------------------------------------------
module.exports = {
    validateName, validateEmail, validateDate, validateAge, validatePassword, forName
}