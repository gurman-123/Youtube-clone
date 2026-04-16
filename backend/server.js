const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

// STORAGE
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// UPLOAD API
app.post("/upload", upload.single("video"), (req, res) => {
    res.json({ message: "Uploaded" });
});

// GET VIDEOS LIST
app.get("/videos", (req, res) => {
    const files = fs.readdirSync("uploads");
    const videoList = files.map(file => ({
        title: file,
        file: file
    }));
    res.json(videoList);
});

// SERVE VIDEOS
app.use("/videos", express.static("uploads"));

app.listen(3000, () => console.log("Server running on 3000"));
