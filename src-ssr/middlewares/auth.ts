import { ssrMiddleware } from 'quasar/wrappers'
import axios from 'axios';

const formUrlEncoded = (x: any) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(async ({ app , resolve /*, publicPath, render */ }) => {
  app.get(resolve.urlPath('/auth'), async (req, res) => {
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    setTimeout(async ()=>{
      const v = await axios.post('https://kauth.kakao.com/oauth/token?',
        formUrlEncoded({
          grant_type: 'authorization_code',
          client_id: 'cefd68b291889544b70649adfd787850',
          // redirect_uri: 'http://localhost:9150/auth',
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
    },1000)

  });
})
