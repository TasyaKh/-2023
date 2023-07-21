import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { YData } from "./data.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity('y_metrics')
export class YMetric {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({description:"значение"})
    @Column()
    metric:number

    @ApiProperty({description:"дата метрики"})
    @Column()
    date:Date

    @ApiProperty({description:"индекс для данных в виде массива"})
    @Column({default:0})
    index:number

    @ManyToOne((type)=>YData, (data)=>data.id,  {
        onDelete: 'CASCADE',
    })
    @JoinColumn([{ name: "data_id" }])
    data:YData
}
