import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRATE
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // file has been uploaded
        console.log("file is uploaded on cloudinary", res.url)
        return res
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the localy saved temporary file as the upload operation got failed
        return null
    }
}

export default uploadCloudinary