<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::dropIfExists('categories');

        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'category_id')) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            }

            if (!Schema::hasColumn('products', 'type_id')) {
                $table->foreignId('type_id')
                    ->nullable() 
                    ->constrained('product_types')
                    ->onDelete('cascade');
            }
        });
    }

    public function down(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'type_id')) {
                $table->dropForeign(['type_id']);
                $table->dropColumn('type_id');
            }

            if (!Schema::hasColumn('products', 'category_id')) {
                $table->foreignId('category_id')
                    ->nullable()
                    ->constrained('categories')
                    ->onDelete('cascade');
            }
        });

        // Apagar a tabela product_types
        Schema::dropIfExists('product_types');
    }
};
