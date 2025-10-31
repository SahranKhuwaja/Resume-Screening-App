from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict_router

app = FastAPI()


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


@app.get('/')
def testing():
    return {"Greeting": "Welcome to Resume Screening App"}

app.include_router(predict_router.router)
