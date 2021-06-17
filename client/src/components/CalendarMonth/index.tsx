import React, { FunctionComponent } from 'react';
import { history } from '../../App';
import { MONTHS } from '../../constants';
import styles from '../../styles/components/CalendarMonth.module.css';

const CalendarMonth: FunctionComponent<CalendarMonthProps> = ({ monthIndex, events }) => {
  const month: string = MONTHS[monthIndex];
  const eventsInMonth: number = events[monthIndex];

  const onClick = () => {
    history.push(`/month/${monthIndex}`);
  };

  return (
    <div className={styles.calendarMonth} onClick={onClick}>
      <div className={styles.calendarMonthTitle}>{month}</div>
      <div className={styles.calendarMonthEvents}>{eventsInMonth ?? 0} eventos</div>
    </div>
  );
};

type CalendarMonthProps = {
  monthIndex: number;
  events: Record<number, number>;
};

export default CalendarMonth;
