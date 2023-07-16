import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TKeywords } from "./keywords.entity";

@Entity('t_positions_data')
export class TPositionsData {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dpr:string

    @Column()
    position:string

    @ManyToOne((type) => TKeywords, (keyword) => keyword.id,  { onDelete: 'CASCADE'})
    @JoinColumn([{ name: "keyword_id" }])
    keyword: TKeywords
}
