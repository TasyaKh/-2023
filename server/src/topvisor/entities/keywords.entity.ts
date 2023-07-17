import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { TPositionsData } from "./positions-data.entity";
import { TResult } from "./result.entity";

@Entity('t_keywords')
export class TKeywords{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({description:"имя"})
    @Column()
    name: string

    @OneToMany((type) => TPositionsData, (pd) => pd.keyword, { cascade: true })
    @JoinColumn([{ name: "positions_data_id" }])
    positions_data: TPositionsData[]

    @ManyToOne((type) => TResult, (res) => res.id, { onDelete: 'CASCADE'})
    @JoinColumn([{ name: "result_id" }])
    result: TResult
}
