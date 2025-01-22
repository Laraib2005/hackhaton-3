export interface Chair {
    _id : string;
    name:string;
    _type : "product";
    image? : {
        asset : {
            _ref : string;
            _type : "image";
        }
    };
    price:number;
    description:string;
    quantity:number;
    deminsion:object



}