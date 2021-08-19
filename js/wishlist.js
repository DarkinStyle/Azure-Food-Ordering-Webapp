$(function () {
    $('.loader-cont').hide();
    $.getJSON("/JSON/foods.json", function (data) {
        localStorage.setItem("fooditems", JSON.stringify(data));

        if (localStorage.getItem("masterList") !== null) { //Someone has made a wish before
            let foods = data;
            let temp = JSON.parse(localStorage.getItem("masterList"));
            let curUser = JSON.parse(sessionStorage.getItem("currentUser"));
            let found = false;
            let curUserIndex;
            let counter = 0;

            for (let i = 0; i < temp.length; i++) {
                if (curUser.id == temp[i].owner.id) { //means that the user has made a wish before
                    found = true;
                    curUserIndex = i;
                    break;
                }
            }
            
            if (found) {
                $('input[type = "number"]').each(function () {
                    if (temp[curUserIndex].wishlist[counter].name == (foods[$(this).attr("id") - 1].Name)) {
                        $(this).val(temp[curUserIndex].wishlist[counter].count);
                        counter++;
                    }
                });
            }
        }
    });


    $("#wishlist").submit(function (e) {
        e.preventDefault();

        $('.wishlist-cont').fadeOut(200);
        $('.loader-cont').fadeIn(300);
        $(window).scrollTop($('.menu_area').offset().top);

        //Preprocessing
        let foods = JSON.parse(localStorage.getItem("fooditems"));
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        let masterList;
        let hasMadeWish = false;
        let curUserIndex;
        let wishlist = [];
        let masterListNode = {};

        //Means wishlist has been deleted
        if (JSON.parse(localStorage.getItem("masterList")) === null) {
            masterList = [];
        } else { //Else retrieve from storage (already exist)
            masterList = JSON.parse(localStorage.getItem("masterList"));

            for (let i = 0; i < masterList.length; i++) {
                if (currentUser.id == masterList[i].owner.id) {
                    hasMadeWish = true;
                    wishlist = masterList[i].wishlist;
                    curUserIndex = i;
                    break;
                }
            }
        }

        $('input[type = "number"]').each(function () {
            let wishListItem = {};

            for (let i = 0; i < wishlist.length; i++) {
                if (foods[$(this).attr("id") - 1].Name == wishlist[i].name) { //Means the food already exist in the list
                    wishlist.splice(i, 1);
                    break;
                }
            }

            if ($(this).val() > 0) {
                wishListItem.name = foods[$(this).attr("id") - 1].Name;
                wishListItem.count = $(this).val();
                wishListItem.totalPrice = foods[$(this).attr("id") - 1].Price * $(this).val();
                wishListItem.addDate = new Date();

                wishlist.push(wishListItem);
            }
        });

        if (hasMadeWish) {
            masterList[curUserIndex].wishlist = wishlist;
        } else {
            masterListNode.owner = currentUser;
            masterListNode.wishlist = wishlist;
            masterList.push(masterListNode);
        }

        localStorage.setItem("masterList", JSON.stringify(masterList));
        setTimeout(() => { window.location.href = "/index.html"; }, 5000);
        alert("Your wishlist has been updated 👍");
    });
});