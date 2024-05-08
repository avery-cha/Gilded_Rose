class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn; // days to sell the item
    this.quality = quality;
  }
}

const isNormal = (itemTest) => {
  if (itemTest.name != 'Aged Brie' && itemTest.name != 'Backstage passes to a TAFKAL80ETC concert' && itemTest.name != 'Sulfuras, Hand of Ragnaros') {
    if (itemTest.quality > 0) {
        return true;
    }
  }
}

const checkQualityMax = (itemTest) => {
  if(itemTest.name == "Sulfuras, Hand of Ragnaros"){
    itemTest.quality = 80;
  }
  else if(itemTest.quality > 50){
    itemTest.quality = 50;
  }
}

const specialQualityIncrease = (itemTest) => {
 // if item is not normal and quality less than 50, then increment quality by 1
 itemTest.quality += 1;
 // if item is backstage passes and sellIn<11 then increment quality by an additional 1
 if (itemTest.name == 'Backstage passes to a TAFKAL80ETC concert') {
   if (itemTest.sellIn < 11) {
       itemTest.quality += 1;
   }
   // if item is backstage passes and sellIn<6 increase another 1
   if (itemTest.sellIn < 6) {
       itemTest.quality += 1;
   }
 }
}

const zeroSellInDate = (itemTest) => {
      if (isNormal(itemTest)) { //if sellin<0, normal item, and quality >0. it should decrease twice as fast
          itemTest.quality -= 1;
      }
    else if(itemTest.name == 'Backstage passes to a TAFKAL80ETC concert') { //if the sellIn <0. and it is NOT aged brie, but it IS Backstage passes, set quality to zero
      itemTest.quality = 0;
    }
  }
class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {

    // loop through all the items in the shop
    for (let i = 0; i < this.items.length; i++) {

      //normal items decrease quality by 1
      if(isNormal(this.items[i])){
        this.items[i].quality -= 1;
      } else { //specialty items increase quality depending on sellIn
        specialQualityIncrease(this.items[i]);
      }

      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].sellIn -= 1;
      }

      if (this.items[i].sellIn < 0) {
        zeroSellInDate(this.items[i])
      }

      checkQualityMax(this.items[i]);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
