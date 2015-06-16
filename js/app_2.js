$(document).ready(function(){
    $(".nav-dropdown").hover(
        function() { $('.nav-dropdown-menu', this).fadeIn("fast");
        },
        function() { $('.nav-dropdown-menu', this).fadeOut("fast");
    });
});