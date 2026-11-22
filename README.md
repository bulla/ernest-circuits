# Ernest's circuits

Sample circuits built with **[ratsnest](https://github.com/bulla/ratsnest)**, a builder of wiring
guides for breadboards. Each circuit is one declarative file in [`circuits/`](circuits/), and ratsnest
turns it into one self-contained page showing how to build it on a breadboard with a Raspberry Pi
Pico 2 W, step by step: the drawing, the steps, the parts list and a MicroPython script to test it
with.

This repository holds samples only. The builder, its documentation and the circuit format live in
the original repository, [bulla/ratsnest](https://github.com/bulla/ratsnest).

## The circuits

| File                                                                         | Circuit                                                                                                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`rgb-buttons.ts`](circuits/rgb-buttons.ts)                                  | Three buttons in a row, with red, green and blue caps, and an RGB LED that lights in the colour of the button held. The LED is on a second board. |
| [`rgb-buttons-second-board.ts`](circuits/rgb-buttons-second-board.ts)        | The same circuit, with the three buttons in a row on the second board.                                                                           |

Each is written in English, French and Russian. [`ARTIFACTS.md`](ARTIFACTS.md) lists the pages
published so far.

## Make a page

With [ratsnest installed](https://github.com/bulla/ratsnest#get-started), from this folder. `rnest` is
a shorter name for `ratsnest`, and the two are synonymous:

```sh
rnest check
rnest generate circuits/rgb-buttons.ts --orientation 90 --theme dark --language en
```

The page is written into `pages/`, named by its four inputs. In Claude Code, the `circuit` skill in
[`.claude/skills/`](.claude/skills/) adds or changes a circuit, makes its page and publishes it.

ratsnest is still a work in progress. Run `rnest update` here to move this project to the latest
ratsnest: it upgrades every circuit to the latest format and checks them.
