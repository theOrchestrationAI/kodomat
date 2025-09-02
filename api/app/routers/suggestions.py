from fastapi import APIRouter, Depends, HTTPException, Body, Query, Header
from typing import List, Optional, Dict, Any
import time
import os
import redis
import json
import logging
from app.models.schemas import TranslationSuggestion, SuggestionResponse, SuggestionCreate
from app.services.score_calculator import ScoreCalculator

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize Redis client if URL is provided
redis_url = os.getenv("REDIS_URL")
redis_client = None
if redis_url:
    try:
        redis_client = redis.from_url(redis_url)
    except Exception as e:
        logger.error(f"Failed to connect to Redis: {e}")

@router.post("/", response_model=SuggestionResponse)
async def create_suggestion(
    suggestion: SuggestionCreate = Body(...),
    authorization: Optional[str] = Header(None),
    calculator: ScoreCalculator = Depends()
) -> Dict[str, Any]:
    """
    Create a new translation suggestion.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    # In production, validate the token and extract user ID
    # For now, we'll use a placeholder
    user_id = "user-123"
    
    # Calculate score for the suggestion
    score = await calculator.calculate_score(suggestion.dict())
    
    # Create suggestion object
    new_suggestion = TranslationSuggestion(
        id=f"suggestion-{int(time.time())}",
        user_id=user_id,
        original_text=suggestion.original_text,
        suggested_translation=suggestion.suggested_translation,
        language_pair=suggestion.language_pair,
        score=score,
        status="pending",
        created_at=int(time.time())
    )
    
    # In production, save to Firestore
    # For now, we'll cache in Redis if available
    if redis_client:
        try:
            redis_client.setex(
                f"suggestion:{new_suggestion.id}", 
                3600,  # 1 hour expiration
                json.dumps(new_suggestion.dict())
            )
        except Exception as e:
            logger.error(f"Failed to cache suggestion in Redis: {e}")
    
    return {
        "id": new_suggestion.id,
        "status": "success",
        "score": score,
        "message": "Suggestion created successfully"
    }

@router.get("/", response_model=List[TranslationSuggestion])
async def list_suggestions(
    status: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=100),
    authorization: Optional[str] = Header(None)
) -> List[Dict[str, Any]]:
    """
    List translation suggestions with optional filtering.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    # In production, validate the token and check admin status
    # For now, we'll use a placeholder
    
    # Mock data for demonstration
    suggestions = [
        {
            "id": "suggestion-1",
            "user_id": "user-123",
            "original_text": "Hello world",
            "suggested_translation": "Pozdrav svijete",
            "language_pair": "en-hr",
            "score": 0.92,
            "status": "approved",
            "created_at": int(time.time()) - 3600
        },
        {
            "id": "suggestion-2",
            "user_id": "user-456",
            "original_text": "How are you?",
            "suggested_translation": "Kako si?",
            "language_pair": "en-hr",
            "score": 0.85,
            "status": "pending",
            "created_at": int(time.time()) - 1800
        }
    ]
    
    # Filter by status if provided
    if status:
        suggestions = [s for s in suggestions if s["status"] == status]
    
    # Apply limit
    suggestions = suggestions[:limit]
    
    return suggestions

@router.get("/{suggestion_id}", response_model=TranslationSuggestion)
async def get_suggestion(
    suggestion_id: str,
    authorization: Optional[str] = Header(None)
) -> Dict[str, Any]:
    """
    Get a specific translation suggestion by ID.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    # Check Redis cache first if available
    if redis_client:
        try:
            cached = redis_client.get(f"suggestion:{suggestion_id}")
            if cached:
                return json.loads(cached)
        except Exception as e:
            logger.error(f"Failed to get suggestion from Redis: {e}")
    
    # Mock data for demonstration
    if suggestion_id == "suggestion-1":
        return {
            "id": "suggestion-1",
            "user_id": "user-123",
            "original_text": "Hello world",
            "suggested_translation": "Pozdrav svijete",
            "language_pair": "en-hr",
            "score": 0.92,
            "status": "approved",
            "created_at": int(time.time()) - 3600
        }
    
    raise HTTPException(status_code=404, detail="Suggestion not found")

@router.put("/{suggestion_id}/status", response_model=SuggestionResponse)
async def update_suggestion_status(
    suggestion_id: str,
    status: str = Body(..., embed=True),
    authorization: Optional[str] = Header(None)
) -> Dict[str, Any]:
    """
    Update the status of a translation suggestion.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    # In production, validate the token and check admin status
    # For now, we'll use a placeholder
    
    # Validate status
    valid_statuses = ["pending", "approved", "rejected"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    # In production, update in Firestore and create audit log
    # For now, we'll just return a success response
    
    return {
        "id": suggestion_id,
        "status": "success",
        "message": f"Suggestion status updated to {status}"
    }