const { createCanvas } = require("canvas");
const { IMAGES_DIR } = require("./Util");
const path = require("path");
const ImageUtil = require("./ImageUtil");
const Grid = require("./Grid");
const { StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = class Tablet {
    applications = [];
    body = path.join(IMAGES_DIR, 'tablet.png');
    screen = {
        x: 177,
        y: 181,
        w: 1488,
        h: 981
    };
    background = path.join(IMAGES_DIR, 'background.jpg');
    metadata = [];
    applicationIconSize = {
        w: 220,
        h: 290
    };
    page = 'main';

    /**
     * 
     * @param {{applications: [], metadata: [], background: string}} options 
     */
    constructor(options = {}) {
        if (options.applications) this.applications = options.applications;
        if (options.metadata) this.metadata = options.metadata;
        if (options.background) this.background = options.background;
        if (options.applicationIconSize) this.applicationIconSize = options.applicationIconSize;
    };

    async render() {
        const bodyImage = await ImageUtil.parseImage(this.body);

        const canvas = createCanvas(bodyImage.width, bodyImage.height);
        const context = canvas.getContext('2d');

        if (this.background) {
            context.drawImage(await ImageUtil.parseImage(this.background), this.screen.x, this.screen.y, this.screen.w, this.screen.h);
        }

        context.drawImage(bodyImage, 0, 0);

        if (this.page == 'main') {
            const appGrid = new Grid(await Promise.all(this.applications.map(async a => ({ image: await a.renderIcon(this.applicationIconSize.w, this.applicationIconSize.h) }))), { width: this.screen.w - 100, height: this.screen.h - 100, elementWidth: this.applicationIconSize.w, elementHeight: this.applicationIconSize.h });
            context.drawImage(await appGrid.render(), this.screen.x + 50, this.screen.y + 50);
        }
        else {

        }

        return canvas.toBuffer();
    };

    getDiscordComponents() {
        const rows = [];

        if (this.page === 'main') {
            const appSelector = new StringSelectMenuBuilder()
                .setCustomId('t-app-select')
                .setPlaceholder('Sélectionner une application')
                .setOptions(this.applications.map(a => ({ label: a.name, value: a.id, emoji: a.emoji, description: a.description })));

            rows.push(new ActionRowBuilder().setComponents(appSelector));
        }
        else {

        }

        const closeButton = new ButtonBuilder()
            .setCustomId('t-close')
            .setEmoji('✖')
            .setLabel('Fermer la tablette')
            .setStyle(ButtonStyle.Danger);

        rows.push(new ActionRowBuilder().addComponents(closeButton));

        return rows;
    }
};