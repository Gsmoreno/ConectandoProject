using System;
using System.Collections.Generic;

namespace Conectando.Domains
{
    public partial class Tags
    {
        public Tags()
        {
            TagsAluno = new HashSet<TagsAluno>();
            TagsVaga = new HashSet<TagsVaga>();
        }

        public int IdTags { get; set; }
        public string Nome { get; set; }

        public virtual ICollection<TagsAluno> TagsAluno { get; set; }
        public virtual ICollection<TagsVaga> TagsVaga { get; set; }
    }
}
