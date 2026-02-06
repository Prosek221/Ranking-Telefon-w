const RESOURCE_CONFIG = [
  { key: "gold", label: "Złoto", icon: "🪙" },
  { key: "food", label: "Żywność", icon: "🌾" },
  { key: "wood", label: "Drewno", icon: "🪵" },
  { key: "stone", label: "Kamień", icon: "🪨" },
  { key: "tech", label: "Technologia", icon: "🧪" },
];

const BUILDINGS = {
  townhall: {
    name: "Centrum dowodzenia",
    description: "Zapewnia złoto i zwiększa rangę państwa.",
    baseCost: { wood: 80, stone: 70, gold: 60 },
    production: { gold: 4 },
  },
  farm: {
    name: "Agrokompleks",
    description: "Produkuje żywność i wspiera wzrost populacji.",
    baseCost: { wood: 40, gold: 30 },
    production: { food: 7 },
  },
  lumber: {
    name: "Kombinat drzewny",
    description: "Stały dopływ drewna na potrzeby rozbudowy.",
    baseCost: { gold: 35, food: 20 },
    production: { wood: 5 },
  },
  quarry: {
    name: "Zakład wydobywczy",
    description: "Wydobycie kamienia i wzmocnienie fortyfikacji.",
    baseCost: { gold: 40, food: 20 },
    production: { stone: 5 },
  },
  barracks: {
    name: "Garnizon",
    description: "Odblokowuje rekrutację jednostek lądowych.",
    baseCost: { wood: 120, stone: 90, gold: 80 },
    production: {},
  },
  academy: {
    name: "Centrum badań",
    description: "Umożliwia ulepszanie jednostek oraz rozwój technologii.",
    baseCost: { wood: 140, stone: 120, gold: 120 },
    production: { tech: 2 },
  },
  wall: {
    name: "Mury kompozytowe",
    description: "Zwiększa obronę i morale mieszkańców.",
    baseCost: { stone: 160, wood: 60, gold: 50 },
    production: {},
  },
  airbase: {
    name: "Lotnisko wojskowe",
    description: "Pozwala utrzymać eskadry lotnicze.",
    baseCost: { stone: 160, gold: 140, tech: 40 },
    production: {},
  },
  hangar: {
    name: "Hangary",
    description: "Wymagane do rozmieszczenia większości nowoczesnych samolotów.",
    baseCost: { stone: 120, gold: 120, tech: 35 },
    production: {},
  },
  shipyard: {
    name: "Port wojenny",
    description: "Umożliwia budowę nowoczesnych okrętów i łodzi podwodnych.",
    baseCost: { wood: 160, stone: 140, gold: 120 },
    production: {},
  },
  missileSilo: {
    name: "Silos rakietowy",
    description: "Zwiększa siłę odstraszania i ataków precyzyjnych.",
    baseCost: { stone: 180, gold: 160, tech: 60 },
    production: {},
  },
  radarStation: {
    name: "Stacja radarowa",
    description: "Ułatwia wykrywanie wrogich samolotów i floty.",
    baseCost: { stone: 90, gold: 90, tech: 30 },
    production: {},
  },
};

const DEFENSE_SYSTEMS = {
  aaShield: {
    name: "Tarcza przeciwlotnicza",
    description: "Chroni miasto przed nalotami i zwiększa szanse przechwycenia.",
    baseCost: { gold: 130, stone: 80, tech: 30 },
    power: 28,
  },
  interceptor: {
    name: "Rakiety przechwytujące",
    description: "Amunicja do zestrzeliwania wykrytych celów.",
    baseCost: { gold: 90, tech: 40, stone: 30 },
    power: 0,
  },
  droneNet: {
    name: "Sieć dronów patrolowych",
    description: "Wspiera wykrywanie stealth i ochronę granic.",
    baseCost: { gold: 110, tech: 50, wood: 40 },
    power: 12,
  },
  coastalMissiles: {
    name: "Bateria rakiet nadbrzeżnych",
    description: "Skuteczna kontra dla wrogiej floty.",
    baseCost: { gold: 150, stone: 90, tech: 40 },
    power: 24,
  },
};

const UNIT_CATEGORIES = {
  air: "Lotnictwo",
  land: "Wojska lądowe",
  sea: "Marynarka",
};

const UNITS = {
  // Lotnictwo (20)
  f16: {
    name: "F-16 Fighting Falcon",
    cost: { gold: 160, tech: 50, stone: 40 },
    power: 30,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  f35: {
    name: "F-35 Lightning II",
    cost: { gold: 220, tech: 80, stone: 50 },
    power: 40,
    upkeep: { food: 1, gold: 4 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  f22: {
    name: "F-22 Raptor",
    cost: { gold: 210, tech: 75, stone: 45 },
    power: 38,
    upkeep: { food: 1, gold: 4 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  su57: {
    name: "Su-57 Felon",
    cost: { gold: 200, tech: 70, stone: 45 },
    power: 36,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  eurofighter: {
    name: "Eurofighter Typhoon",
    cost: { gold: 190, tech: 60, stone: 40 },
    power: 33,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  rafale: {
    name: "Dassault Rafale",
    cost: { gold: 185, tech: 58, stone: 38 },
    power: 32,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  gripen: {
    name: "Saab JAS 39 Gripen",
    cost: { gold: 150, tech: 45, stone: 30 },
    power: 28,
    upkeep: { food: 1, gold: 2 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  fa18: {
    name: "F/A-18 Super Hornet",
    cost: { gold: 170, tech: 52, stone: 36 },
    power: 31,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  a10: {
    name: "A-10 Thunderbolt II",
    cost: { gold: 140, tech: 40, stone: 25 },
    power: 27,
    upkeep: { food: 1, gold: 2 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  b2: {
    name: "B-2 Spirit",
    cost: { gold: 260, tech: 95, stone: 55 },
    power: 45,
    upkeep: { food: 1, gold: 5 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  b1: {
    name: "B-1 Lancer",
    cost: { gold: 240, tech: 85, stone: 50 },
    power: 42,
    upkeep: { food: 1, gold: 5 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  b52: {
    name: "B-52 Stratofortress",
    cost: { gold: 230, tech: 80, stone: 45 },
    power: 40,
    upkeep: { food: 1, gold: 4 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  mq9: {
    name: "MQ-9 Reaper",
    cost: { gold: 130, tech: 50, stone: 20 },
    power: 24,
    upkeep: { food: 1, gold: 2 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  kc46: {
    name: "KC-46 Pegasus",
    cost: { gold: 150, tech: 45, stone: 25 },
    power: 20,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  e3: {
    name: "E-3 AWACS",
    cost: { gold: 170, tech: 65, stone: 30 },
    power: 22,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  mirage: {
    name: "Mirage 2000",
    cost: { gold: 160, tech: 50, stone: 34 },
    power: 29,
    upkeep: { food: 1, gold: 2 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  j20: {
    name: "Chengdu J-20",
    cost: { gold: 210, tech: 75, stone: 44 },
    power: 37,
    upkeep: { food: 1, gold: 4 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  j10: {
    name: "Chengdu J-10",
    cost: { gold: 150, tech: 48, stone: 30 },
    power: 27,
    upkeep: { food: 1, gold: 2 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  f15: {
    name: "F-15 Eagle",
    cost: { gold: 180, tech: 60, stone: 40 },
    power: 33,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  f117: {
    name: "F-117 Nighthawk",
    cost: { gold: 170, tech: 65, stone: 35 },
    power: 28,
    upkeep: { food: 1, gold: 3 },
    requires: ["airbase", "hangar"],
    category: "air",
  },
  // Wojska lądowe (10)
  abrams: {
    name: "M1 Abrams",
    cost: { gold: 140, stone: 60, tech: 25 },
    power: 28,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  leopard2: {
    name: "Leopard 2A7",
    cost: { gold: 135, stone: 55, tech: 24 },
    power: 27,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  t90: {
    name: "T-90",
    cost: { gold: 120, stone: 50, tech: 22 },
    power: 25,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  k2: {
    name: "K2 Black Panther",
    cost: { gold: 145, stone: 60, tech: 26 },
    power: 29,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  leclerc: {
    name: "AMX-56 Leclerc",
    cost: { gold: 130, stone: 55, tech: 23 },
    power: 26,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  challenger: {
    name: "Challenger 2",
    cost: { gold: 130, stone: 56, tech: 23 },
    power: 26,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  merkava: {
    name: "Merkava Mk IV",
    cost: { gold: 125, stone: 52, tech: 22 },
    power: 25,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  type10: {
    name: "Type 10",
    cost: { gold: 120, stone: 50, tech: 22 },
    power: 24,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  ariete: {
    name: "C1 Ariete",
    cost: { gold: 118, stone: 48, tech: 21 },
    power: 23,
    upkeep: { food: 2, gold: 1 },
    requires: ["barracks"],
    category: "land",
  },
  altay: {
    name: "Altay",
    cost: { gold: 125, stone: 52, tech: 22 },
    power: 25,
    upkeep: { food: 2, gold: 2 },
    requires: ["barracks"],
    category: "land",
  },
  // Marynarka (10)
  destroyer: {
    name: "Niszczyciel rakietowy",
    cost: { gold: 190, wood: 70, tech: 35 },
    power: 34,
    upkeep: { food: 1, gold: 3 },
    requires: ["shipyard"],
    category: "sea",
  },
  frigate: {
    name: "Fregata wielozadaniowa",
    cost: { gold: 160, wood: 60, tech: 30 },
    power: 30,
    upkeep: { food: 1, gold: 2 },
    requires: ["shipyard"],
    category: "sea",
  },
  corvette: {
    name: "Korweta stealth",
    cost: { gold: 140, wood: 55, tech: 28 },
    power: 28,
    upkeep: { food: 1, gold: 2 },
    requires: ["shipyard"],
    category: "sea",
  },
  cruiser: {
    name: "Krążownik rakietowy",
    cost: { gold: 210, wood: 80, tech: 40 },
    power: 38,
    upkeep: { food: 1, gold: 4 },
    requires: ["shipyard"],
    category: "sea",
  },
  carrier: {
    name: "Lotniskowiec",
    cost: { gold: 260, wood: 90, tech: 50 },
    power: 42,
    upkeep: { food: 1, gold: 5 },
    requires: ["shipyard"],
    category: "sea",
  },
  landingShip: {
    name: "Okręt desantowy",
    cost: { gold: 150, wood: 65, tech: 30 },
    power: 26,
    upkeep: { food: 1, gold: 2 },
    requires: ["shipyard"],
    category: "sea",
  },
  missileBoat: {
    name: "Kutry rakietowe",
    cost: { gold: 120, wood: 50, tech: 24 },
    power: 22,
    upkeep: { food: 1, gold: 1 },
    requires: ["shipyard"],
    category: "sea",
  },
  patrolShip: {
    name: "Okręt patrolowy",
    cost: { gold: 110, wood: 45, tech: 20 },
    power: 20,
    upkeep: { food: 1, gold: 1 },
    requires: ["shipyard"],
    category: "sea",
  },
  submarine: {
    name: "Łódź podwodna",
    cost: { gold: 180, wood: 60, tech: 38 },
    power: 32,
    upkeep: { food: 1, gold: 3 },
    requires: ["shipyard"],
    category: "sea",
  },
  attackSub: {
    name: "Atomowa łódź podwodna",
    cost: { gold: 220, wood: 70, tech: 45 },
    power: 36,
    upkeep: { food: 1, gold: 4 },
    requires: ["shipyard"],
    category: "sea",
  },
};

const ENEMIES = [
  { name: "Federacja Arktyczna", level: 1, specialty: "lotnictwo" },
  { name: "Konsorcjum Kobaltowe", level: 2, specialty: "rakiety" },
  { name: "Sojusz Wybrzeża", level: 3, specialty: "flota" },
];

const ENEMY_RAIDS = [
  { type: "air", name: "Szwadron F-16", power: 95, stealth: false },
  { type: "air", name: "Eskadra F-35", power: 130, stealth: true },
  { type: "land", name: "Brygada pancerna", power: 120, stealth: false },
  { type: "sea", name: "Grupa niszczycieli", power: 140, stealth: false },
];

const CITY_TEMPLATES = [
  { id: "capital", name: "Stolica Koronna", trait: "Główne centrum dowodzenia" },
  { id: "harbor", name: "Port Zachodni", trait: "Dostęp do floty" },
  { id: "frontier", name: "Twierdza Północna", trait: "Tarcza granic" },
];

const MAP_TERRAIN = [
  "water water land land land mountain land water",
  "water land land land mountain land land water",
  "water land land mountain land land land water",
  "water land mountain land land land water water",
  "water land land land land mountain land water",
  "water water land land land land land water",
];

const STORAGE_PREFIX = "koronna-liga-v2";

const ui = {
  loginPanel: document.querySelector("#login-panel"),
  loginForm: document.querySelector("#login-form"),
  dashboard: document.querySelector("#dashboard"),
  accountPanel: document.querySelector("#account-panel"),
  accountName: document.querySelector("#account-name"),
  kingdomName: document.querySelector("#kingdom-name"),
  dayCount: document.querySelector("#day-count"),
  morale: document.querySelector("#morale"),
  population: document.querySelector("#population"),
  resourceGrid: document.querySelector("#resource-grid"),
  buildingList: document.querySelector("#building-list"),
  unitList: document.querySelector("#unit-list"),
  armyOverview: document.querySelector("#army-overview"),
  enemyList: document.querySelector("#enemy-list"),
  eventLog: document.querySelector("#event-log"),
  saveState: document.querySelector("#save-state"),
  logoutBtn: document.querySelector("#logout-btn"),
  resetBtn: document.querySelector("#reset-btn"),
  cityList: document.querySelector("#city-list"),
  citySummary: document.querySelector("#city-summary"),
  cityAssets: document.querySelector("#city-assets"),
  radarList: document.querySelector("#radar-list"),
  defenseList: document.querySelector("#defense-list"),
  scanBtn: document.querySelector("#scan-btn"),
  patrolList: document.querySelector("#patrol-list"),
  minimap: document.querySelector("#minimap"),
};

let state = null;
let saveTimer = null;

const createCityState = (template) => ({
  id: template.id,
  name: template.name,
  trait: template.trait,
  integrity: 100,
  buildings: {
    townhall: template.id === "capital" ? 2 : 1,
    farm: 1,
    lumber: 1,
    quarry: 1,
    barracks: template.id === "frontier" ? 1 : 0,
    academy: template.id === "capital" ? 1 : 0,
    wall: template.id === "frontier" ? 1 : 0,
    airbase: template.id === "capital" ? 1 : 0,
    hangar: template.id === "capital" ? 1 : 0,
    shipyard: template.id === "harbor" ? 1 : 0,
    missileSilo: 0,
    radarStation: 1,
  },
  defenses: {
    aaShield: 0,
    interceptor: 3,
    droneNet: template.id === "frontier" ? 1 : 0,
    coastalMissiles: template.id === "harbor" ? 1 : 0,
  },
  army: Object.fromEntries(Object.keys(UNITS).map((key) => [key, 0])),
});

const defaultState = (account, kingdom) => {
  const cities = CITY_TEMPLATES.map((template) => createCityState(template));
  cities[0].army.f16 = 2;
  cities[0].army.abrams = 2;
  cities[1].army.destroyer = 1;
  cities[2].army.leopard2 = 2;
  return {
    account,
    kingdom,
    day: 1,
    morale: 100,
    population: 65,
    resources: { gold: 900, food: 520, wood: 320, stone: 260, tech: 200 },
    cities,
    currentCityId: cities[0].id,
    upgrades: Object.fromEntries(Object.keys(UNITS).map((key) => [key, 0])),
    log: ["Rada dowódców: nowa kampania została rozpoczęta."],
    radarContacts: [],
    patrols: [],
    lastTick: Date.now(),
    nextRaidAt: Date.now() + 14000,
    nextScanAt: Date.now() + 4000,
  };
};

const normalizeState = (loadedState, account, kingdom) => {
  if (!loadedState) return defaultState(account, kingdom);
  const fresh = defaultState(account, kingdom);
  const merged = {
    ...fresh,
    ...loadedState,
    account,
    kingdom,
    resources: { ...fresh.resources, ...(loadedState.resources || {}) },
    upgrades: { ...fresh.upgrades, ...(loadedState.upgrades || {}) },
  };

  if (!Array.isArray(loadedState.cities) || loadedState.cities.length === 0) {
    merged.cities = fresh.cities;
  } else {
    merged.cities = loadedState.cities.map((city, index) => {
      const template =
        CITY_TEMPLATES.find((item) => item.id === city.id) ||
        CITY_TEMPLATES[index] ||
        CITY_TEMPLATES[0];
      const baseline = createCityState(template);
      return {
        ...baseline,
        ...city,
        integrity: typeof city.integrity === "number" ? city.integrity : 100,
        buildings: { ...baseline.buildings, ...(city.buildings || {}) },
        defenses: { ...baseline.defenses, ...(city.defenses || {}) },
        army: { ...baseline.army, ...(city.army || {}) },
      };
    });
  }

  if (!merged.currentCityId || !merged.cities.some((city) => city.id === merged.currentCityId)) {
    merged.currentCityId = merged.cities[0]?.id;
  }

  merged.radarContacts = Array.isArray(loadedState.radarContacts) ? loadedState.radarContacts : [];
  merged.patrols = Array.isArray(loadedState.patrols) ? loadedState.patrols : [];
  merged.nextRaidAt = loadedState.nextRaidAt || Date.now() + 14000;
  merged.nextScanAt = loadedState.nextScanAt || Date.now() + 4000;

  return merged;
};

const formatNumber = (value) => Math.round(value).toLocaleString("pl-PL");

const storageKey = (account) => `${STORAGE_PREFIX}:${account}`;

const loadState = (account) => {
  const raw = localStorage.getItem(storageKey(account));
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveState = () => {
  if (!state?.account) return;
  localStorage.setItem(storageKey(state.account), JSON.stringify(state));
  ui.saveState.textContent = `Stan zapisany: ${new Date().toLocaleTimeString("pl-PL")}`;
};

const scheduleSave = () => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 500);
};

const getCurrentCity = () => state.cities.find((city) => city.id === state.currentCityId);

const updateResourceGrid = () => {
  ui.resourceGrid.innerHTML = "";
  RESOURCE_CONFIG.forEach((resource) => {
    const card = document.createElement("div");
    card.className = "resource-card";
    card.innerHTML = `
      <span class="icon">${resource.icon}</span>
      <div>
        <p class="label">${resource.label}</p>
        <p class="value">${formatNumber(state.resources[resource.key])}</p>
      </div>
    `;
    ui.resourceGrid.appendChild(card);
  });
};

const calculateBuildingCost = (key, city) => {
  const level = city.buildings[key];
  const multiplier = 1 + level * 0.35;
  const cost = {};
  Object.entries(BUILDINGS[key].baseCost).forEach(([resource, amount]) => {
    cost[resource] = Math.ceil(amount * multiplier);
  });
  return cost;
};

const calculateDefenseCost = (key, city) => {
  const level = city.defenses[key];
  const multiplier = 1 + level * 0.25;
  const cost = {};
  Object.entries(DEFENSE_SYSTEMS[key].baseCost).forEach(([resource, amount]) => {
    cost[resource] = Math.ceil(amount * multiplier);
  });
  return cost;
};

const canAfford = (cost) =>
  Object.entries(cost).every(([resource, amount]) => state.resources[resource] >= amount);

const applyCost = (cost) => {
  Object.entries(cost).forEach(([resource, amount]) => {
    state.resources[resource] -= amount;
  });
};

const addLog = (message) => {
  state.log.unshift(message);
  state.log = state.log.slice(0, 10);
};

const getUnitRequirementText = (unit) =>
  unit.requires.map((key) => BUILDINGS[key].name).join(", ");

const cityHasRequirements = (city, unit) =>
  unit.requires.every((key) => city.buildings[key] > 0);

const updateCityList = () => {
  ui.cityList.innerHTML = "";
  state.cities.forEach((city) => {
    const button = document.createElement("button");
    button.className = "city-pill";
    if (city.id === state.currentCityId) {
      button.classList.add("active");
    }
    const airUnits = Object.keys(UNITS).filter((key) => UNITS[key].category === "air")
      .reduce((sum, key) => sum + city.army[key], 0);
    const armorUnits = Object.keys(UNITS).filter((key) => UNITS[key].category === "land")
      .reduce((sum, key) => sum + city.army[key], 0);
    const seaUnits = Object.keys(UNITS).filter((key) => UNITS[key].category === "sea")
      .reduce((sum, key) => sum + city.army[key], 0);
    button.innerHTML = `
      <strong>${city.name}</strong>
      <span>${city.trait}</span>
      <span class="city-meta">✈️ ${airUnits} • 🪖 ${armorUnits} • 🚢 ${seaUnits}</span>
    `;
    button.addEventListener("click", () => {
      state.currentCityId = city.id;
      render();
    });
    ui.cityList.appendChild(button);
  });
};

const updateCitySummary = () => {
  const city = getCurrentCity();
  if (!city) return;
  ui.citySummary.innerHTML = `
    <div>
      <h3>${city.name}</h3>
      <p class="meta">${city.trait}</p>
    </div>
    <div class="city-summary-grid">
      <div>
        <p class="label">Lotniska</p>
        <p class="value">${city.buildings.airbase}</p>
      </div>
      <div>
        <p class="label">Hangary</p>
        <p class="value">${city.buildings.hangar}</p>
      </div>
      <div>
        <p class="label">Porty</p>
        <p class="value">${city.buildings.shipyard}</p>
      </div>
      <div>
        <p class="label">Radary</p>
        <p class="value">${city.buildings.radarStation}</p>
      </div>
      <div>
        <p class="label">Integralność</p>
        <p class="value">${city.integrity}%</p>
      </div>
    </div>
  `;
};

const updateCityAssets = () => {
  const city = getCurrentCity();
  if (!city) return;
  const buildingList = Object.entries(city.buildings)
    .map(([key, level]) => `<li>${BUILDINGS[key].name}: <strong>${level}</strong></li>`)
    .join("");
  const defenseList = Object.entries(city.defenses)
    .map(([key, level]) => `<li>${DEFENSE_SYSTEMS[key].name}: <strong>${level}</strong></li>`)
    .join("");
  const unitList = Object.entries(city.army)
    .map(([key, count]) => `<li>${UNITS[key].name}: <strong>${count}</strong></li>`)
    .join("");

  ui.cityAssets.innerHTML = `
    <div>
      <h4>Infrastruktura</h4>
      <ul>${buildingList}</ul>
    </div>
    <div>
      <h4>Obrona</h4>
      <ul>${defenseList}</ul>
    </div>
    <div>
      <h4>Siły w mieście</h4>
      <ul>${unitList}</ul>
    </div>
  `;
};

const updatePatrolList = () => {
  ui.patrolList.innerHTML = "";
  if (!state.patrols.length) {
    ui.patrolList.innerHTML = "<li>Brak aktywnych patroli.</li>";
    return;
  }
  state.patrols.forEach((patrol) => {
    const city = state.cities.find((item) => item.id === patrol.cityId);
    const item = document.createElement("li");
    item.innerHTML = `
      <span>${UNITS[patrol.unitKey].name} (${UNIT_CATEGORIES[patrol.type]}) • ${city?.name ?? "—"}</span>
    `;
    const recallButton = document.createElement("button");
    recallButton.textContent = "Wycofaj";
    recallButton.className = "secondary";
    recallButton.addEventListener("click", () => recallPatrol(patrol.id));
    item.appendChild(recallButton);
    ui.patrolList.appendChild(item);
  });
};

const recallPatrol = (patrolId) => {
  const patrol = state.patrols.find((item) => item.id === patrolId);
  if (!patrol) return;
  const city = state.cities.find((item) => item.id === patrol.cityId);
  if (city) {
    city.army[patrol.unitKey] += 1;
  }
  state.patrols = state.patrols.filter((item) => item.id !== patrolId);
  addLog(`Patrol ${UNITS[patrol.unitKey].name} wraca do ${city?.name ?? "bazy"}.`);
  scheduleSave();
  render();
};

const updateMinimap = () => {
  ui.minimap.innerHTML = "";
  const cityPositions = [
    { id: "capital", index: 10 },
    { id: "harbor", index: 14 },
    { id: "frontier", index: 29 },
  ];
  const tiles = MAP_TERRAIN.join(" ").split(" ");
  tiles.forEach((type, index) => {
    const tile = document.createElement("div");
    tile.className = `tile ${type}`;
    const cityMarker = cityPositions.find((item) => item.index === index);
    if (cityMarker && state.cities.some((city) => city.id === cityMarker.id)) {
      tile.classList.add("city");
    }
    ui.minimap.appendChild(tile);
  });
};

const updateBuildingList = () => {
  ui.buildingList.innerHTML = "";
  const city = getCurrentCity();
  if (!city) return;
  Object.entries(BUILDINGS).forEach(([key, building]) => {
    const level = city.buildings[key];
    const cost = calculateBuildingCost(key, city);
    const costText = Object.entries(cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ");
    const button = document.createElement("button");
    button.textContent = level === 0 ? "Zbuduj" : "Ulepsz";
    button.disabled = !canAfford(cost);
    button.addEventListener("click", () => {
      if (!canAfford(cost)) return;
      applyCost(cost);
      city.buildings[key] += 1;
      addLog(`${building.name} w mieście ${city.name} osiąga poziom ${city.buildings[key]}.`);
      if (key === "wall") {
        state.morale = Math.min(140, state.morale + 6);
      }
      scheduleSave();
      render();
    });

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <h3>${building.name}</h3>
        <p>${building.description}</p>
        <p class="meta">Poziom: ${level}</p>
        <p class="meta">Koszt: ${costText}</p>
      </div>
    `;
    card.appendChild(button);
    ui.buildingList.appendChild(card);
  });
};

const updateDefenseList = () => {
  ui.defenseList.innerHTML = "";
  const city = getCurrentCity();
  if (!city) return;
  Object.entries(DEFENSE_SYSTEMS).forEach(([key, defense]) => {
    const level = city.defenses[key];
    const cost = calculateDefenseCost(key, city);
    const costText = Object.entries(cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ");
    const button = document.createElement("button");
    button.textContent = key === "interceptor" ? "Uzupełnij" : "Zbuduj";
    button.disabled = !canAfford(cost);
    button.addEventListener("click", () => {
      if (!canAfford(cost)) return;
      applyCost(cost);
      city.defenses[key] += 1;
      addLog(`${defense.name} w mieście ${city.name}: poziom ${city.defenses[key]}.`);
      scheduleSave();
      render();
    });

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <h3>${defense.name}</h3>
        <p>${defense.description}</p>
        <p class="meta">Stan: ${level}</p>
        <p class="meta">Koszt: ${costText}</p>
      </div>
    `;
    card.appendChild(button);
    ui.defenseList.appendChild(card);
  });
};

const unitPower = (unitKey) => UNITS[unitKey].power + state.upgrades[unitKey] * 3;

const calculateCityPower = (city) =>
  Object.keys(UNITS).reduce((sum, key) => sum + city.army[key] * unitPower(key), 0);

const calculateDefensePower = (city) =>
  Object.entries(DEFENSE_SYSTEMS).reduce(
    (sum, [key, defense]) => sum + city.defenses[key] * defense.power,
    0,
  );

const calculateUpkeep = () => {
  const total = { food: 0, gold: 0 };
  state.cities.forEach((city) => {
    Object.entries(UNITS).forEach(([key, unit]) => {
      total.food += city.army[key] * (unit.upkeep.food || 0);
      total.gold += city.army[key] * (unit.upkeep.gold || 0);
    });
  });
  state.patrols.forEach((patrol) => {
    const unit = UNITS[patrol.unitKey];
    total.food += unit.upkeep.food || 0;
    total.gold += unit.upkeep.gold || 0;
  });
  return total;
};

const updateArmyOverview = () => {
  const totalPower = state.cities.reduce((sum, city) => sum + calculateCityPower(city), 0);
  const defensePower = state.cities.reduce((sum, city) => sum + calculateDefensePower(city), 0);
  const upkeep = calculateUpkeep();
  ui.armyOverview.innerHTML = `
    <div>
      <p class="label">Siła bojowa</p>
      <p class="value">${formatNumber(totalPower)}</p>
    </div>
    <div>
      <p class="label">Tarcza obrony</p>
      <p class="value">${formatNumber(defensePower)}</p>
    </div>
    <div>
      <p class="label">Utrzymanie</p>
      <p class="value">${formatNumber(upkeep.food)} żywności / ${formatNumber(
    upkeep.gold,
  )} złota</p>
    </div>
  `;
};

const startPatrol = (city, unitKey) => {
  if (city.army[unitKey] <= 0) return;
  city.army[unitKey] -= 1;
  state.patrols.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    cityId: city.id,
    unitKey,
    type: UNITS[unitKey].category,
    power: unitPower(unitKey),
  });
  addLog(`Patrol ${UNITS[unitKey].name} wystartował z ${city.name}.`);
  scheduleSave();
  render();
};

const updateUnitList = () => {
  ui.unitList.innerHTML = "";
  const city = getCurrentCity();
  if (!city) return;
  Object.entries(UNITS).forEach(([key, unit]) => {
    const costText = Object.entries(unit.cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ");
    const recruitButton = document.createElement("button");
    recruitButton.textContent = "Rekrutuj";
    recruitButton.disabled =
      !cityHasRequirements(city, unit) || !canAfford(unit.cost) || state.population <= 0;
    recruitButton.addEventListener("click", () => {
      if (!canAfford(unit.cost) || state.population <= 0) return;
      applyCost(unit.cost);
      city.army[key] += 1;
      state.population -= 1;
      addLog(`${unit.name} dołącza do garnizonu w ${city.name}.`);
      scheduleSave();
      render();
    });

    const patrolButton = document.createElement("button");
    patrolButton.textContent = "Patroluj";
    patrolButton.className = "secondary";
    patrolButton.disabled = city.army[key] <= 0;
    patrolButton.addEventListener("click", () => startPatrol(city, key));

    const upgradeCost = {
      gold: 90 + state.upgrades[key] * 40,
      tech: 30 + state.upgrades[key] * 20,
      stone: 20 + state.upgrades[key] * 10,
    };
    const upgradeButton = document.createElement("button");
    upgradeButton.textContent = "Ulepsz";
    upgradeButton.disabled =
      !state.cities.some((cityItem) => cityItem.buildings.academy) ||
      !canAfford(upgradeCost);
    upgradeButton.addEventListener("click", () => {
      if (!canAfford(upgradeCost)) return;
      applyCost(upgradeCost);
      state.upgrades[key] += 1;
      addLog(`${unit.name} zyskują poziom ulepszeń ${state.upgrades[key]}.`);
      scheduleSave();
      render();
    });

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <h3>${unit.name}</h3>
        <p class="meta">Kategoria: ${UNIT_CATEGORIES[unit.category]}</p>
        <p class="meta">Stan w mieście: ${city.army[key]}</p>
        <p class="meta">Siła jednostki: ${unitPower(key)}</p>
        <p class="meta">Wymaga: ${getUnitRequirementText(unit)}</p>
        <p class="meta">Koszt rekrutacji: ${costText}</p>
        <p class="meta">Utrzymanie: ${unit.upkeep.food || 0} żywności / ${
      unit.upkeep.gold || 0
    } złota</p>
        <p class="meta">Ulepszenie: ${Object.entries(upgradeCost)
          .map(([resource, amount]) => `${amount} ${resource}`)
          .join(", ")}</p>
      </div>
    `;
    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(recruitButton, patrolButton, upgradeButton);
    card.appendChild(actions);
    ui.unitList.appendChild(card);
  });
};

const updateEnemyList = () => {
  ui.enemyList.innerHTML = "";
  ENEMIES.forEach((enemy) => {
    const enemyPower = (enemy.level + state.day * 0.2) * 70;
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <h3>${enemy.name}</h3>
        <p class="meta">Poziom: ${enemy.level}</p>
        <p class="meta">Specjalizacja: ${enemy.specialty}</p>
        <p class="meta">Szacowana siła: ${Math.round(enemyPower)}</p>
      </div>
    `;
    const button = document.createElement("button");
    button.textContent = "Atakuj";
    button.addEventListener("click", () => resolveBattle(enemyPower, enemy.name));
    card.appendChild(button);
    ui.enemyList.appendChild(card);
  });
};

const resolveBattle = (enemyPower, enemyName) => {
  const ownPower = state.cities.reduce((sum, city) => sum + calculateCityPower(city), 0);
  if (ownPower <= 0) {
    addLog("Nie masz armii, by wyruszyć na wojnę.");
    render();
    return;
  }
  const randomFactor = 0.85 + Math.random() * 0.3;
  const defenseBoost = state.cities.reduce(
    (sum, city) => sum + city.buildings.wall * 18 + calculateDefensePower(city) * 0.2,
    0,
  );
  const finalPower = ownPower * randomFactor + defenseBoost;
  const victory = finalPower >= enemyPower;
  if (victory) {
    const loot = {
      gold: Math.round(120 + enemyPower * 0.4),
      food: Math.round(80 + enemyPower * 0.2),
      wood: Math.round(60 + enemyPower * 0.2),
      stone: Math.round(50 + enemyPower * 0.15),
      tech: Math.round(30 + enemyPower * 0.1),
    };
    Object.entries(loot).forEach(([resource, amount]) => {
      state.resources[resource] += amount;
    });
    state.morale = Math.min(160, state.morale + 8);
    addLog(`Zwycięstwo nad ${enemyName}! Zdobywasz łupy i chwałę.`);
  } else {
    state.morale = Math.max(40, state.morale - 12);
    addLog(`Porażka pod ${enemyName}. Odbuduj siły i spróbuj ponownie.`);
  }
  scheduleSave();
  render();
};

const updateLog = () => {
  ui.eventLog.innerHTML = "";
  state.log.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    ui.eventLog.appendChild(item);
  });
};

const radarDetectionChance = (city, contact) => {
  const radarLevel = city.buildings.radarStation + city.defenses.droneNet;
  const baseChance = 0.35 + radarLevel * 0.12;
  const stealthPenalty = contact.stealth ? 0.45 : 0;
  return Math.min(0.95, Math.max(0.05, baseChance - stealthPenalty));
};

const attemptRadarScan = () => {
  let detectedCount = 0;
  state.radarContacts.forEach((contact) => {
    if (contact.detected) return;
    const city = state.cities.find((item) => item.id === contact.cityId);
    if (!city) return;
    if (Math.random() < radarDetectionChance(city, contact)) {
      contact.detected = true;
      detectedCount += 1;
    }
  });
  if (detectedCount > 0) {
    addLog(`Radar: wykryto ${detectedCount} nowe cele.`);
  }
  scheduleSave();
  render();
};

const autoRadarScan = () => {
  if (Date.now() < state.nextScanAt) return;
  attemptRadarScan();
  state.nextScanAt = Date.now() + 4500;
};

const dispatchPatrol = (contact) => {
  const patrolIndex = state.patrols.findIndex((patrol) => patrol.type === contact.type);
  if (patrolIndex === -1) {
    addLog("Brak odpowiedniego patrolu, aby przechwycić cel.");
    return;
  }
  const patrol = state.patrols[patrolIndex];
  const patrolPower = patrol.power * (0.85 + Math.random() * 0.3);
  if (patrolPower >= contact.power) {
    addLog(`Patrol ${UNITS[patrol.unitKey].name} zneutralizował ${contact.name}.`);
    state.radarContacts = state.radarContacts.filter((item) => item.id !== contact.id);
  } else {
    addLog(`Patrol ${UNITS[patrol.unitKey].name} został zniszczony przez ${contact.name}.`);
  }
  state.patrols.splice(patrolIndex, 1);
  scheduleSave();
  render();
};

const updateRadarList = () => {
  ui.radarList.innerHTML = "";
  if (!state.radarContacts.length) {
    ui.radarList.innerHTML = "<li class=\"empty\">Brak aktywnych kontaktów.</li>";
    return;
  }
  state.radarContacts.forEach((contact) => {
    const city = state.cities.find((item) => item.id === contact.cityId);
    const item = document.createElement("li");
    item.className = contact.detected ? "contact" : "contact undetected";
    const etaText = contact.eta > 0 ? `${contact.eta}s` : "tuż nad miastem";
    const status = contact.detected ? "Wykryty" : "Niewykryty";
    item.innerHTML = `
      <div>
        <strong>${contact.name}</strong>
        <p class="meta">${status} • celuje w ${city?.name ?? "nieznane"} • ETA: ${etaText}</p>
      </div>
    `;
    if (contact.detected) {
      const action = document.createElement("button");
      action.textContent = "Wyślij patrol";
      action.className = "secondary";
      action.disabled = !state.patrols.some((patrol) => patrol.type === contact.type);
      action.addEventListener("click", () => dispatchPatrol(contact));
      item.appendChild(action);
    }
    ui.radarList.appendChild(item);
  });
};

const scheduleRaid = () => {
  if (Date.now() < state.nextRaidAt || state.cities.length === 0) return;
  const raid = ENEMY_RAIDS[Math.floor(Math.random() * ENEMY_RAIDS.length)];
  const target = state.cities[Math.floor(Math.random() * state.cities.length)];
  const contact = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: raid.name,
    type: raid.type,
    power: raid.power + state.day * 2,
    stealth: raid.stealth,
    cityId: target.id,
    eta: 18,
    detected: false,
  };
  state.radarContacts.push(contact);
  addLog(`Alarm: wrogie siły kierują się na ${target.name}.`);
  state.nextRaidAt = Date.now() + 15000 + Math.random() * 8000;
};

const loseCity = (city) => {
  addLog(`${city.name} zostało utracone. Musisz odbudować siły.`);
  state.cities = state.cities.filter((item) => item.id !== city.id);
  state.patrols = state.patrols.filter((patrol) => patrol.cityId !== city.id);
  state.radarContacts = state.radarContacts.filter((contact) => contact.cityId !== city.id);
  if (!state.cities.length) {
    addLog("Twoje państwo upadło. Rozpocznij nową kampanię.");
  } else if (!state.cities.some((item) => item.id === state.currentCityId)) {
    state.currentCityId = state.cities[0].id;
  }
};

const resolveRaids = () => {
  state.radarContacts.forEach((contact) => {
    if (contact.eta > 0) {
      contact.eta = Math.max(0, contact.eta - 1);
    }
  });

  const resolved = state.radarContacts.filter((contact) => contact.eta === 0);
  if (!resolved.length) return;

  resolved.forEach((contact) => {
    const city = state.cities.find((item) => item.id === contact.cityId);
    if (!city) return;
    const cityPower = calculateCityPower(city) + calculateDefensePower(city) + city.buildings.wall * 18;
    const randomness = 0.8 + Math.random() * 0.4;
    const defenseScore = cityPower * randomness;
    if (defenseScore >= contact.power) {
      addLog(`${city.name} odpiera atak ${contact.name}.`);
      state.resources.tech += 6;
      state.morale = Math.min(160, state.morale + 4);
    } else {
      const damage = Math.min(45, Math.round(contact.power / 6));
      city.integrity = Math.max(0, city.integrity - damage);
      addLog(`${city.name} ucierpiało po ataku ${contact.name}. Integralność: ${city.integrity}%.`);
      state.resources.gold = Math.max(0, state.resources.gold - 70);
      state.resources.food = Math.max(0, state.resources.food - 40);
      state.morale = Math.max(30, state.morale - 8);
      if (city.integrity <= 0) {
        loseCity(city);
      }
    }
  });

  state.radarContacts = state.radarContacts.filter((contact) => contact.eta > 0);
};

const tick = () => {
  const now = Date.now();
  const elapsed = Math.max(1, Math.floor((now - state.lastTick) / 1000));
  if (elapsed <= 0) return;

  state.cities.forEach((city) => {
    Object.entries(BUILDINGS).forEach(([key, building]) => {
      const level = city.buildings[key];
      Object.entries(building.production).forEach(([resource, amount]) => {
        state.resources[resource] += amount * level * elapsed;
      });
    });
  });

  const upkeep = calculateUpkeep();
  state.resources.food -= upkeep.food * elapsed;
  state.resources.gold -= upkeep.gold * elapsed;
  if (state.resources.food < 0) {
    state.morale = Math.max(35, state.morale - 4);
    state.resources.food = 0;
  }
  if (state.resources.gold < 0) {
    state.morale = Math.max(35, state.morale - 3);
    state.resources.gold = 0;
  }

  if (state.resources.food > 140 + state.population * 2) {
    state.population += Math.floor(elapsed / 4) + 1;
  }

  if (elapsed >= 10) {
    state.day += 1;
  }

  scheduleRaid();
  resolveRaids();
  autoRadarScan();

  state.lastTick = now;
  scheduleSave();
  render();
};

const render = () => {
  if (!state) return;
  ui.accountName.textContent = state.account ?? "Brak";
  ui.kingdomName.textContent = state.kingdom ?? "—";
  ui.dayCount.textContent = state.day;
  ui.morale.textContent = `${Math.round(state.morale)}%`;
  ui.population.textContent = formatNumber(state.population);

  updateResourceGrid();
  updateCityList();
  updateCitySummary();
  updateCityAssets();
  updatePatrolList();
  updateMinimap();
  updateBuildingList();
  updateDefenseList();
  updateArmyOverview();
  updateUnitList();
  updateEnemyList();
  updateRadarList();
  updateLog();
};

const setLoggedIn = (loggedIn) => {
  ui.loginPanel.classList.toggle("hidden", loggedIn);
  ui.dashboard.classList.toggle("hidden", !loggedIn);
  ui.accountPanel.classList.toggle("hidden", !loggedIn);
};

const init = () => {
  ui.logoutBtn.addEventListener("click", () => {
    state = null;
    setLoggedIn(false);
  });

  if (ui.resetBtn) {
    ui.resetBtn.addEventListener("click", () => {
      if (!state?.account) return;
      localStorage.removeItem(storageKey(state.account));
      state = defaultState(state.account, state.kingdom);
      state.lastTick = Date.now();
      addLog("Kampania została zresetowana do nowej wersji.");
      scheduleSave();
      render();
    });
  }

  ui.scanBtn.addEventListener("click", () => {
    if (!state) return;
    attemptRadarScan();
  });

  ui.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const account = formData.get("commander").toString().trim();
    const kingdom = formData.get("kingdom").toString().trim();
    if (!account || !kingdom) return;
    state = normalizeState(loadState(account), account, kingdom);
    state.lastTick = Date.now();
    setLoggedIn(true);
    scheduleSave();
    render();
  });

  setLoggedIn(false);
};

init();
setInterval(() => {
  if (state) {
    tick();
  }
}, 1000);
