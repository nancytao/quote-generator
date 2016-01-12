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
            readyTweet(data);
        },
        error: function(data) {
            $("#quote-text").text("Error loading quote :(");
            $("#quote-author").text("I'm sorry!");

            $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=@nancytao is so cool!");
        }
    })
}

function readyTweet(data) {
    tweetText = "https://twitter.com/intent/tweet?text=Here's a quote, courtesy of @nancytao: "; // 39 characters
    if (data.quoteText.length + data.quoteAuthor.length > 140 - 39 - 3) { // 3 for " - "
        if (data.quoteText.length <= 94) {
            tweetText += data.quoteText;
        } else {
            tweetText += data.quoteText.substring(0, 91) + "...";
        }
    } else {
        tweetText += data.quoteText + " - ";
        if (data.quoteAuthor == "") {
            tweetText += "Unknown";
        } else {
            tweetText += data.quoteAuthor;
        }
    }
    $("#tweet").attr("href", tweetText);
}

$(document).ready(function() {
    getQuote();

    $("#get-quote").click(function() {
        getQuote();
    });
});