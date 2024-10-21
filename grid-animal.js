const ANIMAL_ICON = {
    MOUSE: "🐁",
    BUFFALO: "🐃",
    TIGER: "🐅",
    CAT: "🐈",
    DOG: "🐕",
    ELEPHANT: "🐘",
    LION: "🦁",
    SNAKE: "🐍",
    DRAGON: "🐉",
    ROOSTER: "🐓",
    MONKEY: "🐒",
    HORSE: "🐎",
    GOAT: "🐐",
    PIG: "🐖",
    RABBIT: "🐇",
};

const $grid = $("#drag-drop-grid");
let positions = [];
let uiWidth = 0;
let uiHeight = 0;
let originIndex = 0;
let changeIndex = 0;

$(document).ready(function () {
    $("#add-animal-btn").click(function () {
        const $animalInput = $("#animal-dropdown");
        const $animal = $(
            `
            <div class="drag-drop-item">
                <div class="emoji">${
                    ANIMAL_ICON[$animalInput.val().toUpperCase()]
                }</div>
                <div class="emoji-label">${$animalInput.val()}</div>
            </div>
            `
        );

        $grid.append($animal);

        positions = [];

        $(".drag-drop-item")
            .not(".dragging")
            .not(".ui-draggable-dragging")
            .each(function (index) {
                positions.push({
                    index: index,
                    left: $(this).offset().left,
                    top: $(this).offset().top,
                });
            });

        makeDraggable($animal);
    });
});

const makeDraggable = (element) => {
    $(element).draggable({
        helper: "clone",
        cursor: "move",
        delay: 0,
        revert: "invalid",
        start: function (event, ui) {
            uiWidth = $(this).outerWidth();
            uiHeight = $(this).outerHeight();
            originIndex = $(this).index();

            makeDroppable($(".drag-drop-item"));

            const items = $(".drag-drop-item");
            $grid.css(
                "min-height",
                (uiHeight + 10) * Math.ceil(($(items).length - 1) / 5) + 10
            );
            items
                .not(".dragging")
                .not(".ui-draggable-dragging")
                .each(function (index) {
                    positions.push({
                        index: index,
                        left: $(this).offset().left,
                        top: $(this).offset().top,
                    });

                    $(this).css({
                        position: "absolute",
                        left: positions[index].left,
                        top: positions[index].top,
                        width: uiWidth,
                        height: uiHeight,
                    });
                });

            $(ui.helper).css({
                width: uiWidth,
                height: uiHeight,
            });

            $(this).addClass("place-holder");
            $(this).children().hide();
        },

        stop: function (event, ui) {
            $(".drag-drop-item").removeClass("dragging");
            let placeHolder = $(".place-holder");

            placeHolder.html($(ui.draggable).html());
            placeHolder.removeClass("place-holder");
        },
    });
};

const makeDroppable = (element) => {
    $(element).droppable({
        accept: ".drag-drop-item",

        over: function (event, ui) {
            changeIndex = $(event.target).index();

            $(".place-holder").remove();

            let placeholder = $("<div>")
                .addClass("drag-drop-item")
                .addClass("place-holder")
                .css({
                    width: uiWidth,
                    height: uiHeight,
                });

            if (changeIndex == 0) {
                $grid.prepend(placeholder);
            } else if (changeIndex == originIndex) {
                $(this).before(placeholder);
            } else if (changeIndex > originIndex) {
                $(this).after(placeholder);
            } else {
                $(this).before(placeholder);
            }
            $(".drag-drop-item")
                .not(".ui-draggable-dragging")
                .not(".dragging")
                .each(function (index) {
                    if (index > positions.length - 1) {
                        return;
                    }

                    $(this).css({
                        position: "absolute",
                        width: uiWidth,
                        height: uiHeight,
                        left: positions[index].left,
                        top: positions[index].top,
                    });
                });

            $(ui.helper).addClass("dragging");
        },

        drop: function (event, ui) {
            let draggedItem = ui.draggable;
            let targetItem = $(".place-holder");

            // Swap the HTML content
            targetItem.html(draggedItem.html());
            targetItem.children().show();

            // Remove classes and placeholder
            draggedItem.removeClass("dragging");

            // Reset positions
            $(".drag-drop-item").css({
                position: "",
                left: "",
                top: "",
            });

            // Reinitialize draggable for all items
            makeDraggable($(".drag-drop-item"));
        },
    });
};
