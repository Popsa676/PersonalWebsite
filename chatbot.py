import sys
import ollama

with open("system_message.txt", "r") as file:
    content = file.read()

if __name__ == "__main__":
    user_message = sys.argv[1]
    response : ollama.ChatResponse = ollama.chat(
        model = 'fine_tuned_website_assistant',
        messages = [{'role': 'user', 'content': user_message}]
    )
    print(response.message.content)