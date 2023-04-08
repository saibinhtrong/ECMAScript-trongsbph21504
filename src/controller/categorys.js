import Joi from "joi";
import Category from "../models/category";

const categorySchema = Joi.object({
        name:Joi.string().required(),
});

export const getAll = async (req, res) =>{
try{
        const category = await Category.find().populate("products");
        if(category.length === 0){
                return res.status(400).json({
                        message: "không tìm thấy"
                })
        }
        return res.status(200).json(category)
}catch(error){
        return res.status(400).json({
                message: error,
        })
}
}
export const get = async (req, res) =>{
        try{
                const id = req.params.id;
                const category = await Category.findById(id).populate("products");
                if(category.length === 0){
                        return res.status(400).json({
                                message: "không tìm thấy"
                        })
                }
                return res.status(200).json(category)
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
        }
}
export const create = async (req, res) =>{
        try{
                const {error} = categorySchema.validate(req.body);
                if(error){
                      res.json({
                        message: error.details.map((item) => item.message)
                      })
                }
                const category = await Category.create(req.body);
               if(category.length === 0){
                return res.status(400).json({
                        message: "thêm thất bại"
                })
               }
               return res.status(200).json({
                message: "thêm thành công",
                category,
               })
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
        }
}

export const remove = async (req, res ) =>{
        try{
                const category = await Category.findOneAndDelete(req.params.id);
                return res.status(200).json({
                        message: "xóa thành công",
                        category,
                })
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
        }
}

export const update = async (req, res) =>{
     try{
        
                const {error} = categorySchema.validate(req.body);
                if(error){
                        return res.status(400).json({error:error.details[0].message});
                }
                const category = await Category.findOneAndUpdate({_id: req.params.id}, req.body);
                if(category.length === 0){
                        return res.status(400).json({
                                message: "cập nhật thất bại"
                        })
                }
                return res.status(200).json({
                        message: "cập nhật thành công",
                        category,
                })
        }catch(error){
                return res.status(400).json({
                        message: error,
                })
     }
}