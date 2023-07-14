import { TPositionsSummary } from "./positions_summary.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { TopvisorProject } from "./topvisor-project.entity";

@Entity('t_tops')
export class TTops {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name:"1_10", nullable:true})
    '1_10': number

    @Column({name:"11_30", nullable:true})
    '11_30': number

    @Column({name:"31_50", nullable:true})
    '31_50': number

    @Column({name:"51_100", nullable:true})
    '51_100': number

    @Column({name:"101_10000", nullable:true})
    '101_10000': number

    @ManyToOne((type) => TPositionsSummary, (ps) => ps.id)
    @JoinColumn([{ name: "positions_summary_id" }])
    positions_summary: TPositionsSummary

}
