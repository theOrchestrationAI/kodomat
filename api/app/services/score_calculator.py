import logging
import os
import json
import redis
from typing import Dict, Any, Optional
import hashlib

logger = logging.getLogger(__name__)

class ScoreCalculator:
    """
    Service for calculating quality scores for translation suggestions.
    Uses a combination of factors including:
    - Language pair complexity
    - Text length
    - Special characters
    - Formatting consistency
    
    In a production environment, this would integrate with an AI model
    for more accurate scoring.
    """
    
    def __init__(self):
        # Initialize Redis client if URL is provided for caching
        self.redis_client = None
        redis_url = os.getenv("REDIS_URL")
        if redis_url:
            try:
                self.redis_client = redis.from_url(redis_url)
                logger.info("Redis client initialized for score caching")
            except Exception as e:
                logger.error(f"Failed to connect to Redis: {e}")
        
        # Language pair complexity factors (higher = more complex)
        self.language_complexity = {
            "en-hr": 0.7,  # English to Croatian
            "hr-en": 0.5,  # Croatian to English
            "en-de": 0.6,  # English to German
            "de-en": 0.5,  # German to English
            "default": 0.6  # Default complexity
        }
    
    async def calculate_score(self, suggestion_data: Dict[str, Any]) -> float:
        """
        Calculate a quality score for a translation suggestion.
        
        Args:
            suggestion_data: Dictionary containing suggestion details
                             (original_text, suggested_translation, language_pair)
        
        Returns:
            float: Quality score between 0.0 and 1.0
        """
        # Extract required fields
        original_text = suggestion_data.get("original_text", "")
        translation = suggestion_data.get("suggested_translation", "")
        language_pair = suggestion_data.get("language_pair", "default")
        
        # Generate cache key
        cache_key = self._generate_cache_key(original_text, translation, language_pair)
        
        # Check cache first
        cached_score = self._get_cached_score(cache_key)
        if cached_score is not None:
            logger.info(f"Using cached score for suggestion: {cache_key[:8]}...")
            return cached_score
        
        # Calculate base score
        base_score = self._calculate_base_score(original_text, translation, language_pair)
        
        # Apply adjustments
        final_score = self._apply_adjustments(base_score, original_text, translation)
        
        # Cache the result
        self._cache_score(cache_key, final_score)
        
        return final_score
    
    def _generate_cache_key(self, original: str, translation: str, lang_pair: str) -> str:
        """Generate a unique cache key for the suggestion."""
        combined = f"{original}|{translation}|{lang_pair}"
        return f"score:{hashlib.md5(combined.encode()).hexdigest()}"
    
    def _get_cached_score(self, cache_key: str) -> Optional[float]:
        """Get a cached score if available."""
        if not self.redis_client:
            return None
        
        try:
            cached = self.redis_client.get(cache_key)
            if cached:
                return float(cached)
        except Exception as e:
            logger.error(f"Error retrieving cached score: {e}")
        
        return None
    
    def _cache_score(self, cache_key: str, score: float) -> None:
        """Cache a calculated score."""
        if not self.redis_client:
            return
        
        try:
            self.redis_client.setex(cache_key, 3600 * 24, str(score))  # Cache for 24 hours
        except Exception as e:
            logger.error(f"Error caching score: {e}")
    
    def _calculate_base_score(self, original: str, translation: str, lang_pair: str) -> float:
        """Calculate the base quality score."""
        # Get language complexity factor
        complexity = self.language_complexity.get(lang_pair, self.language_complexity["default"])
        
        # Length ratio factor (translation should be proportional to original)
        orig_len = len(original)
        trans_len = len(translation)
        
        if orig_len == 0:  # Avoid division by zero
            length_ratio = 0.0
        else:
            expected_ratio = 1.0  # Simplified; in reality this varies by language pair
            actual_ratio = trans_len / orig_len
            length_ratio = 1.0 - min(abs(actual_ratio - expected_ratio), 1.0)
        
        # Combine factors
        base_score = (complexity + length_ratio) / 2
        return base_score
    
    def _apply_adjustments(self, base_score: float, original: str, translation: str) -> float:
        """Apply adjustments to the base score."""
        # Check for empty translation
        if not translation.strip():
            return 0.0
        
        # Check for identical text (likely not translated)
        if original.lower() == translation.lower():
            return 0.1
        
        # Formatting consistency check (simplified)
        # Check if both have similar punctuation counts
        orig_punct = sum(1 for c in original if c in ".,;:!?")
        trans_punct = sum(1 for c in translation if c in ".,;:!?")
        
        punct_diff = abs(orig_punct - trans_punct)
        punct_penalty = min(punct_diff * 0.05, 0.2)  # Max 0.2 penalty
        
        # Apply adjustments
        final_score = base_score - punct_penalty
        
        # Ensure score is within valid range
        final_score = max(0.0, min(1.0, final_score))
        
        return final_score