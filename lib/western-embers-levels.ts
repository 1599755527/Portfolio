export type LegendItem = {
  color: string;
  label: string;
  description?: string;
  secondaryColor?: string;
  symbol?: 'tile' | 'route' | 'pause' | 'spawn' | 'overlap';
};

export type MapHotspot = {
  x: number;
  y: number;
  title: string;
  description: string;
};

export type Enemy = {
  id: number;
  name: string;
  category: string;
  mechanics: string[];
  phases?: { title: string; mechanics: string[] }[];
};

export type LevelVariant = {
  map?: string;
  routeMap?: string;
  render?: string;
  renderGallery?: string[];
  enemies: Enemy[];
  mapLegend: LegendItem[];
  routeLegend: LegendItem[];
  hotspots?: MapHotspot[];
};

export type WesternEmbersLevel = {
  id: string;
  type: 'main' | 'inst' | 'ex';
  mechanisms: string[];
  challengeEffect?: string;
  content?: LevelVariant;
  normal?: LevelVariant;
  challenge?: LevelVariant;
};

export const mapLegend: LegendItem[] = [
  { color: '#12abe3', label: "Defense Point", description: "The objective to protect. Enemies entering it reduce stage life points." },
  { color: '#ff1010', label: "Enemy Entry", description: "The location where enemies appear or enter the battlefield." },
  { color: '#aaaaaa', label: "Deployable Ground", description: "Supports ground operators. Ground units can move across it." },
  { color: '#879db7', label: "Non-Deployable Ground", description: "Operators cannot deploy here, but enemies and mobile units can cross." },
  { color: '#b8d4eb', label: "Elevated Tile", description: "Supports ranged operators. Ground enemies normally cannot enter." },
  { color: '#050505', label: "Blocked Tile", description: "Neither deployable nor traversable by enemies or mobile units." },
  { color: 'transparent', label: "Teleport Tile", description: "Units teleport to the corresponding location in the arrow's direction." },
  { color: '#ffbd00', label: "Originium Deposit", description: "Linked to both sides' SP systems and can provide operator buffs." },
  { color: '#bfdca9', label: "Mine Cart / Track", description: "Carts follow fixed tracks. Certain enemies can ride them." },
  { color: '#f2b8f3', label: "Supply Point", description: "Passing enemies or beasts can receive buffs." },
  { color: '#ed5af5', label: "Supply Point (Elevated)", description: "A supporting supply tile. Enemies normally cannot cross it; crossing grants no effect." },
  { color: '#945bc8', label: "Pit", description: "Cannot be deployed on or crossed. Enemies entering it fall." },
];

const emptyVariant = (): LevelVariant => ({
  enemies: [],
  mapLegend,
  routeLegend: [],
  hotspots: [],
});

type RouteColor = 'red' | 'orange' | 'purple' | 'green' | 'white' | 'pink' | 'black';

const routeStyles: Record<RouteColor, LegendItem> = {
  red: { color: '#ff1515', symbol: 'route', label: "Attack Route Alpha", description: "The first standard enemy route in this stage." },
  orange: { color: '#ffb20b', symbol: 'route', label: "Attack Route Beta", description: "The second standard enemy route in this stage." },
  purple: { color: '#6b16ed', symbol: 'route', label: "Attack Route Gamma", description: "The third standard enemy route in this stage." },
  green: { color: '#08d85e', symbol: 'route', label: "Attack Route Delta", description: "The fourth standard enemy route in this stage." },
  white: { color: '#ffffff', symbol: 'route', label: "Mine Cart Route", description: "The white line marks the cart's route." },
  pink: { color: '#f3b7c0', symbol: 'route', label: "Route After Dismounting", description: "The updated route enemies follow after leaving a cart." },
  black: { color: '#2e2e2e', symbol: 'route', label: "Boss Route", description: "The boss's dedicated movement route." },
};

const routeLegend = (colors: RouteColor[], options: { square?: boolean; overlap?: boolean } = {}): LegendItem[] => [
  ...colors.map((color) => routeStyles[color]),
  { color: '#ffffff', symbol: 'pause', label: "Waiting Point", description: "Hollow circles appear only on routes. Enemies on the matching-colored route pause here." },
  ...(options.square ? [{ color: '#ffffff', symbol: 'spawn' as const, label: "Initial Spawn", description: "A hollow square marks an enemy already present at the start, without entering through an enemy entry." }] : []),
  ...(options.overlap ? [{ color: '#ffffff', symbol: 'overlap' as const, label: "Overlapping Routes", description: "A dashed line marks a segment shared by two routes." }] : []),
];

const mainRouteLegends: Record<string, LegendItem[]> = {
  'INST-1': routeLegend(['red', 'orange'], { overlap: true }),
  'INST-2': routeLegend(['red', 'orange', 'white'], { overlap: true }),
  'LF-1': routeLegend(['red', 'orange', 'purple'], { overlap: true }),
  'LF-2': routeLegend(['red', 'orange', 'purple', 'green'], { overlap: true }),
  'LF-3': routeLegend(['red', 'orange', 'white'], { overlap: true }),
  'LF-4': routeLegend(['red', 'orange'], { square: true }),
  'LF-5': routeLegend(['red', 'orange', 'purple', 'white'], { overlap: true }),
  'LF-6': routeLegend(['red', 'orange', 'purple', 'white'], { overlap: true }),
  'LF-7': routeLegend(['red', 'orange', 'purple', 'white'], { overlap: true }),
  'LF-8': routeLegend(['red', 'orange', 'white', 'pink', 'black'], { square: true, overlap: true }),
};

const exRouteLegends: LegendItem[][] = [
  routeLegend(['red', 'orange', 'purple'], { overlap: true }),
  routeLegend(['red', 'orange', 'purple', 'green', 'white', 'pink'], { overlap: true }),
  routeLegend(['red', 'orange', 'purple', 'green'], { overlap: true }),
  routeLegend(['red', 'orange', 'white', 'pink']),
  routeLegend(['red', 'orange', 'purple'], { overlap: true }),
  routeLegend(['red', 'orange', 'purple', 'white', 'pink'], { overlap: true }),
  routeLegend(['red', 'orange', 'purple', 'white', 'pink'], { overlap: true }),
  routeLegend(['red', 'orange', 'white', 'pink', 'black'], { overlap: true }),
];

const exChallengeEffects = [
  "Operator DEF is greatly reduced.",
  "Enemy ATK is increased.",
  "Additional enemies appear.",
  "Pioneer Knife Captains and Shieldguard Captains gain weight, attack range, and ATK.",
  "Each supply point starts with one additional pack beast.",
  "Four battlefield tiles cannot be used for operator deployment.",
  "All enemies gain movement speed.",
  "Bring no more than 10 operators.",
];

const baseEnemies: Enemy[] = [
  { id: 1, name: "Pioneer Hound", category: "Regular Enemy", mechanics: ["Deals single-target physical melee damage.", "Cannot mount beasts or ride carts.", "After receiving a buff, its next attack deals increased damage."] },
  { id: 2, name: "Wasteland Pack Beast", category: "Regular Enemy / Mount", mechanics: ["Deals single-target physical melee damage. Can replenish up to 3 buff stacks at supply points.", "Cannot ride carts. Certain enemies can mount it.", "Its first movement after a supply point is a charge at the nearest operator still able to block it, stunning that operator."] },
  { id: 3, name: "Drunken Pioneer", category: "Regular Enemy", mechanics: ["Deals single-target physical melee damage with a bottle. Can mount beasts but cannot ride carts.", "Accelerates while mounted. At high speed, it can bypass the first blocking operator.", "Requires at least Block 2 to stop. Under certain conditions, attacks targets ahead and behind simultaneously with a short crossbow."] },
  { id: 4, name: "Pioneer Beastcaller", category: "Regular Enemy", mechanics: ["Deals single-target physical ranged damage with a bow.", "Can mount beasts but cannot ride carts.", "When buffed, summons a beast at the farthest summoning supply point and strengthens its next attack."] },
  { id: 5, name: "Pioneer Knifefighter", category: "Regular Enemy", mechanics: ["Deals single-target physical melee damage with a knife.", "Can mount beasts and ride carts.", "When buffed, its next attack becomes a high-damage, medium-range crossbow shot."] },
  { id: 6, name: "Pioneer Caster", category: "Regular Enemy", mechanics: ["Deals single-target ranged Arts damage. Can ride carts but cannot mount beasts.", "When buffed, its next attack becomes an area Arts bomb with a delayed explosion.", "While riding a cart with an empowered attack available, attacks the nearest deposit and reduces friendly SP."] },
  { id: 7, name: "Corporate Overseer", category: "Elite Enemy", mechanics: ["High health and damage. Uses a whip for extended-range physical attacks and can target elevated tiles.", "When buffed, its lasso controls up to 2 operators, reducing attack speed and stunning them; its damage becomes Arts damage.", "Can use beasts and carts. Carts damage operators along the track; beasts expand its attack range and number of control targets."] },
  { id: 8, name: "Pioneer Shieldguard", category: "Elite Enemy", mechanics: ["Deals single-target physical melee damage. Can ride carts but cannot mount beasts.", "Empowered attacks throw axes at the 3 lowest-health targets in range, prioritizing deposits.", "Hitting a deposit greatly increases enemy SP. Dismounting a cart immediately grants an empowered basic attack."] },
];

const eliteEnemies: Enemy[] = baseEnemies.map((enemy) => ({
  ...enemy,
  id: enemy.id + 8,
  name: `${enemy.name} Captain`,
  category: "Elite Variant",
}));

const boss: Enemy = {
  id: 0,
  name: "Silas, the Lasso",
  category: "Final Boss",
  mechanics: [
    "Takes buffs directly from supply points or beasts and actively attacks deposits.",
    "Has melee and ranged attacks, and can attack elevated tiles.",
    "Can hold up to 3 buff stacks.",
  ],
  phases: [
    { title: "Phase 1", mechanics: ["Periodically duels the highest-cost operator in range.", "After attacking a deposit, reduces nearby operators' attack speed for a duration."] },
    { title: "Phase 2", mechanics: ["Revives after the first defeat and immediately delivers 6 empowered attacks across multiple targets.", "Gains ATK and attack speed, acquires buffs more often, and summons beasts at supply points."] },
    { title: "Mounted Combination", mechanics: ["At 75% health in phase two, can combine with a beast on the field.", "After combining, gains ATK, health, and movement speed, and continuously uses empowered basic attacks."] },
  ],
};

const enemyById = new Map([...baseEnemies, ...eliteEnemies, boss].map((enemy) => [enemy.id, enemy]));
const enemiesFor = (ids: number[]) => ids.map((id) => enemyById.get(id)).filter((enemy): enemy is Enemy => Boolean(enemy));

const mainEnemyIds: Record<string, number[]> = {
  'INST-1': [1, 2, 5],
  'LF-1': [1, 2, 4, 5],
  'LF-2': [1, 2, 4, 5],
  'INST-2': [5, 6],
  'LF-3': [1, 4, 5, 6],
  'LF-4': [2, 3, 4, 5, 6],
  'LF-5': [1, 4, 5, 6, 7],
  'LF-6': [2, 3, 5, 6, 8],
  'LF-7': [5, 6, 7, 8],
  'LF-8': [1, 2, 3, 4, 5, 6, 7, 8, 0],
};

const exEnemyIds: number[][] = [
  [9, 10, 11, 12, 13],
  [9, 10, 13, 14],
  [10, 11, 13, 14, 15],
  [9, 10, 13, 14, 16],
  [9, 10, 11, 12, 13, 15],
  [10, 13, 14, 15, 16],
  [10, 11, 12, 13, 14, 15, 16],
  [9, 10, 11, 12, 13, 14, 15, 16, 0],
];

const mainRenders: Record<string, string> = Object.fromEntries(
  Array.from({ length: 8 }, (_, index) => [`LF-${index + 1}`, `/Portfolio/western-embers-render-main-${index + 1}.png`]),
);
mainRenders['INST-1'] = '/Portfolio/western-embers-render-inst-1.png';
mainRenders['INST-2'] = '/Portfolio/western-embers-render-inst-2.png';
const exRenders = Array.from({ length: 8 }, (_, index) => `/Portfolio/western-embers-render-ex-${index + 1}.png`);
const mainMaps: Record<string, string> = Object.fromEntries(
  Array.from({ length: 8 }, (_, index) => [`LF-${index + 1}`, `/Portfolio/western-embers-map-main-${index + 1}.png`]),
);
mainMaps['INST-1'] = '/Portfolio/western-embers-map-inst-1.png';
mainMaps['INST-2'] = '/Portfolio/western-embers-map-inst-2.png';
const exMaps = Array.from({ length: 8 }, (_, index) => `/Portfolio/western-embers-map-ex-${index + 1}.png`);
const mainRouteMaps: Record<string, string> = Object.fromEntries(
  Array.from({ length: 8 }, (_, index) => [`LF-${index + 1}`, `/Portfolio/western-embers-route-main-${index + 1}.png`]),
);
mainRouteMaps['INST-1'] = '/Portfolio/western-embers-route-inst-1.png';
mainRouteMaps['INST-2'] = '/Portfolio/western-embers-route-inst-2.png';
const exRouteMaps: Record<number, string> = {
  0: '/Portfolio/western-embers-route-ex-1.png',
  1: '/Portfolio/western-embers-route-ex-2.png',
  2: '/Portfolio/western-embers-route-ex-3.png',
  3: '/Portfolio/western-embers-route-ex-4.png',
  4: '/Portfolio/western-embers-route-ex-5.png',
  5: '/Portfolio/western-embers-route-ex-6.png',
  6: '/Portfolio/western-embers-route-ex-7.png',
  7: '/Portfolio/western-embers-route-ex-8.png',
};

const mainIds = ['INST-1', 'LF-1', 'LF-2', 'INST-2', 'LF-3', 'LF-4', 'LF-5', 'LF-6', 'LF-7', 'LF-8'];

export const mainLevels: WesternEmbersLevel[] = mainIds.map((id) => ({
  id,
  type: id.startsWith('INST') ? 'inst' : 'main',
  mechanisms: [],
  content: { ...emptyVariant(), map: mainMaps[id], routeMap: mainRouteMaps[id], render: mainRenders[id], routeLegend: mainRouteLegends[id], enemies: enemiesFor(mainEnemyIds[id]) },
}));

export const exLevels: WesternEmbersLevel[] = Array.from({ length: 8 }, (_, index) => ({
  id: `LF-EX-${index + 1}`,
  type: 'ex' as const,
  mechanisms: [],
  challengeEffect: exChallengeEffects[index],
  normal: { ...emptyVariant(), map: exMaps[index], routeMap: exRouteMaps[index], render: exRenders[index], routeLegend: exRouteLegends[index], enemies: enemiesFor(exEnemyIds[index]) },
  challenge: { ...emptyVariant(), map: exMaps[index], routeMap: exRouteMaps[index], render: exRenders[index], routeLegend: exRouteLegends[index], enemies: enemiesFor(exEnemyIds[index]) },
}));
