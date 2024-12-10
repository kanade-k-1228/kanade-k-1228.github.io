const light = "https://kanade-k-1228.github.io/.common/light.css";
const dark = "https://kanade-k-1228.github.io/.common/dark.css";

const setCss = (style) => {
  const css = document.getElementById("style");
  if (style === "light") {
    css.href = light;
    document.cookie = "style=light";
  } else if (style === "dark") {
    css.href = dark;
    document.cookie = "style=dark";
  } else {
    setCss("light");
  }
};

window.addEventListener("load", () => {
  const style = document.cookie
    .split("; ")
    .find((key) => key.startsWith("style"))
    .split("=")[1];
  console.log(style);
  setCss(style);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "l") setCss("light");
  if (e.key === "d") setCss("dark");
});
