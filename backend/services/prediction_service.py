from fastapi import UploadFile, File
from base_models.data_basemodel import Data
from base_models.response_basemodel import Response
from utils.preprocess import preprocess
from utils.read_file import get_data_from_file_type
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_MODEL_DIR = os.path.join(BASE_DIR, "ml_model")

MODEL_PATH = os.path.join(ML_MODEL_DIR, "model.pkl")
VECTORIZER_PATH = os.path.join(ML_MODEL_DIR, "tfidf_vectorizer.pkl")
ENCODER_PATH = os.path.join(ML_MODEL_DIR, "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
tfidf_vectorizer = joblib.load(VECTORIZER_PATH)
label_encoder = joblib.load(ENCODER_PATH)

async def get_prediction(file : UploadFile = File(...)):
    try:
        data: Data = await get_data_from_file_type(file)
  
        if not data.success:
            return Response(success=False, error=data.error)
    
        preprocessed_data = preprocess(data.text)
        tdifd_vectors = tfidf_vectorizer.transform([preprocessed_data])
        prediction = model.predict(tdifd_vectors)[0]
        prediction_label = label_encoder.inverse_transform([prediction])[0]
    
        return Response (
            filename = file.filename,
            content_type = file.content_type,
            success = True,
            prediction = int(prediction),
            prediction_label = str(prediction_label)
        )
    except Exception as e:
        return Response(success=False, error=str(e))
