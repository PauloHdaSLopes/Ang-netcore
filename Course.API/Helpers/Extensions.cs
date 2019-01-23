using Microsoft.AspNetCore.Http;

namespace Course.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Controle-Expose-Headers","Applicatin-Error");
            response.Headers.Add("Access-Controle-Allow-Origin","*");

        }
    }
}