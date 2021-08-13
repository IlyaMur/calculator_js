'use strict';

document.addEventListener('DOMContentLoaded', function () {
  function DomElement(selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
  }

  DomElement.prototype.createElement = function () {
    switch (this.selector[0]) {
      case '.':
        const div = document.createElement('div');
        div.classList.add(this.selector.slice(1));
        document.body.append(div);
        div.textContent = 'BY CLASS';

        this.addStyles(div);

        break;
      case '#':
        const p = document.createElement('p');
        p.id = this.selector.slice(1);
        document.body.append(p);
        p.textContent = 'BY ID';

        this.addStyles(p);

        break;
    }
  };

  DomElement.prototype.addStyles = function (element) {
    element.style.cssText = `
    height: ${this.height};
    background-color: ${this.bg};
    width: ${this.width};
    font-size: ${this.fontSize};
    position: ${this.position};
    margin: 0
    `;
  };

  const domElement = new DomElement(
    '.my-id',
    '30px',
    '200px',
    'red',
    '25px'
  );

  domElement.createElement();

  // -------

  const square = new DomElement(
    '#square',
    '100px',
    '100px',
    'yellow',
    '25px',
    'absolute'
  );

  square.createElement();

  // ---------

  const squareElement = document.getElementById('square');

  let counterLeft = 0;
  let counterUp = 0;

  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case "ArrowLeft":
        counterLeft--;
        squareElement.style.marginLeft = `${counterLeft}px`;

        break;
      case "ArrowRight":
        counterLeft++;
        squareElement.style.marginLeft = `${counterLeft}px`;

        break;
      case "ArrowUp":
        counterUp--;
        squareElement.style.marginTop = `${counterUp}px`;

        break;
      case "ArrowDown":
        counterUp++;
        squareElement.style.marginTop = `${counterUp}px`;

        break;
    }
  });
});



