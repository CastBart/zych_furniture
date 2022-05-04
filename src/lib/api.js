import { ref, getDownloadURL, listAll } from "firebase/storage";
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
       // console.log(response)
        return response;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Retrieve all images in a given folder
 * @param {indicates the folder from which all images will be retrieved} folder 
 */
export const getAllImagesInFolder = async (folder) =>{
    const imagesRef = ref(storage, folder)
    try {
        const response = await listAll(imagesRef);
        const urls = await response.items.map( async (imgRef) =>{
            return await getDownloadURL(imgRef)
        })
        return await Promise.all(urls)        
    } catch (error) {
        console.error(error)
    }
}
