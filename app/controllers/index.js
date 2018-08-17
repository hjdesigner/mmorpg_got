module.exports.index = function(application, res, req) {
  res.render('index', { validacao : {}, dadosForm : {} });
}
module.exports.autenticar = function(application, res, req) {
  var dadosForm = req.body;

  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
  req.assert('senha', 'Senha não pode ser vazio').notEmpty();

  var erros = req.validationErrors();

  if(erros) {
    res.render('index', { validacao : erros, dadosForm : dadosForm });
    return;
  }

  var connection = application.config.dbConnection;
  var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
  UsuariosDAO.autenticar(dadosForm, req, res);

  // res.send('tudo ok para criar a senssão');
}