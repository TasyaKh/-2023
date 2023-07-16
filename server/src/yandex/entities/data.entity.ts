import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YMetric } from "./metrics.entity";
import { YQuery } from "./query.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('y_data')
export class YData {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({description:"имя"})
    @Column()
    name: string

    @ApiProperty({description:"иконка"})
    @Column({ nullable: true })
    favicon: string

    @OneToMany((type) => YMetric, (y) => y.data, {
        cascade: true,
    })
    @JoinColumn([{ name: "metric_id" }])
    metrics: YMetric[]

    @ManyToOne((type) => YQuery, (qery) => qery.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: "query_id" }])
    query: YQuery

}
