class Item {
    constructor(name, sell_in, quality) {
        this.name = name;
        this.sell_in = sell_in;
        this.quality = quality;
    }

    get isBackstage() {
        return this.name === 'Backstage passes to a TAFKAL80ETC concert';
    }

    get isAged() {
        return this.name === 'Aged Brie';
    }

    get isSulfuras() {
        return this.name === 'Sulfuras, Hand of Ragnaros';
    }

    resetQuality() {
        this.quality = 0;
    }

    increaseQuality() {
        this.quality = Math.min(this.quality + 1, 50);
    }

    decreaseQuality() {
        if (!this.isSulfuras) {
            this.quality = Math.max(this.quality - 1, 0);
        }
    }

    decreaseSellIn() {
        if (!this.isSulfuras) {
            this.sell_in -= 1;
        }
    }

    updateQuality() {
        if (this.isAged) {
            this.increaseQuality();
        } else if (this.isBackstage) {
            this.increaseQuality();
            if (this.sell_in < 11) this.increaseQuality();
            if (this.sell_in < 6) this.increaseQuality();
        } else {
            this.decreaseQuality();
        }

        this.decreaseSellIn();

        if (this.sell_in < 0) {
            if (this.isAged) {
                this.increaseQuality();
            } else if (this.isBackstage) {
                this.resetQuality();
            } else {
                this.decreaseQuality();
            }
        }
    }
}

const items = [];

function update_quality() {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.updateQuality();
    }
}
