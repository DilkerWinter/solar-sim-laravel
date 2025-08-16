<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyCustomersTableRemoveOldColumnsAddDocumentFields extends Migration
{
    public function up()
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn([
                'street',
                'number',
                'neighborhood',
                'city',
                'state',
                'average_monthly_consumption_kwh',
                'average_annual_consumption_kwh',
                'average_energy_bill',
                'energy_provider',
                'installation_type',
                'roof_type',
                'notes',
            ]);

            if (!Schema::hasColumn('customers', 'document_type')) {
                $table->string('document_type')->nullable();
            }
            if (!Schema::hasColumn('customers', 'document_number')) {
                $table->string('document_number')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('street')->nullable();
            $table->string('number')->nullable();
            $table->string('neighborhood')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();

            $table->float('average_monthly_consumption_kwh')->nullable();
            $table->float('average_annual_consumption_kwh')->nullable();
            $table->decimal('average_energy_bill', 10, 2)->nullable();
            $table->string('energy_provider')->nullable();
            $table->enum('installation_type', ['residential', 'industrial', 'commercial'])->nullable();
            $table->string('roof_type')->nullable();
            $table->text('notes')->nullable();

            $table->dropColumn(['document_type', 'document_number']);
        });
    }
}
