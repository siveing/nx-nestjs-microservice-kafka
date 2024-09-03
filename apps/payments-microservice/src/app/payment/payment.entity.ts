import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from 'typeorm';

@Entity("payments")
@Unique(["userId", "name"])
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'double precision' })
    amount: number;

    @Column()
    status: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
