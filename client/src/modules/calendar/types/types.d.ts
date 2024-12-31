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
    created: string;
    start: {
      dateTime: string;
    };
    end: {
      dateTime: string;
    };
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
    data: {
      items: [];
    };
  }
}
export {};
