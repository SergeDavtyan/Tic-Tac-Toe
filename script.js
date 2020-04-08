const BOARD = document.querySelector("#board");
const WINNER = document.querySelector("#winner");
const PLAY = document.querySelector(".play");
const AGAIN = document.querySelector(".again");
const QUANTITY = document.querySelector(".quantity_input");
const QUANTITY_TITLE = document.querySelector(".quantity_title");


let BOX;
let current_player;

let game_start = false;
let xo = 0;


const CREATE_BOX = () => {

    const QUANTITY_VALUE = document.querySelector(".quantity_input").value;

    if (QUANTITY_VALUE > 2 && QUANTITY_VALUE < 7) {

        BOARD.style.width = (QUANTITY_VALUE * 100) + (QUANTITY_VALUE * 2) + "px";
        BOARD.style.height = (QUANTITY_VALUE * 100) + (QUANTITY_VALUE * 2) + "px";

        for (let i = 0; i < QUANTITY_VALUE ** 2; i++) {
            const BOXES = document.createElement("div");
            BOXES.setAttribute("class", "box");
            BOARD.appendChild(BOXES);
        }
        BOX = document.querySelectorAll(".box");

        return true;

    }

};

const CHECK_WIN = player => {

    let x = Math.sqrt(BOX.length);
    let win = 0;

    // -------- vertical -------

    for (let i = 0; i < x; i++) {
        for (let n = i; n < x * x; n += x) {
            if (BOX[n].innerText == player) {
                win++;
            }
        };

        if (win === x)
            return true;
        win = 0;
    };


    // -------- horizontal ---------


    for (let i = 0; i < x * x; i += x) {

        for (let n = i; n < i + x; n++) {

            if (BOX[n].innerText == player) {
                win++;
            }
        }

        if (win === x)
            return true;
        win = 0;
    };



    // --------- left to right diaganal -------


    for (let i = 0; i < x * x; i += x + 1) {
        if (BOX[i].innerText == player) {
            win++;
        }
    };

    if (win === x)
        return true;
    win = 0;



    // -------- left to right diaganal ---------


    for (let i = x - 1; i < x * x - 1; i += x - 1) {
        if (BOX[i].innerText == player) {
            win++;
        }
    };


    if (win === x)
        return true;
    win = 0;

};

const WIN = () => {

    if (current_player === "X") {
        WINNER.style.color = "#7C7FA0";
    } else {
        WINNER.style.color = "#B85F7B";
    }

    setTimeout(() => {

        WINNER.innerText = "WIN " + current_player;
        WINNER.classList.add("style");

        PLAY.style.display = "none";
        AGAIN.style.display = "block";

    }, 0)

};

const START_GAME = () => {

    for (let i = 0; i < BOX.length; i++) {

        BOX[i].addEventListener("click", () => {

            if (!BOX[i].classList.contains("remove") && game_start == true) {

                xo++;

                if (xo % 2 == 0) {
                    BOX[i].style.color = "#B85F7B";
                    current_player = "O";
                } else {
                    BOX[i].style.color = "#7C7FA0";
                    current_player = "X";
                }

                BOX[i].innerText = current_player;

                if (CHECK_WIN(current_player)) {
                    WIN();
                    game_start = false;
                }

                if (!CHECK_WIN(current_player) && xo == BOX.length) {
                    WINNER.innerText = "DROW";
                    WINNER.style.color = "#B85F7B";
                    WINNER.classList.add("style");
                }

                BOX[i].classList.add("remove");

            }

        })

    }

};

PLAY.addEventListener("click", () => {

    if (CREATE_BOX()) {
        START_GAME();

        QUANTITY.style.display = "none";
        QUANTITY_TITLE.style.display = "none";
        WINNER.style.display = "block";

        game_start = true;
        AGAIN.style.display = "block";
        PLAY.style.display = "none";
    }

});

AGAIN.addEventListener("click", () => {

    xo = 0;
    game_start = true;

    for (let i = 0; i < BOX.length; i++) {
        BOX[i].classList.remove("remove");
        BOX[i].innerText = "";
    };

    WINNER.classList.remove("style");

});