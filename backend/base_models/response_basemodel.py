from pydantic import BaseModel
from typing import Optional

class Response(BaseModel):
     filename: Optional[str] = None
     content_type: Optional[str] = None
     success: bool
     prediction: Optional[int] = None
     prediction_label: Optional[str] = None
     error: Optional[str] = None