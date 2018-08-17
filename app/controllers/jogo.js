module.exports.jogo = function(application, res, req) {
  if(req.session.autorizado !== true) {
    res.send('faça seu login');
    return;
  }

  var msg = 'N';
  if(req.query.msg !== '') {
    msg = req.query.msg;
  }

  var usuario = req.session.usuario;
  var casa = req.session.casa;
  var connection = application.config.dbConnection;

  var JogoDAO = new application.app.models.JogoDAO(connection);
  JogoDAO.iniciaJogo(res, usuario, casa, msg); 
}
module.exports.sair = function(application, res, req) {
  req.session.destroy(function() {
    res.render('index', { validacao : {}, dadosForm : {} })
  });    
}
module.exports.suditos = function(application, res, req) {
  if(req.session.autorizado !== true) {
    res.send('faça seu login');
    return;
  }
  res.render('aldeoes', { validacao : {} })
}
module.exports.pergaminhos = function(application, res, req) {
  if(req.session.autorizado !== true) {
    res.send('faça seu login');
    return;
  }
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  var usuario = req.session.usuario;
  JogoDAO.getAcoes(usuario, res);

  
}
module.exports.ordenar_acao_sudito = function(application, res, req) {
  var dadosForm = req.body;

  req.assert('acao', 'Ação não pode ser vazio').notEmpty();
  req.assert('quantidade', 'Quantidade não pode ser vazio').notEmpty();

  var erros = req.validationErrors();

  if(erros) {
    res.redirect('jogo?msg=A');
    return;
  }

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  dadosForm.usuario = req.session.usuario;
  JogoDAO.acao(dadosForm);

  res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = function(application, res, req) {
  var url_query = req.query;
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);
  var _id = url_query.id_acao;
  console.log(_id);
  JogoDAO.revogarAcao(_id, res);
}