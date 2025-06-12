let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msgPara = document.querySelector("#message");

let turnO = true;
let count = 0; // Track draw

const winSequence = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let winnerFound = checkWinner();
        if (count === 9 && !winnerFound) {
            msgPara.innerText = `Game was a Draw.`;
            msgContainer.classList.remove("hide");
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msgPara.innerText = `Congratulations! The Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winSequence) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
