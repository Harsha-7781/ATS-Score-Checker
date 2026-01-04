# 🚀 ATS Score Checker (GenAI Powered)

An AI-powered Applicant Tracking System (ATS) Score Checker that analyzes a resume against a job description and provides an ATS compatibility score along with detailed feedback.

This project demonstrates real-world usage of **Generative AI (Google Gemini)** in recruitment and resume screening systems.

---

## 🔍 Features

- 📄 Upload resume (PDF, DOC, DOCX, TXT)
- 📝 Paste job description
- 🤖 AI-powered ATS evaluation using Google Gemini
- 📊 Circular ATS match score visualization
- ✅ Matching skills identification
- ❌ Missing skills detection
- 💡 Strengths & improvement suggestions
- 🌙 Modern dark + purple UI
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS (Dark theme + Purple UI)
- JavaScript (Fetch API)

### Backend
- Python
- Flask
- PyPDF2 (PDF text extraction)

### AI
- Google Gemini GenAI API

---

## 🧠 How It Works

1. User uploads a resume and enters a job description  
2. Backend extracts resume text using PyPDF2  
3. Gemini AI analyzes:
   - Resume content
   - Job description
4. AI generates:
   - ATS match percentage
   - Skill comparison
   - Strengths
   - Improvement suggestions
5. Results are displayed with a circular progress indicator and formatted output

---

## 📂 Project Structure
ATS-Score-Checker/

├── backend/

│ ├── app.py

│ ├── uploads/

│ ├── templates/

│ │ └── index.html

│ └── static/

│ ├── style.css

│ └── script.js

├── README.md


---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ATS-Score-Checker.git
cd ATS-Score-Checker

2️⃣ Install dependencies
pip install flask PyPDF2 google-generativeai

3️⃣ Add Gemini API Key
Open app.py and replace:
genai.Client(api_key="YOUR_API_KEY")

4️⃣ Run the application
python backend/app.py
Open browser:
http://127.0.0.1:8080

⚠️ API Rate Limit Notice

This project uses the free tier of Google Gemini API.
Limited requests per minute
Button is disabled during analysis to prevent quota issues

🎯 Learning Outcomes

Building a complete GenAI-based application
PDF parsing and text extraction
Prompt engineering for ATS systems
Frontend–backend integration
Real-world AI product UI design

📌 Future Improvements

Drag & drop resume upload
Export ATS report as PDF
One-prompt Gemini optimization (reduce API calls)
Authentication & user history
Deployment on cloud (GCP / Render)
