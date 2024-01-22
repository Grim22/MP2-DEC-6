<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Product;

class PdfController extends Controller
{
    public function generatePdf(){
        $products = Product::all();
        $pdf = PDF::loadView('print', compact('products'));
        return $pdf->stream();
    }
}
