# 🧠 AI Medical Lab Report Examiner

An AI-powered healthcare application that helps users understand medical lab reports by converting complex medical data into simple, human-readable explanations. The system uses a Retrieval-Augmented Generation (RAG) pipeline with a locally hosted language model to ensure privacy, cost efficiency, and ethical AI usage.

---

## 🚀 Problem Statement

Medical lab reports are filled with technical terms, reference ranges, and numerical values that are difficult for non-medical users to interpret. This often leads to confusion, anxiety, and delayed follow-ups. Existing digital solutions either provide raw data without explanation or rely on cloud-based AI systems that raise privacy and cost concerns.

---

## 💡 Solution Overview

AI Medical Lab Report Examiner enables users to upload medical lab reports (PDF or image format) and receive clear, simplified explanations of their results. The application parses the uploaded documents, retrieves relevant medical context using vector search, and generates explanations using a locally running AI model. The system is strictly non-diagnostic and includes clear disclaimers to encourage professional medical consultation.

---

## ✨ Key Features

- 📄 Upload lab reports in PDF format  
- 🧠 AI-generated explanations in simple language  
- 🔍 Retrieval-Augmented Generation (FAISS + embeddings)  
- 🔐 Privacy-first design using local LLM inference  
- 🧾 Historical record support (extensible)  
- ⚠️ Ethical AI with medical disclaimers  
- 💻 Offline-capable AI using Ollama  

---

## 🏗️ System Architecture

1. User uploads a medical lab report  
2. Backend parses and extracts report text  
3. Relevant medical context is retrieved via FAISS  
4. Prompt is constructed with safeguards  
5. Local LLM generates explanation via Ollama  
6. Frontend displays structured results  

---

## 🧰 Tech Stack

### Frontend
- React.js
- Axios
- Modern UI components

### Backend
- FastAPI
- Python
- REST APIs

### AI / ML
- Ollama (local LLM hosting)
- phi3:mini (lightweight language model)
- FAISS (vector database)
- Sentence Transformers (embeddings)

---
## 📁 Project Structure

lab_report_examiner/
│
├── backend/
│ ├── main.py
│ ├── services/
│ ├── parsing/
│ ├── rag/
│ └── utils/
│
├── frontend/
│ └── src/
│
├── data/
│ ├── medical_terms.txt
│ ├── lab_ranges.json
│ └── medical_index.faiss
│
├── docs/
│ └── AI_Lab_Report_Examiner_Documentation.docx
│
├── requirements.txt
├── .gitignore
└── README.md
