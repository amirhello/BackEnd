const { Try } = require("@mui/icons-material");

function craetH1() {
  for (i = 0; i < 10; i++) {
    const head = document.querySelector(".heading");

    const h1 = document.createElement("h1");

    h1.append("hello world");

    document.body.appendChild(h1);
  }
}
// -----------------------Event----------------------------------
function event1() {
  const btn = document.createElement("button");

  btn.classList.add("btn1");
  btn.append("click");
  document.body.append(btn);

  // btn.onclick = (e) => {
  //   e.preventDefault();
  //   console.log("clicked");
  // };

  btn.addEventListener("click", () => {
    console.log("clicked");
  });
}

// -----------------------OOP----------------------------------

function OOP() {
  class Car {
    constructor(e, c, p) {
      this.price = p;
      this.color = c;
      this.engin = e;
    }
  }

  const car1 = new Car(12, "white", 1000);

  console.log(car1);
}

// ---------------------------Try and Catch------------------------------

function TryAndCatch() {
  try {
    console.log("tyr is running");
    amir();
    console.log("after try");
  } catch {
    console.log("catch is runnig");
  } finally {
    console.log("alwase run");
  }
}

// TryAndCatch();

// ---------------------------------------------------------
