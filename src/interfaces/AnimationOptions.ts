import { LazyCanvas } from "@hitomihiumi/lazy-canvas";

export interface AnimationOptions {
    loop?: number;
    fps: number;
    rgbformat?: 'rgb565' | 'rgba4444' | 'rgba444';
    transparent?: boolean;
    maxColors?: number;
    frames?: LazyCanvas[];
}