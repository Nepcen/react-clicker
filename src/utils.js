import sync from "css-animation-sync";

export const syncEffects = () => {
  sync("rainbow-text-shadow");
  sync("rainbow-border");
  sync("rainbow-box-shadow");
};

export const updateHighScore = (lastScores, ccount) => {
  lastScores = lastScores.map((sc) => {
    if (sc.time == localStorage.getItem("lastTime")) {
      sc.score = ccount;
    }
    return sc;
  });

  localStorage.setItem("highScores", JSON.stringify(lastScores));
};
