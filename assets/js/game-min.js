const myModuleGame = (() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    n = ["A", "J", "Q", "K"];
  let o = [];
  const r = document.querySelector("#btnAsk"),
    l = document.querySelector("#btnStop"),
    s = document.querySelector("#btnNew"),
    d = document.querySelectorAll("small"),
    c = document.querySelectorAll(".divCards"),
    a = (t = 2) => {
      (e = i()), (o = []);
      for (let e = 0; e < t; e++) o.push(0);
      d.forEach((e) => (e.innerText = 0)),
        c.forEach((e) => (e.innerHTML = "")),
        (r.disabled = !1),
        (l.disabled = !1);
    },
    i = () => {
      e = [];
      for (let n = 2; n <= 10; n++) for (let o of t) e.push(n + o);
      for (let o of t) for (let t of n) e.push(t + o);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw "There are no cards on deck";
      return e.pop();
    },
    b = (e, t) => (
      (o[t] += ((e) => {
        const t = e.substring(0, e.length - 1);
        return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
      })(e)),
      (d[t].innerText = o[t]),
      o[t]
    ),
    f = (e, t) => {
      const n = document.createElement("img");
      (n.src = `./assets/cartas/${e}.png`),
        n.classList.add("cards"),
        c[t].append(n);
    },
    h = (e) => {
      let t = 0;
      do {
        const e = u();
        (t = b(e, o.length - 1)), f(e, o.length - 1);
      } while (t < e && e <= 21);
      (() => {
        const [e, t] = o;
        setTimeout(() => {
          t === e
            ? alert("Nobody wins!")
            : e > 21
            ? alert("You lose!")
            : e > t || t > 21
            ? alert("You win!")
            : alert("You lose!");
        }, 400);
      })();
    };
  return (
    r.addEventListener("click", () => {
      const e = u(),
        t = b(e, 0);
      f(e, 0),
        t > 21
          ? (console.warn("You lose!"),
            (r.disabled = !0),
            (l.disabled = !0),
            h(t))
          : 21 === t &&
            (console.warn("21, great!"),
            (r.disabled = !0),
            (l.disabled = !0),
            h(t));
    }),
    l.addEventListener("click", () => {
      (r.disabled = !0), (l.disabled = !0), h(o[0]);
    }),
    s.addEventListener("click", () => {
      a();
    }),
    { newGame: a }
  );
})();
