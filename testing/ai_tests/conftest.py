import pytest
import sys
import os

ai_dir = os.path.abspath('ai')
sys.path.append(ai_dir)

from app import app # type: ignore

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client