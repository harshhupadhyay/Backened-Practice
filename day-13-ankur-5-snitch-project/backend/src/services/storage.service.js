import ImageKit, { toFile } from '@imagekit/nodejs';
import config from '../config/config.js'


const client = new ImageKit({
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
});

//  * @description Uploads a file to ImageKit
//  * @param {Object} param0
//  * @param {Buffer} param0.buffer - The file buffer to upload
//  * @param {string} param0.fileName - The name of the file to upload
//  * @returns {Promise<Object>} The response from ImageKit after uploading the file


export const uploadFile = async ({ buffer, fileName }) => {
  const response = await client.files.upload({
    file: await toFile(buffer),
    fileName: fileName,
    folder: "snitchImgs"
  })

  return response
}
