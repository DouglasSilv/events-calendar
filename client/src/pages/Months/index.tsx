import React, { FunctionComponent, useEffect, useState } from 'react';
import CalendarMonth from '../../components/CalendarMonth';
import { MONTHS } from '../../constants';
import { getEventsGroupedByMonth } from '../../services/event';
import styles from '../../styles/pages/Months.module.css';

const Months: FunctionComponent = () => {
  const [events, setEvents] = useState<Record<number, number>>({});

  useEffect(() => {
    (async function x() {
      setEvents(await getEventsGroupedByMonth());
    })();
  }, []);

  return (
    <div>
      <div className={styles.myCalendar}>
        {MONTHS.map((_, index) => (
          <CalendarMonth key={index} monthIndex={index} events={events} />
        ))}
      </div>
    </div>
  );
};

export default Months;
