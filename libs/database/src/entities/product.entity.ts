import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductUnit, UnitType } from "../types";

@Entity('product')
export class ProductEntity extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        default: 0
    })
    quantity: number; // stock quantity

    @Column({
        type: 'enum',
        enum: UnitType,
        nullable: false
    })
    unitType: UnitType;

    @Column({
        type: 'enum',
        enum: ProductUnit,
        nullable: false
    })
    unit: ProductUnit;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 0
    })
    tax: number; // GST % (e.g., 18.00)

    @Column({
        type: 'varchar',
        name: 'hsn_code',
        nullable: true
    })
    hsnCode: string; // GST HSN code

    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    /*
    * Create and Update Date Columns
    */
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}