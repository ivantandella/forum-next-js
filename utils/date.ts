export function convertDate(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function timeAgo(timestamp: string) {
  const moment = require("moment");

  // const date = moment(convertDate(timestamp), "M/D/YYYY, h:mm:ss A");
  const date = moment(timestamp);

  const relativeTime = date.fromNow();
  return relativeTime;
}
