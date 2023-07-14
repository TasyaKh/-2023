import { defineStore } from 'pinia'

export const useChartConverterStore = defineStore('chartConverter', () => {


    // данные с яндекса подготовить для вывода в круговую диаграмму
    function yandexDataToPie(data: any) {

        let d = []

        for (let i = 0; i < data.length; i++) {

            d.push({
                value: data[i].metrics[0],
                name: data[i].dimensions[0].name,
            })
        }

        return d
    }

    // графики
    function charts(){
        return {
            // pie
            deviceCategory: {
                data: [{
                    value: -1,
                    name: "-"
                }],
                name: "Устройства",
                subname: "визиты"
            },

            searchEngine: {
                
            }

        }
    }

    return {
        yandexDataToPie,
        charts
    }
})
