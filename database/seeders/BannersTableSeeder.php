<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Banner;

class BannersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bannerRecords = [
            [
                'id'=>1,
                'image'=>'',
                'type'=>'Slider',
                'link'=>'',
                'title'=>'',
                'alt'=>'',
                'sort'=>'',
                'status'=>1,
            ],
            [
                'id'=>2,
                'image'=>'',
                'type'=>'Fix',
                'link'=>'',
                'title'=>'',
                'alt'=>'',
                'sort'=>'',
                'status'=>1,
            ],
        ];
        Banner::insert($bannerRecords);
    }
}
