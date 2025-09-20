<!-- resources/views/chat.blade.php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat Page</title>
    </head>
    <body>
        <div id="chat"></div>
        <script src="{{ mix('js/app.js') }}"></script> <!-- React অ্যাপ -->
    </body>
</html> -->


<!-- resources/views/chat.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Page</title>
    @vite('resources/js/app.js') <!-- Vite ব্যবহার করে React অ্যাপের স্ক্রিপ্ট লোড -->
</head>
<body>
    <!-- React কম্পোনেন্ট রেন্ডার করার জন্য div -->
    <div id="chat" data-page="{{ json_encode($page) }}"></div> 

</body>
</html>
