declare global {
  interface IAddEventModalProps {
    open: boolean;
    close: () => void;
  }

  interface ICreateEventCardProps {
    setOpenEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
  interface ICalendarEvents {
    summary: string;
    createdAt: string;
    startDate: string;
    endDate: string;
  }

  interface ICalendarEventInitialState {
    isAddCalendarEventLoading: boolean;
    calendarEvents: Array<ICalendarEvents> | [];
    isFetchCalendarEventLoading: boolean;
  }

  // createCalendarEvent
  interface ICreateCalendarEventPayload {
    startDate: string;
    endDate: string;
    eventName: string;
  }

  interface ICreateCalendarEventApiRes extends Omit<IDefaultAPIRes, "data"> {}
  interface IFetchCalendarEventApiRes extends Omit<IDefaultAPIRes, "data"> {
    data: [];
  }
}
export {};
