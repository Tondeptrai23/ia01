$(document).ready(function () {
    $(".nav a").click(function (e) {
        e.preventDefault();

        $(".nav a").removeClass("selected");
        $(".footer a").removeClass("selected");

        $(this).addClass("selected");
        $(".footer a[href='" + $(this).attr("href") + "']").addClass(
            "selected"
        );
    });
});
