const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[10]) || 10;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach((item) =>
        console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
      );
      gildedRose.updateQuality();
    }
  });

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("diminue la qualité de 1 pour les items normaux avant la date de péremption", function () {
    const gildedRose = new Shop([new Item("Objet normal", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
    expect(items[0].sellIn).toBe(4);
  });

  it("ne diminue pas la qualité en dessous de 0", function () {
    const gildedRose = new Shop([new Item("Objet normal", 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("augmente la qualité pour Aged Brie", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("ne dépasse jamais une qualité de 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("ne change pas la qualité ni sellIn pour Sulfuras", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 5, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(5);
  });

  it("augmente la qualité de 2 pour Backstage passes quand sellIn <= 10", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it("augmente la qualité de 3 pour Backstage passes quand sellIn <= 5", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it("met la qualité à 0 pour Backstage passes après la date de péremption", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("diminue la qualité deux fois plus vite pour les objets Conjured", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("diminue la qualité deux fois plus vite après la date de péremption pour les items normaux", function () {
    const gildedRose = new Shop([new Item("Objet normal", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });
});
