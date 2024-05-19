import { LazyCanvas } from "@hitomihiumi/lazy-canvas";

export interface AnimationOptions {
    loop?: number;
    fps: number;
    frames?: LazyCanvas[];
}