const express = require("express");
const ytdl = require("ytdl-core");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("YouTube Downloader API is running!");
});

app.get("/download", async (req, res) => {
    const videoUrl = req.query.url;

    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send("Invalid YouTube URL");
    }

    const info = await ytdl.getInfo(videoUrl);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, "") + ".mp4";

    res.header("Content-Disposition", `attachment; filename="${videoTitle}"`);
    ytdl(videoUrl, { format: "mp4" }).pipe(res);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
