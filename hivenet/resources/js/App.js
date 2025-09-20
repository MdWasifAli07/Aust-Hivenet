

import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { App } from '@inertiajs/react';  // Inertia App কম্পোনেন্ট
//import api from './api';
const root = ReactDOM.createRoot(document.getElementById('chat'));  // Blade টেমপ্লেটের div#chat

root.render(
  <App
    initialPage={JSON.parse(document.getElementById('chat').dataset.page)}  // Laravel থেকে পেজ ডেটা পাব
    resolveComponent={(name) => import(`./Pages/${name}`).then((module) => module.default)} // কম্পোনেন্ট রেজলভ করা
  />
);

const App = () => {
  useEffect(() => {
    // Echo এর সাথে সংযোগ স্থাপন
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '779ebbb072c4d00571c4',  // এখানে তোমার Pusher key বসাও
      cluster: 'ap2',  // Pusher ক্লাস্টার (যেমন: 'mt1')
      forceTLS: true
    });

    // একটি চ্যানেল সাবস্ক্রাইব করা
    window.Echo.channel('chat')
      .listen('MessageSent', (event) => {
        console.log(event);  // এখানে তুমি ইভেন্টের তথ্য পাবে
      });

    return () => {
      window.Echo.leave('chat');  // কম্পোনেন্ট আনমাউন্ট হলে চ্যানেল ছাড়ে
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Chat Application!</h1>
    </div>
  );
};

export default App;
