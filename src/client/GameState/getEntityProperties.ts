// Every serialized entity must at least have these fields extracted
import LivingEntity from '../Entity/LivingEntity';

const F_base = 'type,team,x,y,hp,maxHp,rotation,_creationId';

// Relevant to components
// todo: perhaps just loop through each component's DEFAULTS object and get the keys from there?
const F_ = {
    accelerateFighterToAttackTarget: 'isFighterPreviouslyDocked,isFighterAutoAccelerated,hasFighterSlowedForLanding',
    accelerateToAttackTarget:        'delayBeforeTracking',
    anchor:                          'anchor,anchorOffsetX,anchorOffsetY',
    attack:                          'attackTarget,attackWeapon,isAttacking',
    autoTargetEnemy:                 'autoTargetSearchDist2,autoTargetLastSearchTime',
    beShielded:                      'shield',
    carryFighter:                    'fighter,isCarryingFighter',
    colonizePlanet:                  'colonizationTarget',
    construct:                       'constructionTime',
    damage:                          'damageHp',
    developEquipment:                'developEquipment_installTimeMax,developEquipment_installTime,developEquipment_timeMax,developEquipment_time,developEquipment_equipmentReady',
    displayHit:                      'hitTime',
    dockPlanet:                      'isDockedPlanet,planet',
    dockSpacePort:                   'isDockedSpacePort,spaceport',
    explode:                         'explosionOriginDx,explosionOriginDy,hasExploded',
    flock:                           'flockPoint',
    harvest:                         'harvestTime',
    manufacture:                     'isManufacturing,manufactureTime,manufactureType',
    metabolize:                      'hp',
    mine:                            'mineTime',
    moveLinearly:                    'dx,dy',
    occupyPlanet:                    'planet',
    occupySpacePort:                 'spaceport',
    orbitPlanet:                     'planet,isOrbitingPlanet,orbitDistance,orbitRotation',
    orbitStar:                       'star,orbitRotation,orbitDistance',
    repair:                          'repairTime',
    shimmer:                         'isShimmering,isShimmerBlink,shimmerTime,shimmerTimeMax,shimmerBlinkColor,shimmerNormalColor',
    shootCannon:                     'lastShotTime_Cannon,reloadTime_Cannon',
    shootClusterRocket:              'lastShotTime_ClusterRocket,reloadTime_ClusterRocket,ammo_ClusterRocket,ammoMax_ClusterRocket',
    shootHeavyCannon:                'lastShotTime_HeavyCannon,reloadTime_HeavyCannon',
    shootHomingMissile:              'lastShotTime_HomingMissile,ammo_HomingMissile,ammoMax_HomingMissile',
    shootLaserBolt:                  'range_LaserBolt,ammo_LaserBolt,ammoMax_LaserBolt,lastShotTime_LaserBolt,reloadTime_LaserBolt',
    storeMaterials:                  'MAX_RAW_MATERIALS,MAX_FINISHED_MATERIALS,materialsRaw,materialsFinished'
};

const FIELDS_BY_ENTITY: any = {
    // Projectiles
    CannonShot:      [F_.moveLinearly],
    ClusterRocket:   [F_.moveLinearly, F_.explode],
    HeavyCannonShot: [F_.moveLinearly],
    HomingMissile:   [F_.moveLinearly],
    LaserBolt:       [F_.moveLinearly],

    // Shields
    Shield:  [F_.anchor, F_.displayHit],
    PShield: [F_.anchor, F_.displayHit],

    // Spacecraft
    Fighter:   [
        F_.explode,
        F_.attack,
        F_.beShielded,
        F_.shootCannon,
        F_.shootClusterRocket,
        F_.shootHeavyCannon,
        F_.shootHomingMissile,
        F_.shootLaserBolt,

        F_.moveLinearly,
        F_.dockPlanet,
        F_.dockSpacePort,
        F_.accelerateFighterToAttackTarget
    ],
    Freighter: [
        F_.explode,
        F_.attack,
        F_.displayHit,
        F_.colonizePlanet,
        F_.storeMaterials,
        F_.autoTargetEnemy,
        F_.shootLaserBolt,
        F_.shootHomingMissile,
        F_.shootCannon,
        F_.orbitPlanet
    ],
    Probe:     [],

    // Planetary Structures
    PBase:       [
        F_.occupyPlanet,
        F_.explode,
        F_.displayHit,
        F_.attack,
        F_.storeMaterials,
        F_.harvest,
        F_.repair,
        F_.construct,
        F_.shootCannon,
        F_.autoTargetEnemy,
        F_.beShielded
    ],
    PColony:     [
        F_.occupyPlanet,
        F_.explode,
        F_.displayHit,
        F_.mine,
        F_.manufacture,
        F_.repair
    ],
    PComm:       [
        F_.occupyPlanet,
        F_.explode,
        F_.displayHit,
        F_.repair,
        F_.beShielded
    ],
    PLab:        [
        F_.occupyPlanet,
        F_.explode,
        F_.displayHit,
        F_.developEquipment,
        F_.shimmer
    ],
    SensorArray: [
        F_.occupySpacePort,
        F_.explode,
        F_.displayHit,
        F_.repair
    ],
    SpaceDock:   [
        F_.occupySpacePort,
        F_.explode,
        F_.displayHit,
        F_.repair,
        F_.manufacture
    ],
    SpacePort:   [
        F_.orbitPlanet,
        F_.explode,
        F_.displayHit,
        F_.attack,
        F_.shootCannon,
        F_.carryFighter,
        F_.storeMaterials
    ],

    // Celestial bodies
    Star:   [],
    Planet: [
        F_.orbitStar,
        F_.storeMaterials,
        'star,pbase,plab,pcolony,pcomm,spacedock,sensorarray,spaceport'
    ]
};

for (let k in FIELDS_BY_ENTITY) {
    // Flatten CSV and then create 1D array
    FIELDS_BY_ENTITY[k] = FIELDS_BY_ENTITY[k].concat(F_base).join(',').split(',');
    // Get unique fields only
    FIELDS_BY_ENTITY[k] = [...new Set(FIELDS_BY_ENTITY[k])].filter(Boolean);
}

export default function getEntityProperties(entity): any {
    const fields     = FIELDS_BY_ENTITY[entity.type] || [];
    const properties = {};

    fields.forEach(f => {
        if (entity[f] instanceof LivingEntity) {
            properties[f] = entity[f]._creationId;
        } else {
            properties[f] = entity[f];
        }
    });

    return properties;
}

export const PROPERTY_IS_REFERENCE = new RegExp(`^${[
    'star',
    'planet',
    'pbase',
    'pcolony',
    'plab',
    'pcomm',
    'spacedock',
    'spaceport',
    'sensorarray',
    'fighter',
    'attackTarget',
    'shield',
    'colonizationTarget',
    'anchor'
].join('|')}$`);
