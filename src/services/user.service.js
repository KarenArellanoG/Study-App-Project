const { UserModel } = require("../model/user.model");
const {sequelize} = require("../connection");

const listar = async function(txtbuscar) {
    console.log("listar usuarios Service");
    try {
        const users = await sequelize.query(`SELECT * 
                                            FROM users 
                                            WHERE 1=1
                                            AND UPPER (name) LIKE UPPER ('%${txtbuscar}%') 
                                            AND deleted IS false
                                            ORDER BY id`);

        
        if (users && users[0]) {
            return users[0];
        } else {
            return [];;
        }
    } catch (error) {

        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function(codigo) {

    console.log("Consultar 1 usuario por codigo");

    try {
        const UserModelResult = await UserModel.findByPk(codigo);

        if (UserModelResult) {
            return UserModelResult;
        } else {
            return [];
        }
    } catch(error) {
        
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, name, last_name, avatar, email, password, deleted ) {
    console.log("actualizar usuarios");

    let usuarioRetorno = null;
    const data = { id, name, last_name, avatar, email, password, deleted };
    
    try {
        let userExiste = null;
        if (id) {
            userExiste = await UserModel.findByPk(id);
        }
        if (userExiste) {
            usuarioRetorno = await UserModel.update(data, { where : {id : id} });
            usuarioRetorno = data;
            console.log("usuario actualizado");
        } else {
            //agg sino
            usuarioRetorno = await UserModel.create(data);
            console.log("Nuevo usuario");
        }
        return usuarioRetorno;

    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(codigo) {
    console.log("eliminar usuarios");

    try{
       
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + codigo);
        
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};