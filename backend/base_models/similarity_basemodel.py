from pydantic import BaseModel
from typing import Optional

class Similarity(BaseModel):
     file_name: str
     content_type: str 
     similarity_score: float
     matched_keywords: Optional[list[str]] = None
     missed_keywords: Optional[list[str]] = None