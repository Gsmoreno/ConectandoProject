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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private IEnderecoRepository _enderecoRepository;

        public EnderecoController()
        {
            _enderecoRepository = new EnderecoRepository();
        }

        /// <summary>
        /// Busca Endereço atraves do id
        /// </summary>
        /// <param name="id">Id do endereço que será buscado</param>
        /// <returns>Retorna um endereço e um StatusCode de OK</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Endereco>/{id}
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Endereco enderecoBuscado = _enderecoRepository.GetById(id);

            if (enderecoBuscado == null)
            {
                return NoContent();
            }

            return StatusCode(200, enderecoBuscado);
        }

        /// <summary>
        /// Deleta um Endereço por id
        /// </summary>
        /// <param name="id">ID do endereço que será deletado</param>
        /// <returns>Retorna um StatusCode OK</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE: api/<Endereco>/{id}
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Detele(int id)
        {
            Endereco enderecoBuscado = _enderecoRepository.GetById(id);

            if (enderecoBuscado == null)
            {
                return StatusCode(400);
            }

            _enderecoRepository.Delete(enderecoBuscado);

            return Ok();
        }

        /// <summary>
        /// Atualiza um endereço
        /// </summary>
        /// <param name="endereco">Endereço alterado</param>
        /// <param name="id">Id do endereço que quer alrerar</param>
        /// <returns>Retorna um StatusCode OK</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT: api/<Endereco>/{id}
        [Authorize(Roles = "Aluno,Empresa,Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put(Endereco endereco, int id)
        {
            Endereco enderecoBuscado = _enderecoRepository.GetById(id);

            if (enderecoBuscado == null)
            {
                return StatusCode(400);
            }
            _enderecoRepository.Atualizar(endereco, id);

            return Ok();
        }

        /// <summary>
        /// Cadastra um novo endereço
        /// </summary>
        /// <param name="endereco">Novo endereço</param>
        /// <returns>Retorna um id primario da tabela</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST: api/<Endereco>/

        [HttpPost]
        public IActionResult Post(Endereco endereco)
        {
            int id = _enderecoRepository.Cadastrar(endereco);

            return StatusCode(200, id);
        }
    }
}
