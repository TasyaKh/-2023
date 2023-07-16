import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsNumber, IsOptional, } from "class-validator";

export class FindDashboardsYandexDto {

    // ids=12418261&metrics=ym:s:visits
    //&dimensions=ym:s:gender&sort=-ym:s:visits&date1=2023-06-07
    // &date2=2023-07-07
    //&filters=ym:s:gender!n&group=all&lang=ru

    @IsOptional()
    sort:string[] = []

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    limit:number

    @IsOptional()
    lang:string = "ru"

    @IsOptional()
    filters:string[] = []

    @IsOptional()
    group:string

    // ex ym:s:visits
    @IsOptional()
    @IsArray()
    metrics: string[] = []

    // ex ym:s:gender
    @IsOptional()
    @IsArray()
    dimensions:string[] = []

    // ид проектов
    @IsNumber()
    @Type(()=>Number)
    ids: number

    @IsDate()
    @Type(()=>Date)
    date1: Date

    @IsDate()
    @Type(()=>Date)
    date2: Date
}
