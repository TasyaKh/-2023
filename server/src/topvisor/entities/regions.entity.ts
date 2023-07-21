import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TKeywords } from "./keywords.entity";
import { TopvisorProject } from "./topvisor-project.entity";
import { THeader } from "./headers.entity";
import { TSearcher } from "./searchers.entity";

@Entity('t_region')
export class TRegion {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @Column()
    index:string

    @Column()
    device_name:string

    @Column()
    lang:string

    @ManyToOne((type) => TSearcher, (searcher) => searcher.id,  { onDelete: 'CASCADE'})
    @JoinColumn([{ name: "searcher_id" }])
    searcher: TSearcher

}
