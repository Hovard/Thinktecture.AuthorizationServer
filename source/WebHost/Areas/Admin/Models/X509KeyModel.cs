﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Thinktecture.AuthorizationServer.Models;

namespace Thinktecture.AuthorizationServer.WebHost.Areas.Admin.Models
{
    public enum FindType
    {
        Thumbprint, SubjectName
    }

    public class X509KeyModel
    {
        public X509KeyModel()
        {
        }

        public X509KeyModel(X509CertificateReference key)
        {
            this.ID = key.ID;
            this.Name = key.Name;
            this.Value = key.FindValue;
            this.FindType =
                key.FindType == System.Security.Cryptography.X509Certificates.X509FindType.FindByThumbprint ?
                FindType.Thumbprint : Models.FindType.SubjectName;
            this.Thumbprint = key.Certificate.Thumbprint;
        }

        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public FindType FindType { get; set; }
        [Required]
        public string Value { get; set; }
        public string Thumbprint { get; set; }
    }
}