const sequelize = require('../index');
const Role = require('./Role');
const User = require('./User');
const Area = require('./Area');
const Normativa = require('./Normativa');
const Articulo = require('./Articulo');
const PermisologiaTierra = require('./PermisologiaTierra');
const ConcesionAcuicultura = require('./ConcesionAcuicultura');
const ConcesionMaritima = require('./ConcesionMaritima');
const Notificacion = require('./Notificacion');
const Infa = require('./Infa');
const Procedimiento = require('./Procedimiento');
const BitacoraActualizacion = require('./BitacoraActualizacion');
const Auditoria = require('./Auditoria');
const Hallazgo = require('./Hallazgo');
const Compromiso = require('./Compromiso');
const ReporteExterno = require('./ReporteExterno');

// IEEE Trace: associations mapping
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

Articulo.belongsTo(Normativa, { foreignKey: 'normativa_id' });
Normativa.hasMany(Articulo, { foreignKey: 'normativa_id' });

// Sprint 2 associations
PermisologiaTierra.belongsTo(Area, { foreignKey: 'area_id' });
ConcesionAcuicultura.belongsTo(Area, { foreignKey: 'area_id' });
ConcesionMaritima.belongsTo(Area, { foreignKey: 'area_id' });
Notificacion.belongsTo(User, { foreignKey: 'user_id' });

// Sprint 3 associations
Infa.belongsTo(Area, { foreignKey: 'area_id' });
BitacoraActualizacion.belongsTo(User, { foreignKey: 'user_id' });

// Sprint 4 associations
Auditoria.belongsTo(Area, { foreignKey: 'area_id' });
Auditoria.belongsTo(User, { foreignKey: 'user_id' });
Hallazgo.belongsTo(Auditoria, { foreignKey: 'auditoria_id' });
Auditoria.hasMany(Hallazgo, { foreignKey: 'auditoria_id' });
Compromiso.belongsTo(Hallazgo, { foreignKey: 'hallazgo_id' });
Hallazgo.hasMany(Compromiso, { foreignKey: 'hallazgo_id' });
ReporteExterno.belongsTo(Area, { foreignKey: 'area_id' });

module.exports = {
    sequelize,
    Role,
    User,
    Area,
    Normativa,
    Articulo,
    PermisologiaTierra,
    ConcesionAcuicultura,
    ConcesionMaritima,
    Notificacion,
    Infa,
    Procedimiento,
    BitacoraActualizacion,
    Auditoria,
    Hallazgo,
    Compromiso,
    ReporteExterno
};
