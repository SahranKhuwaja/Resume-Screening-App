from fastapi import Form, UploadFile, File
from base_models.data_basemodel import Data
from base_models.similarity_basemodel import Similarity
from base_models.similarity_response_basemodel import SimilarityResponse
from utils.read_file import get_data_from_file_type
from utils.preprocess import preprocess
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

async def calculate_similarity(job_description : str = Form(...), files : list[UploadFile] = File(...)):
    
    preprocessed_job_description = preprocess(job_description)
    job_description_embedding = convert_to_embeddings(preprocessed_job_description)
    resumes  = []
    for file in files:
        data : Data = await get_data_from_file_type(file)
        if not data.success:
            return SimilarityResponse(success=False,
                                      error=data.error)
        
        preprocessed_data = preprocess(data.text)
        resume_embedding = convert_to_embeddings(preprocessed_data)
        similarity_score = calculate_sentence_similarity_SBERT(job_description_embedding, resume_embedding)
        resumes.append(Similarity(filename=file.filename, 
                                    content_type=file.content_type, 
                                    similarity_score=similarity_score))
        
    return SimilarityResponse(success=True,
                              resumes=resumes)
        

def convert_to_embeddings(text : str):
    return model.encode(text, convert_to_tensor=True)


def calculate_sentence_similarity_SBERT(job_description, resume):
    return util.cos_sim(job_description, resume).item() 