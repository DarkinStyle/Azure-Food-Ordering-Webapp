$(function () {

    $('.loader-cont').hide();

    function retrieveUsers(callback) {
        let req = new XMLHttpRequest();

        req.open("GET", "https://api.jsonbin.io/b/5f5a42d6ad23b57ef90fa3fb", true);
        req.setRequestHeader("secret-key", "$2b$10$ZQ8p7mlop/yL1c9gg0ysk.FLqk5x0R.Uolsng40YE9JZRhGWqQ4te");

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (typeof callback === "function") {
                    callback.apply(req);
                }
            }
        };

        req.send();
    }

    function updateUsers(newUser, callback) {
        let req = new XMLHttpRequest();

        req.open("PUT", "https://api.jsonbin.io/b/5f5a42d6ad23b57ef90fa3fb", true);
        req.setRequestHeader("secret-key", "$2b$10$ZQ8p7mlop/yL1c9gg0ysk.FLqk5x0R.Uolsng40YE9JZRhGWqQ4te");
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("versioning", false);

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                if (typeof callback === "function") {
                    callback.apply(req);
                }
            }
        };

        req.send(newUser);
    }

    $('form.signup').submit(function (e) {
        e.preventDefault();

        $('.signup-cont').fadeOut(300);
        $('.loader-cont').fadeIn(300);

        if (typeof Storage !== "undefined") {
            //No user cache
            if (localStorage.getItem("regUsers") === null) {
                retrieveUsers(function () {
                    //Receive array of user objects from the API
                    let regUsers = JSON.parse(this.responseText);
                    processSignUp(regUsers);
                });
            } else { //Registered users already exists in the cache
                processSignUp(JSON.parse(localStorage.getItem("regUsers")));
            }
        }
    });

    function processSignUp(users) {
        let curName = $('#s-name').val();
        let curEmail = $('#s-email').val();
        let curPass = $('#s-pass').val();
        let curConPass = $('#con-pass').val();

        if (curPass !== curConPass) {
            alert("Passwords do not match!");
            window.location.href = "/signup.html";
        }
        else {
            let hasDup = false;

            for (let i = 0; i < users.length; i++) {
                if (curEmail === users[i].email) {
                    hasDup = true;
                    break;
                }
            }

            if (!hasDup) {
                let userEntity = {};
                userEntity.name = curName;
                userEntity.email = curEmail;
                userEntity.password = curConPass;

                users.push(userEntity);

                //Update User Cache
                localStorage.setItem('regUsers', JSON.stringify(users));

                updateUsers(JSON.stringify(users), function () {

                    if (JSON.parse(this.responseText).success) {
                        var myUserEntity = {};
                        myUserEntity.id = curEmail;
                        myUserEntity.Name = curName;

                        sessionStorage.setItem("currentUser", JSON.stringify(myUserEntity));

                        setTimeout(() => { window.location.href = "/index.html"; }, 5000);
                    }
                });

            }
            else {
                alert("Email Exists!");
                window.location.href = "/signup.html";
            }
        }
    }
});