let timerStart;
let timeSpentOnSite = 0;

function getTimeSpentOnSite() {
  timeSpentOnSite = parseInt(localStorage.getItem("timeSpentOnSite"));
  timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
  return timeSpentOnSite;
}

export function startCounting(setTimeSpent) {
  timerStart = Date.now();
  setInterval(function () {
    timeSpentOnSite = getTimeSpentOnSite() + (Date.now() - timerStart);
    localStorage.setItem("timeSpentOnSite", timeSpentOnSite);

    setTimeSpent(parseInt(timeSpentOnSite / 60000));
  }, 1000);
}
