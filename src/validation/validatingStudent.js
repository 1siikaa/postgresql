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

  const validateStudentId = (id)=>{
    if(Number.isInteger(id)) return true
  }

// -------------------------------------------------- validating email addresses ------------------------------------
const isValidEmail = (email) => {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(email)) return true
}

// --------------------------------------------------- validating password -------------------------------------------
const isValidClassId = (classId) => {
   if((classId >= 1 || classId<=12) && Number.isInteger(classId)) return true
  
}
// ---------------------------------------------------- validating date ----------------------------------------------------
const validateDate = (dob) => {
   let dateregex = /^\d{4}\/\d{2}\/\d{2}$/
   if (dateregex.test(dob)) return true
}

// ---------------------------------------------------- validating age --------------------------------------------------------------
const isValidAge = (age) => age>=0 && age<=100

// ---------------------------------------------------- exports -----------------------------------------------------------------
module.exports = {
    validateName, isValidEmail, validateDate, isValidAge, isValidClassId, forName, validateStudentId
}