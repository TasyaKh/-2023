import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TKeywords } from "./keywords.entity";
import { TopvisorProject } from "./topvisor-project.entity";
import { THeader } from "./headers.entity";

@Entity('t_result')
export class TResult {

    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // dpr:string

    @ManyToOne((type) => TopvisorProject, (tp) => tp.id, { onDelete: 'CASCADE'})
    @JoinColumn([{ name: "project_id" }])
    project: TopvisorProject

    @OneToMany((type) => TKeywords, (keyword) => keyword.result, {cascade:true})
    @JoinColumn([{ name: "keyword_id" }])
    keyword: TKeywords[]

    @OneToMany((type) => THeader, (header) => header.result, {cascade:true})
    @JoinColumn([{ name: "header_id" }])
    header: THeader[]

}
