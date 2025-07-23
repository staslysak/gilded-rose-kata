function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

Object.defineProperty(Item.prototype, 'isBackstage', {
    get() {
        return this.name === 'Backstage passes to a TAFKAL80ETC concert';
    },
});

Object.defineProperty(Item.prototype, 'isAged', {
    get() {
        return this.name === 'Aged Brie';
    },
});

Object.defineProperty(Item.prototype, 'isSulfuras', {
    get() {
        return this.name === 'Sulfuras, Hand of Ragnaros';
    },
});

Item.prototype.resetQuality = function () {
    this.quality = 0;
};

Item.prototype.increaseQuality = function () {
    this.quality = Math.min(this.quality + 1, 50);
};

Item.prototype.decreaseQuality = function () {
    if (!this.isSulfuras) {
        this.quality = Math.max(this.quality - 1, 0);
    }
};

Item.prototype.decreaseSellIn = function () {
    if (!this.isSulfuras) {
        this.sell_in -= 1;
    }
};

Item.prototype.updateQuality = function () {
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
};

const items = [];

function update_quality() {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.updateQuality();
    }
}
