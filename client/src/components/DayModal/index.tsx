import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { MONTHS } from '../../constants';
import { createEvent, deleteEvent, Event, getEventsByDate } from '../../services/event';
import styles from '../../styles/components/DayModal.module.css';
import removeIcon from '../../images/trash_remove_icon.png';
import marker from '../../images/marker.png';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MODAL_SHADOW_ID = 'modal-shadow';

interface Coords {
  lat: number;
  lng: number;
}

const DayModal: FunctionComponent<DayModalProps> = ({ dateToCreateEvent, setDateToCreateEvent }) => {
  const day = dateToCreateEvent?.getDate();
  const month = MONTHS[dateToCreateEvent?.getMonth() || 0];
  const year = dateToCreateEvent?.getFullYear();
  const [eventName, setEventName] = useState<string>('');
  const [timeStart, setTimeStart] = useState<string>('');
  const [timeEnd, setTimeEnd] = useState<string>('');
  const [events, setEvents] = useState<Array<Event>>([]);
  const [center, setCenter] = useState<Coords>({
    lat: -29,
    lng: -51,
  });
  const [currentPosition, setCurrentPosition] = useState<Coords>(center);

  const onModalClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = (event.target as HTMLElement).id;
    if (id === MODAL_SHADOW_ID) {
      setDateToCreateEvent(undefined);
    }
  };

  const addZeroes = (hourOrMinutes = '') => {
    return Array(3 - String(hourOrMinutes).length).join('0') + String(hourOrMinutes);
  };

  useEffect(() => {
    setEvents([]);
    if (Boolean(dateToCreateEvent)) {
      (async function x() {
        setEvents(await getEventsByDate(dateToCreateEvent || new Date()));
      })();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [dateToCreateEvent]);

  useEffect(() => {
    setCurrentPosition(center);
  }, [center]);

  const handleSubmit = async (event: React.FormEvent) => {
    const startAt = dateToCreateEvent ? new Date(dateToCreateEvent) : new Date();
    const [hoursStart, minutesStart] = timeStart.split(':');
    startAt.setHours(Number(hoursStart));
    startAt.setMinutes(Number(minutesStart));

    const endAt = dateToCreateEvent ? new Date(dateToCreateEvent) : new Date();
    const [hoursEnd, minutesEnd] = timeStart.split(':');
    endAt.setHours(Number(hoursEnd));
    endAt.setMinutes(Number(minutesEnd));
    event.preventDefault();

    const newEvent: Event = {
      name: eventName,
      startAt,
      endAt,
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    };
    await createEvent(newEvent);
    setEvents(await getEventsByDate(dateToCreateEvent || new Date()));
    setEventName('');
    setTimeStart('');
    setTimeEnd('');
  };

  const onRemoveClick = async (index: number) => {
    const eventToDelete = events[index];
    if (eventToDelete._id) {
      await deleteEvent(eventToDelete._id);
      setEvents(events.filter((event) => event._id !== eventToDelete._id));
    }
  };

  const containerStyle = {
    width: '500px',
    height: '250px',
    display: 'inline-block',
    borderRadius: '10px',
    marginBottom: '10px',
  };

  const onMarkerDragEndOrClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  return (
    <div
      className={`${styles.dayModal} ${Boolean(dateToCreateEvent) ? styles.dayModalOpen : ''}`}
      id={MODAL_SHADOW_ID}
      onClick={onModalClick}
    >
      <div className={styles.dayModalContent}>
        <div className={styles.dayModalTitle}>
          {day} de {month} de {year}
        </div>
        <div>
          <div className={styles.dayModalAddNew}>
            <div className={styles.dayModalAddNewTitle}>Adicionar novo evento</div>
            {Boolean(dateToCreateEvent) && (
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY ?? ''}>
                <GoogleMap
                  zoom={10}
                  mapContainerStyle={containerStyle}
                  center={center}
                  onClick={onMarkerDragEndOrClick}
                >
                  <Marker position={currentPosition} draggable onDragEnd={onMarkerDragEndOrClick} />
                </GoogleMap>
              </LoadScript>
            )}
            <form onSubmit={handleSubmit}>
              <input
                required
                placeholder="Nome do evento"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
              />
              Inicio:{' '}
              <input required type="time" value={timeStart} onChange={(event) => setTimeStart(event.target.value)} />
              Fim: <input required type="time" value={timeEnd} onChange={(event) => setTimeEnd(event.target.value)} />
              <button>Adicionar</button>
            </form>
          </div>
          <div className={styles.dayModalList}>
            {events.length > 0 &&
              events.map((event, index) => {
                const startAt = new Date(event.startAt);
                const endAt = new Date(event.endAt);
                const startAtHours = addZeroes(String(startAt.getHours()));
                const startAtMinutes = addZeroes(String(startAt.getMinutes()));
                const endAtHours = addZeroes(String(endAt.getHours()));
                const endAtMinutes = addZeroes(String(endAt.getMinutes()));
                return (
                  <li key={index}>
                    {event.name} - <strong>Inicio</strong>: {startAtHours}:{startAtMinutes} / <strong>Fim</strong>:{' '}
                    {endAtHours}:{endAtMinutes}
                    <img
                      src={removeIcon}
                      className={styles.dayModalListIcon}
                      onClick={() => onRemoveClick(index)}
                    ></img>
                    <img
                      src={marker}
                      className={styles.dayModalListIcon}
                      onClick={() => window.open(`https://maps.google.com/?q=${event.lat},${event.lng}`)}
                    ></img>
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

type DayModalProps = {
  dateToCreateEvent: Date | undefined;
  setDateToCreateEvent: Dispatch<SetStateAction<Date | undefined>>;
};

export default DayModal;
