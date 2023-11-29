export class Product {

    constructor(public id?: string,
        public sku?: string,
        public name?: string,
        public description?: string,
        public unitPrice?: number,
        public imageUrl?: string,
        public active?: boolean,
        public unitsInStock?: number,
        public dateCreated?: Date,
        public lastUpdated?: Date
    ) {
    }

}
// this should match the actual properties from the actual JSON data coming back from that Spring Data REST API
