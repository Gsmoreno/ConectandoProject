using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class TagsVaga
    {
        public int IdVaga { get; set; }
        public int IdTags { get; set; }

        public virtual Tags IdTagsNavigation { get; set; }
        public virtual Vaga IdVagaNavigation { get; set; }
    }
}
