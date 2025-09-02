from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
import time

class SuggestionCreate(BaseModel):
    original_text: str = Field(..., min_length=1, max_length=5000)
    suggested_translation: str = Field(..., min_length=1, max_length=5000)
    language_pair: str = Field(..., regex=r'^[a-z]{2}-[a-z]{2}$')
    context: Optional[str] = None
    
    @validator('language_pair')
    def validate_language_pair(cls, v):
        source, target = v.split('-')
        if source == target:
            raise ValueError("Source and target languages must be different")
        return v

class TranslationSuggestion(BaseModel):
    id: str
    user_id: str
    original_text: str
    suggested_translation: str
    language_pair: str
    score: float = Field(..., ge=0.0, le=1.0)
    status: str = Field(..., regex=r'^(pending|approved|rejected)$')
    created_at: int
    updated_at: Optional[int] = None
    context: Optional[str] = None
    reviewer_id: Optional[str] = None
    review_comment: Optional[str] = None

class SuggestionResponse(BaseModel):
    id: str
    status: str
    message: str
    score: Optional[float] = None

class AuditLog(BaseModel):
    id: str
    user_id: str
    action: str
    resource_type: str
    resource_id: str
    timestamp: int = Field(default_factory=lambda: int(time.time()))
    details: Optional[Dict[str, Any]] = None

class UserProfile(BaseModel):
    id: str
    email: str
    display_name: Optional[str] = None
    role: str = "user"
    created_at: int
    last_login: Optional[int] = None
    preferences: Optional[Dict[str, Any]] = None
    contribution_stats: Optional[Dict[str, int]] = None