// $(document).ready(function () {
//     //Hide the sign in button when not logged in
//     if (typeof (Storage) != 'undefined') {
//         if (JSON.parse(sessionStorage.getItem("currentUser")) === null) {
//             $('.SOLink').hide();
//             $('.glog').show();
//         }
//     }
// });

//Google Login Handler
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log("Name: " + profile.getName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

    var myUserEntity = {};
    myUserEntity.id = profile.getId();
    myUserEntity.Name = profile.getName();

    if (typeof (Storage) != 'undefined') {
        sessionStorage.setItem("currentUser", JSON.stringify(myUserEntity));
        $('.SOLink').show();
        $('.glog').hide();
        setWelcome();
    } else {
        alert('Your browser does not support this feature 😢');
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        // console.log("User signed out.");
        if (typeof (Storage) != 'undefined') {
            sessionStorage.removeItem("currentUser");
            window.location.href = "/index.html";
        }
    });
}

//Welcome Message
function setWelcome() {
    if (typeof (Storage) != 'undefined') {
        var loggedIn = JSON.parse(sessionStorage.getItem("currentUser"));

        if (loggedIn !== null) {
            $("#helloMsg").html(`Bonjour ${loggedIn.Name}!`);
            $(".welcome").html(`Bonjour ${loggedIn.Name}!`);
        }
    }
}