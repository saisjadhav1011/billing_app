export enum UnitType {
    COUNT = 'COUNT',     // pieces, boxes
    WEIGHT = 'WEIGHT',   // kg, gram
    VOLUME = 'VOLUME',   // liter, ml
    LENGTH = 'LENGTH'    // meter
}

export enum ProductUnit {
    // COUNT
    PIECE = 'PIECE',
    BOX = 'BOX',
    PACK = 'PACK',
    DOZEN = 'DOZEN',

    // WEIGHT
    KG = 'KG',
    GRAM = 'GRAM',

    // VOLUME
    LITER = 'LITER',
    ML = 'ML',

    // LENGTH
    METER = 'METER',
    FEET = 'FEET',
    INCH = 'INCH'
}


export enum UserRole {
    ADMIN = 'Admin',
    Customer = 'Customer'
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}


export enum ProductSortableFields {
    NAME = 'name',
    PRICE = 'price',
    QUANTITY = 'quantity',
    CREATED_AT = 'created_at',
};