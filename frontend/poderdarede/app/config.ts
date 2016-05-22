function isHosted()
{
    // Rudimentary check to see if we are running on Heroku. Should provide a more flexible config.
    return window.location.hostname.indexOf('rodrigocipriani.com.br') >= 0;
}

export let SERVER_URL = isHosted() ? "http://rodrigocipriani.com.br:21021" : "http://localhost:21021";
export let HTTP_URL = isHosted() ? "http://rodrigocipriani.com.br:21021" : "http://localhost:21021";
