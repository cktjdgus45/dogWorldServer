import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dp6ovp6ka',
    api_key: '845457224334544',
    api_secret: 'Y0a5lKP3ioW-m-GHjkgV77MgYC4',
})

export async function handleUpload(file) {
    try {

        const result = await cloudinary.uploader.upload(file, {
            resource_type: "image",
            // public_id: cloudinaryId
        });
        return result;
    } catch (error) {
        console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
        console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('CLOUDINARY_SECRET_KEY:', process.env.CLOUDINARY_SECRET_KEY);
        console.error(error);
        throw error;
    }
}