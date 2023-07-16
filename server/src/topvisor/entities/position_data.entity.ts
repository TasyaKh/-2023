import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TPositionsData } from "./positions-data.entity";

@Entity('t_position_data')
export class TPositionData{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    position: number

    // data project region
    @Column()
    dpr: number

    @ManyToOne((type) => TPositionsData, (ps) => ps.id)
    @JoinColumn([{ name: "positions_data_id" }])
    positions_data: TPositionsData

}
