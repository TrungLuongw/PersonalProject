function calculate(oldDate) {
  let time = (Date.now() - new Date(oldDate)) / 1000;
  if (time <= 60) {
    return "few seconds ago";
  } else if (time / 60 < 60) {
    return `${Math.floor(time / 60)} minutes ago`;
  } else if (time / 3600 < 60) {
    return `${Math.floor(time / 3600)} giờ trước`;
  } else {
    return `${Math.floor(time / (3600 * 24))} ngay trước`;
  }
}

const a = calculate("2022-07-14T04:52:35.790Z");
console.log(a);
