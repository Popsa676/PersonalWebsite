import sys
from ollama import chat
from ollama import ChatResponse

fixed_response = ""

if __name__ == "__main__":
    user_message = sys.argv[1]
    response : ChatResponse = chat(
        model = 'gemma3:1b',
        messages = [{'role': 'user', 'content': user_message}]
    )
    fixed_response = str((response.message.content).encode('ascii', 'ignore'))[1:]
    print(fixed_response, end='')