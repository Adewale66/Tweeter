function getTimeFormat(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
}

export default getTimeFormat;
