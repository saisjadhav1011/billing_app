import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('customer')
export class CustomerEntity extends BaseEntity {
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    // 🔗 Relation with User
    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({
        type: 'text',
        nullable: false
    })
    address: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    city: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    state: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    zip: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    country: string;

    @Column({
        type: 'varchar',
        name: 'gst_number',
        nullable: true
    })
    gstNumber: string;

    /*
    * Create and Update Date Columns
    */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}