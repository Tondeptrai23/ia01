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

const findNewsItem = function (div) {
    return $(div).closest(".news-item");
};

$(document).ready(function () {
    let $parent = null;
    let isDragging = false;
    // Drag and drop for .drag-icon
    $(".drag-icon").on("mousedown", function (e) {
        isDragging = true;
        e.preventDefault();
        $parent = findNewsItem(this);
        const $clone = $parent.clone();
        $clone.find(".news-item-content").hide();

        const offsetY = $parent.find(".news-item-header").height() / 2;
        const initialX = $parent.offset().left;

        $clone.addClass("dragging");
        $clone.css({
            position: "absolute",
            top: e.clientY - offsetY,
            left: initialX,
            width: $parent.css("width"),
            height: $parent.css("height"),
            backgroundColor: $parent.css("backgroundColor"),
            color: $parent.css("color"),
            fontSize: $parent.css("fontSize"),
            pointerEvents: "none",
        });
        $clone.appendTo("body");

        $clone.data("offsetY", offsetY);
        $clone.data("initialX", initialX);
    });

    $(document).on("mouseup", function (e) {
        if (!isDragging) return;
        isDragging = false;

        const $draggedElement = $(".dragging");
        const $target = $(e.target);

        const $newsItem = findNewsItem($target);
        const $children = $(".news-item");

        if ($newsItem.length) {
            if ($children.length && $children.last().offset().top < e.clientY) {
                $newsItem.after($parent);
            } else {
                $newsItem.before($parent);
            }
        } else if ($children.first().offset().top > e.clientY) {
            $(".sidebar").prepend($parent);
        }

        $draggedElement.remove();
    });

    $(document).on("mousemove", function (e) {
        const $dragging = $(".dragging");
        if ($dragging.length) {
            $dragging.css({
                top: e.clientY - $dragging.data("offsetY"),
                left: $dragging.data("initialX"),
            });
        }
    });
});
