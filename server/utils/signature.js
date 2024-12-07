import crypto from 'crypto'

const cloud_name = process.env.CLOUND_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;


const deleteImage = async (imageUrl) => {
    try {
        // Lấy public_id
        const parts = imageUrl.split("/");
        const public_id = parts[parts.length - 1].split(".")[0];
        console.log(public_id); // Output: x3zjcyr3elgatiromhsn
        // tạo chữ ký
        const signature = crypto
            .createHash('sha1')
            .update(`public_id=${public_id}&timestamp=${timestamp}${api_secret}`)
            .digest('hex');
        const data = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: {
                public_id,
                api_key,
                timestamp,
                signature,
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }


}

export default deleteImage
