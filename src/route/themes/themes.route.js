const themesController = require('../../controller/themes/themes.controller');
const themesPropietiesController = require('../../controller/themes/themes-properties.controller');

module.exports = function(app) {

    app.get("/themes/list", themesController.listar);
    app.get("/theme/:id", themesController.consultarPorCodigo);
    app.post("/themes/update", themesController.actualizar);
    app.delete("/themes/delete/:id", themesController.eliminar);
    
    app.get("/themes-properties/list", themesPropietiesController.listar);
    app.get("/theme-propertie/:id", themesPropietiesController.consultarPorCodigo);
    app.post("/themes-properties/update", themesPropietiesController.actualizar);
    app.delete("/themes-properties/delete/:id", themesPropietiesController.eliminar);
}