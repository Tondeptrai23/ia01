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
let draggingElement = null;

$(window).resize(function () {
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
});

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
    $(element)
        .not(".place-holder")
        .draggable({
            helper: "clone",
            cursor: "move",
            revert: function (dropped) {
                const $placeHolder = $(".place-holder");

                $(this).data("uiDraggable").originalPosition =
                    $placeHolder.offset();

                return true;
            },
            start: function (event, ui) {
                draggingElement = $(this);
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
                    zIndex: 1000,
                    width: uiWidth,
                    height: uiHeight,
                });
                $(ui.helper).addClass("dragging");

                $(this).addClass("place-holder");
                $(this).children().hide();
            },

            stop: function (event, ui) {
                $(".drag-drop-item").removeClass("dragging");
                let placeHolder = $(".place-holder");

                placeHolder.html($(ui.helper).html());
                placeHolder.children().show();
                placeHolder.removeClass("place-holder");
                ui.helper.remove();

                $(".drag-drop-item").css({
                    position: "",
                    left: "",
                    top: "",
                });

                makeDraggable($(placeHolder));
            },
        });
};

const makeDroppable = (element) => {
    $(element).droppable({
        accept: ".drag-drop-item",

        over: function (event, ui) {
            changeIndex = $(event.target).index();

            let placeholder = $(".place-holder").css({
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
            makeDraggable(ui.helper);
        },
        drop: function (event, ui) {
            makeDraggable($(".drag-drop-item"));
        },
    });
};
