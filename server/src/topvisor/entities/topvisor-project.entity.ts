import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { TPositionsSummary } from "./positions_summary.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('topvisor_project')
export class TopvisorProject {

    @ApiProperty()
    @PrimaryColumn()
    id: number

    @ApiProperty({description:"имя проекта"})
    @Column()
    name: string

    @ApiProperty({description:"сайт"})
    @Column()
    site: string

    @ApiProperty({description:"дата создания"})
    @Column()
    date: Date

    @ApiProperty({description:"регионы"})
    @Column("simple-array", {default:[]})
    regions: number[]
    
    @OneToOne(() => TPositionsSummary,  {
        cascade: true,
    })
    @JoinColumn([{ name: "ps_id" }])
    positions_summary: TPositionsSummary

    @ApiProperty({description:"дата последнего обновления"})
    @Column({ default: new Date() })
    date_last_update: Date
}
