const { json } = require("sequelize");
const { TopicModel } = require("../model/topic.model");
const {sequelize} = require("../connection");

const listarServ = async function(txtbuscar) {
    console.log("listar topicos Service");
    try {
        const topics = await sequelize.query(`SELECT * 
                                            FROM topics 
                                            Where 1 = 1
                                                AND UPPER(name) LIKE UPPER('%${txtbuscar}%') 
                                            ORDER BY id`);
        console.log("topicos: ",topics);
        if(topics && topics[0]){
            return topics[0];
        }else{
            return [];;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigoServ = async function(txtid) {
    console.log("Consultar topico Service");
    try {
        const Result = await TopicModel.findByPk(txtid);

        if(Result){
            return Result[0];
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizarServ = async function(id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topicos Service");

    let retorno = null;
    const data = {id, create_date, name, topic_id, order, priority, color, owner_user_id};
    
    try {
        let existe = null;
        if(id){
            existe = await TopicModel.findByPk(id);
        }
        if (existe) {
            //Confirma que existe y actualiza
            retorno = await TopicModel.update(data, { where : {id : id}});
            retorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("topico Service actualizado");
        } else {
            //agg sino
            retorno = await TopicModel.create(data);
            console.log("Nuevo topico Service");
        }
        return retorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminarServ = async function(txtid) {
    console.log("eliminar topicos Service");
    try{
        await TopicModel.destroy(txtid);
        console.log("topico eliminado Service");
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listarServ, consultarPorCodigoServ, actualizarServ, eliminarServ
};