import { FindDashboardsYandexDto } from "src/yandex/dto/find-dashboards.dto"

// здесь хранятся запросы к дашбордам яндекс

//8_6400_000 - one day, 
export const date1D = new Date(new Date().getTime() - 8_6400_000 * 30)
// today
export const date2D = new Date()

export const deviceDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:deviceCategory")
    dshbYDto.filters.push("ym:s:deviceCategory!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")

    return dshbYDto
}

export const sourceTrafficDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignTrafficSource")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")

    return dshbYDto
}

export const searchPhraseDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 100

    return dshbYDto
}


export const searchEngineDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngine")
    dshbYDto.dimensions.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchPhrase")

    dshbYDto.filters.push("ym:s:CROSS_DEVICE_LAST_SIGNIFICANTSearchEngineRoot!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 100

    return dshbYDto
}


export const browsersDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2

    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.dimensions.push("ym:s:lastSignSearchEngine")
    dshbYDto.filters.push("ym:s:LastSignSearchEngine!n")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")
    dshbYDto.limit = 100

    return dshbYDto
}

// goal-dimension конверсии
export const goalDimensionDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2
    
    // dshbYDto.metrics.push("ym:s:goalDimensionInternalReaches")
    dshbYDto.metrics.push("ym:s:sumVisits")
    dshbYDto.dimensions.push("ym:s:goalDimension")
    dshbYDto.group = "day"
    // dshbYDto.sort.push("-ym:s:goalDimensionInternalReaches")
    dshbYDto.limit = 100


    return dshbYDto
}

// visits
export const visitsDashboard = (ids:number, date1:Date = date1D, date2:Date = date2D) => {
    const dshbYDto = new FindDashboardsYandexDto()

    dshbYDto.ids = ids
    dshbYDto.date1 = date1
    dshbYDto.date2 = date2
    
    dshbYDto.metrics.push("ym:s:visits")
    dshbYDto.group = "day"
    dshbYDto.sort.push("-ym:s:visits")

    return dshbYDto
}

// https://api-metrika.yandex.net/stat/v1/data
// /bytime?metrics=ym:s:visits&ids=12418261&date1=2023-06-17
// &date2=2023-07-16&group=day&sort=-ym:s:visits