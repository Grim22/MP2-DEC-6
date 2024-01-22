<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Admin;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $totalCategories = Category::count();
        $totalBrands = Brand::count();
        $totalProducts = Product::count();

        $totalAdmins = Admin::where('type','admin')->count();
        $totalSubdmins = Admin::where('type','subadmin')->count();

        return view('admin.dashbooard', compact('totalCategories','totalBrands','totalProducts','totalAdmins,','totalSubadmins'));
    }

    
}
