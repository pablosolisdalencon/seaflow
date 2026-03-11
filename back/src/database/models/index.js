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
const EstacionInfa = require('./EstacionInfa');
const Procedimiento = require('./Procedimiento');
const BitacoraActualizacion = require('./BitacoraActualizacion');
const Auditoria = require('./Auditoria');
const Hallazgo = require('./Hallazgo');
const Compromiso = require('./Compromiso');
const ReporteExterno = require('./ReporteExterno');
const Certificacion = require('./Certificacion');
const RequisitoCertificacion = require('./RequisitoCertificacion');
const Capacitacion = require('./Capacitacion');
const RegistroCapacitacion = require('./RegistroCapacitacion');
const Carta = require('./Carta');
const ActividadBitacora = require('./ActividadBitacora');

// Associations
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

Articulo.belongsTo(Normativa, { foreignKey: 'normativa_id' });
Normativa.hasMany(Articulo, { foreignKey: 'normativa_id' });

PermisologiaTierra.belongsTo(Area, { foreignKey: 'area_id' });
ConcesionAcuicultura.belongsTo(Area, { foreignKey: 'area_id' });
ConcesionMaritima.belongsTo(Area, { foreignKey: 'area_id' });
Notificacion.belongsTo(User, { foreignKey: 'user_id' });

Infa.belongsTo(Area, { foreignKey: 'area_id' });
Area.hasMany(Infa, { foreignKey: 'area_id' });
Infa.hasMany(EstacionInfa, { foreignKey: 'infa_id' });
EstacionInfa.belongsTo(Infa, { foreignKey: 'infa_id' });

BitacoraActualizacion.belongsTo(User, { foreignKey: 'user_id' });

Auditoria.belongsTo(Area, { foreignKey: 'area_id' });
Auditoria.belongsTo(User, { foreignKey: 'user_id' });
Hallazgo.belongsTo(Auditoria, { foreignKey: 'auditoria_id' });
Auditoria.hasMany(Hallazgo, { foreignKey: 'auditoria_id' });
Compromiso.belongsTo(Hallazgo, { foreignKey: 'hallazgo_id' });
Hallazgo.hasMany(Compromiso, { foreignKey: 'hallazgo_id' });

ReporteExterno.belongsTo(Area, { foreignKey: 'area_id' });

RequisitoCertificacion.belongsTo(Certificacion, { foreignKey: 'certificacion_id' });
Certificacion.hasMany(RequisitoCertificacion, { foreignKey: 'certificacion_id' });

Procedimiento.belongsTo(Area, { foreignKey: 'area_id' });
Area.hasMany(Procedimiento, { foreignKey: 'area_id' });

Capacitacion.belongsToMany(User, { through: RegistroCapacitacion, foreignKey: 'capacitacion_id' });
User.belongsToMany(Capacitacion, { through: RegistroCapacitacion, foreignKey: 'user_id' });
RegistroCapacitacion.belongsTo(User, { foreignKey: 'user_id' });
RegistroCapacitacion.belongsTo(Capacitacion, { foreignKey: 'capacitacion_id' });

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
    EstacionInfa,
    Procedimiento,
    BitacoraActualizacion,
    Auditoria,
    Hallazgo,
    Compromiso,
    ReporteExterno,
    Certificacion,
    RequisitoCertificacion,
    Capacitacion,
    RegistroCapacitacion,
    Carta,
    ActividadBitacora
};
