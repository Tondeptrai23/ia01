$(document).ready(function () {
    $("#style-btn").click(function () {
        $(".style-drop-down").toggle();
    });

    const style = {
        color: "",
        backgroundColor: "",
        isBold: false,
        isItalic: false,
        isUnderline: false,
    };

    const changeStyle = function () {
        $("#sample-text").css({
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontWeight: style.isBold ? "bold" : "normal",
            fontStyle: style.isItalic ? "italic" : "normal",
            textDecoration: style.isUnderline ? "underline" : "none",
        });
    };

    $("#color-ipn").on("input", function () {
        style.color = $(this).val();
        changeStyle();
    });

    $("#background-ipn").on("input", function () {
        style.backgroundColor = $(this).val();
        changeStyle();
    });

    $("#bold-ipn").on("click", function () {
        style.isBold = !style.isBold;
        changeStyle();
    });

    $("#italic-ipn").on("click", function () {
        style.isItalic = !style.isItalic;
        changeStyle();
    });

    $("#underline-ipn").on("click", function () {
        style.isUnderline = !style.isUnderline;
        changeStyle();
    });
});
