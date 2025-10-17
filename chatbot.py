import sys
import time
from ollama import chat
from ollama import ChatResponse

repeat = True
response = ""
user_input = ""
file_object = open('system_message.txt', 'r')
system_message = file_object.read()
delimiter = "This is the next message in the coversation. Only respond to this message."

file_object.close()
print("yo.", end=" ")
sys.stdout.flush()
time.sleep(0.5)
print("what's", end=" ")
sys.stdout.flush()
time.sleep(0.5)
print("up?")
sys.stdout.flush()

while repeat :
  response = ""
  user_input = input("")

  if (user_input.find("bye") == -1 & user_input.find("cya") == -1 & user_input.find("see you") == -1):

    stream = chat(
        model = 'gemma3:1b',
        messages = [{'role': 'user', 'content': system_message + delimiter + user_input}],
        stream = True,
    )

    for chunk in stream:
      print(chunk['message']['content'], end='', flush=True)
      sys.stdout.flush()
      response += chunk['message']['content'].strip('\n')
    system_message = system_message + "<start-of-turn>user\n" + user_input + '<end-of-turn>\n'
    system_message = system_message + "<start-of-turn>model\n" + response + '<end-of-turn>\n'
    #print(system)
    print()
    sys.stdout.flush()
  
  else:
    repeat = False