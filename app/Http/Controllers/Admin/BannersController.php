<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use App\Models\AdminsRole;
use Auth;
use Session;

class BannersController extends Controller
{
    public function banners(){
        Session::put('page','banners');
        $banners = Banner::get()->toArray();

        //Admins&Subadmins permissions for Banners page
        $bannersModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'banners'])->count();

        $bannersModule = array();

        if(Auth::guard('admin')->user()->type=="superadmin"){
            $bannersModule['view_access'] = 1;
            $bannersModule['edit_access'] = 1;
            $bannersModule['full_access'] = 1;
        }else if($bannersModuleCount==0){
            $message = "This feature is restricted for you!";
            return redirect('admin/dashboard')->with('error_message',$message);
        }else{
            $bannersModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'banners'])->first()->toArray();
        }

        return view('admin.banners.banners')->with(compact('banners','bannersModule'));
    }

    //update status
    public function updateBannerStatus(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            Banner::where('id',$data['banner_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'banner_id'=>$data['banner_id']]);
        }
    }
    //delete
    public function deleteBanner($id)
    {   
        //get banner image
        $bannerImage = Banner::where('id',$id)->first();

        //get banner image path
        $banner_image_path = 'front/images/banners/';

        //delete banner image
        if(file_exists($banner_image_path.$bannerImage->image)){
            unlink($banner_image_path.$bannerImage->image);
        }
        //complete delete banner
        Banner::where('id',$id)->delete();
        return redirect()->back()->with('success_message','Banner Deleted Successfully!');
    }

    //add&edit
    public function addEditBanner(Request $request,$id=null)
    {

        if($id==""){
            //add
            $title = "Add Banner";
            $banner = new Banner;
            $message = "Banner Added Successfully!";
        }else{
            //edit
            $title = "Edit Banner";
            $banner = Banner::find($id);
            $message = "Banner Updated Successfully!";
        }
        if($request->isMethod('post')){
            $data = $request->all();

            if($id==""){
                $rules = [
                    'banner_name' => 'required',
                    'url' => 'required|unique:banners|regex:/^[a-z]+$/|regex:/^[^\s]+$/',
                ];
            }else{
                $rules = [
                    'banner_name' => 'required',
                    'url' => 'required|regex:/^[a-z]+$/|regex:/^[^\s]+$/',
                ];
            }
            

            $customMessages = [
                'banner_name.required' => 'Banner Name is Required!',
                'url.required' => 'URL is Required!',
                'url.unique' => 'URL is already used!',
                'url.regex' => 'URL must be no spaces and small-letters only!',
            ];

            $this->validate($request,$rules,$customMessages);

        //remove banner discounts from all products belong to this specific banner
        if(empty($data['banner_discount'])){
            $data['banner_discount'] = 0;
            if($id!=""){
                $bannerProducts = Product::where('banner_id',$id)->get()->toArray();
                foreach($bannerProducts as $key => $product){
                    if($product['discount_type']=="banner"){
                        Product::where('id',$product['id'])->update(['discount_type'=>'','final_price'=>$product['product_price']]);
                    }
                }
            }
        }

        $banner->banner_name = $data['banner_name'];
        $banner->banner_discount = $data['banner_discount'];
        $banner->description = $data['description'];
        $banner->url = $data['url'];
        $banner->meta_title = $data['meta_title'];
        $banner->meta_description = $data['meta_description'];
        $banner->meta_keywords = $data['meta_keywords'];
        $banner->status = 1;
        $banner->save();
        return redirect('admin/banners')->with('success_message',$message);
        }

    return view('admin.banners.add_edit_banner')->with(compact('title','banner'));
    }
}
