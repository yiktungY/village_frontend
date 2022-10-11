function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago';
  } else if (elapsed < milliSecondsPerHour) {
    return (
      Math.round(elapsed / milliSecondsPerMinute) +
      ' min ago'
    );
  } else if (elapsed < milliSecondsPerDay) {
    return (
      Math.round(elapsed / milliSecondsPerHour) + ' h ago'
    );
  } else if (elapsed < milliSecondsPerMonth) {
    return (
      Math.round(elapsed / milliSecondsPerDay) + ' days ago'
    );
  } else if (elapsed < milliSecondsPerYear) {
    return (
      Math.round(elapsed / milliSecondsPerMonth) + ' mon ago'
    );
  } else {
    return (
      Math.round(elapsed / milliSecondsPerYear) +
      ' years ago'
    );
  }
}



export function timeDifferenceForDate(date) {
  const current = new Date().getTime();
  const previous = new Date(date).getTime();
  return timeDifference(current, previous)
}

export const readableTimestamp = (date, format, month) => {
  const currentTime = new Date(date)
  if (currentTime == "Invalid Date") return "Invalid Date"
  let newDate = ""
  let monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];
  if (format === undefined || format === null) {
    format = "D-M-Y at h:m"
  }
  for (let i = 0; i < format.length; i++) {
    switch (format[i]) {
      case "Y":
        newDate += currentTime.getFullYear()
        break
      case "M":
        let months = currentTime.getMonth() + 1
        if (month === "month") {
          newDate += monthsList[months - 1];
          break
        } else {
          if (months < 10) {
            months = "0" + months
          }
          newDate += months
        }
        break
      case "D":
        let days = currentTime.getDate()

        if (days < 10) {
          days = "0" + days
        }
        newDate += days
        break
      case "h":
        let hour = currentTime.getHours()
        if (hour < 10) {
          hour = "0" + hour
        }
        newDate += hour
        break
      case "m":
        let minute = currentTime.getMinutes()
        if (minute < 10) {
          minute = "0" + minute
        }
        newDate += minute
        break
      case "s":
        let second = currentTime.getSeconds()
        if (second < 10) {
          second = "0" + second
        }
        newDate += second
        break
      default:
        newDate += format[i]
        break
    }
  }
  return newDate
}