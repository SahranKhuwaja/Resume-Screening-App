from pydantic import BaseModel
from typing import Optional
from base_models.similarity_basemodel import Similarity

class SimilarityResponse(BaseModel):
     success: bool
     resumes: Optional[list[Similarity]] = None
     error: Optional[str] = None