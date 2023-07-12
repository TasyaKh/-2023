import { Transform, Type } from "class-transformer";
import { IsArray, IsDateString, IsNumber, IsOptional } from "class-validator";

export class PositionsTopvisorDto {

    // ID проекта
    @IsNumber()
    @Type(() => Number)
    project_id: number

    // Индекс региона
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]), { toClassOnly: true })
    @IsArray()
    regions_indexes: number[]

    // Произвольные даты проверок
    //(dates является обязательным, если date1 и date2 не указаны)
    @IsOptional()
    @IsDateString()
    dates: string[]

    // Крайние даты периода
    //(date1 и date2 являются обязательным, если dates не указан)
    @IsDateString()
    date1: Date

    @IsDateString()
    date2:Date

    // @IsOptional()
    // orders:any[]=[{"name":"date","direction":"DESC"}]
    // @IsOptional()
    // fields:any[] = ["date","info","sum"]
}

