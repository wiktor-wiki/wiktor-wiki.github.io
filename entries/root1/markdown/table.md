Duis sunt ut pariatur reprehenderit mollit mollit magna dolore in pariatur nulla commodo sit dolor ad fugiat. Laboris amet ea occaecat duis eu enim exercitation deserunt ea laborum occaecat reprehenderit. Et incididunt dolor commodo consequat mollit nisi proident non pariatur in et incididunt id. Eu ut et Lorem ea ex magna minim ipsum ipsum do.

| Table Heading 1 | Table Heading 2 | Center align | Right align | Table Heading 5 |
| :-------------- | :-------------- | :----------: | ----------: | :-------------- |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |
| Item 1          | Item 2          |    Item 3    |      Item 4 | Item 5          |

Minim id consequat adipisicing cupidatat laborum culpa veniam non consectetur et duis pariatur reprehenderit eu ex consectetur. Sunt nisi qui eiusmod ut cillum laborum Lorem officia aliquip laboris ullamco nostrud laboris non irure laboris. Cillum dolore labore Lorem deserunt mollit voluptate esse incididunt ex dolor.

### System Functions

| Function                                    | Description                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Fx:color(colorName)`                       | Gets a color index from a color name. Possible `colorName` values: `black`, `darkgray`, `gray`, `lightgray`, `white`, `lightbrown`, `brown`, `darkbrown`, `yellow`, `orange`, `red`, `purple`, `darkblue`, `blue`, `green`, `darkgreen`.                      |
| `Fx:flip`                                   | Flips the screen buffer to present it to the screen.                                                                                                                                                                                                          |
| `Fx:resize(w, h, scale)`                    | Resizes the window and screen buffer. The window size equals to `(w/h) * scale`.                                                                                                                                                                              |
| `Fx:title([titleString])`                   | Gets/Sets the window title. When no parameter is passed, this function is treated as a getter.                                                                                                                                                                |
| `Fx:quit`                                   | Exits the application.                                                                                                                                                                                                                                        |
| `Fx:createImage(w, h)`                      | Creates an empty [Image](/#api:Image).                                                                                                                                                                                                                        |
| `Fx:createImage(w, h, pixels)`              | Creates an image from a 1D pixel array (w \* h sized).                                                                                                                                                                                                        |
| `Fx:createAnimator(img, rows, cols)`        | Creates a new [Animator](/#api:Animator).                                                                                                                                                                                                                     |
| `Fx:loadImage(fileName, [ditherLevel])`     | Loads an image from a file and reduces its colors to fit TGF's 16 color palette. When `ditherLevel` is not 0, the converter will use a dithering function to smooth the color transitions. Possible values for `ditherLevel` are: `0`, `2`, `3`, `4` and `8`. |
| `Fx:loadImage(data, dataSize, ditherLevel)` | Loads an image from memory.                                                                                                                                                                                                                                   |
| `Fx:createSound()`                          | Creates a new [Sound](/#api:Sound).                                                                                                                                                                                                                           |
| `Fx:playSound([channel], sound, loop)`      | Plays a sound.                                                                                                                                                                                                                                                |
