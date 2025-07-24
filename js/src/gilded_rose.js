
function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

class ItemWrapper {
    constructor(item) {
        this.item = item;
    }

    resetQuality() {
        this.item.quality = 0;
    }

    increaseQuality() {
        this.item.quality = Math.min(this.item.quality + 1, 50);
    }

    decreaseQuality() {
        this.item.quality = Math.max(this.item.quality - 1, 0);
    }

    decreaseSellIn() {
        this.item.sell_in -= 1;
    }

    updateQuality() {
        this.decreaseQuality();
        this.decreaseSellIn();

        if (this.item.sell_in < 0) {
            this.decreaseQuality();
        }
    }
}

class AgedBrieItem extends ItemWrapper {
    constructor(item) {
        super(item);
    }

    updateQuality() {
        this.increaseQuality();
        this.decreaseSellIn();
        if (this.item.sell_in < 0) {
            this.increaseQuality();
        }
    }
}

class BackstageItem extends ItemWrapper {
    constructor(item) {
        super(item);
    }

    updateQuality() {
        this.increaseQuality();
        if (this.item.sell_in < 11) this.increaseQuality();
        if (this.item.sell_in < 6) this.increaseQuality();
        this.decreaseSellIn();

        if (this.item.sell_in < 0) {
            this.resetQuality();
        }
    }
}

class SulfurasItem extends ItemWrapper {
    constructor(item) {
        super(item);
    }

    decreaseSellIn() {}
    decreaseQuality() {}
}

const items = [];

function createItem(item) {
    switch (item.name) {
        case 'Aged Brie':
            return new AgedBrieItem(item);
        case 'Backstage passes to a TAFKAL80ETC concert':
            return new BackstageItem(item);
        case 'Sulfuras, Hand of Ragnaros':
            return new SulfurasItem(item);
        default:
            return new ItemWrapper(item);
    }
}

function update_quality() {
    for (let i = 0; i < items.length; i++) {
        const item = createItem(items[i]);
        item.updateQuality();
    }
}
