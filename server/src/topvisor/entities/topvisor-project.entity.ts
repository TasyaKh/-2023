import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { TPositionsSummary } from "./positions_summary.entity";

@Entity('topvisor_project')
export class TopvisorProject {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    site: string

    @Column()
    date: Date
    
    @OneToOne(() => TPositionsSummary)
    @JoinColumn([{ name: "ps_id" }])
    positions_summary: TPositionsSummary
}
