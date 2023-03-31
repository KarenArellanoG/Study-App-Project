const { TopicModel } = require("../model/topic.model");
const {sequelize} = require("../connection");

const listar = async function(txtbuscar) {
    console.log("Listar topicos");

    try {
        const topics = await sequelize.query(`SELECT * 
                                              FROM topics
                                              WHERE 1=1
                                              AND UPPER (name) LIKE UPPER ('%${txtbuscar}%') 
                                              AND deleted IS false
                                              ORDER BY id`);

        if (topics && topics[0]) {
           return topics[0];
        } else {
            return[];
        }
    } catch(error) {
       console.log(error);
       throw error;
    }
};

const consultarPorCodigo = async function(codigo) {
    console.log("Consultar 1 topico por codigo");

    try {
        const TopicModelResult = await TopicModel.findByPk(codigo);

        if (TopicModelResult) {
             return TopicModelResult;
          
        } else {
           return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topicos");

    let topicoRetorno = null;
    const data = { id, create_date, name, topic_id, order, priority, color, owner_user_id }
    
    try {
        let topicoExiste = null;
        if(id){
            topicoExiste = await TopicModel.findByPk(id);
        }
        if (topicoExiste) {
            //Confirma que el tema existe y actualiza
            topicoRetorno = await TopicModel.update(data, { where : {id : id} });
            topicoRetorno = data;
        } else {
            //agg sino
            topicoRetorno = await TopicModel.create(data);
        }
        
        return topicoRetorno;

    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(codigo) {
    console.log("eliminar topicos");
    try{
        TopicModel.destroy({ where: { id: codigo, topic_id: codigo } }, { truncate: false });
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};