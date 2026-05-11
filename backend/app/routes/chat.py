from fastapi import APIRouter
from app.models.chat_model import ChatRequest
from app.services.ollama_service import get_ai_response

router = APIRouter()

@router.post("/chat")
def chat(req: ChatRequest):
    response = get_ai_response(req.session_id, req.message)
    return {"response": response}