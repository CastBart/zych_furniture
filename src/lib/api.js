import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./config";

const FIREBASE_DOMAIN =
  "https://zych-furniture-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Function returning the full url of an image
 * Base path start at 'images'
 * @param {path of the image.} imagePath
 */
export const getImageFromStorage = async (imagePath) => {
  const imagesRef = ref(storage, imagePath);

  const response = await getDownloadURL(imagesRef);
  // console.log(response)
  return response;
};

/**
 * Retrieve all images in a given folder from storage
 * @param {indicates the folder from which all images will be retrieved} folder
 * @returns array of downloadable links for all images in the folder
 */
export const getAllImagesInFolder = async (folder) => {
  const imagesRef = ref(storage, folder);
  try {
    const response = await listAll(imagesRef);
    const urls = await response.items.map(async (imgRef) => {
      return await getDownloadURL(imgRef);
    });
    return await Promise.all(urls);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieve image information from database
 * @returns array of objects: the object contains an id: name of image, description:string representing the description of the image and src: downloadable link
 */
export const getLandingImagesInfo = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}landing.json`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Could not fetch image info");
  }

  const dataArray = Object.keys(responseData).map((key) => {
    return {
      id: key,
      ...responseData[key],
    };
  });
  return dataArray;
};

export const getPricingInfo = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}pricing.json`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Could not fetch pricing info");
  }

  return responseData;
};

/**
 *
 * @param {*value to be tested if its an object or not} value
 * @returns returns a true or false whether the passed value is an object or not
 */
 export const isObject = (value) => {
  return !!(value && typeof value === "object" && !Array.isArray(value));
};
