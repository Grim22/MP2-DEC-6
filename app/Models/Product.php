<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function category(){
        return $this->belongsTo('App\Models\Category','category_id')->with('parentcategory');
    }

    public static function productsFilters(){
        $productsFilters['filter1Array'] = array('New','Best Seller','Sales');
        $productsFilters['filter2Array'] = array('New','Best Seller','Sales');
        $productsFilters['filter3Array'] = array('New','Best Seller','Sales');
        $productsFilters['filter4Array'] = array('New','Best Seller','Sales');
        $productsFilters['filter5Array'] = array('New','Best Seller','Sales');

        return $productsFilters;
    }

    public function attributes(){
        return $this->hasMany('App\Models\ProductsAttribute');
    }
}
