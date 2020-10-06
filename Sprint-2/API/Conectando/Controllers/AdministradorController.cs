using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectando.Domains;
using Conectando.Interfaces;
using Conectando.Repositories;
using Conectando.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Conectando.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private IAdministradorRepository _administradorRepository;

        public AdministradorController()
        {
            _administradorRepository = new AdministradorRepository();
        }

        /// <summary>
        /// Busca um Adm pelo id
        /// </summary>
        /// <param name="id">id do adm buscado</param>
        /// <returns>Retorna os dados do adm buscado e um StatusCode Ok</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Administrador>/{id}
        [Authorize(Roles = "Administrador")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Administrador admBuscado = _administradorRepository.GetById(id);

            if (admBuscado == null)
            {
                return BadRequest();
            }

            return StatusCode(200, admBuscado);
        }

        /// <summary>
        /// Lista todos os Adms
        /// </summary>
        /// <returns>Retorna uma lista com todos os Adms</returns>
        /// <response code="200">Se a lista for acessada com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // GET: api/<Administrador>/
        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult GetAll()
        {
            return StatusCode(200, _administradorRepository.GetAll());
        }

        /// <summary>
        /// Detetar adm por id
        /// </summary>
        /// <param name="id">Id do amd deletado</param>
        /// <returns>Retorna um StatusCode OK</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // DELETE api/<Administrador>/{id}
        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Administrador admBuscado = _administradorRepository.GetById(id);

            if (admBuscado == null)
            {
                return BadRequest();
            }

            _administradorRepository.Delete(admBuscado);

            return Ok();
        }

        /// <summary>
        /// Cadastra um novo adm
        /// </summary>
        /// <param name="adm">Novo adm</param>
        /// <returns>Retorna um StatusCode OK</returns>
        /// <response code="201">Se o aluno for cadastrado com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Administrador>
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Post(Administrador adm)
        {
            _administradorRepository.Add(adm);
            return Ok();
        }

        /// <summary>
        /// Atualiza dados do Adm
        /// </summary>
        /// <param name="adm">Dados Atualizados</param>
        /// <param name="id">Id do adm que será atualizado</param>
        /// <returns>Retorna um StatusCode OK</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Administrador>/{id}
        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        public IActionResult Put(Administrador adm, int id)
        {
            Administrador admBuscado = _administradorRepository.GetById(id);

            if (admBuscado == null)
            {
                return BadRequest();
            }

            _administradorRepository.Atualizar(adm, id);

            return Ok();
        }

        /// <summary>
        /// Troca a senha
        /// </summary>
        /// <param name="id">Id da senha que será trocada</param>
        /// <param name="senha">senha atual e nova</param>
        /// <returns>Retorna um statuscode OK</returns>
        /// <response code="200">Se a requisição ocorrer da forma esperada</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<Administrador>/Trocar/{id}
        [Authorize(Roles = "Administrador")]
        [HttpPut("Trocar/{id}")]
        public IActionResult TrocarSenha(int id, SenhaViewModel senha)
        {
            _administradorRepository.TrocarSenha(id, senha.senhaAtual, senha.senhaNova);

            return Ok();
        }
    }
}
