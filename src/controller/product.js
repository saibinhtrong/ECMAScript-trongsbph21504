import Joi from "joi";
import Product from "../models/products"
import Category from "../models/category";

const productSchema = Joi.object({
        name:Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
        desc: Joi.string(),
        categoryId: Joi.string().required(),
})

export const getAll = async (req, res) =>{
        const {_limit = 10, _sort = "createAt", _order ="asc", _page =1} = req.query;
        const  options = {
                page: _page,
                limit: _limit,
                sort:{
                        [_sort]: _order == "desc" ? -1 : 1
                }
        }
try{
        const product = await Product.paginate({}, options);
        if(product.length == 0){
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
                const product = await Product.findOne({_id: req.params.id}).populate("categoryId", "-__v")
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
                await Category.findByIdAndUpdate(product.categoryId, {
                        $addToSet:{
                                products: product._id,
                        }
                })
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