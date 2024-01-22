<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Product;
use App\Models\ProductsAttribute;
use App\Models\Category;
use App\Models\AdminsRole;
use App\Models\Brand;
use Session;
use DB;
use Auth;


class ProductsController extends Controller
{
    //productCode
    protected function productCodeExists($code)
    {
        return Product::where('product_code', $code)->exists();
    }
    public function products(){
        Session::put('page','products');
        $products = Product::with('category')->get()->toArray();

        //Admins&Subadmins permissions for Products page
        $productsModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'products'])->count();

        $productsModule = array();

        if(Auth::guard('admin')->user()->type=="superadmin"){
            $productsModule['view_access'] = 1;
            $productsModule['edit_access'] = 1;
            $productsModule['full_access'] = 1;
        }else if($productsModuleCount==0){
            $message = "This feauture is restricted for you!";
            return redirect('admin/dashboard')->with('error_message',$message);
        }else{
            $productsModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'products'])->first()->toArray();
        }

        return view('admin.products.products')->with(compact('products','productsModule'));
    }

        // for print



    //update status
    public function updateProductStatus(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            Product::where('id',$data['product_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'product_id'=>$data['product_id']]);
        }
    }
    
        //delete
        public function deleteProduct($id)
        {
            Product::where('id',$id)->delete();
            return redirect()->back()->with('success_message','Product Deleted Successfully!');
        }

        //add&edit
        public function addEditProduct(Request $request,$id=null)
        {
            $getCategories = Category::getCategories();
    
            if($id==""){
                //add
                $title = "Add Product";
                $product = new Product;
                $message = "Product Added Successfully!";
            }else{
                //edit
                $title = "Edit Product";
                $product = Product::with(['attributes'])->find($id);
                $message = "Product Updated Successfully!";
            }


            if($request->isMethod('post')){
                $data = $request->all();
                // echo "<pre>"; print_r($data); die;

// barcode
if (empty($data['product_code'])) {
    $number = mt_rand(1000000000, 9999999999);
    if ($this->productCodeExists($number)) {
        $number = mt_rand(1000000000, 999999999);
    }
    $data['product_code'] = $number;
    $product->product_code = $data['product_code'];
}

                //product validations
                if($id==""){
                    $rules = [
                        'category_id' => 'required',
                        'product_name' => 'required|regex:/^[\pL\s\-]+$/u|max:200',

                        'product_price' => 'required|numeric',
                        'product_color' => 'required|regex:/^[\pL\s\-]+$/u|max:200',
                        'family_color' => 'required|regex:/^[\pL\s\-]+$/u|max:200',
                    ];
                }else{
                    $rules = [
                        'category_id' => 'required',
                        'product_name' => 'required|regex:/^[\pL\s\-]+$/u|max:200',
                        'product_price' => 'required|numeric',
                        'product_color' => 'required|regex:/^[\pL\s\-]+$/u|max:200',
                        'family_color' => 'required|regex:/^[\pL\s\-]+$/u|max:200',
                    ];
                }

                $customMessages = [
                    'category_id.required' => 'Category is Required!',
                    'product_name.required' => 'Product Name is Required!',
                    'product_name.regex' => 'Valid Product Name is Required! Only contain letters, numbers, underscores, or hyphens is allowed!',

                    'product_code.regex' => 'Valid Product Code is Required! Only contain letters, numbers, underscores, or hyphens is allowed!',
                    'product_price.required' => 'Product Code is Required!',
                    'product_price.numeric' => 'Valid Product Price is Required!',
                    'product_color.required' => 'Product Color is Required!',
                    'product_color.regex' => 'Valid Product Color is Required!',
                    'family_color.required' => 'Family Color is Required!',
                    'family_color.regex' => 'Valid Family Color is Required!',
                ];
    
                $this->validate($request,$rules,$customMessages);

            
                if(!isset($data['product_discount'])){
                    $data['product_discount'] = 0;  
                }
                if(!isset($data['product_weight'])){
                    $data['product_weight'] = 0;
                }

                $product->category_id = $data['category_id'];
                $product->brand_id = $data['brand_id'];
                $product->product_name = $data['product_name'];
                // $product->product_code = $data['product_code'];

                //$number = mt_rand(1000000000,9999999999)
            
                $product->product_color = $data['product_color'];
                $product->family_color = $data['family_color'];
                $product->group_code = $data['group_code'];
                $product->product_price = $data['product_price'];
                $product->product_discount = $data['product_discount'];

                //Discounts calculations
                if(!empty($data['product_discount'])&&$data['product_discount']>0){
                    $product->discount_type = 'product';
                    $product->final_price = $data['product_price'] - ($data['product_price']* $data['product_discount'])/100;
                }else{
                    $getCategoryDiscount = Category::select('category_discount')->where('id',$data['category_id'])->first();
                    if($getCategoryDiscount->category_discount == 0){
                        $product->discount_type = "";
                        $product->final_price = $data['product_price'];
                    }else{
                        $product->discount_type ='category';
                        $product->final_price = $data['product_price'] - ($data['product_price']* $getCategoryDiscount->category_discount)/100;
                    }
                }

                $product->product_weight = $data['product_weight'];
                $product->description = $data['description'];
                $product->wash_care = $data['wash_care'];
                $product->search_keywords = $data['search_keywords'];
                // $product->filter1 = $data['filter1'];
                // $product->filter2 = $data['filter2'];
                // $product->filter3 = $data['filter3'];
                // $product->filter4 = $data['filter4'];
                // $product->filter5 = $data['filter5'];
                $product->meta_title = $data['meta_title'];
                $product->meta_description = $data['meta_description'];
                $product->meta_keywords = $data['meta_keywords'];
                if(!empty($data['is_featured'])){
                    $product->is_featured = $data['is_featured'];
                }else{
                    $product->is_featured = "No";

                }
                $product->status = 1;
                $product->save();

                if($id==""){
                    $product_id = DB::getPdo()->lastInsertId();
                }else{
                    $product_id = $id;
                }


                // Save the product
                $product->save();


                //add Product attributes
                foreach ($data['sku'] as $key => $value) {
                    if(!empty($value)){
                        //see if SKU is already exist
                        $countSKU = ProductsAttribute::where('sku',$value)->count();
                        if($countSKU>0){
                            $message = "SKU already exist, Try another SKU";
                            return redirect()->back()->with('error_message',$message);
                        }
                        //see if Size is already exist
                        $countSize = ProductsAttribute::where(['product_id'=>$product_id,'size'=>$data['size'][$key]])->count();
                        if($countSize>0){
                            $message = "Size already exist, Try another Size";
                            return redirect()->back()->with('error_message',$message);
                        }
                        $attribute = new ProductsAttribute;
                        $attribute->product_id = $product_id;
                        $attribute->sku = $value;
                        $attribute->size = $data['size'][$key];
                        $attribute->price = $data['price'][$key];
                        $attribute->stock = $data['stock'][$key];
                        $attribute->status = 1;
                        $attribute->save();
                        
                    }
                }

                //edit Product attributes
                if(isset($data['attributeId'])){
                    foreach ($data['attributeId'] as $akey => $attribute) {
                        if(!empty($attribute)){
                            ProductsAttribute::where(['id'=>$data['attributeId'][$akey]])->update(['price'=>$data['price'][$akey],'stock'=>$data['stock'][$akey]]);
                        }
                    }
                }

                return redirect('admin/products')->with('success_message', $message);
            }

            
            // Get categories
            $getCategories = Category::getCategories();

            // Get brands
            $getBrands = Brand::where('status',1)->get()->toArray();

            //Product filters
            $productsFilters = Product::productsFilters();


            //add edit return
            return view('admin.products.add_edit_product')->with(compact('title','getCategories','getBrands','productsFilters','product'));
            }
            //update attribute status
            public function updateAttributeStatus(Request $request)
            {
                if($request->ajax()){
                    $data = $request->all();
                    if($data['status']=="Active"){
                        $status = 0;
                    } else{
                        $status = 1;
                    }
                    ProductsAttribute::where('id',$data['attribute_id'])->update(['status'=>$status]);
                    return response()->json(['status'=>$status,'attribute_id'=>$data['attribute_id']]);
                }
            }
            
            //delete attribute
            public function deleteAttribute($id)
            {
                ProductsAttribute::where('id',$id)->delete();
                return redirect()->back()->with('success_message','Attribute Deleted Successfully!');
            }
            
}
