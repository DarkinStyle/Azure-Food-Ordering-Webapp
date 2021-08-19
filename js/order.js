$(function () {

    if (sessionStorage.getItem('currentUser') === null) {
        $('.jot-form-order').hide();
    } else {
        $('.not-signin-container').hide();
    }

});