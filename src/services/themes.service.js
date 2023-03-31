const { ThemeModel } = require("../model/theme.model");
const { sequelize } = require("../connection");

const listar = async function(txtbuscar) {
    console.log("Listar temas");

    try {
        const themes = await sequelize.query(`SELECT * 
                                              FROM themes
                                              WHERE 1=1
                                              AND UPPER (name) LIKE UPPER ('%${txtbuscar}%') 
                                              AND deleted IS false
                                              ORDER BY id`);

        if (themes && themes[0]) {
           return themes[0];
        } else {
            return[];
        }
    } catch(error) {
       console.log(error);
       throw error;
    }
};

const consultarPorCodigo = async function(codigo) {
    console.log("Consultar 1 tema por codigo");

    try {
        const ThemeModelResult = await ThemeModel.findByPk(codigo);

        if (ThemeModelResult) {
             return ThemeModelResult;
          
        } else {
           return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function(id, create_date, name, description, keywords, owner_user_id) {
    console.log("actualizar temas");

    let temaRetorno = null;
    const data = { id, create_date, name, description, keywords, owner_user_id }
    
    try {
        let temaExiste = null;
        if(id){
            temaExiste = await ThemeModel.findByPk(id);
        }
        if (temaExiste) {
            //Confirma que el tema existe y actualiza
            temaRetorno = await ThemeModel.update(data, { where : {id : id} });
            temaRetorno = data;
        } else {
            //agg sino
            temaRetorno = await ThemeModel.create(data);
        }
        
        return temaRetorno;

    } catch(error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function(codigo) {
    console.log("eliminar tema");
    try{
        ThemeModel.destroy({ where: { id: codigo } }, { truncate: false });
    } catch(error) {
        console.log(error);
        throw error;
    }
    
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};