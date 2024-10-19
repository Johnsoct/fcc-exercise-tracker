function localToUTCDate (localDate) {
        const year = new Date(localDate).getUTCFullYear()
        const month = new Date(localDate).getUTCMonth()
        const day = new Date(localDate).getUTCDate()
        const UTCDate = new Date(Date.UTC(year, month, day))

        return new Date(UTCDate.getTime() + UTCDate.getTimezoneOffset() * 60000).toDateString()
}

module.exports = {
        localToUTCDate,
}
