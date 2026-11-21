// Three buttons in a row, with red, green and blue caps, and an RGB LED that lights in the colour of
// the button held. The buttons fill the main board's free end, columns 22 to 30, so the LED goes on a
// second half-size board, wired as in ratsnest's RGB LED example.
import type { Circuit } from "ratsnest";

export default {
  format: 1,
  name: { ru: "Три кнопки и RGB-светодиод" },
  description: {
    ru: "Три кнопки в ряд, с красным, зелёным и синим колпачками, и RGB-светодиод, который загорается цветом нажатой кнопки. Это адресуемый светодиод со своим контроллером: он получает цвет в виде данных по GP28, а питание от VBUS, и резистор ему не нужен. Он ставится на вторую макетную плату, рядом с первой.",
  },
  leds: [
    {
      id: "rgb",
      name: { ru: "RGB-светодиод" },
      pin: { kind: "rgb", gpio: 28, count: 1 },
      colour: "rgb",
    },
  ],
  buttons: [
    {
      id: "red",
      name: { ru: "BTN1" },
      pin: { kind: "gpio", gpio: 18 },
      colour: "red",
    },
    {
      id: "green",
      name: { ru: "BTN2" },
      pin: { kind: "gpio", gpio: 13 },
      colour: "green",
    },
    {
      id: "blue",
      name: { ru: "BTN3" },
      pin: { kind: "gpio", gpio: 17 },
      colour: "blue",
    },
  ],
  steps: [
    {
      title: { ru: "Подайте 3V3 на верхнюю шину +" },
      note: {
        ru: "3V3 берётся с вывода 3V3(OUT). VBUS и VSYS, на том же конце Pico, несут полное напряжение USB, которое никогда не должно попасть на вывод GPIO.",
      },
      parts: [{ kind: "wire", from: "a6", to: "top+7", role: "power" }],
    },
    {
      title: { ru: "Соедините нижнюю шину − с землёй" },
      note: { ru: "Эта шина нужна резистору, который подтягивает GP17 к земле." },
      parts: [{ kind: "wire", from: "j9", to: "bottom-9", role: "ground" }],
    },
    {
      title: { ru: "BTN1 на GP18" },
      note: {
        ru: "Две ножки кнопки в одном столбце, по разные стороны канавки, всегда соединены, а нажатие соединяет её столбцы между собой.",
      },
      parts: [
        { kind: "wire", from: "a18", to: "a22", role: "signal" },
        { kind: "button", button: "red", columns: [22, 24] },
        { kind: "wire", from: "a24", to: "top+23", role: "power" },
      ],
    },
    {
      title: { ru: "Подтяните GP18 к земле резистором" },
      note: {
        ru: "Без него вывод висит в воздухе, пока кнопка отпущена, и читает нажатия, которых никто не делал. Он стоит у вывода, в полосе одного из выводов GND Pico: у кнопок места для резисторов не хватает.",
      },
      // By the pin, not the button: three resistors three columns apart, down to the rail, left no
      // room for their value tags, which Russian writes wider (4,7 кОм). GP13's goes the same way.
      parts: [{ kind: "resistor", ohms: 4700, from: "b18", to: "b14" }],
    },
    {
      title: { ru: "BTN2 на GP13" },
      note: {
        ru: "Жёлтая перемычка лежит вдоль ряда, по свободным отверстиям, мимо BTN1. Она приходит на нижнюю половину платы, а 3V3 на верхнюю: ножки кнопки по разные стороны канавки всегда соединены, так что годится любая половина.",
      },
      parts: [
        { kind: "wire", from: "j18", to: "j25", role: "signal" },
        { kind: "button", button: "green", columns: [25, 27] },
        { kind: "wire", from: "a27", to: "top+27", role: "power" },
      ],
    },
    {
      title: { ru: "Подтяните GP13 к земле резистором" },
      note: { ru: "Тоже у вывода, в полосе другого вывода GND Pico." },
      parts: [{ kind: "resistor", ohms: 4700, from: "i18", to: "i14" }],
    },
    {
      title: { ru: "BTN3 на GP17" },
      note: {
        ru: "Жёлтая перемычка длинная: она лежит вдоль ряда, по свободным отверстиям, мимо BTN1 и BTN2.",
      },
      // Row b is free from GP17's strip to the button's: the jumpers to 3V3 are all in row a.
      parts: [
        { kind: "wire", from: "b20", to: "b28", role: "signal" },
        { kind: "button", button: "blue", columns: [28, 30] },
        { kind: "wire", from: "a30", to: "top+29", role: "power" },
      ],
    },
    {
      title: { ru: "Подтяните GP17 к земле резистором" },
      parts: [{ kind: "resistor", ohms: 4700, from: "j28", to: "bottom-28" }],
    },
    {
      title: { ru: "Проведите VBUS, землю и GP28 на вторую плату" },
      note: {
        ru: "Пристыкуйте вторую половинную макетную плату к первой со стороны её верхних шин, столбец 1 к столбцу 1: такие платы сделаны так, чтобы соединяться длинными сторонами. Светодиод питается от VBUS, а не от 3V3, и VBUS никогда не должен попасть на вывод GPIO.",
      },
      parts: [
        { kind: "wire", from: "a2", to: "2:j2", role: "power" },
        { kind: "wire", from: "a4", to: "2:j4", role: "ground" },
        { kind: "wire", from: "a8", to: "2:j8", role: "signal" },
      ],
    },
    {
      title: { ru: "RGB-светодиод на GP28" },
      note: {
        ru: "Его самая длинная ножка: выход данных, который ни с чем не соединён, пока светодиод один. Резистор ему не нужен: у него свой контроллер, который задаёт ток.",
      },
      parts: [
        {
          kind: "rgbLed",
          led: "rgb",
          power: "2:f2",
          dataOut: "2:f3",
          ground: "2:f4",
          dataIn: "2:f5",
        },
        { kind: "wire", from: "2:h8", to: "2:h5", role: "signal" },
      ],
    },
  ],
  // MicroPython takes only Latin names, so the script's are the same in every language.
  script: {
    ru: `from machine import Pin
from neopixel import NeoPixel
from time import sleep

rgb_led = NeoPixel(Pin(28), 1)
btn1 = Pin(18, Pin.IN)
btn2 = Pin(13, Pin.IN)
btn3 = Pin(17, Pin.IN)

caps = (
    (btn1, (255, 0, 0)),
    (btn2, (0, 255, 0)),
    (btn3, (0, 0, 255)),
)

while True:
    colour = (0, 0, 0)
    for button, cap in caps:
        if button.value():
            colour = cap
    rgb_led[0] = colour
    rgb_led.write()
    sleep(0.02)`,
  },
  scriptDoes: {
    ru: "Удерживайте кнопку, и светодиод загорится цветом её колпачка: BTN1 красным, BTN2 зелёным, BTN3 синим. Отпустите её, и он погаснет. Чтобы завершить скрипт, нажмите в Thonny кнопку остановки.",
  },
} satisfies Circuit;
