let level1 = [
  [1, 0, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 0, 1]
];

let level2 = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 1, 1, 1],
  [1, 1, 1, 0, 1]
];

let level3 = [
  [1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 1],
  [0, 0, 1, 1, 1, 0],
  [1, 1, 1, 0, 1, 1],
  [0, 0, 1, 1, 0, 1]
];

let levels={
  "l1":level1,
  "l2":level2,
  "l3":level3
}

let select = document.getElementById("select");
let maze = document.getElementById("maze-container");
let cellElements = [];
  let playerPos = { x: 0, y: 0 };
select.addEventListener("change", createMaze);
function createMaze() {
  let w = select.value
  mazeArray = levels[w]// Met à jour la variable globale
  maze.innerHTML = "";
  cellElements = [];
  playerPos = { x: 0, y: 0 }; // Reset position du joueur

  for (let i = 0; i < mazeArray.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    let rowCells = [];

    for (let j = 0; j < mazeArray[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      if (mazeArray[i][j] === 0) {
        cell.classList.add("wall");
      }

      row.appendChild(cell);
      rowCells.push(cell);
    }

    maze.appendChild(row);
    cellElements.push(rowCells);
  }
  cellElements[mazeArray.length - 1][mazeArray[0].length - 1].textContent = "🎯";
  updatePlayer();
}

  function updatePlayer() {
    // Nettoyer toutes les cellules
    for (let i = 0; i < cellElements.length; i++) {
      for (let j = 0; j < cellElements[i].length; j++) {
        if (!cellElements[i][j].classList.contains("wall")) {
          cellElements[i][j].textContent = "";
        }
      }
    }

    cellElements[playerPos.y][playerPos.x].textContent = "🧍";
  }
 function move(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (
      newX >= 0 && newX < mazeArray[0].length &&
      newY >= 0 && newY < mazeArray.length &&
      mazeArray[newY][newX] === 1
    ) {
      playerPos.x = newX;
      playerPos.y = newY;
      updatePlayer();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") move(0, -1);
    if (e.key === "ArrowDown") move(0, 1);
    if (e.key === "ArrowLeft") move(-1, 0);
    if (e.key === "ArrowRight") move(1, 0);
  });


createMaze();
