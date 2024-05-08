const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {
  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(19); //check
  });

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  test('Once the sell by date has passed, Quality degrades twice as fast', () => {
    let normalItem = new Item("normal", -1 , 50);
    const gildedRose = new Shop([normalItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(48)
  });

  test('The Quality of an item is never negative', () => {
    let normalItem = new Item("normal", 5, 0);
    const gildedRose = new Shop([normalItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  test('The Quality of an item is never more than 50', () => {
    let agedBrie = new Item("Aged Brie", 10, 50);
    const gildedRose = new Shop([agedBrie]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

  test('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new Shop([sulfuras]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(80);
  })

  test('The Quality of Backstage passes drops to 0 after concert', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)
    const gildedRose = new Shop([backstagePass])

    const items= gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  test('Quality of "Aged Brie" should increase by 1 each day even after SellIn date has passed', () => {
    let agedBrie = new Item("Aged Brie", -1, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });
});
