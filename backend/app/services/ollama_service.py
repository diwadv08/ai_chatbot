import requests
from app.utils.memory import add_message, get_history

OLLAMA_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"

def get_ai_response(session_id, user_message):
    try:
        # add user message
        add_message(session_id, "User", user_message)

        history = get_history(session_id)

        # better prompt
        prompt = f"""
You are a helpful AI assistant.
Keep answers short and clear.

{history}
Assistant:
"""

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            },
            timeout=60
        )

        result = response.json().get("response", "No response")

        add_message(session_id, "Assistant", result)

        return result

    except Exception as e:
        return f"Error: {str(e)}"