import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsNumber, IsOptional } from "class-validator";

export class PositionsTopvisorDto {

    // ID проекта
    @ApiProperty({description:"ид проекта",required:true})
    @IsNumber()
    @Type(() => Number)
    project_id: number

    @ApiProperty({description:"регионы",required:true})
    // Индекс региона
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]), { toClassOnly: true })
    @IsArray({message:"регионы не указаны"})
    regions_indexes: number[]

    // Произвольные даты проверок
    //(dates является обязательным, если date1 и date2 не указаны)
    @ApiProperty({description:"Произвольные даты проверок",required:false})
    @IsOptional()
    @IsDateString()
    dates: string[]

    // Крайние даты периода
    //(date1 и date2 являются обязательным, если dates не указан)
    @ApiProperty({description:"старт дата проверки",required:true})
    @IsDate()
    @Type(()=>Date)
    date1: Date

    @ApiProperty({description:"конец дата проверки",required:true})
    @IsDate()
    @Type(()=>Date)
    date2:Date
}

