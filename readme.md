<a href="https://www.npmjs.com/package/@hitomihiumi/lazy-animation"><img src="https://img.shields.io/npm/v/@hitomihiumi/lazy-animation.svg?maxAge=3600" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/@hitomihiumi/lazy-animation"><img src="https://img.shields.io/npm/dt/@hitomihiumi/lazy-animation.svg?maxAge=3600" alt="npm downloads" /></a>

# Introduction

This extension for `@hitomihiumi/lazy-canvas` made for create gif animations.

## Documentation

You can find the documentation [here](https://hitomihiumi.xyz/)


## Get Started

1. Install the module by using `npm i @hitomihiumi/lazy-animation`
2. Enjoy!

## Example

```ts
import { LazyCanvas, TextLayer, EllipseImageLayer, EllipseLayer, Font, CircleLayer, Outline } from "@hitomihiumi/lazy-canvas";
import { writeFileSync } from "fs";
import { LazyAnimation, splitGifToFrames } from "@hitomihiumi/lazy-animation";

let font = new Font()
    .setFamily("JoeKubert")
    .setWeight("regular")
    .setPath("./assets/fonts/v_CCJoeKubert-Doubled_v1.3.ttf")

async function main() {
    let bgarr = await splitGifToFrames('./assets/1.gif')
    
    let arr = [];

    for (let i = 0; i < bgarr.length; i++) {
        let canvas = new LazyCanvas()
            .createNewCanvas(600, 200)
            .loadFonts(font)
            .addLayers(
                new EllipseImageLayer()
                    .setX(300)
                    .setY(100)
                    .setWidth(600)
                    .setHeight(200)
                    .setRadius(50)
                    // @ts-ignore
                    .setImage(bgarr[i]), //https://static.zerochan.net/Otosora.full.3420604.jpg
                new EllipseLayer()
                    .setX(300)
                    .setY(100)
                    .setWidth(598)
                    .setHeight(198)
                    .setRadius(50)
                    .setColor('#000')
                    .setAlpha(0.4)
                    .setOutline(
                        new Outline()
                            .setColor('#fff')
                            .setStroke(2)
                            .setType('inner')
                    ),
                new EllipseImageLayer()
                    .setX(100)
                    .setY(100)
                    .setWidth(150)
                    .setHeight(150)
                    .setRadius(50)
                    .setImage('./assets/f332192b2090f437ca9f49c1002287b6.jpg') //https://i.pinimg.com/1200x/f3/32/19/f332192b2090f437ca9f49c1002287b6.jpg
                    .setOutline(
                        new Outline()
                            .setColor('#fff')
                            .setStroke(2)
                            .setType('center')
                    ),
                new EllipseLayer()
                    .setX(372.5)
                    .setY(142.5)
                    .setWidth(365)
                    .setHeight(35)
                    .setRadius(17.5)
                    .setColor('#fff'),
                new EllipseLayer()
                    .setX(192.5)
                    .setY(127.5)
                    .setWidth((360 / 100) * (i + 51))
                    .setHeight(30)
                    .setRadius(15)
                    .setColor('#ff8a8a')
                    .setCentering('legacy'),
                new CircleLayer()
                    .setX(160)
                    .setY(160)
                    .setRadius(20)
                    .setColor('#ff8a8a')
                    .setOutline(
                        new Outline()
                            .setColor('#fff')
                            .setStroke(1.5)
                            .setType('center')
                    ),
                new TextLayer()
                    .setX(200)
                    .setY(120)
                    .setText('LazyCanvas')
                    .setFont("JoeKubert")
                    .setFontSize(25)
                    .setColor('#fff')
                    .setAlign('left'),
                new TextLayer()
                    .setX(550)
                    .setY(105)
                    .setText(`${i + 1 + 50}/100`)
                    .setFont("JoeKubert")
                    .setFontSize(20)
                    .setColor('#fff')
                    .setAlign('right'),
                new TextLayer()
                    .setX(159)
                    .setY(172)
                    .setText('1')
                    .setFont("JoeKubert")
                    .setFontSize(33)
                    .setColor('#fff')
                    .setAlign('center')
            );

        arr.push(canvas);
    }

    let plugin = new LazyAnimation()
        .addFrames(arr)
        .setFps(15)
        .setLooped(true)
        .setRGBFormat('rgb565')
        .setTransparent(true);

    plugin.generateGif().then((gif) => {
        //@ts-ignore
        writeFileSync("test.gif", gif);
    });
}

main();
```

![](https://i.imgur.com/e7zKu5F.gif)

## Documentation

### `LazyAnimation` - class

```ts
import { LazyAnimation } from "@hitomihiumi/lazy-animation";

let plugin = new LazyAnimation();
```

Main class for creating gif animations.

#### addFrames()

```ts
import { LazyCanvas } from "@hitomihiumi/lazy-canvas";
// ...some code
plugin.addFrames([LazyCanvas, LazyCanvas, LazyCanvas]);
```

Add frames to the animation.

#### setFps()

```ts
// ...some code
plugin.setFps(15);
```

Set the frames per second of the animation.

#### setLooped()

```ts
// ...some code
plugin.setLooped(true);
```

Set if the animation should be looped.

#### setRGBFormat()

```ts
// ...some code
plugin.setRGBFormat('rgb565');
```

Set the RGB format of the animation.

Formats:
- `rgb565` — 5 bits for red, 6 bits for green, 5 bits for blue. Better quality, but bigger size and time for encode.
- `rgba444` — 4 bits for red, 4 bits for green, 4 bits for blue. Low quality, but small size and time for encode.
- `rgba4444` — 4 bits for red, 4 bits for green, 4 bits for blue, 4 bits for alpha. Same as `rgba444` but with alpha channel.

#### setTransparent()

```ts
// ...some code
plugin.setTransparent(true);
```

Set if the animation should be transparent. All RGB(A) formats support transparency.

#### generateGif()

```ts
// ...some code
plugin.generateGif().then((gif) => {
    //@ts-ignore
    writeFileSync("test.gif", gif);
});
```

Generate the gif. Returns a promise with the gif buffer.

### `LazyAnimation` - functions

### splitGifToFrames()

```ts
import { splitGifToFrames } from "@hitomihiumi/lazy-animation";

let frames = await splitGifToFrames('./assets/1.gif');
```

Split a gif into frames. Returns a promise with an array of frames.

# Testing

```
OS: Windows 11 x64
Node.js: v17.8.0
Terminal: Windows Terminal
CPU: AMD Ryzen 9 5900HX @ 3.30 GHz
Memory: 32688MiB
```

## Settings

- 27 frames
- 600x200
- 15 fps
- Loop - on

Background:
![](https://i.imgur.com/x6PYXjW.gif)

## Transparecy - on

### rgb565
```shell
npm test          

> @hitomihiumi/lazy-animation@0.5.3 test
> node ./test/test.js

[19:22:08] Started...
[19:22:09] Loaded 27 frames in 854 ms
[19:22:09] Created 27 frames in 901 ms
[19:22:17] Finished in 8710 ms
```

![](https://i.imgur.com/e7zKu5F.gif)

### rgba444

```shell
npm test

> @hitomihiumi/lazy-animation@0.5.3 test
> node ./test/test.js

[19:24:34] Started...
[19:24:35] Loaded 27 frames in 895 ms
[19:24:35] Created 27 frames in 942 ms
[19:24:43] Finished in 8906 ms
```

![](https://i.imgur.com/duxQcs5.gif)

### rgba4444

```shell
npm test          

> @hitomihiumi/lazy-animation@0.5.3 test
> node ./test/test.js

[19:28:48] Started...
[19:28:49] Loaded 27 frames in 759 ms
[19:28:49] Created 27 frames in 796 ms
[19:28:55] Finished in 7029 ms
```

![](https://i.imgur.com/Hn0BSGB.gif)

## Transparecy - off

### rgb565

```shell
npm test          

> @hitomihiumi/lazy-animation@0.5.3 test
> node ./test/test.js

[19:30:27] Started...
[19:30:28] Loaded 27 frames in 810 ms
[19:30:28] Created 27 frames in 846 ms
[19:30:35] Finished in 7692 ms
```

![](https://i.imgur.com/lpgaBeo.gif)

### rgba444

```shell
npm test

> @hitomihiumi/lazy-animation@0.5.3 test
> node ./test/test.js

[19:31:40] Started...
[19:31:41] Loaded 27 frames in 765 ms
[19:31:41] Created 27 frames in 808 ms
[19:31:48] Finished in 7524 ms
```

![](https://i.imgur.com/Reqr7Xk.gif)

### rgba4444

```shell
npm test          

> @hitomihiumi/lazy-animation@0.5.3 test
> node ./test/test.js

[19:32:20] Started...
[19:32:21] Loaded 27 frames in 764 ms
[19:32:21] Created 27 frames in 800 ms
[19:32:27] Finished in 6819 ms
```

![](https://i.imgur.com/gV8dwUU.gif)