import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){
  if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to create a product"
        })
        return;
    }

    const product = new Product(req.body);

    product.save().then(
        ()=>{
            res.json({
                message : "Product saved successfully"
            })
        }
    ).catch(
        (err)=>{
            console.log(err)
            res.status(500).json({
                message : "Product not saved"
            })
        }
    )

    


}

export function getProducts(req,res){
    Product.find().then(
        (products)=>{
            res.json(products)
        }

    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Product not found"
            })
        }
    )
}

export async function  getProductById(req,res) {

    const productId = req.params.id
    const product = await Product.findOne({productId : productId })
    if(product == null ){
        res.status(404).json({
            message : "Product not found"
        })
        return
    }
    res.json({
        product : product
    })
    
}







export async function deleteProduct(req,res){
    
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to delete a product"
        })
        return
    }
    try{
        await Product.deleteOne({productId : req.params.productId})

        res.json({
            message : "Product deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message : "Failed to delete product",
            error : err
        })
    }    
}

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to update a product"
        })
        return
    }

    const productId = req.params.productId
    const updatingData = req.body

    try{
        await Product.updateOne(
            {productId : productId},
            updatingData
        )

        res.json(
            {
                message : "Product updated successfully"
            }
        )

    }catch(err){
        res.status(500).json({
            message : "Internal server error",
            error : err
        })
    }
}
