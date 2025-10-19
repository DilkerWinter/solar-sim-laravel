<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::rename('address_energy_infos', 'energy_infos');
    }

    public function down()
    {
        Schema::rename('energy_infos', 'address_energy_infos');
    }
};
