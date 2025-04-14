import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        altNames : {
            type : [String],
            default :[]
        },
        price : {
            type : Number,
            required : true
        },
        labeledPrice : {
            type : Number,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        images : {
            type : [String],
            required : true,
            default : ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-icon-product&psig=AOvVaw3L0I3sgvIkO64UgvHsdgqH&ust=1744125353065000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiH07SbxowDFQAAAAAdAAAAABAE"]
        },
        stock : {
            type : Number,
            required : true
        }

    }

)

const Product = mongoose.model("products",productSchema)
export default Product;