// Your code here
function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
}

function allWagesFor(employee) {
        const datesWorked = employee.timeInEvents.map(event => event.date); //new array to store data where employee worked
        const totalWages = datesWorked.reduce((sum, date) => sum + wagesEarnedOnDate(employee, date), 0); //calculate wages sum starts at 0
        return totalWages;
      }

      function calculatePayroll(employees) {
        const totalPayroll = employees.reduce((sum, employee) => sum + allWagesFor(employee), 0);
        return totalPayroll;
      }