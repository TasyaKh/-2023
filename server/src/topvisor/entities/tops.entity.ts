import { TPositionsSummary } from "./positions_summary.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { TopvisorProject } from "./topvisor-project.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('t_tops')
export class TTops {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({description:"топ 1-10"})
    @Column({name:"1_10", nullable:true})
    '1_10': number

    @ApiProperty({description:"топ 11-30"})
    @Column({name:"11_30", nullable:true})
    '11_30': number

    @ApiProperty({description:"топ 31-50"})
    @Column({name:"31_50", nullable:true})
    '31_50': number

    @ApiProperty({description:"топ 51-1000"})
    @Column({name:"51_100", nullable:true})
    '51_100': number

    @ApiProperty({description:"топ 101-10000"})
    @Column({name:"101_10000", nullable:true})
    '101_10000': number

    @ManyToOne((type) => TPositionsSummary, (ps) => ps.id, {onDelete:"CASCADE"})
    @JoinColumn([{ name: "positions_summary_id" }])
    positions_summary: TPositionsSummary

}
