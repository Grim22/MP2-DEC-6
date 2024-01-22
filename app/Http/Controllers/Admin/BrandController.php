<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use App\Models\AdminsRole;
use Session;
use Auth;

class BrandController extends Controller
{
    //view
    public function brands(){
        Session::put('page','brands');
        $brands = Brand::get();

        //Admins&Subadmins permissions for Brands page
        $brandsModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'brands'])->count();

        $brandsModule = array();

        if(Auth::guard('admin')->user()->type=="superadmin"){
            $brandsModule['view_access'] = 1;
            $brandsModule['edit_access'] = 1;
            $brandsModule['full_access'] = 1;
        }else if($brandsModuleCount==0){
            $message = "This feature is restricted for you!";
            return redirect('admin/dashboard')->with('error_message',$message);
        }else{
            $brandsModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'brands'])->first()->toArray();
        }

        return view('admin.brands.brands')->with(compact('brands','brandsModule'));
    }
    //update status
    public function updateBrandStatus(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            Brand::where('id',$data['brand_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'brand_id'=>$data['brand_id']]);
        }
    }
    //delete
    public function deleteBrand($id)
    {
        Brand::where('id',$id)->delete();
        return redirect()->back()->with('success_message','Brand Deleted Successfully!');
    }
    //add&edit
    public function addEditBrand(Request $request,$id=null)
    {

        if($id==""){
            //add
            $title = "Add Brand";
            $brand = new Brand;
            $message = "Brand Added Successfully!";
        }else{
            //edit
            $title = "Edit Brand";
            $brand = Brand::find($id);
            $message = "Brand Updated Successfully!";
        }
        if($request->isMethod('post')){
            $data = $request->all();

            if($id==""){
                $rules = [
                    'brand_name' => 'required',
                    'url' => 'required|unique:brands|regex:/^[a-z]+$/|regex:/^[^\s]+$/',
                ];
            }else{
                $rules = [
                    'brand_name' => 'required',
                    'url' => 'required|regex:/^[a-z]+$/|regex:/^[^\s]+$/',
                ];
            }
            

            $customMessages = [
                'brand_name.required' => 'Brand Name is Required!',
                'url.required' => 'URL is Required!',
                'url.unique' => 'URL is already used!',
                'url.regex' => 'URL must be no spaces and small-letters only!',
            ];

            $this->validate($request,$rules,$customMessages);

        //remove brand discounts from all products belong to this specific brand
        if(empty($data['brand_discount'])){
            $data['brand_discount'] = 0;
            if($id!=""){
                $brandProducts = Product::where('brand_id',$id)->get()->toArray();
                foreach($brandProducts as $key => $product){
                    if($product['discount_type']=="brand"){
                        Product::where('id',$product['id'])->update(['discount_type'=>'','final_price'=>$product['product_price']]);
                    }
                }
            }
        }

        $brand->brand_name = $data['brand_name'];
        $brand->brand_discount = $data['brand_discount'];
        $brand->description = $data['description'];
        $brand->url = $data['url'];
        $brand->meta_title = $data['meta_title'];
        $brand->meta_description = $data['meta_description'];
        $brand->meta_keywords = $data['meta_keywords'];
        $brand->status = 1;
        $brand->save();
        return redirect('admin/brands')->with('success_message',$message);
        }

    return view('admin.brands.add_edit_brand')->with(compact('title','brand'));
    }
}
