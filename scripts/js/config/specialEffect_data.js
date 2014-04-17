/**************************************************
*   Donnée des cases spéciales
**************************************************/
var specialEffect_data = {
    "resistance": {
        multiplicatorDgtTook: 2,
        onGoodEffect: function(target){
            target.variableEffects.invincible = true;
        },
        offGoodEffect: function(target){
            target.variableEffects.invicible = false;
        },
        onBadEffect: function(target){
            target.variableEffects.multiplicatorDgtTook = 2;
        },
        offBadEffect: function(target){
            target.variableEffects.multiplicatorDgtTook = 1;
        },
        id: 2
    },
    "forceMelee": {
        multiplicatorDgtDealt: 1.5,
        onGoodEffect: function(target){
            if(target.name === "Guerrier" || target.name === "Voleur" || target.name === "Dragon")
                target.variableEffects.multiplicatorDgtDealt = 1.5;
        },
        offGoodEffect: function(target){
            if(target.name === "Guerrier" || target.name === "Voleur" || target.name === "Dragon")
                target.variableEffects.multiplicatorDgtDealt = 1;
        },
        onBadEffect: function(target){
            if(target.name === "Guerrier" || target.name === "Voleur" || target.name === "Dragon")
                target.variableEffects.canAtk = false;
        },
        offBadEffect: function(target){
            if(target.name === "Guerrier" || target.name === "Voleur" || target.name === "Dragon")
                target.variableEffects.canAtk = true;
        }  ,
        id: 3
    },
    "forceDist": {
        multiplicatorDgtDealt: 1.5,
        onGoodEffect: function(target){
            if(target.name === "Mage" || target.name === "Archer")
                target.variableEffects.multiplicatorDgtDealt = 1.5;
        },
        offGoodEffect: function(target){
            if(target.name === "Mage" || target.name === "Archer")
                target.variableEffects.multiplicatorDgtDealt = 1;
        },
        onBadEffect: function(target){
            if(target.name === "Mage" || target.name === "Archer")
                target.variableEffects.canAtk = false;
        },
        offBadEffect: function(target){
            if(target.name === "Mage" || target.name === "Archer")
                target.variableEffects.canAtk = true;
        },
        id: 4
    },
    "forceMag": {
        multiplicatorDgtSpell: 1.5,
        onGoodEffect: function(target){
            if(target.name === "Mage" || target.name === "Priest")
                target.variableEffects.multiplicatorDgtSpell = 1.5;
        },
        offGoodEffect: function(target){
            if(target.name === "Mage" || target.name === "Priest")
                target.variableEffects.multiplicatorDgtSpell = 1;
        },
        onBadEffect: function(target){
            if(target.name === "Mage" || target.name === "Priest")
                target.variableEffects.canAtk = false;
        },
        offBadEffect: function(target){
            if(target.name === "Mage" || target.name === "Priest")
                target.variableEffects.canAtk = true;
        },
        id: 5
    },
    "hp": {
        gainHp: 2,
        loseHp: 3,
        onGoodEffect: function(target){
            target.variableEffects.hpGain = 2;
        },
        offGoodEffect: function(target){
            target.variableEffects.hpGain = 0;
        },
        onBadEffect: function(target){
            target.variableEffects.hpGain = -3;
        },
        offBadEffect: function(target){
            target.variableEffects.hpGain = 0;
        },
        id: 6
    },
    "atk": {
        atkTurns: 2,
        onGoodEffect: function(target){
             target.variableEffects.atkTwice = true;
        },
        offGoodEffect: function(target){
             target.variableEffects.atkTwice = false;
        },
        onBadEffect: function(target){
            target.variableEffects.takeDgts = true;
        },
        offBadEffect: function(target){
            target.variableEffects.takeDgts = false;
        },
        id: 7
    },
    "priorite": {
        onGoodEffect: function(target){
            target.variableEffects.firstToAtk = true;
        },
        offGoodEffect: function(target){
            target.variableEffects.firstToAtk = false;
        },
        onBadEffect: function(target){
            target.variableEffects.lastToAtk = true;
        },
        offBadEffect: function(target){
            target.variableEffects.lastToAtk = false;
        },
        id: 8
    },
    "precision": {
        gainAccuracy: 1.3,
        loseAccuracy: 1.4,
        onGoodEffect: function(target){
            target.variableEffects.accuracyMultiplicator = 1.3;
        },
        offGoodEffect: function(target){
            target.variableEffects.accuracyMultiplicator = 1;
        },
        onBadEffect: function(target){
            target.variableEffects.accuracyMultiplicator = 0.6
        },
        offBadEffect: function(target){
            target.variableEffects.accuracyMultiplicator = 1;
        },
        id: 9
    }
};