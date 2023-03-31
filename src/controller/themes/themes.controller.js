const { ThemeModel } = require("../../model/theme.model");
const ThemeService = require("../../service/themes.service");
const {sequelize} = require("../../connection");

const listar = async function(req, res) {
    console.log("Listar temas");
    try {
        const themes = await ThemeService.listarServ(req.query.filtro || '');

        console.log("themes",themes);

        if(themes){
            res.json({
                success : true,
                temas : themes
            });
        }else{
            res.json({
                success : true,
                temas : []
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
    console.log("Consultar tema");
    try {
        const ThemeModelResult = await ThemeService.consultarPorCodigoServ(req.params.id);
        console.log("theme: ",ThemeModelResult);

        if(ThemeModelResult){
            res.json({
                success : true,
                tema : ThemeModelResult
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
    console.log("actualizar temas");

    let temaRetorno = null;
    
    try {
        temaRetorno = await ThemeService.actualizarServ(req.body.id, 
                                                        req.body.create_date,
                                                        req.body.name, 
                                                        req.body.description, 
                                                        req.body.keywords, 
                                                        req.body.owner_user_id);
        res.json({
            success : true,
            tema : temaRetorno
        });
    } catch(error) {
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar tema");
    try{
        await ThemeService.eliminarServ(req.params.id);
        res.json({
            success : true
        });
        console.log("Eliminado tema nro: ", req.params.id);
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