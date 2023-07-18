const { Image, loadImage } = require("canvas");

module.exports = class ImageUtil {
    /**
     * @type {[{path: string, image: Image}]}
     */
    static images = [];

    /**
     * 
     * @param {string} p 
     * @returns {Promise<Image>}
     */
    static async parseImage(p) {
        if (!p) return null;

        let image = ImageUtil.images.find(a => a.path === p);
        if (image) return image.image;

        image = await loadImage(p);
        ImageUtil.images.push({ path: p, image });

        return image;
    };

    static roundedImage(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
};