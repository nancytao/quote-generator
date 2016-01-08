function getQuote() {
    $.ajax({
        jsonp: "jsonp",
        dataType: "jsonp",
        url: "http://api.forismatic.com/api/1.0/",
        contentType: "application/jsonp",
        data: {
            lang: "en",
            method: "getQuote",
            format: "jsonp",
        },
        success: function(data) {
            $("#quote-text").text(data.quoteText);
            if (data.quoteAuthor == "") {
                $("#quote-author").text("Unknown");
            } else {
                $("#quote-author").text(data.quoteAuthor);
            }
        },
        error: function(data) {
            $("#quote-text").text("Error loading quote:(");
            $("#quote-author").text("I'm sorry!");
        }
    })
}

$(document).ready(function() {
    getQuote();

    $("#get-quote").click(function() {
        getQuote();
    });
});