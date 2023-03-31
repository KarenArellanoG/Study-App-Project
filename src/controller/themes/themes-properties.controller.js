const ThemeService = require("../../service/themes-propertie.service");
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
        console.log("theme: ", ThemeModelResult);

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
    console.log("actualizar temas pro");

    let temaRetorno = null;
    
    try {
        temaRetorno = await ThemeService.actualizarServ(req.body.id, 
                                                        req.body.theme_id,
                                                        req.body.property_name, 
                                                        req.body.property_value);
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