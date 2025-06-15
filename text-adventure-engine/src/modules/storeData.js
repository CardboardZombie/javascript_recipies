// storeData.js

export const stores = {
  "general-store": {
    name: "General Store",
    tabs: {
      gear: [
        { name: 'Backpack', cost: 2, label: '2 gp' },
        { name: 'Bedroll', cost: 1.6, label: '16 sp' },
        { name: 'Blanket', cost: 0.5, label: '5 sp' },
        { name: 'Bottle (glass)', cost: 1, label: '1 gp' },
        { name: 'Candle', cost: 0.01, label: '1 cp' },
        { name: 'Clothes, common', cost: 5, label: '5 gp' },
        { name:'Fishing tackle', cost: 1, label:'1 gp' },
        { name: 'Hammer', cost: 1, label: '1 gp' },
        { name: 'Healer\'s kit', cost: 4, label: '4 gp' },
        { name: 'Lantern, hooded', cost: 4, label: '4 gp' },
        { name: 'Magnifying glass', cost: 100, label: '100 gp' },
        { name: 'Oil (flask)', cost: 0.1, label: '1 sp' },
        { name: 'Rations (1/day)', cost: 0.5, label: '5 sp' },
        { name: 'Rope, hempen (50ft)', cost: 1, label: '1 gp' },
        { name: 'Saddle, riding', cost: 10, label: '10 gp' },
        { name: 'Soap', cost: 0.02, label: '2 cp' },
        { name: 'Shovel', cost: 2, label: '2 gp' },
        { name: 'Talisman (Divine Focus)', cost: 1, label: '1 gp' },
        { name: 'Torch', cost: 0.01, label: '1 cp' },
        { name: 'Waterskin', cost: 0.2, label: '2 sp' },
        { name: 'Whetstone', cost: 0.01, label: '1 cp' },
      ],
      potions: [
        { name: 'Antitoxin', cost: 25, label: '25 gp' },
        { name: 'Potion of healing', cost: 25, label: '25 gp' }
      ],
      tools: [
        { name: "Alchemist's supplies", cost: 40, label: '40 gp' },
        { name: "Cook's utensils", cost: 1, label: '1 gp' },
        { name: 'Herbalism Kit', cost: 4, label: '4 gp' }
      ],
      weapons: [
        { name: 'Arrows (10)', cost: 1, label: '1 gp' },
        { name: 'Shortbow', cost: 20, label: '20 gp' },
        { name: 'Dagger', cost: 2, label: '2 gp' },
        { name: 'Shortsword', cost: 10, label: '10 gp' },
        { name: 'Handaxe', cost: 5, label: '5 gp' },
        { name: 'Shield', cost: 10, label: '10 gp' }
      ]
    }
  },
  "second-hand-store": {
    name: "Second-Hand Second Hand Store",
    tabs: {
      gear: [
        { name: 'Backpack', cost: 2, label: '2 gp' },
        { name: 'Bedroll', cost: 0.16, label: '16 sp' },
        { name: 'Blanket', cost: 0.25, label: '2 sp' },
        { name: 'Bottle (glass)', cost: 1, label: '1 gp' },
        { name: 'Candle', cost: 0.01, label: '1 cp' },
        { name: 'Clothes, common', cost: 5, label: '5 gp' },
        { name: 'Clothes, buccaneer', cost: 10, label: '10 gp' },
        { name: 'Tricorn Hat (with bandana)', cost: 1, label: '1 gp' },
        { name: 'Crowbar', cost: 2, label: '2 gp' },
        { name: 'Hammer', cost: 1, label: '1 gp' },
        { name: 'Lantern, bullseye', cost: 5, label: '5 gp' },
        { name: 'Magnifying glass', cost: 100, label: '100 gp' },
        { name: 'Spyglass', cost: 1000, label: '1000 gp' },
        { name: 'Rations (1 day)', cost: 0.5, label: '5 sp' },
        { name: 'Rope, hempen (50ft)', cost: 1, label: '1 gp' },
        { name: 'Shovel', cost: 2, label: '2 gp' },
        { name: 'Soap', cost: 0.02, label: '2 cp' },
        { name: 'Torch', cost: 0.01, label: '1 cp' },
        { name: 'Waterskin', cost: 0.2, label: '2 sp' },
        { name: 'Whetstone', cost: 0.01, label: '1 cp' }
      ],
      potions: [
        { name:'Acid', cost: 25, label:'25 gp'},
        { name:'Alchemist\'s fire', cost: 40, label:'40 gp'},
        { name:'Alchemist\'s frost', cost: 15, label:'15 gp'},
        { name:'Antitoxin', cost: 15, label:'15 gp'},
        { name:'Bomb', cost: 50, label:'50 gp'},
        {name:'Potion of healing',cost: 15,label:'15 gp'}
      ],
      tools:[
        {name:'Alchemist\'s supplies', cost: 50, label:'50 gp'},
        {name:'Caltrops (bag of 20)', cost: 1, label:'1 gp'},
        {name:'Cartographer\'s tools', cost: 15, label:'15 gp'},
        {name:'Cook\'s utensils', cost:1, label:'1 gp'},
        {name:'Dice set', cost: 0.1, label:'1 sp'},
        {name:'Disguise kit', cost: 25, label:'25 gp'},
        {name:'Fishing tackle', cost: 1, label:'1 gp'},
        {name:'Forgery kit', cost: 15, label:'15 gp'},
        {name:'Healer\'s kit', cost: 5, label:'5 gp'},
        {name:'Navigator\'s tools', cost: 25, label:'25 gp'},
        {name:'Poisoner\'s kit', cost: 25, label:'25 gp'},
        {name:'Playing card set', cost: 0.5, label:'5 sp'},
        {name:'Thieves\' tools', cost: 15, label:'15 gp'},
        {name:'Tin flute', cost: 1, label:'1 gp'}
      ],
      weapons: [
        { name: 'Arrows (10)', cost: 1, label: '1 gp' },
        { name: 'Bolts (10)', cost: 1, label: '1 gp' },
        { name: 'Crossbow, light', cost: 20, label: '20 gp' },
        { name: 'Cutlass (scimitar)', cost: 20, label: '20 gp' },
        { name: 'Dagger', cost: 2, label: '2 gp' },
        { name: 'Hand Axe', cost: 10, label: '10 gp' },
        { name: 'Hook (sickle)', cost: 1, label: '1 gp' },
        { name: 'Katana (longsword)', cost: 15, label: '15 gp' },
        { name: 'Kriss (dagger)', cost: 2, label: '2 gp' },
        { name: 'Naginata (glaive)', cost: 20, label: '20 gp' },
        { name: 'Net', cost: 1, label: '1 gp' },
        { name: 'Shortbow', cost: 20, label: '20 gp' },
        { name: 'Trident', cost: 5, label: '5 gp' },
        { name: 'Wakizashi (shortsword)', cost: 10, label: '10 gp' },
        { name: 'Chain Shirt', cost: 50, label: '50 gp' },
        { name: 'Shield (wood)', cost: 10, label: '10 gp' }
      ]
    }
  }, 
  "tattoo-parlour": {
    name: "Tattoo Parlour",
    tabs: {
      torso: [
        { name: 'Duskheart', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Elderspire', cost: 60, label: '60 gp + 2 HP' },
        { name: 'Embermourn', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Haunt Mark', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Netherglyph', cost: 40, label: '40 gp + 2 HP' },
        { name: 'Umbracrest', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Veilshade', cost: 40, label: '40 gp + 2 HP' }
      ],
      arms: [
        { name: 'Twilight Fist', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Gloam Mark', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Mystic Chime', cost: 40, label: '40 gp + 2 HP' },
        { name: 'Nightbound', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Shadowbound', cost: 40, label: '40 gp + 2 HP' },
        { name: 'Shadowcrest', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Veilbrand', cost: 40, label: '40 gp + 4 HP' },
        { name: 'Wrathsign', cost: 60, label: '60 gp + 4 HP' }
      ],
      legs: [
        { name: 'Arcane Delve', cost: 40, label: '40 gp + 2 HP' },
        { name: 'Deep Delve', cost: 40, label: '40 gp + 2 HP' },
        { name: 'Dreadmoss', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Duskweave', cost: 60, label: '60 gp + 2 HP' },
        { name: 'Ecliptic Ink', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Gloamsigil', cost: 60, label: '60 gp + 4 HP' },
        { name: 'Obsidian Square', cost: 40, label: '40 gp + 2 HP' },
        { name: 'Sable Spiral', cost: 60, label: '60 gp + 4 HP' }
      ]
    }
  }
};

