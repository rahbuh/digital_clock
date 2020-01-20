(function() {
  const dayNames = [
    ["Sunday", "Sun"],
    ["Monday", "Mon"],
    ["Tuesday", "Tue"],
    ["Wednesday", "Wed"],
    ["Thursday", "Thu"],
    ["Friday", "Fri"],
    ["Saturday", "Sat"]
  ];
  const monthNames = [
    ["January", "Jan"],
    ["February", "Feb"],
    ["March", "Mar"],
    ["April", "Apr"],
    ["May", "May"],
    ["June", "Jun"],
    ["July", "Jul"],
    ["August", "Aug"],
    ["September", "Sep"],
    ["October", "Oct"],
    ["November", "Nov"],
    ["December", "Dec"]
  ];

  const timeDisplay = document.getElementById("time");
  const dateDisplay = document.getElementById("date");
  const amPmDisplay = document.getElementById("am-pm");
  const toggleDate = document.getElementById("date-format");
  const toggleTime = document.getElementById("time-format");
  const togglePower = document.getElementById("power");

  let isMilitary = true;
  let isRunning = true;
  let dateFormat = 1;
  let clockInterval;

  toggleDate.addEventListener("click", () => dateFormat++);

  toggleTime.addEventListener("click", () => {
    isMilitary = !isMilitary;
    isMilitary
      ? (toggleTime.innerText = "SHOW 12HR")
      : (toggleTime.innerText = "SHOW 24HR");
  });

  togglePower.addEventListener("click", () => {
    isRunning = !isRunning;
    if (isRunning) {
      togglePower.innerText = "OFF";
      clockInterval = setInterval(runClock, 1000);
    } else {
      togglePower.innerText = "ON";
      clearInterval(clockInterval);
    }
  });

  function runClock() {
    const date = new Date();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    timeDisplay.innerHTML = displayTime(hrs, mins, secs);
    dateDisplay.innerText = displayDate(dayOfWeek, month, day, year);
  }

  function displayTime(hrs, mins, secs) {
    amPmDisplay.hidden = isMilitary;
    amPmDisplay.innerText = "AM";

    if (!isMilitary) {
      if (hrs === 0) {
        hrs = 12;
      } else if (hrs > 12) {
        hrs = hrs - 12;
        amPmDisplay.innerText = "PM";
      }
    }

    return `<span id="hours">${
      isMilitary ? format(hrs) : hrs
    }</span>:<span id="minutes">${format(
      mins
    )}</span>:<span id="seconds">${format(secs)}</span>`;
  }

  function displayDate(dayOfWeek, month, day, year) {
    const format = {
      1: `${dayNames[dayOfWeek][0]}, ${monthNames[month][0]} ${day}, ${year}`,
      2: `${month + 1}/${day}/${year - 2000}`,
      3: `${monthNames[month][0]} ${getSuffix(day)}`,
      4: `${dayNames[dayOfWeek][1]}, ${monthNames[month][1]} ${getSuffix(day)}`
    };

    if (dateFormat > Object.keys(format).length) {
      dateFormat = 1;
    }

    return format[dateFormat];
  }

  function format(time) {
    return time < 10 ? `0${time}` : time;
  }

  function getSuffix(day) {
    if (day > 10 && day < 14) {
      return `${day}th`;
    } else {
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  }

  clockInterval = setInterval(runClock, 1000);
})();
