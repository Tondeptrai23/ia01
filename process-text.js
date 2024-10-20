const style = {
    color: $("#color-ipn").val(),
    backgroundColor: $("#background-ipn").val(),
    isBold: false,
    isItalic: $("#italic-ipn").prop("checked"),
    isUnderline: $("#underline-ipn").prop("checked"),
};

let isHighlighting = false;
let searchPattern = new RegExp("", "g");
const originalText = $("#main-text").text();

const handleStyleChange = function () {
    changeStyle("#sample-text");

    const $mainText = $("#main-text");
    const text = $mainText.text();
    if (isHighlighting) {
        const regex = searchPattern;

        const newText = text.replace(regex, function (match) {
            return `<span>${match}</span>`;
        });

        $mainText.html(newText);

        changeStyle("#main-text span");
    } else {
        $mainText.html(text.replace(/<span>/g, "").replace(/<\/span>/g, ""));
    }
};

const changeStyle = function (selector) {
    $(selector).css({
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontWeight: style.isBold ? "bold" : "normal",
        fontStyle: style.isItalic ? "italic" : "normal",
        textDecoration: style.isUnderline ? "underline" : "none",
    });
};

$(document).ready(function () {
    handleStyleChange();

    $("#style-btn").click(function () {
        $(".style-drop-down").toggle();
    });

    $("#search-ipn").on("input", function () {
        searchPattern = new RegExp($(this).val(), "g");

        handleStyleChange();
    });

    $("#highlight-btn").click(function () {
        isHighlighting = !isHighlighting;

        handleStyleChange();
    });

    $("#reset-btn").click(function () {
        $("#main-text").text(originalText);

        $("#color-ipn").val("");
        $("#background-ipn").val("");
        $("#bold-ipn").prop("checked", false);
        $("#italic-ipn").prop("checked", false);
        $("#underline-ipn").prop("checked", false);

        handleStyleChange();
    });

    $("#delete-btn").click(function () {
        const text = $("#main-text").text();
        const newText = text.replace(searchPattern, "");

        $("#main-text").text(newText);

        handleStyleChange();
    });

    $("#color-ipn").on("input", function () {
        style.color = $(this).val();
        handleStyleChange();
    });

    $("#background-ipn").on("input", function () {
        style.backgroundColor = $(this).val();
        handleStyleChange();
    });

    $("#bold-ipn").on("click", function () {
        style.isBold = !style.isBold;
        handleStyleChange();
    });

    $("#italic-ipn").on("click", function () {
        style.isItalic = !style.isItalic;
        handleStyleChange();
    });

    $("#underline-ipn").on("click", function () {
        style.isUnderline = !style.isUnderline;
        handleStyleChange();
    });
});
