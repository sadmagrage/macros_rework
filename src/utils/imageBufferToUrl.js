export function imageBufferToUrl(bytes) {
    const byteArray = new Uint8Array(bytes);

    const blobImage = new Blob([byteArray], { type: 'image/jpeg' });
    const image = URL.createObjectURL(blobImage);
    
    return image;
}