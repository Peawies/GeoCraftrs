const ROUNDS_PER_GAME = 5;
const MAX_SCORE_PER_ROUND = 5000;

const MAP_SETTINGS = {
  imagePath: "images/map.png",
  coordinateMode: "pixels",
  sourceWidth: 4096,
  sourceHeight: 4096,
  offsetX: 0,
  offsetY: 0,
  minZoom: 1,
  maxZoom: 5
};

const METERS_PER_PIXEL = 0.5;
const PERFECT_SCORE_RADIUS_METERS = 10;

function pixelsToMeters(pixels) {
  return pixels * METERS_PER_PIXEL;
}

function formatDistanceMeters(distanceInPixels) {
  return `${Math.round(pixelsToMeters(distanceInPixels))}m away`;
}

function calculateRoundScore(distanceInPixels) {
  const distanceMeters = pixelsToMeters(distanceInPixels);

  if (distanceMeters <= PERFECT_SCORE_RADIUS_METERS) {
    return MAX_SCORE_PER_ROUND;
  }

  const maxDistanceMeters = pixelsToMeters(
    Math.hypot(MAP_SETTINGS.sourceWidth, MAP_SETTINGS.sourceHeight)
  );
  const scoreableRange = Math.max(1, maxDistanceMeters - PERFECT_SCORE_RADIUS_METERS);
  const normalized = Math.min(
    (distanceMeters - PERFECT_SCORE_RADIUS_METERS) / scoreableRange,
    1
  );

  return Math.max(0, Math.round(MAX_SCORE_PER_ROUND * Math.pow(1 - normalized, 2.35)));
}

const allLocations = [
  { name: "Blacksmith Stand", image: "images/1.jpg", x: 2051, y: 1838 },
  { name: "Archery Range Lobby", image: "images/2.jpg", x: 2088, y: 1801 },
  { name: "Archery Range", image: "images/3.jpg", x: 2170, y: 1819 },
  { name: "Blacksmith Arch", image: "images/4.jpg", x: 2172, y: 1838 },
  { name: "Pet Care Building Rooftop", image: "images/5.jpg", x: 2198, y: 1646 },
  { name: "Hopkins", image: "images/6.jpg", x: 2169, y: 1674 },
  { name: "Dolores", image: "images/7.jpg", x: 2121, y: 1620 },
  { name: "Quest Guild Roof", image: "images/8.jpg", x: 2149, y: 1473 },
  { name: "Quest Guild", image: "images/9.jpg", x: 2155, y: 1462 },
  { name: "Community Center Farm", image: "images/10.jpg", x: 2039, y: 1367 },
  { name: "Community Center Shelves", image: "images/11.jpg", x: 2122, y: 1315 },
  { name: "Community Center Chloe", image: "images/12.jpg", x: 2055, y: 1319 },
  { name: "Community Center Wall", image: "images/13.jpg", x: 2172, y: 1264 },
  { name: "Community Center Backyard", image: "images/14.jpg", x: 2080, y: 1168 },
  { name: "Witch Hut Chimney", image: "images/15.jpg", x: 2192, y: 1337 },
  { name: "Witch Hut Table", image: "images/16.jpg", x: 2185, y: 1335 },
  { name: "Build House Stand", image: "images/17.jpg", x: 2242, y: 1485 },
  { name: "Build House Rooftop", image: "images/18.jpg", x: 2270, y: 1479 },
  { name: "Build House Wall", image: "images/19.jpg", x: 2298, y: 1514 },
  //{ name: "Random House Bed", image: "images/20.jpg", x: 2613, y: 1806 },
  //{ name: "Random House Farm", image: "images/21.jpg", x: 2613, y: 1806 },
  { name: "Furniture House", image: "images/22.jpg", x: 2471, y: 1409 },
  { name: "Mechanic House", image: "images/23.jpg", x: 2327, y: 1727 },
  { name: "Mechanic Out Arch", image: "images/24.jpg", x: 2287, y: 1742 },
  { name: "Fountain", image: "images/25.jpg", x: 2519, y: 1656 },
  //{ name: "Random House Stable", image: "images/26.jpg", x: 2613, y: 1806 },
  //{ name: "Random Woods", image: "images/28.jpg", x: 2613, y: 1806 },
  { name: "Trio Head", image: "images/29.jpg", x: 2873, y: 1822 },
  //{ name: "Random Kitchen", image: "images/30.jpg", x: 2613, y: 1806 },
  { name: "Random Vineyard", image: "images/31.jpg", x: 3258, y: 1488 },
  { name: "Random Tower", image: "images/32.jpg", x: 3307, y: 1995 },
  { name: "Coal Mine Cane", image: "images/33.jpg", x: 2793, y: 2073 },
  { name: "Coal Mine", image: "images/34.jpg", x: 2690, y: 2551 },
  { name: "Out Colosseum", image: "images/35.jpg", x: 2799, y: 1173 },
  { name: "Colosseum", image: "images/36.jpg", x: 3059, y: 1092 },
  { name: "Harvest Haven Lily", image: "images/37.jpg", x: 1760, y: 473 },
  { name: "Harvest Haven Bridge", image: "images/38.jpg", x: 1483, y: 540 },
  { name: "Forest Cab", image: "images/39.jpg", x: 1333, y: 1095 },
  { name: "Harvest Haven Bamboos", image: "images/40.jpg", x: 782, y: 766 },
  { name: "Forest Rocks", image: "images/41.jpg", x: 907, y: 1280 },
  { name: "Forest Trucks", image: "images/42.jpg", x: 790, y: 1507 },
  { name: "Castle Tree", image: "images/43.jpg", x: 878, y: 1923 },
  //{ name: "Castle Room", image: "images/44.jpg", x: 2613, y: 1806 },
  { name: "Castle Tower", image: "images/45.jpg", x: 1226, y: 2259 },
  { name: "Castle Water", image: "images/46.jpg", x: 1599, y: 2481 },
  { name: "Fisherman", image: "images/47.jpg", x: 1572, y: 2656 },
  { name: "Sirius' Room", image: "images/48.jpg", x: 1685, y: 2976 },
  { name: "Sirius' Cave", image: "images/49.jpg", x: 1630, y: 2995 },
  { name: "Wilderness Road", image: "images/50.jpg", x: 1799, y: 3032 },
  { name: "Wilderness Butterfly", image: "images/51.jpg", x: 2107, y: 3591 },
  { name: "Wilderness Pond", image: "images/52.jpg", x: 2227, y: 3195 },
  //{ name: "End Portal", image: "images/53.jpg", x: 2613, y: 1806 },
  { name: "Wilderness Water", image: "images/54.jpg", x: 2815, y: 2717 },
  { name: "Graveyard Statue", image: "images/55.jpg", x: 2395, y: 2236 },
  { name: "Graveyard", image: "images/56.jpg", x: 1937, y: 2204 },
  { name: "Map", image: "images/57.jpg", x: 1996, y: 1353 },
  { name: "Christmas Wreath", image: "images/58.jpg", x: 1930, y: 1258 },
  { name: "Maddox' Cave", image: "images/59.jpg", x: 1682, y: 1281 },
  { name: "Bar's View", image: "images/60.jpg", x: 1645, y: 1368 },
  { name: "Bank Shelves", image: "images/61.jpg", x: 1784, y: 1514 },
  { name: "Ethan's Rooftop", image: "images/62.jpg", x: 1887, y: 1316 },
  { name: "Bazaar Alley", image: "images/63.jpg", x: 1850, y: 1588 },
  { name: "Auction House Rooftop", image: "images/64.jpg", x: 1834, y: 1717 },
  { name: "Tia's Bookshelves", image: "images/65.jpg", x: 1643, y: 1599 }
];

const roundStat = document.getElementById("roundStat");
const scoreStat = document.getElementById("scoreStat");
const screenshotLabel = document.getElementById("screenshotLabel");
const startScreen = document.getElementById("startScreen");
const gameStage = document.getElementById("gameStage");
const startBtn = document.getElementById("startBtn");
const locationImage = document.getElementById("locationImage");
const mapFrame = document.getElementById("mapFrame");
const mapCanvas = document.getElementById("mapCanvas");
const worldMap = document.getElementById("worldMap");
const resultBox = document.getElementById("resultBox");
const guessBtn = document.getElementById("guessBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const resetViewBtn = document.getElementById("resetViewBtn");
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");
const sharePanel = document.getElementById("sharePanel");
const shareSummary = document.getElementById("shareSummary");
const shareText = document.getElementById("shareText");
const copyShareBtn = document.getElementById("copyShareBtn");
const newGameBtn = document.getElementById("newGameBtn");

worldMap.src = MAP_SETTINGS.imagePath;
mapFrame.style.setProperty("--map-aspect", `${MAP_SETTINGS.sourceWidth} / ${MAP_SETTINGS.sourceHeight}`);

let currentGameLocations = [];
let roundIndex = 0;
let totalScore = 0;
let currentGuess = null;
let roundLocked = false;
let gameStarted = false;
let gameFinished = false;
let history = [];

const mapState = {
  scale: 1,
  panX: 0,
  panY: 0,
  pointerId: null,
  startClientX: 0,
  startClientY: 0,
  startPanX: 0,
  startPanY: 0,
  dragging: false
};

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickGameLocations() {
  return shuffleArray(allLocations).slice(0, Math.min(ROUNDS_PER_GAME, allLocations.length));
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function normalizeStoredPoint(x, y) {
  if (MAP_SETTINGS.coordinateMode === "pixels") {
    return {
      x: clamp01((x + MAP_SETTINGS.offsetX) / MAP_SETTINGS.sourceWidth),
      y: clamp01((y + MAP_SETTINGS.offsetY) / MAP_SETTINGS.sourceHeight)
    };
  }

  return {
    x: clamp01((x + MAP_SETTINGS.offsetX) / 100),
    y: clamp01((y + MAP_SETTINGS.offsetY) / 100)
  };
}

function sourcePointFromNormalized(point) {
  return {
    x: Math.round(point.x * MAP_SETTINGS.sourceWidth),
    y: Math.round(point.y * MAP_SETTINGS.sourceHeight)
  };
}

function clampPan() {
  const viewportWidth = mapFrame.clientWidth;
  const viewportHeight = mapFrame.clientHeight;
  const scaledWidth = viewportWidth * mapState.scale;
  const scaledHeight = viewportHeight * mapState.scale;

  if (scaledWidth <= viewportWidth) {
    mapState.panX = (viewportWidth - scaledWidth) / 2;
  } else {
    mapState.panX = Math.min(0, Math.max(viewportWidth - scaledWidth, mapState.panX));
  }

  if (scaledHeight <= viewportHeight) {
    mapState.panY = (viewportHeight - scaledHeight) / 2;
  } else {
    mapState.panY = Math.min(0, Math.max(viewportHeight - scaledHeight, mapState.panY));
  }
}

function renderMapTransform() {
  mapCanvas.style.transform = `translate(${mapState.panX}px, ${mapState.panY}px) scale(${mapState.scale})`;
}

function resetMapView() {
  mapState.scale = 1;
  mapState.panX = 0;
  mapState.panY = 0;
  clampPan();
  renderMapTransform();
}

function zoomMap(step, clientX = null, clientY = null) {
  const rect = mapFrame.getBoundingClientRect();
  const oldScale = mapState.scale;
  const newScale = Math.max(MAP_SETTINGS.minZoom, Math.min(MAP_SETTINGS.maxZoom, oldScale + step));

  if (newScale === oldScale) return;

  const focusX = clientX === null ? rect.left + rect.width / 2 : clientX;
  const focusY = clientY === null ? rect.top + rect.height / 2 : clientY;
  const localX = focusX - rect.left;
  const localY = focusY - rect.top;
  const baseX = (localX - mapState.panX) / oldScale;
  const baseY = (localY - mapState.panY) / oldScale;

  mapState.scale = newScale;
  mapState.panX = localX - baseX * newScale;
  mapState.panY = localY - baseY * newScale;
  clampPan();
  renderMapTransform();
}

function clearMapOverlays() {
  mapCanvas.querySelectorAll(".marker, .guess-line").forEach((node) => node.remove());
}

function createMarker(point, className) {
  const marker = document.createElement("div");
  marker.className = `marker ${className}`;
  marker.style.left = `${point.x * 100}%`;
  marker.style.top = `${point.y * 100}%`;
  return marker;
}

function createLine(fromPoint, toPoint) {
  const width = mapFrame.clientWidth;
  const height = mapFrame.clientHeight;
  const x1 = fromPoint.x * width;
  const y1 = fromPoint.y * height;
  const x2 = toPoint.x * width;
  const y2 = toPoint.y * height;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const line = document.createElement("div");
  line.className = "guess-line";
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.width = `${distance}px`;
  line.style.transform = `rotate(${angle}deg)`;
  return line;
}

function renderMapOverlays(answerPoint = null) {
  clearMapOverlays();

  if (currentGuess) {
    mapCanvas.appendChild(createMarker(currentGuess, "guess"));
  }

  if (answerPoint) {
    mapCanvas.appendChild(createMarker(answerPoint, "answer"));
    if (currentGuess) {
      mapCanvas.appendChild(createLine(currentGuess, answerPoint));
    }
  }
}

function currentAnswerPoint() {
  const location = currentGameLocations[roundIndex];
  return normalizeStoredPoint(location.x, location.y);
}

function sourceDistance(pointA, pointB) {
  const a = sourcePointFromNormalized(pointA);
  const b = sourcePointFromNormalized(pointB);
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function scoreEmoji(score) {
  const ratio = score / MAX_SCORE_PER_ROUND;
  if (ratio >= 0.9) return "🟩";
  if (ratio >= 0.7) return "🟨";
  if (ratio >= 0.45) return "🟧";
  return "🟥";
}

function buildShareText() {
  const chronological = [...history].sort((a, b) => a.round - b.round);
  const emojiRow = chronological.map((entry) => scoreEmoji(entry.score)).join("");
  const detailLines = chronological.map((entry) => `#${entry.round}: ${entry.score} pts (${entry.distanceText})`);
  return [
    `GeoCraftrs ${totalScore}/${currentGameLocations.length * MAX_SCORE_PER_ROUND}`,
    emojiRow,
    ...detailLines
  ].join("\n");
}

function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<div class="empty-state">No rounds finished yet.</div>';
    return;
  }

  const items = [...history].sort((a, b) => b.round - a.round);
  historyList.innerHTML = items.map((item) => `
    <article class="history-item">
      <div class="history-round">${item.round}</div>
      <div class="history-meta">
        <b>${item.name}</b>
        <span class="muted">${item.distanceText}</span>
      </div>
      <div class="history-score">${item.score}</div>
    </article>
  `).join("");
}

function updateIdleResultBox() {
  if (!gameStarted) {
    resultBox.innerHTML = `
      <strong>Waiting to start</strong>
      Press Start to begin your 5-round game.
    `;
    return;
  }

  resultBox.innerHTML = `
    <strong>Make your guess</strong>
    Click the map to place a marker. Zoom and drag first if you need a closer look.
  `;
}

function loadRound() {
  const location = currentGameLocations[roundIndex];
  roundLocked = false;
  currentGuess = null;
  clearMapOverlays();
  guessBtn.disabled = true;
  nextBtn.disabled = true;
  nextBtn.textContent = roundIndex === currentGameLocations.length - 1 ? "Finish Run" : "Next Round";

  roundStat.textContent = `Round ${roundIndex + 1} / ${currentGameLocations.length}`;
  scoreStat.textContent = `Score: ${totalScore}`;
  screenshotLabel.textContent = `Location ${roundIndex + 1}`;
  locationImage.src = location.image;
  locationImage.alt = `Screenshot for round ${roundIndex + 1}`;

  resetMapView();
  updateIdleResultBox();
}

function startGame() {
  currentGameLocations = pickGameLocations();
  roundIndex = 0;
  totalScore = 0;
  currentGuess = null;
  roundLocked = false;
  gameStarted = true;
  gameFinished = false;
  history = [];

  startScreen.classList.add("hidden");
  gameStage.classList.remove("hidden");
  sharePanel.classList.add("hidden");
  renderHistory();
  loadRound();
}

function returnToStart() {
  gameStarted = false;
  gameFinished = false;
  currentGameLocations = [];
  roundIndex = 0;
  totalScore = 0;
  currentGuess = null;
  roundLocked = false;
  history = [];

  startScreen.classList.remove("hidden");
  gameStage.classList.add("hidden");
  sharePanel.classList.add("hidden");
  clearMapOverlays();
  resetMapView();
  renderHistory();
  roundStat.textContent = "Press Start";
  scoreStat.textContent = "Score: 0";
  screenshotLabel.textContent = "5-round run";
  updateIdleResultBox();
}

function finishGame() {
  gameFinished = true;
  roundLocked = true;
  roundStat.textContent = `Finished ${currentGameLocations.length} / ${currentGameLocations.length}`;
  resultBox.innerHTML = `
    <strong>Run complete</strong>
    Your total score is <b>${totalScore}</b>. Scroll down to Round History for the full breakdown.
  `;

  shareSummary.textContent = `Total score: ${totalScore} / ${currentGameLocations.length * MAX_SCORE_PER_ROUND}`;
  shareText.value = buildShareText();
  sharePanel.classList.remove("hidden");
  historySection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function lockGuess() {
  if (!gameStarted || !currentGuess || roundLocked) return;

  roundLocked = true;
  const location = currentGameLocations[roundIndex];
  const answerPoint = currentAnswerPoint();
  const distance = sourceDistance(currentGuess, answerPoint);
  const score = calculateRoundScore(distance);
  const guessSource = sourcePointFromNormalized(currentGuess);
  const answerSource = sourcePointFromNormalized(answerPoint);

  totalScore += score;
  scoreStat.textContent = `Score: ${totalScore}`;
  renderMapOverlays(answerPoint);

  const distanceText = formatDistanceMeters(distance);

  resultBox.innerHTML = `
    <strong>${location.name}</strong>
    You scored <b>${score}</b> points and were <b>${distanceText}</b> from the true location.<br>
  `;
  //Guess: <b>${guessSource.x}, ${guessSource.y}</b> · Answer: <b>${answerSource.x}, ${answerSource.y}</b>

  history.push({
    round: roundIndex + 1,
    name: location.name,
    distanceText,
    score
  });
  renderHistory();

  guessBtn.disabled = true;
  nextBtn.disabled = false;
  nextBtn.textContent = roundIndex === currentGameLocations.length - 1 ? "Finish Game" : "Next Round";
}

function advanceRound() {
  if (!roundLocked || !gameStarted) return;

  if (roundIndex === currentGameLocations.length - 1) {
    finishGame();
    return;
  }

  roundIndex += 1;
  loadRound();
}

function placeGuessFromClientPoint(clientX, clientY) {
  if (!gameStarted || roundLocked || gameFinished) return;

  const rect = mapFrame.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const baseX = (localX - mapState.panX) / mapState.scale;
  const baseY = (localY - mapState.panY) / mapState.scale;
  const normalized = {
    x: clamp01(baseX / rect.width),
    y: clamp01(baseY / rect.height)
  };
  const sourcePoint = sourcePointFromNormalized(normalized);

  currentGuess = normalized;
  renderMapOverlays();
  guessBtn.disabled = false;
  resultBox.innerHTML = `
    <strong>Guess placed</strong>
    Your marker is currently at <b>${sourcePoint.x}, ${sourcePoint.y}</b> on the source map. Lock it in when ready.
  `;
}

function onPointerDown(event) {
  mapState.pointerId = event.pointerId;
  mapState.startClientX = event.clientX;
  mapState.startClientY = event.clientY;
  mapState.startPanX = mapState.panX;
  mapState.startPanY = mapState.panY;
  mapState.dragging = false;
  mapFrame.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (mapState.pointerId !== event.pointerId) return;

  const dx = event.clientX - mapState.startClientX;
  const dy = event.clientY - mapState.startClientY;
  if (!mapState.dragging && Math.hypot(dx, dy) > 5) {
    mapState.dragging = true;
  }

  if (!mapState.dragging) return;

  mapState.panX = mapState.startPanX + dx;
  mapState.panY = mapState.startPanY + dy;
  clampPan();
  renderMapTransform();
  mapFrame.classList.add("dragging");
}

function onPointerUp(event) {
  if (mapState.pointerId !== event.pointerId) return;

  if (!mapState.dragging) {
    placeGuessFromClientPoint(event.clientX, event.clientY);
  }

  mapFrame.releasePointerCapture(event.pointerId);
  mapState.pointerId = null;
  mapState.dragging = false;
  mapFrame.classList.remove("dragging");
}

function onPointerCancel(event) {
  if (mapState.pointerId !== event.pointerId) return;
  mapState.pointerId = null;
  mapState.dragging = false;
  mapFrame.classList.remove("dragging");
}

mapFrame.addEventListener("pointerdown", onPointerDown);
mapFrame.addEventListener("pointermove", onPointerMove);
mapFrame.addEventListener("pointerup", onPointerUp);
mapFrame.addEventListener("pointercancel", onPointerCancel);

mapFrame.addEventListener("wheel", (event) => {
  event.preventDefault();
  const direction = event.deltaY < 0 ? 0.25 : -0.25;
  zoomMap(direction, event.clientX, event.clientY);
}, { passive: false });

zoomInBtn.addEventListener("click", () => zoomMap(0.25));
zoomOutBtn.addEventListener("click", () => zoomMap(-0.25));
resetViewBtn.addEventListener("click", resetMapView);
startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", lockGuess);
nextBtn.addEventListener("click", advanceRound);
restartBtn.addEventListener("click", returnToStart);
newGameBtn.addEventListener("click", startGame);

copyShareBtn.addEventListener("click", async () => {
  const text = shareText.value;
  shareText.focus();
  shareText.select();

  try {
    await navigator.clipboard.writeText(text);
    copyShareBtn.textContent = "Copied";
    setTimeout(() => {
      copyShareBtn.textContent = "Copy Results";
    }, 1200);
  } catch (error) {
    copyShareBtn.textContent = "Error copying";
  }
});

window.addEventListener("resize", () => {
  clampPan();
  renderMapTransform();
  if (roundLocked && gameStarted && currentGameLocations.length > 0) {
    renderMapOverlays(currentAnswerPoint());
  } else {
    renderMapOverlays();
  }
});

renderHistory();
returnToStart();
