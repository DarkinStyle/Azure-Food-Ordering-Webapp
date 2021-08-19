$(function () {
    //Default Action
    $('.wishlist-container').hide();

    if (typeof (Storage) != 'undefined') {
        if (sessionStorage.getItem('currentUser') === null) {
            $('.logged_in').hide();
            $('.log_form').show();
            $('.SOLink').hide();
            $('.glog').show();
        }
        else {
            $('.logged_in').show();
            $('.log_form').hide();
            $('.SOLink').show();
            $('.glog').hide();
            $('.wishlist-item').html('');
            setWelcome();

            let tempMasterList = JSON.parse(localStorage.getItem("masterList"));
            let curUserIndex = -1;
            let sum = 0;

            for (let i = 0; i < tempMasterList.length; i++) {
                if (JSON.parse(sessionStorage.getItem('currentUser')).id == tempMasterList[i].owner.id) {
                    curUserIndex = i;
                    break;
                }
            }
            //means found
            if (curUserIndex != -1) {
                if (tempMasterList[curUserIndex].wishlist.length != 0) {
                    if (tempMasterList[curUserIndex].wishlist.length > 4) {
                        for (let i = 0; i < 4; i++) {
                            $('.wishlist-item').append(`<h3 class = "text-success">${tempMasterList[curUserIndex].wishlist[i].name} - ${tempMasterList[curUserIndex].wishlist[i].count}</h3>`);
                            sum += tempMasterList[curUserIndex].wishlist[i].totalPrice;
                        }
                    } else {
                        for (let i = 0; i < tempMasterList[curUserIndex].wishlist.length; i++) {
                            $('.wishlist-item').append(`<h3 class = "text-success">${tempMasterList[curUserIndex].wishlist[i].name} - ${tempMasterList[curUserIndex].wishlist[i].count}</h3>`);
                            sum += tempMasterList[curUserIndex].wishlist[i].totalPrice;
                        }
                    }

                    $('.wish-price').html(`<br>RM${sum} ⭐`);

                    $('.wishlist-container').show();
                }
            }
        }
    }
});