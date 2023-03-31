const { json } = require("sequelize");
const UserService = require("../../service/users.service");
const {sequelize} = require("../../connection");

const listar = async function(req, res) {
    console.log("listar usuarios controller");

    try {
        const users = await UserService.listarServ(req.query.filtro || '');

        console.log("users",users);
        
        if(users){
            res.json({
                success : true,
                usuarios : users
            });
        }else{
            res.json({
                success : true,
                usuarios : []
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
    console.log("Consultar usuarios");
    try {
        const UserModelResult = await UserService.consultarPorCodigoServ(req.params.id);

        if(UserModelResult){
            res.json({
                success : true,
                usuario : UserModelResult
            });
        }else{
            res.json({
                success : true,
                usuario : null //porque no existe
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
    console.log("actualizar usuarios");

    let usuarioRetorno = null;
    
    try {
        usuarioRetorno = await UserService.actualizarServ(req.body.id, 
                                                    req.body.name, 
                                                    req.body.last_name, 
                                                    req.body.avatar, 
                                                    req.body.email, 
                                                    req.body.password, 
                                                    req.body.deleted);
        res.json({
            success : true,
            user : usuarioRetorno
        });
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    try{
        //await UserModel.destroy(req.params.id);
        await UserService.eliminarServ(req.params.id);
        res.json({
            success : true
        });
        console.log("Usuario eliminado");
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