

export function convertHourStringToMinutes(hourString: string) {
    console.log(hourString);
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutesAmount = hours * 60 + minutes

    return minutesAmount
}