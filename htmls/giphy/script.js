
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
var $container;
var $input;
var onClickCallback;


//user is "finished typing," do something
function doneTyping () {
    var url = "http://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent($input.val()) +  "&api_key=dc6zaTOxFJmzC"

    var jqxhr = $.get( url, function(data) {
        processResponse(data);
    })
    .fail(function() {
        alert( "error" );
    });
}

$(document).ready(function(){

    $input = $('#searchbox');
    $container = $('#giphy-container');

    $container.masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
    });

    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    }); 

    onClickCallback = function(string) { alert(string); };
        RandomWord();
});

function processResponse(response)
{
    $container.masonry('remove', $container.find('.grid-item') );
    $container.masonry('layout');
    for (var i = 0, len = response.data.length; i < len; i++) {
        createGiphy(response.data[i], i);
    }

    $container.imagesLoaded( function() {
        $container.masonry('layout');
        $('.moving').lazyload({
            event : "mouseover"
        });
    });
}

function RandomWord() {
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
}

function RandomWordComplete(data) {
    $input.val(data.Word);
    doneTyping();
}

function createGiphy(item, index) {
    var div = document.createElement("div");
    $(div).addClass("grid-item");
    $(div).css({ 
        "width": item.images.fixed_width_still.width +"px",
        "height": item.images.fixed_width_still.height + "px"
    });

    var a  = document.createElement("a");
    $(a).addClass("giphy-element");
    $(a).attr("href","#");
    $(a).attr("data-giphy-id", item.id);
    $(a).attr("data-giphy-original", item.images.original.url);
    $(a).on('click', function(event, target){
        if(onClickCallback != undefined && typeof onClickCallback === "function")
        {
            var element = $(event.currentTarget);
            onClickCallback(element.attr("data-giphy-original"));
        }
    });

    var img = document.createElement("img");
    $(img).attr("src", item.images.fixed_width_still.url);
    $(img).addClass("still");
    a.appendChild(img);
                    
    var imgMoving = document.createElement("img");
    $(imgMoving).attr("data-original", item.images.fixed_width_downsampled.url);
    $(imgMoving).addClass("moving");
    $(imgMoving).css({ 
        "width": item.images.fixed_width_still.width +"px",
        "height": item.images.fixed_width_still.height + "px"
    });
    a.appendChild(imgMoving);

    div.appendChild(a);

    $container.append( $(div) ).masonry( 'appended', $(div) );
}