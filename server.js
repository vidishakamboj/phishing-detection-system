const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// LOGIN API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// ANALYZE API (simple AI simulation)
app.post("/api/analyze", (req, res) => {
    const { url } = req.body;

    let status = "Safe";
    let score = Math.floor(Math.random() * 40) + 60;

    if (url.includes("free") || url.includes("login") || url.includes("verify")) {
        status = "Suspicious";
        score = Math.floor(Math.random() * 30) + 40;
    }

    if (url.includes("hack") || url.includes("phish") || url.includes("bank")) {
        status = "Dangerous";
        score = Math.floor(Math.random() * 30);
    }

    res.json({ status, score });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});