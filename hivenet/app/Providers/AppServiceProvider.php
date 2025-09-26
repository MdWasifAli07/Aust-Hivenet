<?php


namespace App\Providers;
use App\Http\Responses\LoginResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
// app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\URL;


use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        
    if (config('app.env') === 'production') {
        URL::forceScheme('https');
        URL::forceRootUrl(config('app.url'));
    }

          
    }
}
