import multer from "multer"

const storage = multer.memoryStorage()
export const singleUpload = multer({storage}).single("file")

export const multipleUpload = multer({storage}).fields([
    {name:'fileA',maxCount:1},
    {name:'fileB',maxCount:1}
])