const RESOURCE_CONFIG = [
  { key: "gold", label: "Złoto", icon: "🪙" },
  { key: "food", label: "Żywność", icon: "🌾" },
  { key: "wood", label: "Drewno", icon: "🪵" },
  { key: "stone", label: "Kamień", icon: "🪨" },
];

const BUILDINGS = {
  townhall: {
    name: "Ratusz",
    description: "Zapewnia złoto i zwiększa rangę państwa.",
    baseCost: { wood: 80, stone: 70, gold: 60 },
    production: { gold: 3 },
  },
  farm: {
    name: "Farma",
    description: "Produkuje żywność i wspiera wzrost populacji.",
    baseCost: { wood: 40, gold: 30 },
    production: { food: 6 },
  },
  lumber: {
    name: "Tartak",
    description: "Stały dopływ drewna na potrzeby rozbudowy.",
    baseCost: { gold: 35, food: 20 },
    production: { wood: 5 },
  },
  quarry: {
    name: "Kamieniołom",
    description: "Wydobycie kamienia i wzmocnienie fortyfikacji.",
    baseCost: { gold: 40, food: 20 },
    production: { stone: 4 },
  },
  barracks: {
    name: "Koszary",
    description: "Odblokowuje rekrutację jednostek.",
    baseCost: { wood: 120, stone: 90, gold: 80 },
    production: {},
  },
  academy: {
    name: "Akademia",
    description: "Umożliwia ulepszanie jednostek.",
    baseCost: { wood: 140, stone: 120, gold: 120 },
    production: {},
  },
  wall: {
    name: "Mury",
    description: "Zwiększa obronę i morale mieszkańców.",
    baseCost: { stone: 160, wood: 60, gold: 50 },
    production: {},
  },
};

const UNITS = {
  infantry: {
    name: "Piechota",
    cost: { food: 40, gold: 30 },
    power: 8,
    upkeep: { food: 1 },
  },
  archers: {
    name: "Łucznicy",
    cost: { food: 30, gold: 45, wood: 20 },
    power: 11,
    upkeep: { food: 1 },
  },
  cavalry: {
    name: "Kawaleria",
    cost: { food: 60, gold: 80, wood: 30 },
    power: 18,
    upkeep: { food: 2 },
  },
};

const ENEMIES = [
  { name: "Liga Stalowych Gór", level: 1 },
  { name: "Księstwo Bursztynu", level: 2 },
  { name: "Związek Rzek", level: 3 },
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
};

let state = null;
let saveTimer = null;

const defaultState = (account, kingdom) => ({
  account,
  kingdom,
  day: 1,
  morale: 100,
  population: 45,
  resources: { gold: 500, food: 380, wood: 220, stone: 160 },
  buildings: {
    townhall: 1,
    farm: 1,
    lumber: 1,
    quarry: 1,
    barracks: 0,
    academy: 0,
    wall: 0,
  },
  army: { infantry: 0, archers: 0, cavalry: 0 },
  upgrades: { infantry: 0, archers: 0, cavalry: 0 },
  log: ["Rada królewska: nowa kampania została rozpoczęta."],
  lastTick: Date.now(),
});

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

const calculateBuildingCost = (key) => {
  const level = state.buildings[key];
  const multiplier = 1 + level * 0.35;
  const cost = {};
  Object.entries(BUILDINGS[key].baseCost).forEach(([resource, amount]) => {
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
  state.log = state.log.slice(0, 8);
};

const updateBuildingList = () => {
  ui.buildingList.innerHTML = "";
  Object.entries(BUILDINGS).forEach(([key, building]) => {
    const level = state.buildings[key];
    const cost = calculateBuildingCost(key);
    const costText = Object.entries(cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ");
    const button = document.createElement("button");
    button.textContent = level === 0 ? "Zbuduj" : "Ulepsz";
    button.disabled = !canAfford(cost);
    button.addEventListener("click", () => {
      if (!canAfford(cost)) return;
      applyCost(cost);
      state.buildings[key] += 1;
      addLog(`${building.name} osiąga poziom ${state.buildings[key]}.`);
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

const unitPower = (unitKey) => UNITS[unitKey].power + state.upgrades[unitKey] * 3;

const updateArmyOverview = () => {
  const totalPower = Object.keys(UNITS).reduce(
    (sum, key) => sum + state.army[key] * unitPower(key),
    0,
  );
  ui.armyOverview.innerHTML = `
    <div>
      <p class="label">Siła bojowa</p>
      <p class="value">${formatNumber(totalPower)}</p>
    </div>
    <div>
      <p class="label">Utrzymanie</p>
      <p class="value">${formatNumber(calculateUpkeep())} żywności/dzień</p>
    </div>
  `;
};

const updateUnitList = () => {
  ui.unitList.innerHTML = "";
  Object.entries(UNITS).forEach(([key, unit]) => {
    const costText = Object.entries(unit.cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ");
    const recruitButton = document.createElement("button");
    recruitButton.textContent = "Rekrutuj";
    recruitButton.disabled =
      !state.buildings.barracks || !canAfford(unit.cost) || state.population <= 0;
    recruitButton.addEventListener("click", () => {
      if (!canAfford(unit.cost) || state.population <= 0) return;
      applyCost(unit.cost);
      state.army[key] += 1;
      state.population -= 1;
      addLog(`${unit.name} dołącza do armii.`);
      scheduleSave();
      render();
    });

    const upgradeCost = {
      gold: 90 + state.upgrades[key] * 40,
      wood: 40 + state.upgrades[key] * 25,
      stone: 30 + state.upgrades[key] * 20,
    };
    const upgradeButton = document.createElement("button");
    upgradeButton.textContent = "Ulepsz";
    upgradeButton.disabled = !state.buildings.academy || !canAfford(upgradeCost);
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
        <p class="meta">Stan: ${state.army[key]}</p>
        <p class="meta">Siła jednostki: ${unitPower(key)}</p>
        <p class="meta">Koszt rekrutacji: ${costText}</p>
        <p class="meta">Ulepszenie: ${Object.entries(upgradeCost)
          .map(([resource, amount]) => `${amount} ${resource}`)
          .join(", ")}</p>
      </div>
    `;
    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(recruitButton, upgradeButton);
    card.appendChild(actions);
    ui.unitList.appendChild(card);
  });
};

const updateEnemyList = () => {
  ui.enemyList.innerHTML = "";
  ENEMIES.forEach((enemy) => {
    const enemyPower = (enemy.level + state.day * 0.2) * 55;
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <h3>${enemy.name}</h3>
        <p class="meta">Poziom: ${enemy.level}</p>
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
  Object.entries(UNITS).reduce(
    (sum, [key, unit]) => sum + state.army[key] * (unit.upkeep.food || 0),
    0,
  );

const resolveBattle = (enemyPower, enemyName) => {
  const ownPower = Object.keys(UNITS).reduce(
    (sum, key) => sum + state.army[key] * unitPower(key),
    0,
  );
  if (ownPower <= 0) {
    addLog("Nie masz armii, by wyruszyć na wojnę.");
    render();
    return;
  }
  const randomFactor = 0.85 + Math.random() * 0.3;
  const finalPower = ownPower * randomFactor + state.buildings.wall * 18;
  const victory = finalPower >= enemyPower;
  if (victory) {
    const loot = {
      gold: Math.round(80 + enemyPower * 0.4),
      food: Math.round(60 + enemyPower * 0.2),
      wood: Math.round(40 + enemyPower * 0.2),
      stone: Math.round(30 + enemyPower * 0.15),
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

const tick = () => {
  const now = Date.now();
  const elapsed = Math.max(1, Math.floor((now - state.lastTick) / 1000));
  if (elapsed <= 0) return;

  Object.entries(BUILDINGS).forEach(([key, building]) => {
    const level = state.buildings[key];
    Object.entries(building.production).forEach(([resource, amount]) => {
      state.resources[resource] += amount * level * elapsed;
    });
  });

  const upkeep = calculateUpkeep() * elapsed;
  state.resources.food -= upkeep;
  if (state.resources.food < 0) {
    state.morale = Math.max(35, state.morale - 4);
    state.resources.food = 0;
  }

  if (state.resources.food > 120 + state.population * 2) {
    state.population += Math.floor(elapsed / 4) + 1;
  }

  if (elapsed >= 10) {
    state.day += 1;
  }

  state.lastTick = now;
  scheduleSave();
  render();
};

const render = () => {
  ui.accountName.textContent = state.account ?? "Brak";
  ui.kingdomName.textContent = state.kingdom ?? "—";
  ui.dayCount.textContent = state.day;
  ui.morale.textContent = `${Math.round(state.morale)}%`;
  ui.population.textContent = formatNumber(state.population);

  updateResourceGrid();
  updateBuildingList();
  updateArmyOverview();
  updateUnitList();
  updateEnemyList();
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

  ui.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const account = formData.get("commander").toString().trim();
    const kingdom = formData.get("kingdom").toString().trim();
    if (!account || !kingdom) return;
    state = loadState(account) || defaultState(account, kingdom);
    state.account = account;
    state.kingdom = kingdom;
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
