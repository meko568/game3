let tries = 10;

let currentTry = 1;
let game = document.querySelector(".game")
let check = document.querySelector(".check");
let words = ["53452", "52975725439752", "5397502", "572010741", "59324572", "421432", "131658409", "124431343"];
let word = words[Math.floor(Math.random() * words.length)];
let letters = word.length;
let hint = document.querySelector(".hint")
let divs = "";
let containput = document.querySelector(".inputs");
function createinputs() {
    for (let i = 1; i <= tries; i++) {
        const divtry = document.createElement("div");
        divtry.classList.add(`try-${i}`)
        if (i !== 1) {
            divtry.classList.add("disabled")
        }
        divtry.innerHTML = `<span>try ${i}</span>`
        for (let f = 0; f < letters; f++) {
            let input = document.createElement("input");
            input.setAttribute("maxlength", 1);
            input.type = "text";
            input.id = `guess-${i}-letter-${f}`
            divtry.appendChild(input);
        }
        containput.appendChild(divtry);
    }
    containput.children[0].children[1].focus();
    let allDisabled = document.querySelectorAll(".disabled input");
    allDisabled.forEach((e) => e.disabled = true)
    let inputs = document.querySelectorAll("input");
    inputs.forEach(function (e, index) {
        e.oninput = function () {
            this.value = this.value.toUpperCase();
            inputs[index + 1].focus()
            if (this.value.length = 1) {
                // this.disabled = true;
            }
        }
        e.onkeydown = function (event) {
            let current = Array.from(inputs).indexOf(document.activeElement);
            if (event.key === "Backspace") {
                if (current > 0) {
                    let input = inputs[current];
                    let pre = inputs[current - 1];
                    input.value = "";
                    pre.value = "";
                    pre.focus()
                }
            }
            let index = Array.from(inputs).indexOf(this);
            if (event.key === "ArrowRight") {
                let suf = index + 1;
                if (suf < inputs.length) {
                    inputs[suf].focus()
                }
            }
            if (event.key === "ArrowLeft") {
                let pre = index - 1;
                if (pre >= 0) {
                    inputs[pre].focus()
                }
            }

        }
    })
}
window.onload = function () {
    createinputs()
    divs = document.querySelectorAll(".inputs div");
    check.onclick = function () {
        let success = true;
        for (let i = 0; i < letters; i++) {
            const inputfiled = document.getElementById(`guess-${currentTry}-letter-${i}`);
            inputfiled.classList.add("wrong")
            let letter = inputfiled.value.toLowerCase()
            if (letter === word[i].toLowerCase()) {
                inputfiled.classList.add("right");
                inputfiled.classList.remove("no-place", "wrong")
            } else {
                success = false
                for (let j = 0; j < word.length; j++) {
                    if (letter === word[j].toLowerCase()) {
                        inputfiled.classList.add("no-place");
                        inputfiled.classList.remove("right", "wrong")
                    }
                }
            }
        }
        if (success === false) {
            ++currentTry
            if (currentTry > tries) {
                let conta = document.createElement("div");
                conta.className = "theconta"
                let div = document.createElement("div");
                div.innerHTML = `you lose the number is ${word}`;
                let button = document.createElement("button");
                button.innerHTML = "play again"
                button.onclick = function () {
                    button.style.animationName = "scale";
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                }
                div.className = "end"
                button.className = "end";
                conta.appendChild(div)
                conta.appendChild(button);
                document.body.appendChild(conta)
                game.classList.add("disabled");
            } else {
                divs.forEach(function (e) {
                    if (e.classList.contains(`try-${currentTry}`)) {
                        e.classList.remove("disabled");
                    } else {
                        e.classList.add("disabled")
                    }
                });
                let allDisabled = document.querySelectorAll(".disabled input");
                allDisabled.forEach((e) => e.disabled = true);
                let undis = document.querySelectorAll(`.try-${currentTry} input`)
                undis.forEach(function (e, index) {
                    e.disabled = false
                    if (index === 0) {
                        e.focus()
                    }
                })
            }
        } else {
            let conta = document.createElement("div");
            conta.className = "theconta"
            let div = document.createElement("div");
            div.innerHTML = `you guess the right Number`;
            let button = document.createElement("button");
            button.innerHTML = "play again"
            button.onclick = function () {
                button.style.animationName = "scale";
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
            div.className = "end"
            button.className = "end";
            conta.appendChild(div)
            conta.appendChild(button);
            document.body.appendChild(conta)
            containput.classList.add("disabled")
        }


    }
}
let numberofhints = 0;
hint.onclick = function () {
    if (numberofhints === 1) {
        hint.classList.add("disabled")
    }
    let letter = Array.from(word)[Math.floor(Math.random() * Array.from(word).length)];
    let index = Array.from(word).indexOf(letter);
    document.querySelector(`#guess-${currentTry}-letter-${index}`).value = letter.toUpperCase();
    numberofhints++
}