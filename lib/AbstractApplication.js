const { createCanvas } = require("canvas");
const ImageUtil = require("./ImageUtil");

module.exports = class AbstractApplication {
    id;
    name;
    icon;
    emoji;
    description;
    metadata = [];

    constructor(id, name, icon, options = {}) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        if(options.description) this.description = options.description;
        if(options.emoji) this.emoji = options.emoji;
    };

    async renderIcon(width, height) {
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        context.save();
        ImageUtil.roundedImage(context, 0, 0, width, width, 30);
        context.clip();
        context.drawImage(await ImageUtil.parseImage(this.icon), 0, 0, width, width);
        context.restore();

        context.fillStyle = '#000';
        context.textAlign = 'center';
        context.textBaseline = 'bottom';
        context.font = (width / 3.5) + 'px Arial';
        context.fillText(this.name, width / 2, height, width);

        return canvas;
    };

    async render() { };
};