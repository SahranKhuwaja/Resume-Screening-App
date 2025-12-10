🧠 Resume Screening & Ranking App

**DEMO:** https://drive.google.com/file/d/1J8eBqMfjDRqCCaN9NsQsS-TRaWnkaUsZ/view

An intelligent NLP-powered Resume Screening and Ranking system built using FastAPI (backend) and Next.js (frontend).
This project automates resume classification and ranking for recruiters, helping them identify top candidates efficiently using machine learning, semantic embeddings, and cosine similarity.

🚀 Features
🔍 1. Resume Analyzer (Job Title Prediction)

Upload a candidate’s resume (PDF or text).

The system predicts the most suitable job title using a trained NLP model.

The model was trained on resumes across 17 professional categories:

['Data Science', 'HR', 'Advocate', 'Arts', 'Web Designing',
 'Mechanical Engineer', 'Sales', 'Health and fitness',
 'Civil Engineer', 'Java Developer', 'Business Analyst',
 'SAP Developer', 'Automation Testing', 'Electrical Engineering',
 'Operations Manager', 'Python Developer', 'DevOps Engineer',
 'Network Security Engineer', 'PMO', 'Database', 'Hadoop',
 'ETL Developer', 'DotNet Developer', 'Blockchain', 'Testing']

🧩 2. Resume Ranking for Employers

Employers can upload multiple resumes and a job description.

The system calculates semantic similarity between each resume and the job description using Sentence Transformers.

Based on the cosine similarity score:

All resumes are ranked from most relevant to least.

The top 3 resumes are awarded 🥇🥈🥉 medal icons on the frontend dashboard.

🧠 3. NLP & Machine Learning Highlights

Sentence embedding generation using sentence-transformers/all-MiniLM-L6-v2.

Cosine similarity metric used for ranking resumes.

Job title prediction model trained using traditional NLP and ML techniques (refer to the Jupyter Notebook below).

Clean, modular FastAPI endpoints for easy integration.

🏗️ Tech Stack
Frontend

Next.js 14 – modern React-based UI framework

Tailwind CSS – responsive, sleek design system

Axios – API communication with backend

Shadcn/UI – elegant, pre-built UI components

Dynamic medal icons for top-ranked resumes

Backend

FastAPI – high-performance Python API

Sentence Transformers – for text embeddings

Scikit-Learn – for ML-based job title prediction

Pandas & NumPy – for data preprocessing

Cosine Similarity – for ranking logic

⚙️ How It Works

Users upload resumes (PDF or text).

Job description is entered or uploaded.

Each resume and the job description are converted into embeddings using Sentence Transformer.

Cosine similarity is computed between embeddings to measure relevance.

The app displays a ranked list of resumes with scores — top 3 resumes get medal icons.

The Resume Analyzer module predicts each resume’s most likely job title/category.

🧪 Model Training Reference

The resume classification model and training process are explained in the Jupyter notebook:
📘 Resume Screening.ipynb

Key training steps included:

Resume text cleaning and preprocessing

TF-IDF vectorization for feature extraction

Multiclass classification using labeled resume dataset

Evaluation and fine-tuning across 17 domains

🧠 Future Enhancements

Add fine-tuned transformer models (BERT/RoBERTa) for improved classification.

Integrate keyword extraction for resume-job fit visualization.

Allow real-time feedback and interactive dashboards.

Add multi-language resume support.

Generate whole resumes based on job description for ATS.

👨‍💻 Author

Sahran Khuwaja
🚀 Maching Learning Engineer | AI & Robotics Enthusiast | Full-Stack Developer | Data Scientist
