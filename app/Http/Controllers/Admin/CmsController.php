<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsPage;
use App\Models\AdminsRole;
use Illuminate\Http\Request;
use Session;
use Auth;

class CmsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Session::put('page','cms-pages');
        $CmsPages = CmsPage::get()->toArray();

        //Admins&Subadmins permissions for CMS pages
        $cmspagesModuleCount = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'cms_pages'])->count();

        $pagesModule = array();

        if(Auth::guard('admin')->user()->type=="superadmin"){
            $pagesModule['view_access'] = 1;
            $pagesModule['edit_access'] = 1;
            $pagesModule['full_access'] = 1;
        }else if($cmspagesModuleCount==0){
            $message = "This feature is restricted for you!";
            return redirect('admin/dashboard')->with('error_message',$message);
        }else{
            $pagesModule = AdminsRole::where(['subadmin_id'=>Auth::guard('admin')->user()->id,'module'=>'cms_pages'])->first()->toArray();
        }

        return view('admin.pages.cms_pages')->with(compact('CmsPages','pagesModule'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CmsPage $cmsPage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id=null)
    {
        if($id==""){
            $title = 'Add CMS Page';
            $cmspage = new CmsPage;
            $message = 'CMS Page is Added Successfully';
        } else {
            $title = 'Edit CMS Page';
            $cmspage = Cmspage::find($id);
            $message = 'CMS Page is Updated Successfully';
        }
        if($request->isMethod('post')){
            $data = $request -> all();

            // Validation for CMS page
            $rules = [
                'title' => 'required',
                'url' => 'required',
                'description' => 'required',
            ];
            $customMessages = [
                'title.required' => ' Page Title is Required',
                'url.required' => 'Page URL is Required',
                'description.required' => 'Page Description is Required',
            ];
            $this->validate($request,$rules,$customMessages);

            $cmspage->title = $data['title'];
            $cmspage->url = $data['url'];
            $cmspage->description = $data['description'];
            $cmspage->meta_title = $data['meta_title'];
            $cmspage->meta_description = $data['meta_description'];
            $cmspage->meta_keywords = $data['meta_keywords'];
            $cmspage->status = 1;
            $cmspage->save();
            return redirect('admin/cms-pages')->with('success_message',$message);
        }
        return view ('admin.pages.add_edit_cmspage')->with(compact('title','cmspage'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        if($request->ajax()){
            $data = $request->all();
            if($data['status']=="Active"){
                $status = 0;
            } else{
                $status = 1;
            }
            CmsPage::where('id',$data['page_id'])->update(['status'=>$status]);
            return response()->json(['status'=>$status,'page_id'=>$data['page_id']]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // delete CMS pages
        CmsPage::where('id',$id)->delete();
        return redirect()->back()->with('success_message','CMS Page Deleted Successfully!');
    }
}
