const { ThemePropertieModel } = require("../model/theme-propertie.model");
const {sequelize} = require("../connection");

const listarServ = async function(txtbuscar) {
    console.log("listar temas Service");
    try {
        const themes = await sequelize.query(`SELECT * 
                                    FROM themes_properties 
                                    Where 1 = 1
                                        AND UPPER(property_name) LIKE UPPER('%${txtbuscar}%') 
                                    ORDER BY id`);
        console.log("temas: ",themes);
        if(themes && themes[0]){
            return themes[0];
        }else{
            return [];;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigoServ = async function(txtid) {
    console.log("Consultar tema Service");
    try {
        const Result = await ThemePropertieModel.findByPk(txtid);

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

const actualizarServ = async function(id, theme_id, property_name, property_value) {
    console.log("actualizar temas Service");

    let retorno = null;
    const data = {id, theme_id, property_name, property_value};
    
    try {
        let existe = null;
        if(id){
            existe = await ThemePropertieModel.findByPk(id);
        }
        if (existe) {
            //Confirma que existe y actualiza
            retorno = await ThemePropertieModel.update(data, { where : {id : id}});
            retorno = data;//asi retorna los datos en vez de solo los campos actualizados
            console.log("tema Service actualizado");
        } else {
            //agg sino
            retorno = await ThemePropertieModel.create(data);
            console.log("Nuevo tema Service");
        }
        return retorno;
    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminarServ = async function(txtid) {
    console.log("eliminar tema Service");
    try{
        await ThemePropertieModel.destroy(txtid);
        console.log("Tema eliminado Service");
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listarServ, consultarPorCodigoServ, actualizarServ, eliminarServ
};