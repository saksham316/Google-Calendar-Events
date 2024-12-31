import "./createEventCard.css";

const CreateEventCard = ({ setOpenEventModal }: ICreateEventCardProps) => {
  return (
    <div className="create-event-card">
      <div className="create-event-card__title">
        <h1>Begin With Creating a Event</h1>
      </div>
      <div className="create-event-card__sub-title">
        <p>The more you create the smoother it gets...</p>
      </div>
      <div className="create-event-card__add-card">
        <button
          onClick={() => {
            setOpenEventModal(true);
          }}
        >
          + Create Event +
        </button>
      </div>
    </div>
  );
};

export { CreateEventCard };
