const { createCanvas } = require("canvas");

module.exports = class Grid {
    elements = [];
    width = 0;
    height = 0;
    elementWidth = 0;
    elementHeight = 0;
    gap = 10;

    constructor(elements, options = {}) {
        this.elements = elements;
        if (options.width) this.width = options.width;
        if (options.height) this.height = options.height;
        if (options.elementWidth) this.elementWidth = options.elementWidth;
        if (options.elementHeight) this.elementHeight = options.elementHeight;
        if (options.gap) this.gap = options.gap;
    };

    async render() {
        const canvas = createCanvas(this.width, this.height);
        const context = canvas.getContext('2d');

        let cx = 0;
        let cy = 0;
        let count = this.elements.length;

        let maxColCount = Math.floor(this.width / (this.elementWidth + this.gap));

        for (const element of this.elements) {
            context.drawImage(element.image, cx, cy);

            let space = this.gap + (this.width - this.elementWidth * Math.min(maxColCount, count)) / Math.min(maxColCount, count);
            cx += element.image.width + space;
            if (cx + this.elementWidth > this.width) {
                cx = 0;
                cy += this.elementHeight + this.gap;
            }
        }

        return canvas;
    };
};