import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TPositionData } from "./position_data.entity";

@Entity('t_keywords')
export class TKeywords{

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany((type) => TPositionData, (pd) => pd.positions_data)
    @JoinColumn([{ name: "pd_id" }])
    position_data: TPositionData[]
}
