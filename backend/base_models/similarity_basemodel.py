from pydantic import BaseModel
from typing import Optional

class Similarity(BaseModel):
     file_name: str
     content_type: str 
     similarity_score: float