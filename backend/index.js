// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAG-UgmGnvPzxbJuXTvKexR63n_2dQDeHg",
    authDomain: "hostel-mess-app-4801a.firebaseapp.com",
    projectId: "hostel-mess-app-4801a",
    storageBucket: "hostel-mess-app-4801a.appspot.com",
    messagingSenderId: "872221614629",
    appId: "1:872221614629:web:30ba45ac810706171d95cc",
    measurementId: "G-JE7GQPE6KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const AUTH = firebaseConfig.auth()
const DATABASE = firebaseConfig.database()

// Set up our register function
function register() {
    //Get all our inputs
    email = document.getElementById("email").value
    full_name = document.getElementById("full_name").value
    password = document.getElementById("password").value
 
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false ) {
        alert("Email or password is incorrect")
        return
        // Don't continue the code
    }

    if(validate_field(full_name) == false) {
        alert("Fields cannot be empty")
        return
        // Don't continue the code 
    }

    // Moving on to authentication
    AUTH.createUserWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = AUTH.currentUser

        // Adding this user to Firebase Database
        var database_ref = DATABASE.ref()

        // Create User data
        var user_data = {
            email : email,
            full_name : full_name,
            last_login : Date.now()
        }

        database_ref.child("users/" + user.uid).set(user_data)


        alert("User Created!")
    })
    .catch(function(error) {
        // Firebase will usee this to alert of its errors 
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })




}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        //Email is good
        return true
    } else {
        //Email is not good
        return false
    }
}

function validate_password(password) {
    //Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    } 
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


