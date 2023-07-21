import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TResult } from "./result.entity";
import { THeader } from "./headers.entity";
import { TRegion } from "./regions.entity";

@Entity('t_searcher')
export class TSearcher {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @ManyToOne((type) => THeader, (res) => res.id, { onDelete: 'CASCADE'})
    @JoinColumn([{ name: "header_id" }])
    header: THeader

    @OneToMany((type) => TRegion, (region) => region.searcher,  {cascade:true})
    @JoinColumn([{ name: "regions" }])
    region: TRegion[]
}
