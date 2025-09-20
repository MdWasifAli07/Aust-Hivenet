// import axios from 'axios';
// window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


import _ from 'lodash';
window._ = _;

// Axios (Laravel Breeze/Inertia ডিফল্ট)
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 👇 Echo সেটআপ
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const scheme = import.meta.env.VITE_PUSHER_SCHEME ?? 'http';
const host = import.meta.env.VITE_PUSHER_HOST ?? window.location.hostname;
const port = Number(import.meta.env.VITE_PUSHER_PORT ?? 6001);

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
  wsHost: host,
  wsPort: port,
  wssPort: port,
  forceTLS: scheme === 'https',
  enabledTransports: ['ws', 'wss'],
});
