//@ts-ignore
import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import { LazyCanvas } from "@hitomihiumi/lazy-canvas";
import { AnimationOptions } from "./interfaces/AnimationOptions";

export class AnimationPlugin {

    public options: AnimationOptions;

    constructor(options?: AnimationOptions) {
        this.options ??= options ? { ...options } : { fps: 30, loop: 0, frames: [] };
        // @ts-ignore
        this.options.loop ??= options.loop ? 0 : -1 || 0;
    }

    public addFrames(frames: any[]) {
        for (const frame of frames) {
            // @ts-ignore
            this.options.frames.push(frame);
        }
        return this;
    }

    public removeFrame(frame: LazyCanvas) {
        // @ts-ignore
        const index = this.options.frames.indexOf(frame);
        if (index !== -1) {
            // @ts-ignore
            this.options.frames.splice(index, 1);
        }
        return this;
    }

    public setLooped(looped: boolean) {
        this.options.loop = looped ? 0 : -1;
        return this;
    }

    public setFps(fps: number) {
        this.options.fps = fps;
        return this;
    }

    public getFrames(): LazyCanvas[] | undefined {
        return this.options.frames;
    }

    async generateGif(): Promise<NodeJS.ArrayBufferView> {
        const { loop, fps, frames } = this.options;
        const encoder = new GIFEncoder();
        // @ts-ignore
        for (const frame of frames) {
            const canvas = await frame.renderImage('ctx');
            //@ts-ignore
            const { data, width, height } = canvas.getImageData(0, 0, frame.data.width, frame.data.height);
            const palette = quantize(data, 256, { format: 'rgba4444' });
            const index = applyPalette(data, palette, "rgba4444");
            encoder.writeFrame(index, width, height, { palette, transparent: true, delay: 1000 / fps, loop: loop });
        }
        encoder.finish();
        return encoder.bytesView();
    }

}
