import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TResult } from "./result.entity";
import { TSearcher } from "./searchers.entity";

@Entity('t_header')
export class THeader {

    @PrimaryGeneratedColumn()
    id: number

    @Column("simple-array")
    dates: string

    @OneToMany((type) => TSearcher, (searchers) => searchers.header, { cascade: true })
    @JoinColumn([{ name: "searchers" }])
    searchers: TSearcher[]

    @ManyToOne((type) => TResult, (res) => res.id, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: "result_id" }])
    result: TResult
}
