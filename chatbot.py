import sys
import ollama

if __name__ == "__main__":
    model_name = 'saaketgpt'
    user_message = sys.argv[1]
    response = ollama.generate(model=model_name, prompt=user_message, keep_alive=-1)
    print(response['response'])
