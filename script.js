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
    description: "Pozwala utrzymać eskadry F-16 i F-35.",
    baseCost: { stone: 160, gold: 140, tech: 40 },
    production: {},
  },
  shipyard: {
    name: "Stocznia obronna",
    description: "Umożliwia budowę nowoczesnych okrętów.",
    baseCost: { wood: 140, stone: 120, gold: 100 },
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
    description: "Wspiera wykrywanie F-35 i ochronę granic.",
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

const UNITS = {
  mechanized: {
    name: "Piechota zmechanizowana",
    cost: { food: 55, gold: 45, tech: 10 },
    power: 14,
    upkeep: { food: 2 },
    requires: "barracks",
  },
  tanks: {
    name: "Czołgi Panther",
    cost: { gold: 120, stone: 60, tech: 25 },
    power: 26,
    upkeep: { food: 2 },
    requires: "barracks",
  },
  artillery: {
    name: "Artyleria rakietowa",
    cost: { gold: 90, wood: 40, tech: 20 },
    power: 22,
    upkeep: { food: 1 },
    requires: "barracks",
  },
  f16: {
    name: "Myśliwce F-16",
    cost: { gold: 160, tech: 50, stone: 40 },
    power: 30,
    upkeep: { food: 1 },
    requires: "airbase",
  },
  f35: {
    name: "Myśliwce F-35 (stealth)",
    cost: { gold: 220, tech: 80, stone: 50 },
    power: 40,
    upkeep: { food: 1 },
    requires: "airbase",
  },
  destroyer: {
    name: "Niszczyciele rakietowe",
    cost: { gold: 190, wood: 70, tech: 35 },
    power: 34,
    upkeep: { food: 1 },
    requires: "shipyard",
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
  { type: "land", name: "Brygada pancerna", power: 110, stealth: false },
  { type: "sea", name: "Grupa niszczycieli", power: 120, stealth: false },
];

const CITY_TEMPLATES = [
  { id: "capital", name: "Stolica Koronna", trait: "Główne centrum dowodzenia" },
  { id: "harbor", name: "Port Zachodni", trait: "Dostęp do floty" },
  { id: "frontier", name: "Twierdza Północna", trait: "Tarcza granic" },
];

const STORAGE_PREFIX = "koronna-liga";

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
  cityList: document.querySelector("#city-list"),
  citySummary: document.querySelector("#city-summary"),
  cityAssets: document.querySelector("#city-assets"),
  radarList: document.querySelector("#radar-list"),
  defenseList: document.querySelector("#defense-list"),
  scanBtn: document.querySelector("#scan-btn"),
};

let state = null;
let saveTimer = null;

const createCityState = (template) => ({
  id: template.id,
  name: template.name,
  trait: template.trait,
  buildings: {
    townhall: template.id === "capital" ? 2 : 1,
    farm: 1,
    lumber: 1,
    quarry: 1,
    barracks: template.id === "frontier" ? 1 : 0,
    academy: template.id === "capital" ? 1 : 0,
    wall: template.id === "frontier" ? 1 : 0,
    airbase: template.id === "capital" ? 1 : 0,
    shipyard: template.id === "harbor" ? 1 : 0,
    missileSilo: 0,
    radarStation: 1,
  },
  defenses: {
    aaShield: 0,
    interceptor: 2,
    droneNet: template.id === "frontier" ? 1 : 0,
    coastalMissiles: template.id === "harbor" ? 1 : 0,
  },
  army: {
    mechanized: template.id === "frontier" ? 3 : 1,
    tanks: template.id === "frontier" ? 2 : 0,
    artillery: 1,
    f16: template.id === "capital" ? 2 : 0,
    f35: 0,
    destroyer: template.id === "harbor" ? 1 : 0,
  },
});

const defaultState = (account, kingdom) => ({
  account,
  kingdom,
  day: 1,
  morale: 100,
  population: 65,
  resources: { gold: 650, food: 420, wood: 260, stone: 210, tech: 120 },
  cities: CITY_TEMPLATES.map((template) => createCityState(template)),
  currentCityId: CITY_TEMPLATES[0].id,
  upgrades: Object.fromEntries(Object.keys(UNITS).map((key) => [key, 0])),
  log: ["Rada dowódców: nowa kampania została rozpoczęta."],
  radarContacts: [],
  lastTick: Date.now(),
  nextRaidAt: Date.now() + 14000,
});

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
      const template = CITY_TEMPLATES.find((item) => item.id === city.id) || CITY_TEMPLATES[index] || CITY_TEMPLATES[0];
      const baseline = createCityState(template);
      return {
        ...baseline,
        ...city,
        buildings: { ...baseline.buildings, ...(city.buildings || {}) },
        defenses: { ...baseline.defenses, ...(city.defenses || {}) },
        army: { ...baseline.army, ...(city.army || {}) },
      };
    });
  }

  if (!merged.currentCityId || !merged.cities.some((city) => city.id === merged.currentCityId)) {
    merged.currentCityId = merged.cities[0].id;
  }

  merged.radarContacts = Array.isArray(loadedState.radarContacts) ? loadedState.radarContacts : [];
  merged.nextRaidAt = loadedState.nextRaidAt || Date.now() + 14000;

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

const updateCityList = () => {
  ui.cityList.innerHTML = "";
  state.cities.forEach((city) => {
    const button = document.createElement("button");
    button.className = "city-pill";
    if (city.id === state.currentCityId) {
      button.classList.add("active");
    }
    const airUnits = city.army.f16 + city.army.f35;
    const armorUnits = city.army.tanks + city.army.mechanized;
    const seaUnits = city.army.destroyer;
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
        <p class="label">Stocznie</p>
        <p class="value">${city.buildings.shipyard}</p>
      </div>
      <div>
        <p class="label">Radary</p>
        <p class="value">${city.buildings.radarStation}</p>
      </div>
    </div>
  `;
};

const updateCityAssets = () => {
  const city = getCurrentCity();
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

const updateBuildingList = () => {
  ui.buildingList.innerHTML = "";
  const city = getCurrentCity();
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

const updateArmyOverview = () => {
  const totalPower = state.cities.reduce((sum, city) => sum + calculateCityPower(city), 0);
  const defensePower = state.cities.reduce((sum, city) => sum + calculateDefensePower(city), 0);
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
  Object.entries(UNITS).forEach(([key, unit]) => {
    const costText = Object.entries(unit.cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ");
    const recruitButton = document.createElement("button");
    recruitButton.textContent = "Rekrutuj";
    recruitButton.disabled =
      !city.buildings[unit.requires] || !canAfford(unit.cost) || state.population <= 0;
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
    upgradeButton.disabled = !state.cities.some((cityItem) => cityItem.buildings.academy) ||
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
        <p class="meta">Stan w mieście: ${city.army[key]}</p>
        <p class="meta">Siła jednostki: ${unitPower(key)}</p>
        <p class="meta">Wymaga: ${BUILDINGS[unit.requires].name}</p>
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

const calculateUpkeep = () =>
  state.cities.reduce(
    (sum, city) =>
      sum +
      Object.entries(UNITS).reduce(
        (unitSum, [key, unit]) => unitSum + city.army[key] * (unit.upkeep.food || 0),
        0,
      ),
    0,
  );

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
  } else {
    addLog("Radar: brak nowych wykryć.");
  }
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
      action.textContent = "Odpal rakietę";
      action.className = "secondary";
      action.disabled = !city || city.defenses.interceptor <= 0 || contact.type !== "air";
      action.addEventListener("click", () => interceptContact(contact, city));
      item.appendChild(action);
    }
    ui.radarList.appendChild(item);
  });
};

const interceptContact = (contact, city) => {
  if (!city || city.defenses.interceptor <= 0) return;
  city.defenses.interceptor -= 1;
  const chance = 0.5 + city.defenses.aaShield * 0.1 + city.buildings.radarStation * 0.05;
  if (Math.random() < chance) {
    addLog(`Rakieta przechwytująca z ${city.name} zestrzeliła ${contact.name}.`);
    state.radarContacts = state.radarContacts.filter((item) => item.id !== contact.id);
  } else {
    addLog(`Atak rakietowy z ${city.name} chybił ${contact.name}.`);
  }
  scheduleSave();
  render();
};

const scheduleRaid = () => {
  if (Date.now() < state.nextRaidAt) return;
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
      addLog(`${city.name} ucierpiało po ataku ${contact.name}. Straty w zasobach.`);
      state.resources.gold = Math.max(0, state.resources.gold - 70);
      state.resources.food = Math.max(0, state.resources.food - 40);
      state.morale = Math.max(30, state.morale - 8);
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
