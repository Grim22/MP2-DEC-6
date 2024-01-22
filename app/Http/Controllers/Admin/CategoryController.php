<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\AdminsRole;
use Session;
use Auth;

class CategoryController extends Controller
{
    //view
    public function categories(){
        Session::put('page','categories');
        $categories = Category::with('parentcategory')->get();

            //Admins&Subadmins permissions for Categories page
            $categoriesModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'categories'])->count();

            $categoriesModule = array();
    
            if(Auth::guard('admin')->user()->type=="superadmin"){
                $categoriesModule['view_access'] = 1;
                $categoriesModule['edit_access'] = 1;
                $categoriesModule['full_access'] = 1;
            }else if($categoriesModuleCount==0){
                $message = "This feature is restricted for you!";
                return redirect('admin/dashboard')->with('error_message',$message);
            }else{
                $categoriesModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'categories'])->first()->toArray();
            }

        return view('admin.categories.categories')->with(compact('categories','categoriesModule'));
    }
    //update status
    public function updateCategoryStatus(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            Category::where('id',$data['category_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'category_id'=>$data['category_id']]);
        }
    }
    //delete
    public function deleteCategory($id)
    {
        Category::where('id',$id)->delete();
        return redirect()->back()->with('success_message','Category Deleted Successfully!');
    }
    //add&edit
    public function addEditCategory(Request $request,$id=null)
    {
        $getCategories = Category::getCategories();

        if($id==""){
            //add
            $title = "Add Category";
            $category = new Category;
            $message = "Category Added Successfully!";
        }else{
            //edit
            $title = "Edit Category";
            $category = Category::find($id);
            $message = "Category Updated Successfully!";
        }
        if($request->isMethod('post')){
            $data = $request->all();

            if($id==""){
                $rules = [
                    'category_name' => 'required',
                    'url' => 'required|unique:categories|regex:/^[a-z]+$/|regex:/^[^\s]+$/',
                ];
            }else{
                $rules = [
                    'category_name' => 'required',
                    'url' => 'required|regex:/^[a-z]+$/|regex:/^[^\s]+$/',
                ];
            }
            

            $customMessages = [
                'category_name.required' => 'Category Name is Required!',
                'url.required' => 'URL is Required!',
                'url.unique' => 'URL is already used!',
                'url.regex' => 'URL must be no spaces and small-letters only!',
            ];

            $this->validate($request,$rules,$customMessages);

        
        //category discounts
        if(empty($data['category_discount'])){
            $data['category_discount'] = 0;
            if($id!=""){
                $categoryProducts = Product::where('category_id',$id)->get()->toArray();
                foreach($categoryProducts as $key => $product){
                    if($product['discount_type']=="category"){
                        Product::where('id',$product['id'])->update(['discount_type'=>'','final_price'=>$product['product_price']]);
                    }
                }
            }
        }

        $category->category_name = $data['category_name'];
        $category->parent_id = $data['parent_id'];
        $category->category_discount = $data['category_discount'];
        $category->description = $data['description'];
        $category->url = $data['url'];
        $category->meta_title = $data['meta_title'];
        $category->meta_description = $data['meta_description'];
        $category->meta_keywords = $data['meta_keywords'];
        $category->status = 1;
        $category->save();
        return redirect('admin/categories')->with('success_message',$message);
        }
        
        
        return view('admin.categories.add_edit_category')->with(compact('title','getCategories','category'));
    }
}
