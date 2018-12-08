// todo: make strings out of fields needed for each component
const FIELDS_NEEDED = {
    'Planet': 'orbitDistance,orbitRotation,team',
    'Star':   '',

    'CannonShot':      'hp,dx,dy',
    'ClusterRocket':   'hp,dx,dy',
    'HeavyCannonShot': 'hp,dx,dy',
    'HomingMissile':   'hp,dx,dy',
    'LaserBolt':       'hp,rotation,dx,dy',

    'Shield': 'hp,maxHp,team',


    'Fighter':
        'hp,maxHp,rotation,team,hasExploded,' +
        'attackWeapon,isAttacking,' +
        'lastShotTime_Cannon,reloadTime_Cannon,' +
        'lastShotTime_ClusterRocket,reloadTime_ClusterRocket,ammo_ClusterRocket,ammoMax_ClusterRocket,' +
        'lastShotTime_HeavyCannon,reloadTime_HeavyCannon,' +
        'lastShotTime_HomingMissile,ammo_HomingMissile,ammoMax_HomingMissile,' +
        'range_LaserBolt,ammo_LaserBolt,ammoMax_LaserBolt,lastShotTime_LaserBolt,reloadTime_LaserBolt,' +
        'isDockedPlanet,isDockedSpacePort,' +
        'isFighterPreviouslyDocked,isFighterAutoAccelerated'
    ,

    'Freighter':
        'hp,maxHp,rotation,team,hasExploded,hitTime,' +
        'isOrbitingPlanet,orbitRotation,' +
        'materialsRaw,materialsFinished,' +
        'isAttacking,autoTargetLastSearchTime,' +
        'lastShotTime_Cannon,reloadTime_Cannon,' +
        'range_LaserBolt,ammo_LaserBolt,ammoMax_LaserBolt,lastShotTime_LaserBolt,reloadTime_LaserBolt,' +
        'lastShotTime_HomingMissile,ammo_HomingMissile,ammoMax_HomingMissile'
    ,


    'PBase':
        'hp,maxHp,team,hasExploded,hitTime,' +
        'isAttacking,autoTargetLastSearchTime,' +
        'materialsRaw,materialsFinished,' +
        'lastShotTime_Cannon,reloadTime_Cannon,' +
        'harvestTime,repairTime,constructionTime'
    ,

    'PColony':
        'hp,maxHp,team,hasExploded,hitTime,' +
        'mineTime,isManufacturing,manufactureType,manufactureTime,isManufacturing,' +
        'repairTime'
    ,

    'PComm':
        'hp,maxHp,team,hasExploded,hitTime,' +
        'repairTime'
    ,

    //'Probe':       '',

    'PShield':     'hp,maxHp,team,hitTime',
    'SensorArray': 'hp,maxHp,team,hasExploded,hitTime,rotation',

    'SpaceDock':
        'hp,maxHp,team,hasExploded,hitTime,rotation,' +
        'isManufacturing,manufactureType,manufactureTime,isManufacturing,' +
        'repairTime'
    ,

    'SpacePort':
        'hp,maxHp,team,hasExploded,hitTime,rotation,' +
        'repairTime,' +
        'isAttacking,autoTargetLastSearchTime,' +
        'lastShotTime_Cannon,reloadTime_Cannon,' +
        'materialsRaw,materialsFinished'
};

// Support CSV strings
for (let k in FIELDS_NEEDED) {
    FIELDS_NEEDED[k] = `type,x,y,_creationId,${FIELDS_NEEDED[k]}`.split(',');
}

export default function getEntityProperties(entity): any {
    const fields     = FIELDS_NEEDED[entity.type] || [];
    const properties = {};

    fields.forEach(f => properties[f] = entity[f]);

    return properties;
}