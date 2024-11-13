class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (this.getItemType(item)) {
        case "Aged Brie":
          this.updateAgedBrie(item);
          break;
        case "Backstage passes":
          this.updateBackstagePasses(item);
          break;
        case "Sulfuras":
          break; // Sulfuras ne change jamais
        case "Conjured":
          this.updateConjuredItem(item);
          break;
        default:
          this.updateNormalItem(item);
          break;
      }

      // Baisser le sellIn sauf pour Sulfuras
      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
      }

      // Gérer les items expirés
      if (item.sellIn < 0) {
        this.handleExpiredItem(item);
      }
    });

    return this.items;
  }

  getItemType(item) {
    if (item.name === "Aged Brie") return "Aged Brie";
    if (item.name.startsWith("Backstage passes")) return "Backstage passes";
    if (item.name === "Sulfuras, Hand of Ragnaros") return "Sulfuras";
    if (item.name.startsWith("Conjured")) return "Conjured";
    return "Normal";
  }

  updateNormalItem(item) {
    if (item.quality > 0) item.quality -= 1;
  }

  updateAgedBrie(item) {
    if (item.quality < 50) item.quality += 1;
  }

  updateBackstagePasses(item) {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sellIn <= 10 && item.quality < 50) item.quality += 1;
      if (item.sellIn <= 5 && item.quality < 50) item.quality += 1;
    }
  }

  updateConjuredItem(item) {
    if (item.quality > 0) item.quality -= 2;
  }

  handleExpiredItem(item) {
    if (item.name === "Aged Brie" && item.quality < 50) {
      item.quality += 1;
    } else if (item.name.startsWith("Backstage passes")) {
      item.quality = 0;
    } else if (item.name.startsWith("Conjured")) {
      item.quality = Math.max(0, item.quality - 2);
    } else {
      if (item.quality > 0) item.quality -= 1;
    }
  }
}

module.exports = {
  Item,
  Shop,
};
