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
    public class TagsController : ControllerBase
    {
        private ITagsRepository _tagsRepository;

        public TagsController()
        {
            _tagsRepository = new TagsRepository();
        }

        /// <summary>
        /// Lista todos as Tags
        /// </summary>
        /// <returns>Uma lista de tags e um status code 200 - Ok</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Tags>

        [HttpGet]
        public IActionResult Get()
        {
            // Retora a resposta da requisição fazendo a chamada para o método
            return Ok(_tagsRepository.Listar());
        }

        /// <summary>
        /// Lista as tags por id
        /// </summary>
        /// <returns>Uma tag e um status code 200 - Ok</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Tags>/{id}
  
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            // Retora a resposta da requisição fazendo a chamada para o método
            return Ok(_tagsRepository.BuscarPorId(id));
        }


        /// <summary>
        /// Cadastra uma nova tag
        /// </summary>
        /// <returns> Um status code de 200 - Ok</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Tags>/
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Post(Tags novaTag)
        {
            // Faz a chamada para o método
            _tagsRepository.Cadastrar(novaTag);

            // Retorna um status code
            return StatusCode(200);
        }


        /// <summary>
        /// Atualiza as tags buscando elas por id
        /// </summary>
        /// <returns> Uma Tag atualizada e um status code 200 - Ok</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Tags>/{id}
        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tags tagAtualizada)
        {
            // Faz a chamada para o método
            _tagsRepository.Atualizar(id, tagAtualizada);

            // Retorna um status code
            return StatusCode(200);
        }

        /// <summary>
        /// Deleta uma tag buscando por id
        /// </summary>
        /// <returns> um status de 200 - Ok</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Tags>/{id}
        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Faz a chamada para o método
            _tagsRepository.Deletar(id);

            // Retorna um status code
            return StatusCode(200);
        }
    }
}