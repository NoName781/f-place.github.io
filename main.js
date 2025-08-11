// Initialisiere das Grid mit 256 Pixeln (16x16)
let gridData = Array(256).fill('#ffffff');  // Alle Pixel initial mit Weiß

const canvas = document.getElementById('canvas');

// Funktion zum Zeichnen des Rasters
const drawGrid = () => {
  canvas.innerHTML = ''; // Alle Pixel löschen

  // Durch alle Pixel durchgehen und sie rendern
  gridData.forEach((color, index) => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = color;

    // Eventlistener für das Klicken auf Pixel
    pixel.addEventListener('click', () => {
      if (canPlacePixels()) {
        placePixels(index);
      }
    });

    canvas.appendChild(pixel);
  });
};

// Funktion, um 32 Pixel zu platzieren
const placePixels = (startIndex) => {
  for (let i = 0; i < 32; i++) {
    const index = startIndex + i;
    if (index < gridData.length) {
      gridData[index] = getRandomColor();  // Zufällige Farbe setzen
    }
  }

  // Speicher das aktualisierte Grid im LocalStorage
  saveGridToLocalStorage();
  drawGrid();  // Grid neu zeichnen
};

// Zufällige Farbe generieren
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Überprüfe, ob der Benutzer Pixel platzieren kann (alle 30 Sekunden)
let lastPlaced = 0;
const canPlacePixels = () => {
  const now = Date.now();
  if (now - lastPlaced > 30000) {  // 30 Sekunden warten
    lastPlaced = now;
    return true;
  }
  return false;
};

// Lade die Grid-Daten aus dem LocalStorage, falls vorhanden
const loadGridFromLocalStorage = () => {
  const savedGrid = localStorage.getItem('fplace_grid');
  if (savedGrid) {
    gridData = JSON.parse(savedGrid);
  }
};

// Speichere die Grid-Daten im LocalStorage
const saveGridToLocalStorage = () => {
  localStorage.setItem('fplace_grid', JSON.stringify(gridData));
};

// Initialisiere das Grid und zeige es an
loadGridFromLocalStorage();
drawGrid();
