<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'finance_dashboard';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('epargnes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('date_transaction');
            $table->float('montant_transaction');
            $table->string('banque');
            $table->string('compte');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('epargnes');
    }
};
