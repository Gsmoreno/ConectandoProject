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
    public class TagsVagaController : ControllerBase
    {
        private ITagsVagaRepository _tagsVagaRepository;

        public TagsVagaController()
        {
            _tagsVagaRepository = new TagsVagaRepository();
        }

        /// <summary>
        /// Lista todos as Tags
        /// </summary>
        /// <returns>Uma lista de usuários e um status code 200 - Ok</returns>
        [HttpGet]
        public IActionResult Get()
        {
            // Retora a resposta da requisição fazendo a chamada para o método
            return Ok(_tagsVagaRepository.GetAllInclude(x => x.IdTagsNavigation, x => x.IdVagaNavigation));
        }

        /// <summary>
        /// Lista as tags por id
        /// </summary>
        /// <returns>Uma lista de usuários e um status code 200 - Ok</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET api/<TagsVaga>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            // Retora a resposta da requisição fazendo a chamada para o método
            return Ok(_tagsVagaRepository.BuscarPorId(id));
        }

        /// <summary>
        /// Cadastra uma nova Tag à classe vaga
        /// </summary>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<TagsVaga>
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpPost]
        public IActionResult Post(TagsVaga novaTag)
        {
            // Faz a chamada para o método
            _tagsVagaRepository.Cadastrar(novaTag);

            // Retorna um status code
            return StatusCode(200);
        }



        /// <summary>
        /// Deleta Tag da classe vaga
        /// </summary>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE api/<TagsVaga>/{id}
        [Authorize(Roles = "Empresa,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Faz a chamada para o método
            _tagsVagaRepository.Deletar(id);

            // Retorna um status code
            return StatusCode(200);
        }
    }
}