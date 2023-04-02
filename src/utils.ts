export function formatDate(date: Date) {
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hours: string | number = date.getHours()
    let minutes: string | number = date.getMinutes()

    if (0 <= hours && hours < 10) hours = '0' + hours
    if (0 <= minutes && minutes < 10) minutes = '0' + minutes

    const monthTranscript: {[month: number]: string} = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    return `${day} ${monthTranscript[month]} ${year}, ${hours}:${minutes}`
}