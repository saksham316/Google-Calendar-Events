//------------------------Imports----------------------
import DatePicker from "react-datepicker";
import "./addEventModal.css";
import { createPortal } from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { backendDateFormat, formatDate } from "../../../../utils/date";
import { useAppDispatch } from "../../../../redux/store";
import {
  createCalendarEvent,
  fetchCalendarEvents,
} from "../../redux/actions/calendarEventAction";
// ---------------------------------------------------

// ---------------------------------------------------
const AddEventModal = ({ open, close }: IAddEventModalProps) => {
  //------------------------States----------------------
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [eventName, setEventName] = useState<string>("");
  // ---------------------------------------------------

  //------------------------Hooks----------------------
  const dispatch = useAppDispatch();
  // ---------------------------------------------------

  //----------------------Functions----------------------
  // dateHandler -- function to set the start/end date
  const dateHandler: (
    date: Date | null,
    onDateSelection: React.Dispatch<React.SetStateAction<Date>>
  ) => void = (date, onDateSelection) => {
    if (date) {
      onDateSelection(date);
    }
  };

  //createEvent -- function to create the event
  const createEvent = async () => {
    try {
      if (startDate && endDate && eventName) {
        const start = backendDateFormat(formatDate(startDate));
        const end = backendDateFormat(formatDate(endDate));
        const payload = { startDate: start, endDate: end, eventName };
        const resData = await dispatch(createCalendarEvent(payload));
        const res = resData.payload as ICreateCalendarEventApiRes;
        if (res.status === 200 && res.success === true) {
          dispatch(fetchCalendarEvents());
        }
        close();
      }
    } catch (error) {
      console.error(error);
      close();
    }
  };
  // ---------------------------------------------------
  const modalRoot = document.getElementById("modal-root");
  // ---------------------------------------------------
  return open && modalRoot ? (
    createPortal(
      <div className="add-event-modal">
        <div className="add-event-modal__card">
          <span className="add-event-modal__card-close-btn" onClick={close}>
            X
          </span>
          <div className="add-event-modal__card-title">
            <h2>Create Event</h2>
          </div>
          <div className="add-event-modal__card-content">
            <div className="add-event-modal__card-content-label">
              <label htmlFor="name">Name :</label>
              <label htmlFor="start-date">Start Date :</label>
              <label htmlFor="end-date">Start Date :</label>
            </div>
            <div className="add-event-modal__card-content-field">
              <div>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                />
              </div>
              <DatePicker
                className="date-picker-field"
                id="start-date"
                selected={startDate}
                showTimeSelect
                minDate={new Date()}
                onChange={(date) => {
                  dateHandler(date, setStartDate);
                }}
                dateFormat="MM/dd/yyyy h:mm aa"
              />
              <DatePicker
                className="date-picker"
                id="end-date"
                selected={endDate}
                showTimeSelect
                minDate={startDate}
                onChange={(date) => {
                  dateHandler(date, setEndDate);
                }}
                dateFormat="MM/dd/yyyy h:mm aa"
              />
            </div>
          </div>
          <div className="add-event-modal__card-add-btn">
            <button
              onClick={createEvent}
              disabled={!(startDate && endDate && eventName)}
            >
              Create
            </button>
          </div>
        </div>
      </div>,
      modalRoot
    )
  ) : (
    <></>
  );
};

export { AddEventModal };
