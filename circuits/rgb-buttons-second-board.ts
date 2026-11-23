// Three buttons in a row on the second breadboard, with red, green and blue caps, and an RGB LED that
// lights in the colour of the button held: rgb-buttons, with its buttons moved up to where the whole
// board is free (ratsnest's ADR 0028).
import type { Circuit } from "ratsnest";

export default {
  format: 2,
  setup: { kind: "pico" },
  name: {
    en: "Three buttons on the second board",
    fr: "Trois boutons sur la seconde plaque",
    ru: "Три кнопки на второй плате",
  },
  description: {
    en: "Three buttons in a row on a second breadboard, with red, green and blue caps, and an RGB LED that lights in the colour of the button held. The LED is an addressable one, with a controller of its own: it takes its colour as data on GP28 and its power from VBUS, and needs no resistor.",
    fr: "Trois boutons en rang sur une seconde plaque, avec des capuchons rouge, vert et bleu, et une LED RVB qui s’allume de la couleur du bouton maintenu enfoncé. La LED est adressable, avec son propre contrôleur : elle reçoit sa couleur en données sur GP28 et son alimentation de VBUS, et n’a besoin d’aucune résistance.",
    ru: "Три кнопки в ряд на второй макетной плате, с красным, зелёным и синим колпачками, и RGB-светодиод, который загорается цветом нажатой кнопки. Это адресуемый светодиод со своим контроллером: он получает цвет в виде данных по GP28, а питание от VBUS, и резистор ему не нужен.",
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
      pin: { kind: "gpio", gpio: 20 },
      colour: "red",
    },
    {
      id: "green",
      name: { en: "BTN2", fr: "BTN2", ru: "BTN2" },
      pin: { kind: "gpio", gpio: 16 },
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
        en: "Connect the top − rail to ground",
        fr: "Reliez le rail − du haut à la masse",
        ru: "Соедините верхнюю шину − с землёй",
      },
      parts: [{ kind: "wire", from: "a19", to: "top-19", role: "ground" }],
    },
    {
      title: {
        en: "Take 3V3 and ground to a second breadboard",
        fr: "Amenez le 3V3 et la masse sur une seconde plaque",
        ru: "Проведите 3V3 и землю на вторую плату",
      },
      note: {
        en: "Snap a second half-size breadboard onto the first, on the side of its top rails, column 1 to column 1: they are made to join along their long sides. Where they meet, the two + rails are side by side, and a short jumper joins them. The black jumper is a long one: it crosses the whole second breadboard, over free holes, to its far − rail, where the three pull-downs go.",
        fr: "Emboîtez une seconde plaque d’essai demi-taille sur la première, du côté de ses rails du haut, la colonne 1 contre la colonne 1 : elles sont faites pour s’emboîter par leurs grands côtés. Là où elles se rejoignent, les deux rails + sont côte à côte, et un fil court les relie. Le fil noir est long : il traverse toute la seconde plaque, sur des trous libres, jusqu’à son rail − le plus éloigné, où vont les trois résistances de rappel.",
        ru: "Пристыкуйте вторую половинную макетную плату к первой со стороны её верхних шин, столбец 1 к столбцу 1: такие платы сделаны так, чтобы соединяться длинными сторонами. Там, где они сходятся, две шины + оказываются рядом, и их соединяет короткая перемычка. Чёрная перемычка длинная: она пересекает всю вторую плату, по свободным отверстиям, до её дальней шины −, куда идут три подтягивающих резистора.",
      },
      parts: [
        { kind: "wire", from: "top+10", to: "2:bottom+10", role: "power" },
        // Column 11 of the second board is free from edge to edge, so the jumper lies over no hole in
        // use, and it is clear of the pull-downs' value tags, which the far end needs.
        {
          kind: "wire",
          from: "top-11",
          to: "2:top-11",
          role: "ground",
        },
      ],
    },
    {
      title: { en: "BTN1 on GP20", fr: "BTN1 sur GP20", ru: "BTN1 на GP20" },
      note: {
        en: "Its yellow jumper runs straight from the pin to the second breadboard. The button's two legs in a column, either side of the channel, are always joined, and pressing it joins its two columns.",
        fr: "Son fil jaune va tout droit de la broche à la seconde plaque. Les deux pattes du bouton d’une même colonne, de part et d’autre de la rainure, sont toujours reliées, et appuyer relie ses deux colonnes.",
        ru: "Жёлтая перемычка идёт прямо от вывода. Две ножки кнопки в одном столбце, по разные стороны канавки, всегда соединены, а нажатие соединяет её столбцы между собой.",
      },
      parts: [
        { kind: "wire", from: "a16", to: "2:j16", role: "signal" },
        { kind: "button", button: "red", columns: [16, 18], board: 2 },
        { kind: "wire", from: "2:j18", to: "2:bottom+17", role: "power" },
      ],
    },
    {
      title: {
        en: "Hold GP20 low with a resistor",
        fr: "Maintenez GP20 au niveau bas avec une résistance",
        ru: "Подтяните GP20 к земле резистором",
      },
      note: {
        en: "Without it the pin floats while the button is up, and reads a press nobody made. The button's legs carry GP20 across the channel, so the resistor goes on the far side.",
        fr: "Sans elle, la broche flotte tant que le bouton est relâché, et lit un appui que personne n’a fait. Les pattes du bouton portent GP20 de l’autre côté de la rainure, alors la résistance se place de ce côté-là.",
        ru: "Без него вывод висит в воздухе, пока кнопка отпущена, и читает нажатия, которых никто не делал. Ножки кнопки переносят GP20 через канавку, поэтому резистор ставится с той стороны.",
      },
      parts: [{ kind: "resistor", ohms: 4700, from: "2:a16", to: "2:top-16" }],
    },
    {
      title: { en: "BTN2 on GP16", fr: "BTN2 sur GP16", ru: "BTN2 на GP16" },
      parts: [
        { kind: "wire", from: "a21", to: "2:j21", role: "signal" },
        { kind: "button", button: "green", columns: [21, 23], board: 2 },
        { kind: "wire", from: "2:j23", to: "2:bottom+23", role: "power" },
      ],
    },
    {
      title: {
        en: "Hold GP16 low with a resistor",
        fr: "Maintenez GP16 au niveau bas avec une résistance",
        ru: "Подтяните GP16 к земле резистором",
      },
      parts: [{ kind: "resistor", ohms: 4700, from: "2:a21", to: "2:top-21" }],
    },
    {
      title: { en: "BTN3 on GP17", fr: "BTN3 sur GP17", ru: "BTN3 на GP17" },
      note: {
        en: "No pin is under its column, so its yellow jumper runs beside BTN2's, and a second one carries it along a row, over free holes, past BTN2.",
        fr: "Aucune broche n’est sous sa colonne, alors son fil jaune longe celui de BTN2, et un second le mène le long d’une rangée, sur des trous libres, en passant BTN2.",
        ru: "Под его столбцом нет вывода, поэтому жёлтая перемычка идёт рядом с перемычкой BTN2, а вторая ведёт её вдоль ряда, по свободным отверстиям, мимо BTN2.",
      },
      parts: [
        { kind: "wire", from: "a20", to: "2:j20", role: "signal" },
        { kind: "wire", from: "2:i20", to: "2:i26", role: "signal" },
        { kind: "button", button: "blue", columns: [26, 28], board: 2 },
        { kind: "wire", from: "2:j28", to: "2:bottom+28", role: "power" },
      ],
    },
    {
      title: {
        en: "Hold GP17 low with a resistor",
        fr: "Maintenez GP17 au niveau bas avec une résistance",
        ru: "Подтяните GP17 к земле резистором",
      },
      parts: [{ kind: "resistor", ohms: 4700, from: "2:a26", to: "2:top-26" }],
    },
    {
      title: {
        en: "Take VBUS, ground and GP28 to the second breadboard",
        fr: "Amenez VBUS, la masse et GP28 jusqu’à la seconde plaque",
        ru: "Проведите VBUS, землю и GP28 на вторую плату",
      },
      note: {
        en: "The LED takes its power from VBUS rather than 3V3, and VBUS must never reach a GPIO pin.",
        fr: "La LED prend son alimentation sur VBUS plutôt que sur le 3V3, et VBUS ne doit jamais atteindre une broche GPIO.",
        ru: "Светодиод питается от VBUS, а не от 3V3, и VBUS никогда не должен попасть на вывод GPIO.",
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
btn1 = Pin(20, Pin.IN)
btn2 = Pin(16, Pin.IN)
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
btn1 = Pin(20, Pin.IN)
btn2 = Pin(16, Pin.IN)
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
btn1 = Pin(20, Pin.IN)
btn2 = Pin(16, Pin.IN)
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
