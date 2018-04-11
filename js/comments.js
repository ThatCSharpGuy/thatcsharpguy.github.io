/**
* RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
* LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
*/
function loadComments() {
        var u = "thatcharpguy",
        s = document.createElement('script');
        //e = document.getElementById("disqus_loader");
	s.src = "http://" +u+ ".disqus.com/embed.js";
	s.async = 'true';
	document.getElementsByTagName('head')[0].appendChild(s);
        //e.parentElement.removeChild(e);
}

$(document).ready(function(){ 
        setCommentCount();
});
var countTimeout;
var checkingCount = 5;
function setCommentCount() {
    var count = parseInt($("#post-count").html());
    if(checkingCount-- == 0)
    {
        $("#post-count").attr("href", "javascript:loadComments();");
        $("#post-count").html(noCommentsText);
        return;
    }
    
    if(isNaN(count))
    {
        countTimeout = setTimeout(setCommentCount, 1000);   
    }
    else 
    {
        clearTimeout(countTimeout);
        var text = "";
        console.log(text);
        if(count == 0)
            text += noCommentsText;
        else if(count == 1)
            text += count + commentText;
        else
            text += count + commentText + "s";
        $("#post-count").html(text);
        $("#post-count").attr("href", "javascript:loadComments();");
    }
}
