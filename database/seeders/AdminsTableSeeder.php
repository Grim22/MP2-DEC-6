<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Hash;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make('123456');
        $adminRecords = [
            ['id'=>2, 'name'=>'SuperAdmin', 'type'=>'superadmin', 'mobile'=> '09000000000', 'email'=>'superadmin@gmail.com', 'password'=> $password, 'image'=>'', 'status'=> 1],
            ['id'=>3, 'name'=>'Admin', 'type'=>'admin', 'mobile'=> '09100000000', 'email'=>'admin@gmail.com', 'password'=> $password, 'image'=>'', 'status'=> 1],
            ['id'=>4, 'name'=>'SubAdmin', 'type'=>'subadmin', 'mobile'=> '09200000000', 'email'=>'subadmin@gmail.com', 'password'=> $password, 'image'=>'', 'status'=> 1],
        ];
        Admin::insert($adminRecords);
    }
}
