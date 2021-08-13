'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
  switch (this.selector[0]) {
    case '.':
      const div = document.createElement('div');
      div.classList.add('div-element');
      document.body.append(div);
      div.textContent = 'BY CLASS';

      this.addStyles(div);

      break;
    case '#':
      const p = document.createElement('p');
      p.id = 'p-element';
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
    `;
};

const domElement = new DomElement(
  '#my-id',
  '30px',
  '200px',
  'red',
  '25px'
);

domElement.createElement();