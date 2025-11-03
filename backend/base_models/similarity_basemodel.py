from pydantic import BaseModel
from typing import Optional

class Similarity(BaseModel):
     filename: str
     content_type: str 
     similarity_score: float