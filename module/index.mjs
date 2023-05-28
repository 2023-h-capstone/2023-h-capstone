import axios from 'axios';

const formUrlEncoded = x =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

export const handler = async(event) => {
  const v = await axios.post('https://kauth.kakao.com/oauth/token?',
    formUrlEncoded({
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      // redirect_uri: 'http://localhost:9150/auth',
      redirect_uri: process.env.REDIRECT_URL,
      code: event.queryStringParameters.code
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': process.env.AUTH_CODE
      }
    })
  const response = {
    statusCode: 302,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      Location: `https://smustaurant.com/main?access_token=${v.data.access_token}`
    }
  };
  return response;
};
