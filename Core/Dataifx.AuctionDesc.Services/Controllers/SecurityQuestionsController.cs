using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dataifx.Trading.Infrastructure.Models;
using Dataifx.Trading.Services.Models;
using Dataifx.Trading.CommonObjects;
using Dataifx.Trading.Services.ActionFilters;

namespace Dataifx.Trading.Services.Controllers
{
    //[AuthorizationRequired]
    public class SecurityQuestionsController : BaseController
    {
        static readonly ISecurityQuestions MySecurityQuestions = new Services.Models.SecurityQuestions();

        [HttpGet]
        [HttpPost]
        public List<SecurityQuestion> GetQuestions(Infrastructure.Models.SecurityQuestion objSecurityQuestion)
        {
            return MySecurityQuestions.GetQuestions();
        }

        [HttpGet]
        [HttpPost]
        public List<SecurityQuestion> GetQuestionsByIdClient(Infrastructure.Models.SecurityQuestion objSecurityQuestion)
        {
            return MySecurityQuestions.GetQuestionsByIdClient(objSecurityQuestion);
        }

        [HttpGet]
        [HttpPost]
        public bool AddQuestionsByIdClient(SecurityQuestion objSecurityQuestion)
        {

            return MySecurityQuestions.AddQuestionsByIdClient(objSecurityQuestion);

        }


        [HttpGet]
        [HttpPost]
        public bool UpdateQuestionsByIdClient(SecurityQuestion objSecurityQuestion)
        {

            return MySecurityQuestions.UpdateQuestionsByIdClient(objSecurityQuestion);

        }

        [HttpGet]
        [HttpPost]
        public bool ValidateQuestions(List<SecurityQuestion> securityquestion)
        {

            return MySecurityQuestions.ValidateQuestions(securityquestion);

        }



    }
}
