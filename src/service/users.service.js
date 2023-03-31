const { json } = require("sequelize");
const { UserModel } = require("../model/user.model");
const {sequelize} = require("../connection");

const listarServ = async function(txtbuscar) {
    console.log("listar usuarios Service");
    try {
        const users = await sequelize.query(`SELECT * 
                                    FROM users 
                                    Where 1 = 1
                                        AND UPPER(name) LIKE UPPER('%${txtbuscar}%') 
                                        AND deleted IS false
                                    ORDER BY id`);
        console.log("users",users);
        if(users && users[0]){
            return users[0];
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigoServ = async function(txtid) {
    console.log("Consultar usuarios Service");
    try {
        const UserModelResult = await UserModel.findByPk(txtid);

        if(UserModelResult){
            return UserModelResult[0];
        }else{
            return [];
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const actualizarServ = async function(id, name, last_name, avatar, email, password, deleted ) {
    console.log("actualizar usuarios Service");

    let usuarioRetorno = null;
    const data = {id, name, last_name, avatar, email, password, deleted};
    
    try {
        let userExiste = null;
        if(id){
            userExiste = await UserModel.findByPk(id);
        }
        if (userExiste) {
            //Confirma que el usuario existe y actualiza
            usuarioRetorno = await UserModel.update(data, { where : {id : id}});
            usuarioRetorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("usuario actualizado Service");
        } else {
            //agg sino
            usuarioRetorno = await UserModel.create(data);
            console.log("Nuevo usuario Service");
        }
        return usuarioRetorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminarServ = async function(txtid) {
    console.log("eliminar usuarios Service");
    try{
        //await UserModel.destroy(txtid);
        await sequelize.query(`UPDATE users SET deleted = true WHERE id = ${txtid}`);
        
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listarServ, consultarPorCodigoServ, actualizarServ, eliminarServ
};