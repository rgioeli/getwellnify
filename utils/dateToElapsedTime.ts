export const dateToElapsedTimeAgo = (date: Date) => {
  console.log(date);
  const now = new Date();
  const timeDiff = Math.floor((now.getTime() - date.getTime()) / 1000); // Time difference in seconds

  if (timeDiff < 60) {
    console.log(timeDiff);
    return timeDiff + "s ago";
  } else if (timeDiff < 3600) {
    const minutes = Math.floor(timeDiff / 60);
    console.log(minutes);
    return minutes + "m ago";
  } else if (timeDiff < 86400) {
    const hours = Math.floor(timeDiff / 3600);
    return hours + "h ago";
  } else {
    const days = Math.floor(timeDiff / 86400);
    return days + "d ago";
  }
};
