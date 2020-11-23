export default function(value, args) {
  let unit = " °C";
  if (args) {
    unit = args;
  }
  return (parseInt(value, 10) - 273.15).toFixed(2) + unit;
}
