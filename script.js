
function analyze() {
    const url = document.getElementById("input").value.trim();
    const resultBox = document.getElementById("result");

    if (!url) {
        alert("Please enter URL");
        return;
    }

    let status = "Safe";
    let score = Math.floor(Math.random() * 40) + 60;
    let tips = [];

    // 🔥 PRIORITY: Dangerous > Suspicious > Safe

    if (
        url.includes("hack") ||
        url.includes("bank") ||
        url.includes("free") ||
        url.includes("crack") ||
        url.includes("phish")
    ) {
        status = "Dangerous";
        score = Math.floor(Math.random() * 30);

        tips = [
            "🚨 This URL looks highly dangerous",
            "❌ Do NOT enter any personal information",
            "🛑 Close the website immediately",
            "🔐 Report this link if possible"
        ];
    }
    else if (
        url.includes("login") ||
        url.includes("verify") ||
        url.includes("secure") ||
        url.includes("update")
    ) {
        status = "Suspicious";
        score = Math.floor(Math.random() * 30) + 40;

        tips = [
            "⚠ Be careful with login pages",
            "🔍 Always check HTTPS & domain name",
            "📧 Avoid entering passwords on unknown sites"
        ];
    }
    else {
        status = "Safe";
        score = Math.floor(Math.random() * 20) + 70;

        tips = [
            "✅ Website seems safe",
            "🔒 Still verify HTTPS lock",
            "🧠 Stay cautious online"
        ];
    }

    // 🎯 SHOW RESULT
    resultBox.classList.remove("hidden", "safe", "danger", "suspicious");

    resultBox.innerHTML = `
        <h2>${status}</h2>
        <p><b>Risk Score:</b> ${score}</p>

        <h3>🛡 Prevention Tips</h3>
        <ul>
            ${tips.map(t => `<li>${t}</li>`).join("")}
        </ul>
    `;

    // CLASS APPLY
    if (status === "Safe") resultBox.classList.add("safe");
    else if (status === "Dangerous") resultBox.classList.add("danger");
    else resultBox.classList.add("suspicious");

    // animation
    resultBox.style.opacity = 0;
    setTimeout(() => {
        resultBox.style.opacity = 1;
    }, 100);

    saveHistory(url, { status, score });
}


// 📌 SAVE HISTORY WITH DATE + TIME
function saveHistory(url, data) {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    const now = new Date();

    history.push({
        url,
        status: data.status,
        score: data.score,
        time: now.toLocaleString()
    });

    localStorage.setItem("history", JSON.stringify(history));
}


// 📌 LOAD HISTORY
function loadHistory(filter = "all") {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let box = document.getElementById("history");

    box.innerHTML = "";

    history
        .filter(item => filter === "all" || item.status === filter)
        .forEach(item => {
            box.innerHTML += `
                <div class="history-card">
                    <p><b>URL:</b> ${item.url}</p>
                    <p><b>Status:</b> ${item.status}</p>
                    <p><b>Score:</b> ${item.score}</p>
                    <p class="time">🕒 ${item.time}</p>
                </div>
            `;
        });
}


// 📌 CLEAR HISTORY
function clearHistory() {
    localStorage.removeItem("history");
    document.getElementById("history").innerHTML = "";
}