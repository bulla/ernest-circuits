// Three buttons in a row, with red, green and blue caps, and an RGB LED that lights in the colour of
// the button held. The buttons fill the main board's free end, columns 22 to 30, so the LED goes on a
// second half-size board, wired as in ratsnest's RGB LED example.
import type { Circuit } from "ratsnest";

export default {
  format: 2,
  setup: { kind: "pico" },
  name: {
    en: "Three buttons and an RGB LED",
    fr: "Trois boutons et une LED RVB",
    ru: "Три кнопки и RGB-светодиод",
  },
  description: {
    en: "Three buttons in a row, with red, green and blue caps, and an RGB LED that lights in the colour of the button held. It is an addressable LED, with a controller of its own: it takes its colour as data on GP28 and its power from VBUS, and needs no resistor. It goes on a second breadboard, beside the first.",
    fr: "Trois boutons en rang, avec des capuchons rouge, vert et bleu, et une LED RVB qui s’allume de la couleur du bouton maintenu enfoncé. C’est une LED adressable, avec son propre contrôleur : elle reçoit sa couleur en données sur GP28 et son alimentation de VBUS, et n’a besoin d’aucune résistance. Elle se branche sur une seconde plaque, à côté de la première.",
    ru: "Три кнопки в ряд, с красным, зелёным и синим колпачками, и RGB-светодиод, который загорается цветом нажатой кнопки. Это адресуемый светодиод со своим контроллером: он получает цвет в виде данных по GP28, а питание от VBUS, и резистор ему не нужен. Он ставится на вторую макетную плату, рядом с первой.",
  },
  credit: {
    en: "The Pico 2 W is drawn from its datasheet, adapting the Raspberry Pi Pico 2 W pinout, © Raspberry Pi Ltd, under CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0). This drawing is shared under the same licence. Set in Nunito, under the SIL Open Font License 1.1.",
    fr: "Le Pico 2 W est dessiné d’après sa fiche technique, en adaptant le brochage du Raspberry Pi Pico 2 W, © Raspberry Pi Ltd, sous licence CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0). Ce dessin est partagé sous la même licence. Composé en Nunito, sous la licence SIL Open Font 1.1.",
    ru: "Pico 2 W нарисован по его спецификации, на основе распиновки Raspberry Pi Pico 2 W, © Raspberry Pi Ltd, по лицензии CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0). Этот рисунок распространяется по той же лицензии. Шрифт Nunito, по лицензии SIL Open Font License 1.1.",
  },
  leds: [
    {
      id: "rgb",
      name: { en: "RGB LED", fr: "LED RVB", ru: "RGB-светодиод" },
      pin: { kind: "rgb", gpio: 28, count: 1 },
      colour: "rgb",
    },
  ],
  buttons: [
    {
      id: "red",
      name: { en: "BTN1", fr: "BTN1", ru: "BTN1" },
      pin: { kind: "gpio", gpio: 18 },
      colour: "red",
    },
    {
      id: "green",
      name: { en: "BTN2", fr: "BTN2", ru: "BTN2" },
      pin: { kind: "gpio", gpio: 13 },
      colour: "green",
    },
    {
      id: "blue",
      name: { en: "BTN3", fr: "BTN3", ru: "BTN3" },
      pin: { kind: "gpio", gpio: 17 },
      colour: "blue",
    },
  ],
  steps: [
    {
      title: {
        en: "Connect 3V3 to the top + rail",
        fr: "Reliez le 3V3 au rail + du haut",
        ru: "Подайте 3V3 на верхнюю шину +",
      },
      note: {
        en: "Take it from 3V3(OUT). VBUS and VSYS, at the same end of the Pico, carry the USB's full voltage, which a GPIO pin must never see.",
        fr: "Prenez-le sur 3V3(OUT). VBUS et VSYS, au même bout du Pico, portent toute la tension de l’USB, qu’une broche GPIO ne doit jamais recevoir.",
        ru: "3V3 берётся с вывода 3V3(OUT). VBUS и VSYS, на том же конце Pico, несут полное напряжение USB, которое никогда не должно попасть на вывод GPIO.",
      },
      parts: [{ kind: "wire", from: "a6", to: "top+7", role: "power" }],
    },
    {
      title: {
        en: "Connect the bottom − rail to ground",
        fr: "Reliez le rail − du bas à la masse",
        ru: "Соедините нижнюю шину − с землёй",
      },
      note: {
        en: "The resistor that holds GP17 low needs this rail.",
        fr: "La résistance qui maintient GP17 au niveau bas a besoin de ce rail.",
        ru: "Эта шина нужна резистору, который подтягивает GP17 к земле.",
      },
      parts: [{ kind: "wire", from: "j9", to: "bottom-9", role: "ground" }],
    },
    {
      title: { en: "BTN1 on GP18", fr: "BTN1 sur GP18", ru: "BTN1 на GP18" },
      note: {
        en: "The button's two legs in a column, either side of the channel, are always joined, and pressing it joins its two columns.",
        fr: "Les deux pattes du bouton d’une même colonne, de part et d’autre de la rainure, sont toujours reliées, et appuyer relie ses deux colonnes.",
        ru: "Две ножки кнопки в одном столбце, по разные стороны канавки, всегда соединены, а нажатие соединяет её столбцы между собой.",
      },
      parts: [
        { kind: "wire", from: "a18", to: "a22", role: "signal" },
        { kind: "button", button: "red", columns: [22, 24] },
        { kind: "wire", from: "a24", to: "top+23", role: "power" },
      ],
    },
    {
      title: {
        en: "Hold GP18 low with a resistor",
        fr: "Maintenez GP18 au niveau bas avec une résistance",
        ru: "Подтяните GP18 к земле резистором",
      },
      note: {
        en: "Without it the pin floats while the button is up, and reads a press nobody made. It goes by the pin, into the strip of one of the Pico's GND pins: beside the buttons there is no room for it.",
        fr: "Sans elle, la broche flotte tant que le bouton est relâché, et lit un appui que personne n’a fait. Elle se place près de la broche, dans la bande d’une des broches GND du Pico : à côté des boutons, il n’y a pas la place.",
        ru: "Без него вывод висит в воздухе, пока кнопка отпущена, и читает нажатия, которых никто не делал. Он стоит у вывода, в полосе одного из выводов GND Pico: у кнопок места для резисторов не хватает.",
      },
      // By the pin, not the button: three resistors three columns apart, down to the rail, left no
      // room for their value tags, which Russian writes wider (4,7 кОм). GP13's goes the same way.
      parts: [
        { kind: "resistor", ohms: 4700, from: "b18", to: "b14" },
      ],
    },
    {
      title: { en: "BTN2 on GP13", fr: "BTN2 sur GP13", ru: "BTN2 на GP13" },
      note: {
        en: "Its yellow jumper lies along a row, over free holes, past BTN1. It arrives on the bottom half of the board, and 3V3 on the top half: the button's legs either side of the channel are always joined, so either half will do.",
        fr: "Son fil jaune longe une rangée, sur des trous libres, en passant BTN1. Il arrive sur la moitié du bas de la plaque, et le 3V3 sur celle du haut : les pattes du bouton de part et d’autre de la rainure sont toujours reliées, alors l’une ou l’autre convient.",
        ru: "Жёлтая перемычка лежит вдоль ряда, по свободным отверстиям, мимо BTN1. Она приходит на нижнюю половину платы, а 3V3 на верхнюю: ножки кнопки по разные стороны канавки всегда соединены, так что годится любая половина.",
      },
      parts: [
        { kind: "wire", from: "j18", to: "j25", role: "signal" },
        { kind: "button", button: "green", columns: [25, 27] },
        { kind: "wire", from: "a27", to: "top+27", role: "power" },
      ],
    },
    {
      title: {
        en: "Hold GP13 low with a resistor",
        fr: "Maintenez GP13 au niveau bas avec une résistance",
        ru: "Подтяните GP13 к земле резистором",
      },
      note: {
        en: "By the pin too, into the strip of another of the Pico's GND pins.",
        fr: "Près de la broche elle aussi, dans la bande d’une autre broche GND du Pico.",
        ru: "Тоже у вывода, в полосе другого вывода GND Pico.",
      },
      parts: [{ kind: "resistor", ohms: 4700, from: "i18", to: "i14" }],
    },
    {
      title: { en: "BTN3 on GP17", fr: "BTN3 sur GP17", ru: "BTN3 на GP17" },
      note: {
        en: "Its yellow jumper is a long one: it lies along a row, over free holes, past BTN1 and BTN2.",
        fr: "Son fil jaune est long : il longe une rangée, sur des trous libres, en passant BTN1 et BTN2.",
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
      title: {
        en: "Hold GP17 low with a resistor",
        fr: "Maintenez GP17 au niveau bas avec une résistance",
        ru: "Подтяните GP17 к земле резистором",
      },
      parts: [{ kind: "resistor", ohms: 4700, from: "j28", to: "bottom-28" }],
    },
    {
      title: {
        en: "Take VBUS, ground and GP28 to a second breadboard",
        fr: "Amenez VBUS, la masse et GP28 jusqu’à une seconde plaque",
        ru: "Проведите VBUS, землю и GP28 на вторую плату",
      },
      note: {
        en: "Snap a second half-size breadboard onto the first, on the side of its top rails, column 1 to column 1: they are made to join along their long sides. The LED takes its power from VBUS rather than 3V3, and VBUS must never reach a GPIO pin.",
        fr: "Emboîtez une seconde plaque d’essai demi-taille sur la première, du côté de ses rails du haut, la colonne 1 contre la colonne 1 : elles sont faites pour s’emboîter par leurs grands côtés. La LED prend son alimentation sur VBUS plutôt que sur le 3V3, et VBUS ne doit jamais atteindre une broche GPIO.",
        ru: "Пристыкуйте вторую половинную макетную плату к первой со стороны её верхних шин, столбец 1 к столбцу 1: такие платы сделаны так, чтобы соединяться длинными сторонами. Светодиод питается от VBUS, а не от 3V3, и VBUS никогда не должен попасть на вывод GPIO.",
      },
      parts: [
        { kind: "wire", from: "a2", to: "2:j2", role: "power" },
        { kind: "wire", from: "a4", to: "2:j4", role: "ground" },
        { kind: "wire", from: "a8", to: "2:j8", role: "signal" },
      ],
    },
    {
      title: { en: "RGB LED on GP28", fr: "LED RVB sur GP28", ru: "RGB-светодиод на GP28" },
      note: {
        en: "Its longest leg is data out, which joins nothing while there is only one LED. It needs no resistor: it has a controller of its own, which sets its current.",
        fr: "Sa plus longue patte est la sortie des données, qui n’est reliée à rien tant qu’il n’y a qu’une LED. Elle n’a besoin d’aucune résistance : elle a son propre contrôleur, qui règle son courant.",
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
  // MicroPython takes only Latin names. French calls the LED led_rvb, as ratsnest's RGB LED example
  // does; Russian keeps the English names.
  script: {
    en: `from machine import Pin
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
    fr: `from machine import Pin
from neopixel import NeoPixel
from time import sleep

led_rvb = NeoPixel(Pin(28), 1)
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
    led_rvb[0] = colour
    led_rvb.write()
    sleep(0.02)`,
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
  test: {
    en: "Hold a button down and the LED lights in its cap's colour: BTN1 red, BTN2 green and BTN3 blue. Let go and it goes out. Press Stop in Thonny to end the script.",
    fr: "Maintenez un bouton enfoncé et la LED s’allume de la couleur de son capuchon : BTN1 en rouge, BTN2 en vert et BTN3 en bleu. Relâchez-le et elle s’éteint. Appuyez sur Arrêter dans Thonny pour terminer le script.",
    ru: "Удерживайте кнопку, и светодиод загорится цветом её колпачка: BTN1 красным, BTN2 зелёным, BTN3 синим. Отпустите её, и он погаснет. Чтобы завершить скрипт, нажмите в Thonny кнопку остановки.",
  },
} satisfies Circuit;
