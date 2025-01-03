// ---------------Imports----------------
import moment from "moment";
// -------------------------------------

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
