function getTimeFormat(timestamp: string) {
  // Splitting the date and time components
  const [dateStr, timeStr] = timestamp.split("T");

  // Extracting  month, and day from the date component
  const data = dateStr.split("-");

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthWord: string = monthNames[Number(data[1]) - 1];

  // Extracting hours and  minutes from the time component
  const [hours, minutes] = timeStr.split(":");
  const date = `${monthWord} ${data[2]} at ${hours}:${minutes}`;

  return date;
}

export default getTimeFormat;
