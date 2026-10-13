import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:{type:String,default:''},price:{type:Number,required:true,min:0},category:{type:String,required:true},imageUrl:{type:String,default:''},stock:{type:Number,default:0,min:0},available:{type:Boolean,default:true},featured:{type:Boolean,default:false}},{timestamps:true});
schema.virtual('inStock').get(function(){return this.stock>0&&this.available}); schema.set('toJSON',{virtuals:true});
export default mongoose.model('Product',schema);
