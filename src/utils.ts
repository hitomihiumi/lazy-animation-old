//@ts-ignore
import * as gifFrames from 'gif-frames';

export async function splitGifToFrames(gifFilePath: string): Promise<Uint8Array[]> {
    const frames = await gifFrames({ url: gifFilePath, frames: 'all', cumulative: true });
    // @ts-ignore
    const images = frames.map((frame) => frame.getImage()._obj);
    const imageDatas = await Promise.all(images);

    //console.log(imageDatas[0]);
    return imageDatas;
    // @ts-ignore
    //const unit8Arrays: Uint8Array[] = imageDatas.map((buffer) => new Uint8Array(buffer));

    //console.log(unit8Arrays[0]);
    //return unit8Arrays;
}