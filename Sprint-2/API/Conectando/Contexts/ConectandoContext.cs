using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Conectando.Domains;

namespace Conectando.Contexts
{
    public partial class ConectandoContext : DbContext
    {
        public ConectandoContext()
        {
        }

        public ConectandoContext(DbContextOptions<ConectandoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Administrador> Administrador { get; set; }
        public virtual DbSet<Aluno> Aluno { get; set; }
        public virtual DbSet<Curso> Curso { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<Endereco> Endereco { get; set; }
        public virtual DbSet<Inscricao> Inscricao { get; set; }
        public virtual DbSet<Tags> Tags { get; set; }
        public virtual DbSet<TagsAluno> TagsAluno { get; set; }
        public virtual DbSet<TagsVaga> TagsVaga { get; set; }
        public virtual DbSet<Vaga> Vaga { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.

                optionsBuilder.UseSqlServer("Data Source=DESKTOP-75V5O1R\\SQLEXPRESS; Initial Catalog=Conectando; Integrated Security=True;");

                //optionsBuilder.UseSqlServer("Data Source=LAPTOP-7S7DFPHF\\SQLEXPRESS; Initial Catalog=Conectando; Integrated Security=True;");

                //optionsBuilder.UseSqlServer("Data Source=DESKTOP-HPANU82\\SQLEXPRESS; Initial Catalog=Conectando; Integrated Security=True;");

                //optionsBuilder.UseSqlServer("Data Source=DESKTOP-B8JV198\\SQLEXPRESS; Initial Catalog=Conectando; Integrated Security=True;");


            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Administrador>(entity =>
            {
                entity.HasKey(e => e.IdAdministrador)
                    .HasName("PK__Administ__2B3E34A82230796F");

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__Administ__C1F89731D1D7B107")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Administ__A9D105343A12BAD5")
                    .IsUnique();

                entity.HasIndex(e => e.Rg)
                    .HasName("UQ__Administ__321537C82C56CA32")
                    .IsUnique();

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("CPF")
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Foto)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasColumnName("RG")
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Aluno>(entity =>
            {
                entity.HasKey(e => e.IdAluno)
                    .HasName("PK__Aluno__8092FCB371E34359");

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__Aluno__C1F8973152777F1B")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Aluno__A9D1053466ACB1C2")
                    .IsUnique();

                entity.HasIndex(e => e.Rg)
                    .HasName("UQ__Aluno__321537C87F5FBA56")
                    .IsUnique();

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("CPF")
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Deficiencia)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.DescricaoDeficiencia)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FocoCarreira)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Foto)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LinkPortifolio)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NivelExp)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PrefContrato)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PrefPorte)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PrefRemoto)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasColumnName("RG")
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Whatsapp)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCursoNavigation)
                    .WithMany(p => p.Aluno)
                    .HasForeignKey(d => d.IdCurso)
                    .HasConstraintName("FK__Aluno__IdCurso__46E78A0C");

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Aluno)
                    .HasForeignKey(d => d.IdEndereco)
                    .HasConstraintName("FK__Aluno__IdEnderec__45F365D3");
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.HasKey(e => e.IdCurso)
                    .HasName("PK__Curso__085F27D6C4484F24");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Empresa>(entity =>
            {
                entity.HasKey(e => e.IdEmpresa)
                    .HasName("PK__Empresa__5EF4033E32B89E06");

                entity.HasIndex(e => e.Cnae)
                    .HasName("UQ__Empresa__AA5E6DE42BC2158D")
                    .IsUnique();

                entity.HasIndex(e => e.Cnpj)
                    .HasName("UQ__Empresa__AA57D6B4225BC661")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Empresa__A9D105342CE4D591")
                    .IsUnique();

                entity.Property(e => e.Cnae)
                    .IsRequired()
                    .HasColumnName("CNAE")
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasColumnName("CNPJ")
                    .HasMaxLength(14)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Foto)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NomeFantasia)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PorteEmpresa)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RazaoSocial)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Whatsapp)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Empresa)
                    .HasForeignKey(d => d.IdEndereco)
                    .HasConstraintName("FK__Empresa__IdEnder__5165187F");
            });

            modelBuilder.Entity<Endereco>(entity =>
            {
                entity.HasKey(e => e.IdEndereco)
                    .HasName("PK__Endereco__0B7C7F176B0B266B");

                entity.Property(e => e.Bairro)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Cep)
                    .IsRequired()
                    .HasColumnName("CEP")
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Cidade)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Complemento)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Numero)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Rua)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Uf)
                    .IsRequired()
                    .HasColumnName("UF")
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Inscricao>(entity =>
            {
                entity.HasKey(e => e.IdInscricao)
                    .HasName("PK__Inscrica__6209444B0700CADC");

                entity.Property(e => e.DataInscricao)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.IdAlunoNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdAluno)
                    .HasConstraintName("FK__Inscricao__IdAlu__5DCAEF64");

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.Inscricao)
                    .HasForeignKey(d => d.IdVaga)
                    .HasConstraintName("FK__Inscricao__IdVag__5EBF139D");
            });

            modelBuilder.Entity<Tags>(entity =>
            {
                entity.HasKey(e => e.IdTags)
                    .HasName("PK__Tags__9FCD3F7E1F807241");

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__Tags__7D8FE3B21B1B753B")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TagsAluno>(entity =>
            {
                entity.HasKey(e => new { e.IdAluno, e.IdTags })
                    .HasName("PK__TagsAlun__796E2F44525D9114");

                entity.HasOne(d => d.IdAlunoNavigation)
                    .WithMany(p => p.TagsAluno)
                    .HasForeignKey(d => d.IdAluno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TagsAluno__IdAlu__49C3F6B7");

                entity.HasOne(d => d.IdTagsNavigation)
                    .WithMany(p => p.TagsAluno)
                    .HasForeignKey(d => d.IdTags)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TagsAluno__IdTag__4AB81AF0");
            });

            modelBuilder.Entity<TagsVaga>(entity =>
            {
                entity.HasKey(e => new { e.IdVaga, e.IdTags })
                    .HasName("PK__TagsVaga__51B40FC90782CF1E");

                entity.HasOne(d => d.IdTagsNavigation)
                    .WithMany(p => p.TagsVaga)
                    .HasForeignKey(d => d.IdTags)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TagsVaga__IdTags__59FA5E80");

                entity.HasOne(d => d.IdVagaNavigation)
                    .WithMany(p => p.TagsVaga)
                    .HasForeignKey(d => d.IdVaga)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TagsVaga__IdVaga__59063A47");
            });

            modelBuilder.Entity<Vaga>(entity =>
            {
                entity.HasKey(e => e.IdVaga)
                    .HasName("PK__Vaga__A848DC3ED3C57A71");

                entity.Property(e => e.Area)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Beneficios)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Detalhes)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Horario)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NivelExp)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Prazo).HasColumnType("date");

                entity.Property(e => e.Remoto)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Requisitos)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Salario).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Situacao).HasDefaultValueSql("((1))");

                entity.Property(e => e.TipoContrato)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEmpresaNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdEmpresa)
                    .HasConstraintName("FK__Vaga__IdEmpresa__5629CD9C");

                entity.HasOne(d => d.IdEnderecoNavigation)
                    .WithMany(p => p.Vaga)
                    .HasForeignKey(d => d.IdEndereco)
                    .HasConstraintName("FK__Vaga__IdEndereco__5535A963");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
