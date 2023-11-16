// @ts-nocheck
import BannerBuilder from "../../../BannerBuilder";
import {fabric} from "fabric";
import {Canvas} from "fabric/fabric-impl";

/**
 * Load an image ready for canvas manipulation, from URL
 * @param url
 */
export function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    })
}

/**
 * Remove the background from an image
 * @param loadedImage
 * @param context
 */
export function removeImageBackground(loadedImage, context) {
    // Tolerance size
    // Tweak to adjust the removal of background color
    // TODO: create config for tolerances if required in the future
    const tolerance = 15;
    let imgData: any = null;
    const w = 1080;
    const h = 1080;

    // @ts-ignore
    context.drawImage(loadedImage, 0, 0);
    // @ts-ignore
    imgData = context.getImageData(0, 0, w, h);

    // Find background colour (top left pixel)
    const rgba = [imgData.data[0], imgData.data[1], imgData.data[2], imgData.data[3]]

    for (let index = 0; index < imgData.data.length; index += 4) {
        const r = imgData.data[index];
        const g = imgData.data[index + 1];
        const b = imgData.data[index + 2];
        const a = imgData.data[index + 3];

        const t = (r - rgba[0]) * (r - rgba[0]) + (g - rgba[1]) * (g - rgba[1]) + (b - rgba[2]) * (b - rgba[2]) + (a - rgba[3]) * (a - rgba[3]);

        if (Math.sqrt(t) <= tolerance) {
            imgData.data[index] = 0;
            imgData.data[index + 1] = 0;
            imgData.data[index + 2] = 0;
            imgData.data[index + 3] = 0;
        }
    }

    // @ts-ignore
    context.putImageData(imgData, 0, 0);
}


export async function loadAndCleanImage (cats: string[], fabricCanvas: Canvas): Promise<void> {

    // create a caching cancvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = 1080;

    // iterate over cat ids
    for (const id of cats) {
        const imageUrl = await BannerBuilder.getInstance().contractHandler.getTokenImage(id);
        const loadedImage = await loadImage(imageUrl);

        removeImageBackground(loadedImage, context);
        const newBase64 = canvas.toDataURL('image/png');

        // @ts-ignore
        loadedImage.src = newBase64;
        // @ts-ignore
        loadedImage.onclick = (e) => {
            const target = e.target || e.srcElement;
            if (target && target instanceof Element) {
                const element = target as Element;
                const src: string = element.getAttribute("src") as string;
                addItem(src, fabricCanvas);
            }
        };
        // @ts-ignore
        document.getElementById("owned-cats").appendChild(loadedImage);
    }
}

export function addItem(src: string, canvas: any): void {
    fabric.Image.fromURL(src, (img) => {
        img.scale(0.2).set({
            left: 100,
            top: 100
        });
        canvas.add(img).setActiveObject(img);
    }, {crossOrigin: 'anonymous'});
}
