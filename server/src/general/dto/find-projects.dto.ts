import { IsNumber, IsOptional } from "class-validator";

export class FindProjectsDto {

    @IsOptional()
    @IsNumber()
    limit:number

    @IsOptional()
    @IsNumber()
    offset:number

    @IsOptional()
    search_string:string
}

