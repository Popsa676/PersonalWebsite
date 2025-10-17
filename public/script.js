var message_input = document.getElementById("message_input");
var send_button = document.getElementById("send_button");
var message_text = "";

send_button.addEventListener("click", function() {
    message_text = message_input.value;
    message_input.value = "";
    document.activeElement.blur();
});