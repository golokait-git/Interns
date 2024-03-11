  // Function to calculate business days between two dates
  const getBusinessDays = (startDate, endDate) => {
    let totalDays = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (
        currentDate.getDay() !== 0 &&
        currentDate.getDay() !== 6 &&
        !holidays.includes(currentDate)
      ) {
        totalDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return totalDays;
  };
  // const dataToSend = {
  //   ...employee,
  //   end_date: employee.end_date ? employee.end_date : null,
  // };
