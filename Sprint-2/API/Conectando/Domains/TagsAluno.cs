using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class TagsAluno
    {
        public int IdAluno { get; set; }
        public int IdTags { get; set; }

        public virtual Aluno IdAlunoNavigation { get; set; }
        public virtual Tags IdTagsNavigation { get; set; }
    }
}
