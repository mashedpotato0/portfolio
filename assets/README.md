# Portfolio Assets

Drop your demo files for each project into the matching subfolder.

## Folder Structure

```
assets/
├── graphing-calculator-cpp/
├── web-c/
├── taskmanager-android/
├── taskmanager/
├── bloodlink/
├── trading-bot/
├── sudoku/
├── 2048/
├── maze/
├── scientific-calc/
├── todo/
├── image-encryption-using-base54-matrix-transforms/
├── rubicscube_solver/
├── double-pendulum/
├── Mandelbrot-set/
├── flowfields/
└── EMBEDDED-COURSE-FOR-HEARTRATEMONITOR/
```

## How to add demos

Drop any of these files into the numbered folder (the first one found wins):

| Priority | Filename | Type |
|---|---|---|
| 1 | `demo.mp4` | Video (best quality) |
| 2 | `demo.webm` | Video (compressed) |
| 3 | `demo.gif` | Animated image |
| 4 | `demo.png` | Static screenshot |
| 5 | `demo.jpg` | Static screenshot |

> **Note:** MKV files are not natively supported by browsers.  
> Convert them first:  
> `ffmpeg -i demo.mkv -c:v libx264 -crf 23 demo.mp4`

## Result

When a user hovers over a project card, the demo plays as a muted looping video or shows an image.
