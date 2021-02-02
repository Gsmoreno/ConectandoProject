using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectando.Domains;
using Conectando.Interfaces;
using Conectando.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Conectando.Controllers
{
    [Route("api/[controller]")]

    [Produces("application/json")]

    [ApiController]
    public class TagsAlunoController : ControllerBase
    {
        private ITagsAlunoRepository _tagsAlunoRepository;

        public TagsAlunoController()
        {
            _tagsAlunoRepository = new TagsAlunoRepository();
        }

        /// <summary>
        /// Lista todos as Tags
        /// </summary>
        /// <returns>Uma lista de tags ligadas a alunos e um status code 200 - Ok</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<TagsAluno>
        [Authorize(Roles = "Aluno,Administrador")]
        [HttpGet]
        public IActionResult Get()
        {
            // Retora a resposta da requisição fazendo a chamada para o método
            return Ok(_tagsAlunoRepository.GetAllInclude(x => x.IdAlunoNavigation, x => x.IdTagsNavigation));
        }

        /// <summary>
        /// Lista as tags por id
        /// </summary>
        /// <returns>Retorna um ok com o id buscado - Ok</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<TagsAluno>/{id}
        [Authorize(Roles = "Aluno,Administrador")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            // Retora a resposta da requisição fazendo a chamada para o método
            return Ok(_tagsAlunoRepository.BuscarPorId(id));
        }

        /// <summary>
        /// Cadastra uma nova tag à classe aluno
        /// </summary>
        /// <returns>retorna um 200 como criado - Ok</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST: api/<TagsAluno>

        [HttpPost]
        public IActionResult Post(TagsAluno novaTag)
        {
            // Faz a chamada para o método
            _tagsAlunoRepository.Cadastrar(novaTag);

            // Retorna um status code
            return StatusCode(200);
        }



        /// <summary>
        /// Deleta uma tag da classe ALuno
        /// </summary>
        /// <returns>retorna um status code de 200 - Ok</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE: api/<TagsAluno>/{id}
        [Authorize(Roles = "Aluno,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Faz a chamada para o método
            _tagsAlunoRepository.Deletar(id);

            // Retorna um status code
            return StatusCode(200);
        }
    }
}