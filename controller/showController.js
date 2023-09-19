const ShowModel = require("../Models/showModel");
const fs = require("fs");


async function home(req, res) {
    const Id = req.params.id;
    return res.render("index", {videoId: Id});
}


const allShows = async (req, res) => {
    const videos = await ShowModel.find({}) 
    console.log(videos)
    return res.json(videos)
} 

const metaData = async (req, res) => {
    const videoId = req.params.id;
    const videos = await ShowModel.find({id: videoId})
    return res.json(videos)
}

const videoStream = async (req, res) => {
    // id must be same as 'video-id-name' in videoList
    const videoPath = `assets/${req.params.id}.mp4`;
    // console.log("video-path:", videoPath);
    
    const videoStat = fs.statSync(videoPath);
    // console.log("videoStat:", videoStat);

    const fileSize = videoStat.size;
    // console.log("fileSize:", fileSize);

    const videoRange = req.headers.range;
    // console.log(videoRange);

    if(videoRange) {
        const parts = videoRange.replace(/bytes=/, "").split("-")
        // console.log(parts);

        const start  = parseInt(parts[0], 10);
        // console.log(start);

        const end = parts[1] ? parseInt(parts[1]) : fileSize-1;
        // console.log(end);

        const chunksize = (end - start) + 1;
        // console.log("chunksize:", chunksize);

        const file = fs.createReadStream(videoPath, {start, end});

        const header = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Range": 'bytes',
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, header);
        file.pipe(res);
    } else {
        const header = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4"
        };
        res.writeHead(200, header);
        fs.createReadStream(videoPath).pipe(res);
    }


    
}

module.exports = {
    home: home,
    allShows: allShows,
    metaData: metaData,
    videoStream: videoStream
}