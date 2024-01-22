<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $productRecords = [
             ['id'=>1,'category_id'=>8,'brand_id'=>0,'product_name'=>'Blue T-Shirt','product_code'=>'BT001','product_color'=>'Dark Blue','family_color'=>'Blue','group_code'=>'TSHIRT0000','product_price'=>150,'product_discount'=>'10','discount_type'=>'product','final_price'=>135,'product_weight'=>500,'description'=>'Best Product','wash_care'=>'','keywords'=>'','filter1'=>'','filter2'=>'','filter3'=>'','filter4'=>'','filter5'=>'','meta_title'=>'','meta_description'=>'','meta_keywords'=>'','is_featured'=>'Yes','status'=>1],

             ['id'=>2,'category_id'=>9,'brand_id'=>0,'product_name'=>'Red T-Shirt','product_code'=>'R001','product_color'=>'Red','family_color'=>'Red','group_code'=>'TSHIRT0000','product_price'=>100,'product_discount'=>'','discount_type'=>'','final_price'=>100,'product_weight'=>400,'description'=>'Best Product','wash_care'=>'','keywords'=>'','filter1'=>'','filter2'=>'','filter3'=>'','filter4'=>'','filter5'=>'','meta_title'=>'','meta_description'=>'','meta_keywords'=>'','is_featured'=>'No','status'=>1]
         ];
         Product::insert($productRecords);
    }
}
