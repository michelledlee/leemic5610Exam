let out = document.getElementById("messages");
// allow 1px inaccuracy by adding 1
var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
// if scrolled = true, update top
if(isScrolledToBottom)
	out.scrollTop = out.scrollHeight - out.clientHeight;