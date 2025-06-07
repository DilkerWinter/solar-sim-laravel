import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import AppLayout from './Layouts/AppLayout'; 

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const noLayoutPages = ['Auth/Login', 'LandingPage'];

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ).then((module) => {
      const Page = module.default;

      if (Page.layout !== undefined) {
        return module;
      }

      if (noLayoutPages.includes(name)) {
        Page.layout = (page) => page;
      } else {
        Page.layout = (page) => <AppLayout>{page}</AppLayout>;
      }

      return module;
    }),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
