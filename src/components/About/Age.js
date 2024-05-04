import React, { useState, useEffect } from 'react';

function AgeCounter() {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = new Date();
      today.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); // Set the time zone to IST

      const birthday = new Date('1999-11-10'); // Example birthday, format: yyyy-mm-dd

      let ageYear = today.getFullYear() - birthday.getFullYear();
      let ageMonth = today.getMonth() - birthday.getMonth();
      let ageDay = today.getDate() - birthday.getDate();
      let ageHour = today.getHours() - birthday.getHours();
      let ageMinute = today.getMinutes() - birthday.getMinutes();
      let ageSecond = today.getSeconds() - birthday.getSeconds();
      let ageMillisecond = today.getMilliseconds() - birthday.getMilliseconds();

      if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < birthday.getDate())) {
        ageYear--;
        ageMonth += 12;
      }
      if (ageDay < 0) {
        const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDay += prevMonthLastDay;
        ageMonth--;
      }
      if (ageHour < 0) {
        ageDay--;
        ageHour += 24;
      }
      if (ageMinute < 0) {
        ageHour--;
        ageMinute += 60;
      }
      if (ageSecond < 0) {
        ageMinute--;
        ageSecond += 60;
      }
      if (ageMillisecond < 0) {
        ageSecond--;
        ageMillisecond += 1000;
      }

      setAge({
        years: ageYear,
        months: ageMonth,
        days: ageDay,
        hours: ageHour,
        minutes: ageMinute,
        seconds: ageSecond,
        milliseconds: ageMillisecond
      });
    }, 1); // Interval set to 1 millisecond

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1 className='font'>My age is -</h1>
      <p className='font'>{age.years} years, {age.months} months, {age.days} days, {age.hours} hours, {age.minutes} minutes, {age.seconds} seconds, and {age.milliseconds} milliseconds</p>
    </div>
  );
}

export default AgeCounter;
