using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Conectando.Domains;
using Conectando.Interfaces;
using Conectando.Repositories;
using Conectando.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.IdentityModel.Tokens;

namespace Conectando.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IAlunoRepository _alunoRepository { get; set; }
        private IAdministradorRepository _administradorRepository { get; set; }
        private IEmpresaRepository _empresaRepository { get; set; }

        public LoginController()
        {
            _alunoRepository = new AlunoRepository();
            _administradorRepository = new AdministradorRepository();
            _empresaRepository = new EmpresaRepository();
        }

        /// <summary>
        /// Login no sistema
        /// </summary>
        /// <param name="model">Objeto de base para login</param>
        /// <response code="200">Se o login ocorrer com sucesso</response>
        /// <response code="400">Erro em alguma parte da requisição</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // POST api/<Login>
        [HttpPost]  
        public IActionResult Login(LoginViewModel model)
        {

            switch (model.Entrada.Length)
            {
                case 14:

                    if (model.Entrada.Contains("@"))
                    {
                        goto default;
                    }
                    try
                    {
                        Empresa empresa = _empresaRepository.Login(model.Entrada, model.Senha);


                        if (empresa != null)
                        {
                            //payload

                            var claims = new[]
                            {
                                new Claim(JwtRegisteredClaimNames.Email, empresa.Email),
                                new Claim(JwtRegisteredClaimNames.UniqueName, empresa.Cnpj),
                                new Claim(JwtRegisteredClaimNames.Jti, empresa.IdEmpresa.ToString()),
                                new Claim(ClaimTypes.Role, "Empresa") // MUDAR ESSA LINHA QUANDO FOR ADD ADM
                            };

                            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("conectando-key-auth"));

                            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                            var token = new JwtSecurityToken(
                                issuer: "Conectando.WebApi",                // emissor do token
                                audience: "Conectando.WebApi",              // destinatário do token
                                claims: claims,                          // dados definidos acima
                                expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                                signingCredentials: creds                // credenciais do token
                            );

                            return Ok(new
                            {
                                token = new JwtSecurityTokenHandler().WriteToken(token)
                            });
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    catch (Exception)
                    {
                        throw;
                    }

                case 11:

                    if (model.Entrada.Contains("@"))
                    {
                        goto default;
                    }
                    try
                    {
                        Aluno aluno = _alunoRepository.Login(model.Entrada, model.Senha);


                        if (aluno != null)
                        {
                            //payload

                            var claims = new[]
                            {
                                new Claim(JwtRegisteredClaimNames.Email, aluno.Email),
                                new Claim(JwtRegisteredClaimNames.UniqueName, aluno.Cpf),
                                new Claim(JwtRegisteredClaimNames.Jti, aluno.IdAluno.ToString()),
                                new Claim(ClaimTypes.Role, "Aluno") // MUDAR ESSA LINHA QUANDO FOR ADD ADM
                            };

                            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("conectando-key-auth"));

                            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                            var token = new JwtSecurityToken(
                                issuer: "Conectando.WebApi",                // emissor do token
                                audience: "Conectando.WebApi",              // destinatário do token
                                claims: claims,                          // dados definidos acima
                                expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                                signingCredentials: creds                // credenciais do token
                            );

                            return Ok(new
                            {
                                token = new JwtSecurityTokenHandler().WriteToken(token)
                            });
                        }
                        else
                        {
                            Administrador administrador = _administradorRepository.Login(model.Entrada, model.Senha);

                            if (administrador != null)
                            {
                                //payload

                                var claims = new[]
                                {
                                    new Claim(JwtRegisteredClaimNames.Email, administrador.Email),
                                    new Claim(JwtRegisteredClaimNames.UniqueName, administrador.Cpf),
                                    new Claim(JwtRegisteredClaimNames.Jti, administrador.IdAdministrador.ToString()),
                                    new Claim(ClaimTypes.Role, "Administrador")
                                };

                                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("conectando-key-auth"));

                                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                                var token = new JwtSecurityToken(
                                    issuer: "Conectando.WebApi",                // emissor do token
                                    audience: "Conectando.WebApi",              // destinatário do token
                                    claims: claims,                          // dados definidos acima
                                    expires: DateTime.Now.AddMinutes(30),       // tempo de expiração
                                    signingCredentials: creds                // credenciais do token
                                );

                                return Ok(new
                                {
                                    token = new JwtSecurityTokenHandler().WriteToken(token)
                                });
                            }
                            else
                            {
                                return BadRequest();
                            }
                        }
                    }
                    catch (Exception)
                    {
                        throw;
                    }

                default:

                    if (model.Entrada.Contains("@"))
                    {
                        if (model.Entrada.Contains("@sp.senai.br"))
                        {
                            Administrador administrador = _administradorRepository.Login(model.Entrada, model.Senha);

                            if (administrador != null)
                            {
                                //payload

                                var claims = new[]
                                {
                                    new Claim(JwtRegisteredClaimNames.Email, administrador.Email),
                                    new Claim(JwtRegisteredClaimNames.UniqueName, administrador.Cpf),
                                    new Claim(JwtRegisteredClaimNames.Jti, administrador.IdAdministrador.ToString()),
                                    new Claim(ClaimTypes.Role, "Administrador")
                                };

                                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("conectando-key-auth"));

                                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                                var token = new JwtSecurityToken(
                                    issuer: "Conectando.WebApi",                // emissor do token
                                    audience: "Conectando.WebApi",              // destinatário do token
                                    claims: claims,                          // dados definidos acima
                                    expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                                    signingCredentials: creds                // credenciais do token
                                );

                                return Ok(new
                                {
                                    token = new JwtSecurityTokenHandler().WriteToken(token)
                                });
                            }
                            return Ok();
                        }
                        else
                        {
                            Aluno aluno = _alunoRepository.Login(model.Entrada, model.Senha);

                            if (aluno != null)
                            {
                                //payload

                                var claims = new[]
                                {
                                    new Claim(JwtRegisteredClaimNames.Email, aluno.Email),
                                    new Claim(JwtRegisteredClaimNames.UniqueName, aluno.Cpf),
                                    new Claim(JwtRegisteredClaimNames.Jti, aluno.IdAluno.ToString()),
                                    new Claim(ClaimTypes.Role, "Aluno") // MUDAR ESSA LINHA QUANDO FOR ADD ADM
                                };

                                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("conectando-key-auth"));

                                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                                var token = new JwtSecurityToken(
                                    issuer: "Conectando.WebApi",                // emissor do token
                                    audience: "Conectando.WebApi",              // destinatário do token
                                    claims: claims,                          // dados definidos acima
                                    expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                                    signingCredentials: creds                // credenciais do token
                                );

                                return Ok(new
                                {
                                    token = new JwtSecurityTokenHandler().WriteToken(token)
                                });
                            }

                            Empresa empresa = _empresaRepository.Login(model.Entrada, model.Senha);


                            if (empresa != null)
                            {
                                //payload

                                var claims = new[]
                                {
                                new Claim(JwtRegisteredClaimNames.Email, empresa.Email),
                                new Claim(JwtRegisteredClaimNames.UniqueName, empresa.Cnpj),
                                new Claim(JwtRegisteredClaimNames.Jti, empresa.IdEmpresa.ToString()),
                                new Claim(ClaimTypes.Role, "Empresa") // MUDAR ESSA LINHA QUANDO FOR ADD ADM
                            };

                                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("conectando-key-auth"));

                                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                                var token = new JwtSecurityToken(
                                    issuer: "Conectando.WebApi",                // emissor do token
                                    audience: "Conectando.WebApi",              // destinatário do token
                                    claims: claims,                          // dados definidos acima
                                    expires: DateTime.Now.AddMinutes(30),    // tempo de expiração
                                    signingCredentials: creds                // credenciais do token
                                );

                                return Ok(new
                                {
                                    token = new JwtSecurityTokenHandler().WriteToken(token)
                                });
                            }
                        }
                        return BadRequest();
                    }
                    else
                    {
                        return BadRequest("Verifique seu método de entrada");
                    }
            }
        }
    }
}