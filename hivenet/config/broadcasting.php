<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcast Driver
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default broadcast driver that should be used by
    | your application. Available drivers are: "pusher", "redis", "log", and "null".
    |
    */

    'default' => env('BROADCAST_DRIVER', 'pusher'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Below you can define all of the broadcast connections that will be used
    | by your application. You can use the `pusher` driver for real-time
    | broadcasting, or you may configure Redis or another broadcast driver.
    |
    */

    'connections' => [

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('VITE_PUSHER_APP_KEY'),
            'secret' => env('VITE_PUSHER_APP_SECRET'),
            'app_id' => env('VITE_PUSHER_APP_ID'),
            'options' => [
                'cluster' => env('VITE_PUSHER_APP_CLUSTER'),
                'useTLS' => true,
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
