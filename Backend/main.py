from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as ai
import json 
from config import API_KEY

ai.configure(api_key=API_KEY)

model = ai.GenerativeModel('gemini-pro')
chat = model.start_chat()


app = FastAPI(title="Gemini-Pro Chatbot API", version="1.0")

class MessageRequest(BaseModel):
    message: str


@app.post("/chat/")
async def chat_with_model(request: MessageRequest):
    if request.message.lower() in ["exit", "bye", "quit"]:
        return {"message": "Chat ended. Goodbye! 👋"}

    try:
        with open('prompt.txt', 'r', encoding='utf-8') as file:
            content = file.read()

        response = chat.send_message(f'''{content}\n{request.message}''')

        response_json = json.loads(response.text)

        return response_json 

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to decode JSON from model response.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
