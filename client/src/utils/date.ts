// ---------------Imports----------------
import moment from "moment";
// -------------------------------------

// dateDisplayFormat -  formatting date in the human readable form
export const dateDisplayFormat = (date: string) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

// formatDate - formats the date according to the specified format
export const formatDate = (
  date: string | Date,
  format: string = "YYYY-MM-DD HH:mm"
) => {
  return moment(date).format(format);
};

// backendDateFormat - formatting the date as per the backend requirement
export const backendDateFormat = (date: string) => {
  return moment(date, "YYYY-MM-DD HH:mm").toISOString();
};
