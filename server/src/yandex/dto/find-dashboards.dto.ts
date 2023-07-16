import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsNumber, IsOptional, } from "class-validator";

export class FindDashboardsYandexDto {

    @ApiProperty({ description: "сортировка", required: false })
    @IsOptional()
    sort: string[] = []

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number

    @ApiProperty({ description: "язык", required: false })
    @IsOptional()
    lang: string = "ru"

    @ApiProperty({ description: "фильтры", required: false })
    @IsOptional()
    filters: string[] = []

    @ApiProperty({ description: "группировка", required: false })
    @IsOptional()
    group: string

    @ApiProperty({ description: "метрики", required: false })
    @IsOptional()
    @IsArray()
    metrics: string[] = []

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    dimensions: string[] = []

    @ApiProperty({description:"ид проектов",required:true})
    @IsNumber()
    @Type(() => Number)
    ids: number

    @ApiProperty({description:"дата начала",required:true})
    @IsDate()
    @Type(() => Date)
    date1: Date

    @ApiProperty({description:"дата конца",required:true})
    @IsDate()
    @Type(() => Date)
    date2: Date
}
