
function runScript(e) {
    if (e.keyCode == 13) {
        var tb = document.getElementById("scriptBox");
        eval(tb.value);
        return false;
    }
}
