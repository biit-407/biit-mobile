export function getShortMonthName(date: Date) {
    const month = date.getUTCMonth() + 1
    if (month == 1) {
        return 'Jan'
    }
    if (month == 2) {
        return 'Feb'
    }
    if (month == 3) {
        return 'Mar'
    }
    if (month == 4) {
        return 'Apr'
    }
    if (month == 5) {
        return 'May'
    }
    if (month == 6) {
        return 'Jun'
    }
    if (month == 7) {
        return 'Jul'
    }
    if (month == 8) {
        return 'Aug'
    }
    if (month == 9) {
        return 'Sep'
    }
    if (month == 10) {
        return 'Oct'
    }
    if (month == 11) {
        return 'Nov'
    }
    if (month == 12) {
        return 'Dec'
    }
    return 'NONE'
}

export function getDayAsString(date: Date) {
    const day = date.getDay() + 1
    if (day == 1 || day == 21 || day == 31) {
        return `${day}st`
    }
    if (day == 2 || day == 22 || day == 32) {
        return `${day}nd`
    }
    if (day == 3 || day == 23 || day == 33) {
        return `${day}rd`
    }
    return `${day}th`
}

export function getTimeAsString(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strMinutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + strMinutes + ' ' + ampm;
    return strTime;
}


