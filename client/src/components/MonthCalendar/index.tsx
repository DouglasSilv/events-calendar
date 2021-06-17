import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { history } from '../../App';
import { MONTHS } from '../../constants';
import { getEventsByMonthGroupedByDay } from '../../services/event';
import styles from '../../styles/components/MonthCalendar.module.css';
import DayModal from '../DayModal';

interface RouteParams {
  index: string;
}

const daysInMonth = (month: number, year: number) => {
  const date = new Date(year, month + 1, 0).getDate();
  return Array.from(Array(date).keys());
};

const GRID_ROWS = 6;
const GRID_COLUMNS = 7;

const MonthCalendar: FunctionComponent = () => {
  const { index } = useParams<RouteParams>();
  const month: string = MONTHS[Number(index)];
  const year = new Date().getFullYear();
  const startingWeekday = new Date(year, Number(index)).getDay();
  const startingBlankItems = Array.from(Array(startingWeekday).keys());
  const days = daysInMonth(Number(index), year);
  const countEndingItems = GRID_ROWS * GRID_COLUMNS - days.length - startingBlankItems.length;
  const endingBlankItems = Array.from(Array(countEndingItems).keys());
  const [dateToCreateEvent, setDateToCreateEvent] = useState<Date>();

  useEffect(() => {
    if (isNaN(Number(index)) || Number(index) >= 12 || Number(index) < 0) {
      history.push('/');
    }
  }, []);

  const [events, setEvents] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!dateToCreateEvent) {
      (async function x() {
        setEvents(await getEventsByMonthGroupedByDay(Number(index)));
      })();
    }
  }, [dateToCreateEvent]);

  const onBackClick = () => {
    history.push('/');
  };

  const onDayClick = (day: number) => {
    const month = Number(index) + 1;
    const year = new Date().getFullYear();
    setDateToCreateEvent(new Date(`${month}/${day}/${year}`));
  };

  return (
    <>
      <DayModal dateToCreateEvent={dateToCreateEvent} setDateToCreateEvent={setDateToCreateEvent} />
      <div className={styles.monthCalendar}>
        <div className={styles.monthCalendarHeader}>
          <div className={styles.monthCalendarBack} onClick={onBackClick}>
            Voltar
          </div>
          <div className={styles.monthCalendarTitle}>
            {month}, {year}
          </div>
        </div>
        <div className={styles.monthCalendarBody}>
          <div className={styles.monthCalendarWeekdays}>
            <div className={styles.monthCalendarWeekday}>Seg</div>
            <div className={styles.monthCalendarWeekday}>Ter</div>
            <div className={styles.monthCalendarWeekday}>Qua</div>
            <div className={styles.monthCalendarWeekday}>Qui</div>
            <div className={styles.monthCalendarWeekday}>Sex</div>
            <div className={styles.monthCalendarWeekday}>Sab</div>
            <div className={styles.monthCalendarWeekday}>Dom</div>
          </div>
          <div className={styles.monthCalendarDays}>
            {startingBlankItems.map((_, index) => (
              <div key={index} className={styles.monthCalendarDay} />
            ))}
            {days.map((value, index) => (
              <div
                key={index}
                onClick={() => onDayClick(value + 1)}
                className={`${styles.monthCalendarDay} ${styles.dayValid} ${
                  events[value + 1] > 0 ? styles.hasEvents : ''
                }`}
              >
                {value + 1}
              </div>
            ))}
            {endingBlankItems.map((_, index) => (
              <div key={index} className={styles.monthCalendarDay} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthCalendar;
