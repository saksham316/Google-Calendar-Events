declare global {
  interface ICalendarCreationData {
    eventName: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    user: string | string[];
  }
}
export {};
