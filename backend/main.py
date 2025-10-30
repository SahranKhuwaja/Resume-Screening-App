from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
from docx import Document
import fitz
from io import BytesIO
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
tfidf_vectorizer = joblib.load('./model/tfidf_vectorizer.pkl')
model = joblib.load('./model/model.pkl')

origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],        
)

class Data(BaseModel):
    text: str
    success: bool
    error: Optional[str] = None

@app.get('/')
def testing():
    return {"Hello": "World"}


@app.post('/predict')
async def predict(file : UploadFile = File(...)):
    data: Data = await get_data_from_file_type(file)
    if not data.success:
        return {
            "error": data.error
        }
    
    
    
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "success": True,
    }

def extract_text_from_pdf(file_bytes):
    text = ""
    with fitz.open(stream=file_bytes, filetype="pdf") as pdf:
        for page in pdf:
            text += page.get_text()
    return text

def extract_text_from_doc(file_bytes):
    doc = Document(BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

async def get_data_from_file_type(file) -> Data:
    file_bytes = await file.read()
    raw_text = ""
    if file.filename.endswith('.txt'):
        raw_text = file_bytes.decode('utf-8', errors="ignore")
    elif file.filename.endswith('.pdf'):
        raw_text = extract_text_from_pdf(file_bytes)
    elif file.filename.endswith('docx'):
        raw_text = extract_text_from_doc(file_bytes)
    else:
        return Data(text="",error="File type not supported", success=False)
    
    return Data(text=raw_text, success=True)
