# Calculator

An on-screen calculator built with HTML, CSS and JavaScript for [The Odin Project](https://www.theodinproject.com/lessons/foundations-calculator) Foundations course.

## Features

- Add, subtract, multiply and divide
- Solves one pair of numbers at a time: `12 + 7 -` shows `19`, then keeps going
- Long decimals are rounded so they fit on the display
- A snarky message if you try to divide by 0
- Decimal point button (only one per number)
- Backspace button
- Keyboard support: digits, `. + - * /`, `Enter` or `=`, `Backspace`, `Escape` to clear

## What I practiced

- Breaking a big problem into small functions
- Keeping track of state (first number, operator, second number)
- DOM manipulation and event listeners
- `data-` attributes on buttons
- Keyboard events
- Flexbox layout

No `eval()` is used: every calculation goes through my own `operate` function.
