import sys
import os
import warnings

ai_dir = os.path.abspath('ai')
sys.path.append(ai_dir)

from planner import *  # type: ignore

def test_innit_planner():
    innit_planner() # type: ignore
    
    assert le_city is not None  # type: ignore
    assert le_season is not None  # type: ignore
    assert le_budget is not None  # type: ignore
    assert knn is not None  # type: ignore
   
def test_get_cities_with_false_input():
    data = "invalid_json"
    result = get_cities(data) # type: ignore
    assert result == []
    
