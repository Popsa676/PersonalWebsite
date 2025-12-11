const hostname = 'popsaserver';
const port = 8000;

var message_area = document.getElementById("message_area");
var message_input = document.getElementById("message_input");
var send_button = document.getElementById("send_button");
var conversation_history = "";
var delimiter = "This is the next message in the coversation. Only respond to this message. ";
var user_message = "";
var num_queued_messages = 0;
sessionStorage.setItem('conversation_history', '');

let typing_message = document.createElement("img");
typing_message.id = "typing_message";
typing_message.src = "typing.gif";
typing_message.style.height = "45px";
typing_message.style.width = "75px";
typing_message.style.marginLeft = "20px";
typing_message.style.marginTop = "16px";
typing_message.style.display = "none";

send_button.addEventListener("click", function() {
    if (message_input.value.trim() !== "" && num_queued_messages < 5) {
        user_message = message_input.value;
        num_queued_messages++;
        conversation_history = sessionStorage.getItem('conversation_history');

        message_input.value = "";
        let new_user_message = document.createElement("p");
        new_user_message.classList.add("user_message_object");
        new_user_message.textContent = user_message;
        message_area.prepend(new_user_message);

        message_area.prepend(typing_message);
        typing_message.style.display = "block";

        $.ajax({
          url: '/request',
          type: "POST",
          contentType: "text/plain",
          data: conversation_history + delimiter + user_message,
          dataType: 'text',
          success: function(response) {
            let new_bot_message = document.createElement("p");
            new_bot_message.classList.add("bot_message_object");
            new_bot_message.textContent = response;
            message_area.prepend(new_bot_message);

            if (--num_queued_messages > 0) {
                message_area.prepend(typing_message);
            }

            else {
                typing_message.style.display = "none";
            }
            sessionStorage.setItem('conversation_history', conversation_history + "<|start|>user<|message|>" + user_message + '<|end|>\n' + "<|start|>assistant<|message|>" + response + '<|end|>\n');
          }, 
          error: function(xhr, status, error) {
            console.error("AJAX Error: ", status, error);
          }
        });
    }

    else {
    
        if (num_queued_messages >= 5) {
            message_input.classList.add('failed_message');
            message_input.placeholder = "Max queued messages reached..."; 
            setTimeout(function() {
                message_input.classList.remove('failed_message');
                message_input.placeholder = "Enter message here...";
            }, 1750);
        }

        else {
            message_input.classList.add('failed_message');
            message_input.placeholder = "Must enter a message...";
            setTimeout(function() {
                message_input.classList.remove('failed_message');
                message_input.placeholder = "Enter message here...";
            }, 1750);
        }
    }
});

message_input.addEventListener("keypress", function(event) {
  
  if (event.key == 'Enter') {
    event.preventDefault();
    send_button.click();
  }
});
