import "./eventCalendar.css";
import { CreateEventCard } from "../createEventCard/CreateEventCard";
import { Table } from "../../../../shared/components";
import { AddEventModal } from "../addEventModal/AddEventModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { fetchCalendarEvents } from "../../redux/actions/calendarEventAction";
import { dateDisplayFormat } from "../../../../utils/date";

const EventCalendar = () => {
  const [openEventModal, setOpenEventModal] = useState<boolean>(false);

  const { calendarEvents } = useAppSelector((state) => state.calendarEvent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, []);

  return (
    <>
      <div className="event-calendar">
        <img src="/images/calBg.png" />
        {calendarEvents && calendarEvents.length ? (
          <Table
            onClickAddBtn={() => {
              setOpenEventModal(true);
            }}
            headerData={["Event Name", "Created At", "Start Date", "End Date"]}
            rowData={() => {
              const data = calendarEvents.map((item) => {
                return [
                  item.summary,
                  dateDisplayFormat(item.createdAt),
                  dateDisplayFormat(item.startDate),
                  dateDisplayFormat(item.endDate),
                ];
              });
              return data;
            }}
          />
        ) : (
          <CreateEventCard setOpenEventModal={setOpenEventModal} />
        )}
      </div>
      {openEventModal && (
        <AddEventModal
          open={openEventModal}
          close={() => {
            setOpenEventModal(false);
          }}
        />
      )}
    </>
  );
};

export { EventCalendar };
