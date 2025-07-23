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
        if (this.quality < 50) {
            this.quality += 1;
        }
    }

    decreaseQuality() {
        if (this.quality > 0 && !this.isSulfuras) {
            this.quality -= 1;
        }
    }

    decreaseSellIn() {
        this.sell_in -= 1;
    }
}

var items = [];

function update_quality() {
    for (var i = 0; i < items.length; i++) {
        const item = items[i];

        if (!item.isBackstage && !item.isAged) {
            item.decreaseQuality();
        } else {
            item.increaseQuality();
            if (item.isBackstage) {
                if (item.sell_in < 11) item.increaseQuality();
                if (item.sell_in < 6) item.increaseQuality();
            }
        }

        if (!item.isSulfuras) {
            item.decreaseSellIn();
        }

        if (item.sell_in < 0) {
            if (!item.isAged) {
                if (!item.isBackstage) {
                    item.decreaseQuality();
                } else {
                    item.resetQuality();
                }
            } else {
                item.increaseQuality();
            }
        }
    }
}
