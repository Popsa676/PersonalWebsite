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
        message_input.value = "";
        let new_user_message = document.createElement("p");
        new_user_message.classList.add("user_message_object");
        new_user_message.textContent = user_message;
        message_area.prepend(new_user_message);

        let new_bot_message = document.createElement("p");
        new_bot_message.classList.add("bot_message_object");

        if (user_message.trim() === "aboutme") {
            new_bot_message.textContent = "[saaket] hi! my name's saaket potluri and i'm a second-year student at the university of maryland majoring in computer science and minoring in math. my programming journey began with block coding lego robots almost 10 years ago, and over that period i've become versed in python, java, c, and javascript with experience in web development, app development, and systems engineering. my most recent passion is ai, which led me to making saaketgpt and will be the focus of my future projects too. when i'm not studying for exams or working on projects, i spend my time lifting at the gym or playing matches on the badminton courts. my other hobbies include biking, reading comics, and playing video games.";
            message_area.prepend(new_bot_message);
        }

        else if (user_message.trim() === "bestmoment") {
            new_bot_message.textContent = "[saaket] i would say my best moment was when i accomplished losing 50 pounds in one year. i'd struggled with my weight my whole life even with a pretty active lifestyle and trying different diets. it only got worse when i stopped playing sports because of covid, causing my weight to increase to 200 pounds by the beginning of my first year at university. after coming to umd, i started playing badminton for a few hours almost everyday combined with lifting and intermittent fasting. over the following school year, i lost 45 pounds while also increasing my muscle strength significantly. after summer break, i came back to school and lost 5 more pounds in the first few weeks of the semester, bringing me to a total of 50 pounds lost.";
            message_area.prepend(new_bot_message);
        }

        else if (user_message.trim() === "commands") {
            new_bot_message.textContent = "'aboutme', 'bestmoment', 'commands', 'github', 'linkedin', 'reset', 'resume'";
            message_area.prepend(new_bot_message);
        }

        else if (user_message.trim() === "explore") {
            new_bot_message.textContent = "[saaket] welcome to my website! i wanted to make this site as unique as possible, so instead of having a bunch of webpages, all that information can be found by putting commands into the message bar below. if you just wanna chat with saaketgpt, type in any message and it'll respond as soon as possible. otherwise, here are a few commands to get you started:\n'aboutme', 'bestmoment', 'resume' (use 'commands' for the full list)";
            message_area.prepend(new_bot_message);
        }

        else if (user_message.trim() === "github") {
            window.open("https://github.com/Popsa676", "_blank");
            new_bot_message.textContent = "[opened github in new tab]";
            message_area.prepend(new_bot_message);
        }

        else if (user_message.trim() === "linkedin") {
            window.open("https://www.linkedin.com/in/saaket-potluri-668488199/", "_blank");
            new_bot_message.textContent = "[opened linkedin in new tab]";
            message_area.prepend(new_bot_message);
        }

        else if (user_message.trim() === "reset") {
            sessionStorage.setItem('conversation_history', '');
            message_area.replaceChildren();
            new_bot_message.textContent = "hey";
            message_area.prepend(new_bot_message);
            let new_bot_message2 = document.createElement("p");
            new_bot_message2.classList.add("bot_message_object");
            new_bot_message2.textContent = "whats up";
            message_area.prepend(new_bot_message2);
        }

        else if (user_message.trim() === "resume") {
            window.open("https://drive.google.com/file/d/1qi_lVRh8b19T2L1YzaIiClU_nf_PmD_S/view?usp=sharing", "_blank");
            new_bot_message.textContent = "[opened resume in new tab]";
            message_area.prepend(new_bot_message);
        }

        else {
            num_queued_messages++;
            conversation_history = sessionStorage.getItem('conversation_history');

            message_area.prepend(typing_message);
            typing_message.style.display = "block";

            $.ajax({
              url: '/request',
              type: "POST",
              contentType: "text/plain",
              data: conversation_history + delimiter + user_message,
              dataType: 'text',
              success: function(response) {
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
