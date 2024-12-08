import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
const cloud_name = process.env.CLOUND_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;


const deleteImage = async (imageUrl) => {
    try {
        // Lấy public_id
        const parts = imageUrl.split("/");
        const public_id = parts[parts.length - 1].split(".")[0];
        const timestamp = Math.floor(Date.now() / 1000); // Lấy timestamp hiện tại (tính bằng giây)
        // tạo chữ ký
        const signature = crypto
            .createHash('sha1')
            .update(`public_id=${public_id}&timestamp=${timestamp}${api_secret}`)
            .digest('hex');
        const data = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                public_id,
                api_key,
                timestamp,
                signature,
            })
        })
        return data
    } catch (error) {
        return error
    }


}

export default deleteImage
