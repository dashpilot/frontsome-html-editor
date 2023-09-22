const editor_container = document.querySelector("#editor_container");
const editor = document.querySelector("#editor");
const welcome_message = document.querySelector("#welcome_message");

const editor_title = document.querySelector("#editor_title");
const input_title = document.querySelector("#input_title");
const editor_text = document.querySelector("#editor_text");
const input_text = document.querySelector("#input_text");
const editor_image = document.querySelector("#editor_image");
const input_image = document.querySelector("#input_image");
const btn_image = document.querySelector("#btn_image");
let curEl = false;

const title = ["H1", "H2", "H3", "H4", "H5"];
const text = ["P"];
const image = ["IMG"];

new inLine("#input_text", {
  toolbar: [
    "bold",
    "italic",
    "underline",
    "unorderedList",
    "orderedList",
    "link",
  ],
  onChange: function (api) {
    curEl.innerHTML = input_text.innerHTML;
  },
});

cfg = {
  img_width: 800,
};

input_title.addEventListener("keyup", (ev) => {
  curEl.innerText = input_title.value;
});

input_text.addEventListener("keyup", (ev) => {
  curEl.innerHTML = input_text.innerHTML;
});

btn_image.addEventListener("click", (ev) => {
  input_image.click();
});

document.body.addEventListener("click", (event) => {
  if (event.target.closest(".editor_container")) {
    console.log(event.target.id);
    if (event.target.id == "wdgt_close") {
      // editor_container.style.display = "none";
      editor_container.classList.add("fade-out");
    }
  } else {
    editor_container.classList.remove("fade-out");

    welcome_message.style.display = "none";
    const type = event.target.tagName;
    const el = event.target;
    curEl = event.target;
    console.log(type);

    editor_container.style.display = "block";
    document.querySelectorAll(".editor_input").forEach((myel) => {
      myel.style.display = "none";
    });

    document.querySelectorAll(".current-item").forEach((myel) => {
      myel.classList.remove("current-item");
    });

    if (title.includes(type)) {
      let content = el.innerText;
      input_title.value = content;
      editor_title.style.display = "block";
      curEl.classList.add("current-item");
      editor_container.style.height = "110px";
    }

    if (text.includes(type)) {
      let content = el.innerHTML.replace(/\s{2,}/g, " ").trim();
      input_text.innerHTML = content;
      editor_text.style.display = "block";
      curEl.classList.add("current-item");
      editor_container.style.height = "330px";
    }

    if (image.includes(type)) {
      editor_image.style.display = "block";
      curEl.classList.add("current-item");
      editor_container.style.height = "110px";
    }
  }
});

document.getElementById("input_image").addEventListener("change", function (e) {
  var img = new Image();

  img.onload = function () {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      oc = document.createElement("canvas"),
      octx = oc.getContext("2d");

    canvas.width = cfg.img_width; // destination canvas size
    canvas.height = (canvas.width * img.height) / img.width;

    var cur = {
      width: Math.floor(img.width * 0.5),
      height: Math.floor(img.height * 0.5),
    };
    oc.width = cur.width;
    oc.height = cur.height;
    octx.drawImage(img, 0, 0, cur.width, cur.height);
    while (cur.width * 0.5 > cfg.img_width) {
      cur = {
        width: Math.floor(cur.width * 0.5),
        height: Math.floor(cur.height * 0.5),
      };
      octx.drawImage(
        oc,
        0,
        0,
        cur.width * 2,
        cur.height * 2,
        0,
        0,
        cur.width,
        cur.height
      );
    }
    ctx.drawImage(
      oc,
      0,
      0,
      cur.width,
      cur.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    var base64Image = canvas.toDataURL("image/jpeg");

    console.log(base64Image);

    curEl.src = base64Image;
  };

  img.src = URL.createObjectURL(e.target.files[0]);
});
