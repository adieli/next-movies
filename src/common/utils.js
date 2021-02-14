// Receives duration in string, for example 1h29m, and converts to number of minutes
const convertStringDurationToMinutes = (stringDuration) => {
  // Assuming the number of hours is more than 0 and less than 10, for the sake of this project,
  // Of course the search can be arranged with indexOf
  const hours = parseInt(stringDuration.charAt(0), 10);
  const minutes = parseInt(stringDuration.substring(2, stringDuration.length - 1), 10);
  return hours * 60 + minutes;
};

export default convertStringDurationToMinutes;
