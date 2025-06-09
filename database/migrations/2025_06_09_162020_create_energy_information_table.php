<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnergyInformationTable extends Migration
{
    public function up()
    {
        Schema::create('address_energy_infos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('address_id')->constrained('addresses')->onDelete('cascade');

            $table->float('average_monthly_consumption_kwh')->nullable();
            $table->float('average_annual_consumption_kwh')->nullable();
            $table->decimal('average_energy_bill', 10, 2)->nullable();
            $table->string('energy_provider')->nullable();
            $table->enum('installation_type', ['residencial', 'comercial', 'industrial', 'rural'])->nullable();
            $table->string('roof_type')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('address_energy_infos');
    }
}
