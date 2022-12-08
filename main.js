'use strict';

function randomIn(a, b) {
    return Math.random() * (b - a) + a;
}

{
    function createUpdater(spinner) {
        let lastAngle = 0;

        function updater(event) {
            if (event.target.value === "") {
                spinner.style.borderColor = "#d1d5db";
                delete spinner.style.borderTopColor;
                // spinner.innerText = "clear";
            }
            else {
                spinner.style.borderTopColor = "#00d76b";
                // spinner.innerText = "";
            }
            const angle = Math.floor(randomIn(0, Math.PI) * 180 / Math.PI);
            lastAngle += 90;
            lastAngle %= 360;
            lastAngle += angle;
            spinner.style.transform = `rotate(${lastAngle}deg)`;
        }
        return updater;
    }

    function replacePasswordInput() {
        const inputs = [...document.querySelectorAll('input[type="password"]')].filter(element => !element.replacedByLock);
        for (const passwordInput of inputs) {
            passwordInput.style.opacity = 0;
            passwordInput.style.width = 0;
            passwordInput.replacedByLock = true;

            const lock = document.createElement("div");

            lock.classList.add("firelocks");

            lock.addEventListener('click', () => {
                passwordInput.focus();
            });
            passwordInput.addEventListener('input', createUpdater(lock));
            passwordInput.addEventListener('focusin', () => lock.style.backgroundColor = "#eef3fc");
            passwordInput.addEventListener('focusout', () => lock.style.backgroundColor = "#00000000");

            passwordInput.parentNode.insertBefore(lock, passwordInput);
        }
    }


    // addStylesheet();

    replacePasswordInput();
}

// TODO 