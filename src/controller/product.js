import Joi from "joi";
import Product from "../models/products"
const productSchema = Joi.object({
        name:Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string(),
})
export const getAll = async (req, res) =>{
try{
        const product = await Product.find();
        if(product.length === 0){
                return res.status(400).json({
                        message: "không tìm thấy"
                })
        }
        return res.status(200).json(product)
}catch(error){
        return res.status(400).json({
                message: error,
        })
}
}
export const get = async (req, res) =>{
        try{
                const product = await Product.findOne({_id: req.params.id});
                if(product.length === 0){
                        return res.status(400).json({
                                message: "không tìm thấy"
                        })
                }
                return res.status(200).json(product)
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
        }
}
export const create = async (req, res) =>{
        try{
                const {error} = productSchema.validate(req.body);
                if(error){
                        return res.status(400).json({error:error.details[0].message});
                }
                const product = await Product.create(req.body);
               if(product.length === 0){
                return res.status(400).json({
                        message: "thêm thất bại"
                })
               }
               return res.status(200).json({
                message: "thêm thành công",
                product,
               })
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
        }
}

export const remove = async (req, res ) =>{
        try{
                const product = await Product.findOneAndDelete(req.params.id);
                return res.status(200).json({
                        message: "xóa thành công",
                        product,
                })
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
        }
}

export const update = async (req, res) =>{
     try{
        
                const {error} = productSchema.validate(req.body);
                if(error){
                        return res.status(400).json({error:error.details[0].message});
                }
                const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body);
                if(product.length === 0){
                        return res.status(400).json({
                                message: "cập nhật thất bại"
                        })
                }
                return res.status(200).json({
                        message: "cập nhật thành công",
                        product,
                })
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
     }
}