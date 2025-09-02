import pytest
import sys
import os
from unittest.mock import MagicMock, patch

# Add the api directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../api')))

from app.services.score_calculator import ScoreCalculator

class TestScoreCalculator:
    def setup_method(self):
        # Create a ScoreCalculator instance with a mocked Redis client
        self.calculator = ScoreCalculator()
        self.calculator.redis_client = MagicMock()
    
    def test_calculate_base_score(self):
        # Test the base score calculation
        original = "Hello world"
        translation = "Pozdrav svijete"
        lang_pair = "en-hr"
        
        score = self.calculator._calculate_base_score(original, translation, lang_pair)
        
        # Score should be between 0 and 1
        assert 0 <= score <= 1
        
        # Test with empty strings
        score_empty = self.calculator._calculate_base_score("", "", lang_pair)
        assert score_empty == 0.0
    
    def test_apply_adjustments(self):
        # Test adjustments to the score
        
        # Test identical text (should get a low score)
        score_identical = self.calculator._apply_adjustments(0.8, "Hello", "Hello")
        assert score_identical == 0.1
        
        # Test empty translation (should get zero)
        score_empty = self.calculator._apply_adjustments(0.8, "Hello", "")
        assert score_empty == 0.0
        
        # Test normal case
        score_normal = self.calculator._apply_adjustments(0.8, "Hello!", "Pozdrav!")
        assert 0 <= score_normal <= 1
    
    @pytest.mark.asyncio
    async def test_calculate_score(self):
        # Test the full score calculation
        suggestion_data = {
            "original_text": "Hello world",
            "suggested_translation": "Pozdrav svijete",
            "language_pair": "en-hr"
        }
        
        # Mock the cache methods
        self.calculator._get_cached_score = MagicMock(return_value=None)
        self.calculator._cache_score = MagicMock()
        
        score = await self.calculator.calculate_score(suggestion_data)
        
        # Score should be between 0 and 1
        assert 0 <= score <= 1
        
        # Cache should have been checked
        self.calculator._get_cached_score.assert_called_once()
        
        # Result should have been cached
        self.calculator._cache_score.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_calculate_score_cached(self):
        # Test that cached scores are returned
        suggestion_data = {
            "original_text": "Hello world",
            "suggested_translation": "Pozdrav svijete",
            "language_pair": "en-hr"
        }
        
        # Mock the cache to return a value
        self.calculator._get_cached_score = MagicMock(return_value=0.75)
        self.calculator._cache_score = MagicMock()
        
        score = await self.calculator.calculate_score(suggestion_data)
        
        # Score should be the cached value
        assert score == 0.75
        
        # Cache should have been checked
        self.calculator._get_cached_score.assert_called_once()
        
        # Result should not have been cached again
        self.calculator._cache_score.assert_not_called()