import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TKeywords } from "./keywords.entity";
import { TopvisorProject } from "./topvisor-project.entity";

@Entity('t_result')
export class TResult {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dpr:string

    @Column()
    keyw:number

    @ManyToOne((type) => TopvisorProject, (tp) => tp.id)
    @JoinColumn([{ name: "project_id" }])
    project: TopvisorProject

    @OneToMany((type) => TKeywords, (keyword) => keyword.result)
    @JoinColumn([{ name: "keyword_id" }])
    keyword: TKeywords[]

}
