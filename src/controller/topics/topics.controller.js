const { TopicModel } = require("../../model/topic.model");
const TopicService = require("../../service/topics.service");
const {sequelize} = require("../../connection");

const listar = async function(req, res) {
    console.log("Listar topicos");
    try {
        const topics = await TopicService.listarServ(req.query.filtro || '');
        console.log("topics",topics);

        if(topics){
            res.json({
                success : true,
                topicos : topics
            });
        }else{
            res.json({
                success : true,
                topicos : []
            });
        }

    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const consultarPorCodigo = async function(req, res) {
    console.log("Consultar topico");
    try {
        const TopicModelResult = await  TopicService.consultarPorCodigoServ(req.params.id);
        console.log("topic:",TopicModelResult);
        
        if(TopicModelResult){
            res.json({
                success : true,
                tema : TopicModelResult
            });
        }else{
            res.json({
                success : true,
                tema : null //porque no existe
            });
        }
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const actualizar = async function(req, res) {
    console.log("actualizar topicos");

    let topicoRetorno = null;
    try {
        topicoRetorno = await TopicService.actualizarServ(req.body.id, 
                                                        req.body.create_date,
                                                        req.body.name, 
                                                        req.body.topic_id, 
                                                        req.body.order, 
                                                        req.body.priority, 
                                                        req.body.color, 
                                                        req.body.owner_user_id);
        res.json({
            success : true,
            topico : topicoRetorno
        });
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar topico");
    try{
        await TopicService.eliminarServ(req.params.id);
        res.json({
            success : true
        });
        console.log("Eliminado el topico nro: ", req.params.id);
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};