<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\AdminsRole;
use Auth;
use Validator;
use Hash;
use Session;

class AdminController extends Controller
{
    public function dashboard(){
        Session::put('page','dashboard');
        return view('admin.index');
    }
    public function login(Request $request){
        if($request-> isMethod('post')){
            $data = $request->all();

            $rules = [
                'email' => 'required|email|max:255',
                'password' => 'required|max:16'
            ];

            $customMessages = [
                'email.required' => "Email is Required",
                'email.email' => "Valid Email is Required",
                'password.required' => "Password is Required",
            ];

            $this->validate($request,$rules,$customMessages);


            if(Auth::guard('admin')->attempt(['email' => $data['email'],'password'=>$data['password']])){

                //Remember me function with cookies
                if(isset($data['remember'])&&!empty($data['remember'])){
                    setcookie("email",$data['email'],time()+10000);
                    setcookie("password",$data['password'],time()+10000);
                }else{
                    setcookie("email","");
                    setcookie("password","");
                }

                return redirect("admin/dashboard");
            } else {
                return redirect()->back()->with("error_message","Invalid Email or Password!");
            }
        }
        return view('admin.login');
    }
    public function logout(){
        Auth::guard('admin')->logout();
        return redirect ('admin/login');
    }
    public function updatePassword(Request $request){
        Session::put('page','update-password');
       if($request->isMethod('post')){
        $data = $request -> all();
        // it will check first if the current password is correct
        if(Hash::check($data['current_pwd'],Auth::guard('admin')->user()->password)){
            //new and confirm password must be matched!
            if($data['new_pwd']==$data['confirm_pwd']){
                //update new password
                Admin::where('id',Auth::guard('admin')->user()->id)->update(['password'=>
                    bcrypt($data['new_pwd'])]);
                return redirect()->back()->with('success_message','Password has been updated Successfully!');
            }else{
                return redirect()->back()->with('error_message','Confirm password is not match with the New password!');
            }
        }else{
            return redirect()->back()->with('error_message','The current password must be correct!');
        }
       }
        return view('admin.update_password');
    }
    public function checkCurrentPassword(Request $request){
        $data = $request -> all();
        if(Hash::check($data['current_pwd'],Auth::guard('admin')->user()->password)){
            return "true";
        } else {
            return "false";
        }
    }
    public function updateDetails(Request $request){
        Session::put('page','update-details');
        if($request-> isMethod('post')){
            $data = $request->all();

            $rules = [
                'admin_name' => 'required|regex:/^[\pL\s\-]+$/u|max:15',
                'admin_mobile' => 'required|numeric|digits:11',
            ];

            $customMessages = [
                'admin_name.required' => "Name is Required",
                'admin_name.regex' => "Valid Name is Required",
                'admin_name.max' => "Valid Name is Required",
                'admin_mobile.required' => "Mobile # is Required",
                'admin_mobile.numeric' => "Valid Mobile # is Required",
                'admin_mobile.digits' => "Valid Mobile # is Required",
            ];

            $this->validate($request,$rules,$customMessages);

            //uploading images
            
            //Update admin details
            Admin::where('email',Auth::guard('admin')->user()->email)->update(['name'=>$data['admin_name'],'mobile'=>$data['admin_mobile']]);

            return redirect()->back()->with('success_message','Admin Details has been updated Successfully!');
        }
        return view('admin.update_details');
    }

    //admins controller
    public function admins(){
        Session::put('page','admins');
        $admins = Admin::where('type','admin')->get();

        //Admins&Subadmins permissions for Admins page
        $adminsModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'admins'])->count();

        $adminsModule = array();

        if(Auth::guard('admin')->user()->type=="superadmin"){
            $adminsModule['view_access'] = 1;
            $adminsModule['edit_access'] = 1;
            $adminsModule['full_access'] = 1;
        }else if($adminsModuleCount==0){
            $message = "This feature is restricted for you!";
            return redirect('admin/dashboard')->with('error_message',$message);
        }else{
            $adminsModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'admins'])->first()->toArray();
        }

        return view ('admin.admins.admins')->with(compact('admins','adminsModule'));
    }

    public function updateAdminStatus(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            Admin::where('id',$data['admin_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'admin_id'=>$data['admin_id']]);
        }
    }

    //add admins
    public function addEditAdmin(Request $request, $id=null)
    {
        if($id==""){
            $title = "Add Admin";
            $admindata = new Admin;
            $message = "Admin Added Successfully!";
        }else{
            $title = "Edit Admin";
            $admindata = Admin::find($id);
            $message = "Admin Edited Successfully!";
        }

        if($request->isMethod('post')){
            $data = $request->all();

            if($id==""){
                $adminCount = Admin::where('email',$data['email'])->count();
                if($adminCount>0){
                    return redirect()->back()->with('error_message','Email Already Exist!');
                }
            }
            // Validation for add-edit subadmins
            $rules = [
                'name' => 'required',
                'mobile' => 'required|numeric',
                'password' => 'required',
            ];
            $customMessages = [
                'name.required' => 'Name is Required',
                'mobile.required' => 'Mobile# is Required',
                'mobile.numeric' => 'Valid Mobile# is Required',
                'password.required' => 'Password is Required',
            ];
            $this->validate($request,$rules,$customMessages);

            $admindata->name = $data['name'];
            $admindata->mobile = $data['mobile'];
            if($id==""){
                $admindata->email = $data['email'];
                $admindata->type = 'admin';
            }
            if($data['password']!=""){
                $admindata->password = bcrypt($data['password']);
            }
            $admindata->status = 1;
            $admindata->save();
            return redirect('admin/admins')->with('success_message',$message);
        }

        return view('admin.admins.add_edit_admin')->with(compact('title','admindata'));
    }

    //subadmins controller
    public function subadmins(){
        Session::put('page','subadmins');
        $subadmins = Admin::where('type','subadmin')->get();

        //Admins&Subadmins permissions for SubAdmins page
        $subadminsModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'subadmins'])->count();

        $subadminsModule = array();

        if(Auth::guard('admin')->user()->type=="superadmin"){
            $subadminsModule['view_access'] = 1;
            $subadminsModule['edit_access'] = 1;
            $subadminsModule['full_access'] = 1;
        }else if($subadminsModuleCount==0){
            $message = "This feature is restricted for you!";
            return redirect('admin/dashboard')->with('error_message',$message);
        }else{
            $subadminsModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'subadmins'])->first()->toArray();
        }             

        return view ('admin.subadmins.subadmins')->with(compact('subadmins','subadminsModule'));
    }
    public function updateSubadminStatus(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            Admin::where('id',$data['subadmin_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'subadmin_id'=>$data['subadmin_id']]);
        }
    }

    //add sub admins
    public function addEditSubadmin(Request $request, $id=null)
    {
        if($id==""){
            $title = "Add Subadmin";
            $subadmindata = new Admin;
            $message = "Subadmin Added Successfully!";
        }else{
            $title = "Edit Subadmin";
            $subadmindata = Admin::find($id);
            $message = "Subadmin Edited Successfully!";
        }

        if($request->isMethod('post')){
            $data = $request->all();

            if($id==""){
                $subadminCount = Admin::where('email',$data['email'])->count();
                if($subadminCount>0){
                    return redirect()->back()->with('error_message','Email Already Exist!');
                }
            }
            // Validation for add-edit subadmins
            $rules = [
                'name' => 'required',
                'mobile' => 'required|numeric',
                'password' => 'required',
            ];
            $customMessages = [
                'name.required' => 'Name is Required',
                'mobile.required' => 'Mobile# is Required',
                'mobile.numeric' => 'Valid Mobile# is Required',
                'password.required' => 'Password is Required',
            ];
            $this->validate($request,$rules,$customMessages);

            $subadmindata->name = $data['name'];
            $subadmindata->mobile = $data['mobile'];
            if($id==""){
                $subadmindata->email = $data['email'];
                $subadmindata->type = 'subadmin';
            }
            if($data['password']!=""){
                $subadmindata->password = bcrypt($data['password']);
            }
            $subadmindata->status = 1;
            $subadmindata->save();
            return redirect('admin/subadmins')->with('success_message',$message);
        }

        return view('admin.subadmins.add_edit_subadmin')->with(compact('title','subadmindata'));
    }

    //update permissions
    public function updateRoles($id, Request $request){

        if($request->isMethod('post')){
            $data = $request->all();

            //delete earlier roles for admin/subadmin
            AdminsRole::where('subadmin_id',$id)->delete();

            //add new roles for admin/subadmin dynamically
            foreach ($data as $key => $value) {
                if(isset($value['view'])){
                    $view = $value['view'];
                }else{
                    $view = 0;
                }

                if(isset($value['edit'])){
                    $edit = $value['edit'];
                }else{
                    $edit = 0;
                }

                if(isset($value['full'])){
                    $full = $value['full'];
                }else{
                    $full = 0;
                }

                AdminsRole::where('subadmin_id',$id)->insert(['subadmin_id'=>$id,'module'=>$key,'view_access'=>$view,'edit_access'=>$edit,'full_access'=>$full]);
            }

            $message = "Permissions Updated Successfully!";
            return redirect()->back()->with('success_message',$message);
        }

        $subadminRoles = AdminsRole::where('subadmin_id',$id)->get()->toArray();
        $subadminDetails = Admin::where('id',$id)->first()->toArray();
        $title = "Update ".$subadminDetails['name']." Permissions";

        return view('admin.subadmins.update_roles')->with(compact('title','id','subadminRoles'));
    }

    // delete admins & subadmins
    public function deleteAdmin($id)
    {

        Admin::where('id',$id)->delete();
        return redirect()->back()->with('success_message','Admin Deleted Successfully!');
    }
    public function deleteSubadmin($id)
    {

        Admin::where('id',$id)->delete();
        return redirect()->back()->with('success_message','Sub Admin Deleted Successfully!');
    }
     
}
 // 