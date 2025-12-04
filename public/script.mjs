var message_area = document.getElementById("message_area");
var message_input = document.getElementById("message_input");
var send_button = document.getElementById("send_button");
var user_message = "";

send_button.addEventListener("click", function() {
    user_message = message_input.value;
    message_input.value = "";
    let new_user_message = document.createElement("p");
    new_user_message.classList.add("user_message_object");
    new_user_message.style.width = Math.min((user_message.length * 10), 500).toString() + "px";
    new_user_message.textContent = user_message;
    message_area.prepend(new_user_message);

    $.ajax({
      url: "http://localhost:8000/request",
      type: "POST",
      contentType: "text/plain",
      data: user_message,
      dataType: 'text',
      success: function(response) {
        let new_bot_message = document.createElement("p");
        new_bot_message.classList.add("bot_message_object");
        new_bot_message.style.width = Math.min((response.length * 10), 500).toString() + "px";
        new_bot_message.textContent = response;
        message_area.prepend(new_bot_message);
      }, 
      error: function(xhr, status, error) {
        console.error("AJAX Error: ", error)
      }
    });
});

message_input.addEventListener("keypress", function(event) {
  
  if (event.key == 'Enter') {
    event.preventDefault();
    send_button.click();
  }
});