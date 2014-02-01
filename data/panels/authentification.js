$(function () {
	//Cannot use jQuery's "submit()" as if I wrap in a <form> element, firefox tries to save the password and throws error because it is not a browser window...
	
	$("#pass").keyup(function (event) {
	//if user presses enter while in the password field, "click" on the submit button
        if (event.keyCode === 13) {
            $("#submit").click();
        }
	});

	$("#submit").click(function () {
		var password = "";
		if ($("#pass").val()) {password = $("#pass").val(); } 
		if ($("#input").length===1) self.port.emit("answer", password); //do this if safe browsing is off
		else self.port.emit("answer-unlock", password); //do this if safe browsing is on
	});
});

self.port.on("show", function onShow() {
	$("#pass").focus();
	$("#pass").val("");
});
	
self.port.on("auth_fail", function () {
	$("#pass").after("<div style=\"margin:5px 0px\" class=\"alert alert-danger\"><small>Sorry, the password is wrong</small></div>");
});

self.port.on("ison", function () { //change the page when safe browsing is on
	$("#pass").before("<div style=\"margin:5px 0px\" class=\"alert alert-warning\"><small>This will disable safe browsing</div>");
	$("#input").attr("id","input-safe");
});

self.port.on("auth_success", function() {
	$(".alert").hide(); //hide all the generated alerts
	$("#input-safe").attr("id","input"); //this is fine in any case (safe browsing on or off)
});