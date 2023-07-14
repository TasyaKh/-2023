import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YData } from "./data.entity";


@Entity('y_metrics')
export class YMetric {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    project_id:number

    @Column()
    metric:number

    @Column()
    date:Date

    
    @ManyToOne((type)=>YData, (data)=>data.id,  {
        onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: "data_id" }])
    data:YData
}
