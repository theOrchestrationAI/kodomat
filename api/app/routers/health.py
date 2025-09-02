from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
import time
import os
import redis
from typing import Dict, Any

router = APIRouter()

# Initialize Redis client if URL is provided
redis_url = os.getenv("REDIS_URL")
redis_client = None
if redis_url:
    try:
        redis_client = redis.from_url(redis_url)
    except Exception as e:
        print(f"Failed to connect to Redis: {e}")

@router.get("/health")
async def health_check() -> Dict[str, Any]:
    """
    Basic health check endpoint.
    Returns a simple status and timestamp.
    """
    return {
        "status": "healthy",
        "timestamp": time.time()
    }

@router.get("/status")
async def status_check() -> Dict[str, Any]:
    """
    Detailed status check endpoint.
    Checks Redis connection and other dependencies.
    """
    status = {
        "api": "operational",
        "timestamp": time.time(),
        "redis": "not_configured"
    }
    
    # Check Redis connection if configured
    if redis_client:
        try:
            redis_client.ping()
            status["redis"] = "connected"
        except Exception:
            status["redis"] = "error"
    
    return status