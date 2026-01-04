console.log("script.js loaded");
function formatATS(text) {
    // Convert **Heading** to <h3>
    text = text.replace(/\*\*(.*?)\*\*/g, "<h3>$1</h3>");

    // Convert bullet points
    text = text.replace(/^\s*[\*\-]\s+(.*)$/gm, "<li>$1</li>");

    // Wrap list items in <ul>
    text = text.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

    // Convert numbered lists
    text = text.replace(/^\d+\.\s+(.*)$/gm, "<li>$1</li>");

    // Line breaks
    text = text.replace(/\n{2,}/g, "<br>");

    return text;
}

const resumeInput = document.getElementById("resume");
const fileNameText = document.getElementById("file-name");

if (resumeInput) {
    resumeInput.addEventListener("change", () => {
        if (resumeInput.files.length > 0) {
            fileNameText.innerText = "Selected file: " + resumeInput.files[0].name;
        }
    });
}

async function checkATS() {
    console.log("checkATS clicked");

    const loader = document.getElementById("loader");
    const scoreContainer = document.getElementById("score-container");
    const atsText = document.getElementById("ats-text");


    const resume = document.getElementById("resume").files[0];
    const jobDesc = document.getElementById("jobDesc").value;

    if (!resume || !jobDesc) {
        alert("Upload resume and paste job description");
        return;
    }

    loader.classList.remove("hidden");
    scoreContainer.classList.add("hidden");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    try {
        const res = await fetch("/analyze", {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();

        loader.classList.add("hidden");
        scoreContainer.classList.remove("hidden");
        atsText.innerHTML = formatATS(data.ats_result);

        // Extract percentage
        const match = data.ats_result.match(/(\d{1,3})%/);
        const percent = match ? match[1] : 0;

        // Circular progress
        const circle = document.querySelector(".ring-progress");
        const radius = 80;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset =
            circumference - (percent / 100) * circumference;

        document.getElementById("progress-percent").innerText = percent + "%";

    } catch (err) {
        console.error(err);
        loader.classList.add("hidden");
        alert("Something went wrong. Check console.");
    }
}
