from fastapi import APIRouter, Form, UploadFile, File
from services.simialrity_service import calculate_similarity
from base_models.similarity_response_basemodel import SimilarityResponse

router = APIRouter(prefix="/api/match", tags=["resume_similarity_score_calculator"])


@router.post('/similarity', response_model= SimilarityResponse)
async def similarity(job_description : str = Form(...), files : list[UploadFile] = File(...)):
    return await calculate_similarity(job_description, files)
