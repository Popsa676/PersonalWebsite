import sys
import ollama

with open("system_message.txt", "r") as file:
    content = file.read()

ollama.create(model='chatbot', from_='gpt-oss:20b', system=content)

if __name__ == "__main__":
    user_message = sys.argv[1]
    response : ollama.ChatResponse = ollama.chat(
        model = 'chatbot',
        messages = [{'role': 'user', 'content': user_message}]
    )
    print(response.message.content)