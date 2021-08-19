$(function () {
    $('#news-carousel').hide();
    $('.loader-cont').hide();

    $('#news').submit(function (e) {
        e.preventDefault();

        let keyword = $('#newsform').val().toLowerCase();


        $('#news-carousel').hide();
        $('.loader-cont').show();
        let api = `https://gnews.io/api/v3/search?q=${keyword}&lang=en&token=a49e9694ef54537f0a5ec13751c96921`;

        $.getJSON(api, function (data) {
            $('.loader-cont').hide();
            $('#news-carousel').show();

            let i = 0;

            $('.news-container').each(function () {
                $(this).find(".news-title").html(data.articles[i].title);
                $(this).find(".news-text").html(data.articles[i].description);

                if (data.articles[i].image)
                    $(this).find('.news-img img').attr('src', data.articles[i].image);
                else
                    $(this).find('.news-img').hide();

                $(this).find(".full-story").attr('href', data.articles[i].url);
                i++;
            });
        })
            .fail(function () {
                $('.news-container').html("News is not supported 😢");
            });

    });
});