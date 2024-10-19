const expandIcon = {
    expand: "▶",
    collapse: "↓",
};

$(document).ready(function () {
    $(".expand-icon").click(function (e) {
        e.preventDefault();

        const $parent = $(this).parent().parent();
        if ($(this).text() === expandIcon.expand) {
            $(this).text(expandIcon.collapse);
            $parent.addClass("selected");
            $parent.find(".news-item-content").show();
        } else {
            $(this).text(expandIcon.expand);
            $parent.removeClass("selected");
            $parent.find(".news-item-content").hide();
        }
    });
});
