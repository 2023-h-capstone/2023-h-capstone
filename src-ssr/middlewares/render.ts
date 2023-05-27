import { RenderError } from '@quasar/app-vite';
import { ssrMiddleware } from 'quasar/wrappers';
import axios from 'axios';
// This middleware should execute as last one
// since it captures everything and tries to
// render the page with Vue

const formUrlEncoded = (x: any) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

// {
//   grant_type: 'authorization_code',
//     client_id: 'cefd68b291889544b70649adfd787850',
//   redirect_uri: 'http://localhost:9100/auth',
//   code: code
// }

export default ssrMiddleware(async ({ app, resolve, render, serve }) => {
  app.get(resolve.urlPath('/auth'), async (req, res) => {
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    const v = await axios.post('https://kauth.kakao.com/oauth/token?',
      formUrlEncoded({
        grant_type: 'authorization_code',
        client_id: 'cefd68b291889544b70649adfd787850',
        // redirect_uri: 'http://localhost:9100/auth',
        redirect_uri: 'https://smustaurant.com/auth',
        code: req.query.code
      }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': '20a405dbfd2aec0ce8c919b93737583e'
        }
      })
    res.redirect(`/main?access_token=${v.data.access_token}`)
  });
  // we capture any other Express route and hand it
  // over to Vue and Vue Router to render our page
  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    render(/* the ssrContext: */ { req, res })
      .then((html) => {
        // now let's send the rendered html to the client
        res.send(html);
      })
      .catch((err: RenderError) => {
        // oops, we had an error while rendering the page

        // we were told to redirect to another URL
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url);
          } else {
            res.redirect(err.url);
          }
        } else if (err.code === 404) {
          // hmm, Vue Router could not find the requested route

          // Should reach here only if no "catch-all" route
          // is defined in /src/routes
          res.status(404).send('404 | Page Not Found');
        } else if (process.env.DEV) {
          // well, we treat any other code as error;
          // if we're in dev mode, then we can use Quasar CLI
          // to display a nice error page that contains the stack
          // and other useful information

          // serve.error is available on dev only
          serve.error({ err, req, res });
        } else {
          // we're in production, so we should have another method
          // to display something to the client when we encounter an error
          // (for security reasons, it's not ok to display the same wealth
          // of information as we do in development)

          // Render Error Page on production or
          // create a route (/src/routes) for an error page and redirect to it
          res.status(500).send(err.stack);
          // console.error(err.stack)
        }
      });
  });
});
