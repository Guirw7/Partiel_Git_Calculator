// calculator.js (BASE sur develop)
// UI + logique complète, mais opérations à implémenter dans les branches feature/*

(() => {
    const screen = document.getElementById("screen");
    const history = document.getElementById("history");
    const keys = document.querySelector(".keys");

    // --- Opérations : à compléter via branches feature ---
    function add(a, b) { return a + b; }
    function sub(a, b) { return a - b; }
    function mul(a, b) { return a * b; }

    function compute(a, op, b) {
        if (op === "+") return add(a, b);
        if (op === "-") return sub(a, b);
        if (op === "*") return mul(a, b);
        return b;
    }

    let current = "0";
    let previous = null;
    let operator = null;
    let justEvaluated = false;

    function setScreen(value) {
        screen.textContent = value;
    }

    function setHistory(text) {
        history.textContent = text;
    }

    function formatNumberString(s) {
        if (s === "" || s === "-" || s.endsWith(".")) return s || "0";
        const n = Number(s);
        if (!Number.isFinite(n)) return "Erreur";
        const asText = String(n);
        if (asText.length <= 14) return asText;
        return n.toPrecision(12);
    }

    function inputDigit(d) {
        if (justEvaluated) {
            current = "0";
            justEvaluated = false;
        }

        if (d === ".") {
            if (current.includes(".")) return;
            current = current + ".";
            setScreen(formatNumberString(current));
            return;
        }

        if (current === "0") current = d;
        else current = current + d;

        setScreen(formatNumberString(current));
    }

    function clearAll() {
        current = "0";
        previous = null;
        operator = null;
        justEvaluated = false;
        setHistory("");
        setScreen("0");
    }

    function backspace() {
        if (justEvaluated) return;
        if (current.length <= 1) current = "0";
        else current = current.slice(0, -1);
        setScreen(formatNumberString(current));
    }

    function chooseOperator(op) {
        const cur = Number(current);
        if (!Number.isFinite(cur)) {
            clearAll();
            return;
        }

        if (previous === null) {
            previous = cur;
        } else if (operator && !justEvaluated) {
            try {
                previous = compute(previous, operator, cur);
            } catch (_) {
                setScreen("Opération non dispo");
                return;
            }
            if (!Number.isFinite(previous)) {
                setScreen("Erreur");
                return;
            }
        }

        operator = op;
        justEvaluated = false;
        current = "0";
        setHistory(`${formatNumberString(String(previous))} ${op}`);
        setScreen("0");
    }

    function equals() {
        if (operator === null || previous === null) return;

        const cur = Number(current);
        let result;
        try {
            result = compute(previous, operator, cur);
        } catch (_) {
            setScreen("Opération non dispo");
            return;
        }

        if (!Number.isFinite(result)) {
            setScreen("Erreur");
            return;
        }

        setHistory(`${formatNumberString(String(previous))} ${operator} ${formatNumberString(String(cur))} =`);
        setScreen(formatNumberString(String(result)));

        previous = result;
        current = "0";
        operator = null;
        justEvaluated = true;
    }

    keys.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        if (btn.dataset.digit != null) inputDigit(btn.dataset.digit);
        if (btn.dataset.op) chooseOperator(btn.dataset.op);
        if (btn.dataset.action === "clear") clearAll();
        if (btn.dataset.action === "backspace") backspace();
        if (btn.dataset.action === "equals") equals();
    });

    window.addEventListener("keydown", (e) => {
        const k = e.key;

        if ((k >= "0" && k <= "9") || k === ".") {
            inputDigit(k);
            return;
        }
        if (k === "+" || k === "-" || k === "*") {
            chooseOperator(k);
            return;
        }
        if (k === "Enter" || k === "=") {
            e.preventDefault();
            equals();
            return;
        }
        if (k === "Backspace") {
            backspace();
            return;
        }
        if (k === "Escape") {
            clearAll();
        }
    });

    clearAll();
})();
