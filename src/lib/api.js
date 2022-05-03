import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

/**
 * Function returning the full url of an image 
 * Base path start at 'images'
 * @param {path of the image.} imagePath 
 */
export const getImageFromStorage = async (imagePath) => {
    const imagesRef = ref(storage, `images/${imagePath}`);

    try {
        const response = await getDownloadURL(imagesRef);
        return response;
    } catch (error) {
        console.error(error);
    }
};
