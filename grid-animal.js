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

$(document).ready(function () {
    const $grid = $("#drag-drop-grid");

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
    });
});
