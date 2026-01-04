import os
from flask import render_template
from flask import Flask, request, jsonify
import PyPDF2
from google import genai

# ======================
# CONFIG
# ======================
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

client = genai.Client(api_key="YOUR_API_KEY_HERE")

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ======================
# PDF TEXT EXTRACTION
# ======================
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

# ======================
# SINGLE ATS GEMINI CALL
# ======================
def ats_single_call(resume_text, job_desc):
    prompt = f"""
You are an Applicant Tracking System (ATS).

Analyze the resume against the job description.

Resume:
{resume_text}

Job Description:
{job_desc}

Return the result in plain text with:
- Match percentage (0-100)
- Matching skills
- Missing skills
- Strengths
- Improvement suggestions
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text

# ======================
# FRONTEND ROUTE
# ======================
@app.route("/")
def home():
    return render_template("index.html")

# ======================
# API ROUTE
# ======================
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "Resume PDF required"}), 400

        resume = request.files["resume"]
        job_desc = request.form.get("job_description")

        if not job_desc:
            return jsonify({"error": "Job description required"}), 400

        pdf_path = os.path.join(app.config["UPLOAD_FOLDER"], resume.filename)
        resume.save(pdf_path)

        resume_text = extract_text_from_pdf(pdf_path)

        ats_result = ats_single_call(resume_text, job_desc)

        return jsonify({
             "ats_result": ats_result
        })
    
    except Exception as e:
        return jsonify({
            "error": "Gemini API quota exceeded. Please wait 1 minute and retry.",
            "details": str(e)
        }), 429


if __name__ == "__main__":
    app.run(debug=True, port=8080)
