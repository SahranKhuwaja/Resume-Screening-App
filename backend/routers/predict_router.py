from fastapi import APIRouter, UploadFile, File
from base_models.response_basemodel import Response
from services.prediction_service import get_prediction
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_MODEL_DIR = os.path.join(BASE_DIR, "ml_model")

ENCODER_PATH = os.path.join(ML_MODEL_DIR, "label_encoder.pkl")

label_encoder = joblib.load(ENCODER_PATH)

router = APIRouter(prefix="/api/prediction", tags=["resume_prediction"])


@router.post('/predict', response_model=Response)
async def predict(file : UploadFile = File(...)):
    return await get_prediction(file)


@router.get("/labels")
def get_labels():
    return label_encoder.classes_.tolist()




