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

    $('form.signin').submit(function (e) {
        e.preventDefault();

        $('.sigin-cont').fadeOut(300);
        $('.loader-cont').fadeIn(300);

        if (typeof Storage !== "undefined") {
            if (localStorage.getItem("regUsers") === null) { //means no user cache
                retrieveUsers(function () {
                    let regUsers = JSON.parse(this.responseText);
                    processSignIn(regUsers);
                });
            }
            else {
                processSignIn(JSON.parse(localStorage.getItem("regUsers")));
            }
        }

    });

    function processSignIn(data) {
        
        localStorage.setItem('regUsers', JSON.stringify(data));

        for (let i = 0; i < data.length; i++) {
            if ($('#u_email').val() == data[i].email)
                if ($('#u_pword').val() == data[i].password) {
                    var myUserEntity = {};
                    myUserEntity.id = $('#u_email').val();
                    myUserEntity.Name = data[i].name;

                    if (typeof (Storage) != 'undefined') {
                        sessionStorage.setItem("currentUser", JSON.stringify(myUserEntity));
                        $('.SOLink').show();
                        $('.glog').hide();
                        setWelcome();
                        break;
                    } else {
                        alert('Your browser does not support this feature 😢');
                    }
                }
        }
        if (sessionStorage.getItem('currentUser') === null)
            alert('Invalid Email and Password, please try again!');

        setTimeout(() => { window.location.href = "/index.html"; }, 5000);
    }
});
