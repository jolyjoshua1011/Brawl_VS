const BATTLE_SUPER_BANNERS = Object.freeze({
    "Shelly": "Banner/Shelly.png",
    "Nita": "Banner/Nita.png",
    "Colt": "Banner/Colt.png",
    "Bull": "Banner/Bull.png",
    "El Primo": "Banner/El_primo.png",
    "Poco": "Banner/Poco.png"
});
// Préchargement pour afficher la bannière dès le premier Super.
Object.values(BATTLE_SUPER_BANNERS).forEach(src => {
    const image = new Image();
    image.src = src;
});
function showBattleSuperBanner(brawlerName, side) {
    const src = BATTLE_SUPER_BANNERS[brawlerName];
    const page = document.getElementById("battlePage");
    if (!src || !page) return;
    let layer = document.getElementById("battleSuperBannerLayer");
    if (!layer) {
        layer = document.createElement("div");
        layer.id = "battleSuperBannerLayer";
        layer.className = "battle-super-banner-layer";
        layer.setAttribute("aria-hidden", "true");
        page.appendChild(layer);
    }
    const banner = document.createElement("div");
    banner.className = "battle-super-banner " + (side === "enemy" ? "enemy" : "player");
    const image = document.createElement("img");
    image.alt = "";
    image.draggable = false;
    image.onerror = () => banner.remove();
    image.src = src;
    banner.appendChild(image);
    banner.addEventListener("animationend", () => banner.remove(), { once: true });
    layer.appendChild(banner);
    // Centre la bannière du bot sur son personnage dans l'arène.
    if (side === "enemy") {
        const fighter = document.getElementById("battleEnemyImage");
        if (fighter) {
            const fighterRect = fighter.getBoundingClientRect();
            const layerRect = layer.getBoundingClientRect();
            const scaleY = layerRect.height / (layer.offsetHeight || 1);
            if (fighterRect.height > 0 && scaleY > 0) {
                const centerY = (fighterRect.top + fighterRect.height / 2 - layerRect.top) / scaleY;
                banner.style.top = Math.max(8, Math.min(layer.offsetHeight - banner.offsetHeight - 8,
                    centerY - banner.offsetHeight / 2)) + "px";
            }
        }
    }
    // Nettoyage même si la page est masquée pendant l'animation.
    setTimeout(() => banner.remove(), 2600);
}
/* =====================================================
   BRAWLERS
===================================================== */
const brawlers = {
    "Shelly": {
        category: "Combattant",
        categoryIcon: "💥",
        description: "Polyvalente et redoutable de près, Shelly punit les adversaires qui la laissent approcher. Ses salves deviennent plus puissantes à courte distance et son Super traverse les invocations.",
        icon: "Brawlers_icon/Shelly_icon.png",
        image: "Brawlers_skin/Shelly_skin_def.webp",
        rarity: "STARTER",
        rarityClass: "starter",
        health: 78,
        attackByDistance: {
            1: 30,
            2: 24,
            3: 18,
            4: 12,
            5: 6
        },
        defense: 55,
        speed: 4,
        range: 5,
        shotField: 4,
        shotFieldLabel: "4",
        superStats: {
            attackByDistance: {
                1: 60,
                2: 48,
                3: 36,
                4: 24,
                5: 12
            },
            range: 5,
            shotField: 5,
            piercing: true
        },
        power: 1
    },
    "Nita": {
        category: "Combattant",
        categoryIcon: "💥",
        description: "Nita s’appuie sur son ours pour se protéger et tenir tête à son adversaire. Ses ondes de choc traversent les invocations, tandis que son compagnon renforce ses attaques au corps à corps.",
        icon: "Brawlers_icon/Nita_icon.webp",
        image: "Brawlers_skin/Nita_skin_def.webp",
        rarity: "RARE",
        rarityClass: "rare",
        health: 84,
        attack: 19,
        defense: 58,
        speed: 3,
        range: 4,
        shotField: 3,
        piercingAttack: true,
        superStats: {
            bearHealth: 86,
            attack: 8,
            range: 1
        },
        power: 1
    },
    "Colt": {
        category: "Tireur d’élite",
        categoryIcon: "🎯",
        description: "Colt mise sur ses rafales et sa longue portée pour infliger de lourds dégâts. Son tir étroit demande de bien choisir sa distance ; de très près, toutes ses balles atteignent leur cible.",
        icon: "Brawlers_icon/Colt_icon.png",
        image: "Brawlers_skin/Colt_skin_def.webp",
        rarity: "RARE",
        rarityClass: "rare",
        health: 62,
        attack: 7,
        attackLabel: "7",
        bullets: 6,
        burstAttack: true,
        defense: 45,
        speed: 3,
        range: 6,
        shotField: 2,
        superStats: {
            attack: 6,
            attackLabel: "6",
            bullets: 12,
            burst: true,
            range: 6,
            shotField: 3,
            piercing: true
        },
        power: 1
    },
    "Bull": {
        category: "Tank",
        categoryIcon: "🛡️",
        description: "Résistant et brutal, Bull excelle au contact grâce à son fusil à pompe. Sa ruée lui permet de traverser le terrain et de reprendre l’initiative pour mettre la pression.",
        icon: "Brawlers_icon/Bull_icon.png",
        image: "Brawlers_skin/Bull_skin_def.webp",
        rarity: "RARE",
        rarityClass: "rare",
        health: 100,
        attackByDistance: {
            1: 40,
            2: 24,
            3: 8
        },
        defense: 72,
        speed: 4,
        range: 3,
        shotField: 3,
        shotFieldLabel: "3",
        superStats: {
            attack: 20,
            range: 6,
            shotField: 3,
            piercing: true
        },
        power: 1
    },
    "El Primo": {
        category: "Tank",
        categoryIcon: "🛡️",
        description: "Avec sa grande réserve de vie, El Primo encaisse les coups avant de riposter au corps à corps. Son saut lui permet de rejoindre son adversaire et d’enchaîner en attaquant le premier.",
        icon: "Brawlers_icon/El_Primo_icon.png",
        image: "Brawlers_skin/El_primo_skin_def.webp",
        rarity: "RARE",
        rarityClass: "rare",
        health: 130,
        attack: 30,
        defense: 82,
        speed: 4,
        range: 2,
        shotField: 2,
        piercingAttack: true,
        superStats: {
            attack: 19,
            range: 5,
            shotField: 4,
            piercing: true
        },
        power: 1
    },
    "Poco": {
        category: "Soutien",
        categoryIcon: "💚",
        description: "Poco privilégie l’endurance : ses ondes musicales couvrent un large champ de tir et traversent les invocations. Son Super lui rend de la vie pour prolonger le combat.",
        icon: "Brawlers_icon/Poco_icon.png",
        image: "Brawlers_skin/Poco_skin_def.webp",
        rarity: "RARE",
        rarityClass: "rare",
        health: 80,
        attack: 15,
        defense: 55,
        speed: 3,
        range: 5,
        shotField: 5,
        piercingAttack: true,
        superStats: {
            heal: 42,
            range: 6,
            shotField: 6,
            /*
               En 3v3, le soin traversera les alliés
               et pourra soigner plusieurs cibles.
            */
            piercing: true
        },
        power: 1
    }
};
const DEFAULT_BRAWLER_IMAGES = Object.fromEntries(
    Object.keys(brawlers).map(name => [name, brawlers[name].image])
);
const CHAMPION_SKIN_IMAGES = {
    "Shelly": "Brawlers_skin/Shelly_champion.png",
    "Nita": "Brawlers_skin/Nita_champion.png",
    "Colt": "Brawlers_skin/Colt_champion.png",
    "Bull": "Brawlers_skin/Bull_champion.png",
    "El Primo": "Brawlers_skin/El_primo_champion.png",
    "Poco": "Brawlers_skin/Poco_champion.png"
};
const NITA_CHAMPION_BEAR_IMAGE = "Brawlers_skin/Bear_champion.png";
const NITA_DEFAULT_BEAR_IMAGE = "Brawlers_skin/Bear_skin_def.webp";
function getChampionSkinDisplayName(name) {
    return (
        name === "Shelly" ||
        name === "Nita"
    )
    ? name + " Championne"
    : name + " Champion";
}
function getChampionSkinGenderLabel(name) {
    return (
        name === "Shelly" ||
        name === "Nita"
    )
    ? "Championne"
    : "Champion";
}
function getNitaBearImageForSkin(nitaSkinImage) {
    return nitaSkinImage === CHAMPION_SKIN_IMAGES.Nita
        ? NITA_CHAMPION_BEAR_IMAGE
        : NITA_DEFAULT_BEAR_IMAGE;
}
let nitaPreviewRotationTimer = null;
let nitaPreviewShowsBear = false;
function applyNitaPreviewState(image, showBear) {
    if (
        !image ||
        !image.dataset.nitaPrimaryImage ||
        !image.dataset.nitaBearImage
    ) {
        return;
    }
    image.src = showBear
        ? image.dataset.nitaBearImage
        : image.dataset.nitaPrimaryImage;
    image.alt = showBear
        ? (image.dataset.nitaBearAlt || "Bruce")
        : (image.dataset.nitaPrimaryAlt || "Nita");
    image.classList.toggle(
        "showing-nita-bear",
        showBear
    );
    if (
        image.dataset.nitaDetailPreview ===
        "true"
    ) {
        image.classList.toggle(
            "skin-nita",
            !showBear
        );
        image.classList.toggle(
            "skin-nita-bear",
            showBear
        );
    }
}
function configureNitaAlternatingPreview(
    image,
    nitaImage,
    bearImage,
    options = {}
) {
    if (!image) return;
    image.dataset.nitaPrimaryImage =
        nitaImage || brawlers.Nita?.image || "";
    image.dataset.nitaBearImage =
        bearImage ||
        getNitaBearImageForSkin(
            image.dataset.nitaPrimaryImage
        );
    image.dataset.nitaPrimaryAlt =
        options.primaryAlt ||
        "Nita";
    image.dataset.nitaBearAlt =
        options.bearAlt ||
        (
            image.dataset.nitaBearImage ===
            NITA_CHAMPION_BEAR_IMAGE
            ?
            "Bruce Champion"
            :
            "Bruce"
        );
    image.dataset.nitaDetailPreview =
        options.detail === true
        ? "true"
        : "false";
    image.classList.add(
        "nita-rotating-preview"
    );
    applyNitaPreviewState(
        image,
        nitaPreviewShowsBear
    );
}
function clearNitaAlternatingPreview(
    image
) {
    if (!image) return;
    delete image.dataset.nitaPrimaryImage;
    delete image.dataset.nitaBearImage;
    delete image.dataset.nitaPrimaryAlt;
    delete image.dataset.nitaBearAlt;
    delete image.dataset.nitaDetailPreview;
    image.classList.remove(
        "nita-rotating-preview",
        "showing-nita-bear",
        "skin-nita-bear"
    );
}
function updateAllNitaAlternatingPreviews() {
    document
        .querySelectorAll(
            ".nita-rotating-preview"
        )
        .forEach(
            image =>
                applyNitaPreviewState(
                    image,
                    nitaPreviewShowsBear
                )
        );
}
function restartNitaPreviewRotation() {
    nitaPreviewShowsBear = false;
    updateAllNitaAlternatingPreviews();
    if (nitaPreviewRotationTimer) {
        clearInterval(
            nitaPreviewRotationTimer
        );
    }
    nitaPreviewRotationTimer =
        setInterval(
            () => {
                nitaPreviewShowsBear =
                    !nitaPreviewShowsBear;
                updateAllNitaAlternatingPreviews();
            },
            3000
        );
}
/* =====================================================
   CAPACITÉS DES BRAWLERS
   Ajouter simplement de nouveaux objets dans les tableaux
   quand un Brawler passera de 2 à 4 capacités.
===================================================== */
const BRAWLER_ABILITY_CATALOG = {
    "Shelly": [
        {
            id: "shelly-ability-a",
            name: "AVANCE RAPIDE",
            description: "Réduit la distance de 1 puis permet d'enchaîner immédiatement avec une autre action.",
            effect: {
                type: "dash_close",
                distance: 1
            },
            unlocked: true
        },
        {
            id: "shelly-ability-b",
            name: "BALLES D'ARGENT",
            description: "Effectue un tir avec un champ de tir de 2. Les dégâts correspondent à ceux de la distance précédente, sauf à distance 1.",
            effect: {
                type: "silver_bullets",
                shotField: 2
            },
            unlocked: true
        }
    ],
    "Nita": [
        {
            id: "nita-ability-a",
            name: "CHOC SAUVAGE",
            description: "Effectue une attaque normale. Si le tir touche, l'adversaire est paralysé et saute son prochain tour.",
            effect: {
                type: "paralyze_shot",
                turns: 1
            },
            unlocked: true
        },
        {
            id: "nita-ability-b",
            name: "PEAU D'OURS",
            description: "Nita et son ours obtiennent un bouclier qui réduit les dégâts reçus de 30 % pendant 3 tours.",
            effect: {
                type: "shield",
                reduction: 0.30,
                turns: 3
            },
            unlocked: true
        }
    ],
    "Colt": [
        {
            id: "colt-ability-a",
            name: "GROS CALIBRE",
            description: "Colt tire une seule grosse balle. Elle inflige les dégâts de 3 balles en une fois, avec une portée de 6 et un champ de tir de 3.",
            effect: {
                type: "colt_big_bullet",
                bullets: 3,
                range: 6,
                shotField: 3
            },
            unlocked: true
        },
        {
            id: "colt-ability-b",
            name: "ROULADE DE COWBOY",
            description: "Colt se prépare à effectuer une roulade. La prochaine attaque de l'ennemi est automatiquement esquivée.",
            effect: {
                type: "cowboy_roll",
                dodges: 1
            },
            unlocked: true
        }
    ],
    "Bull": [
        {
            id: "bull-ability-a",
            name: "SECOND SOUFFLE",
            description: "Bull régénère 25 PV immédiatement.",
            effect: {
                type: "heal",
                amount: 25
            },
            unlocked: true
        },
        {
            id: "bull-ability-b",
            name: "GROS SABOTS",
            description: "Bull tape du pied. Portée 3, champ infini : aucune esquive possible. Inflige 15 dégâts et assomme l'ennemi pendant 1 tour.",
            effect: {
                type: "bull_stomp",
                amount: 15,
                range: 3,
                stunTurns: 1,
                unavoidable: true
            },
            unlocked: true
        }
    ],
    "El Primo": [
        {
            id: "el-primo-ability-a",
            name: "SUPLEX FATAL",
            description: "El Primo réalise un suplex. Portée 1, inésquivable, 30 dégâts. L'ennemi est assommé et El Primo rejoue immédiatement à la même distance.",
            effect: {
                type: "primo_suplex",
                amount: 30,
                range: 1,
                stunTurns: 1,
                unavoidable: true,
                replay: true
            },
            unlocked: true
        },
        {
            id: "el-primo-ability-b",
            name: "MÉTÉORITE",
            description: "Envoie une météorite sur la position actuelle de l'ennemi. Au prochain tour, si la distance n'a pas changé d'au moins 3, l'ennemi reçoit 30 dégâts puis brûle de 10 dégâts pendant 2 tours.",
            effect: {
                type: "primo_meteor",
                amount: 30,
                burnDamage: 10,
                burnTurns: 2,
                minDistanceChangeToEscape: 3
            },
            unlocked: true
        }
    ],
    "Poco": [
        {
            id: "poco-ability-a",
            name: "MÉLODIE APAISANTE",
            description: "Poco joue une douce mélodie qui soigne Poco et ses alliés de 20 PV par tour pendant 3 tours.",
            effect: {
                type: "healing_melody",
                amount: 20,
                turns: 3
            },
            unlocked: true
        },
        {
            id: "poco-ability-b",
            name: "ACCORD PURIFICATEUR",
            description: "Poco joue une mélodie d'immunité pendant 2 tours contre le poison, les brûlures, la paralysie, l'assommement et le ralentissement.",
            effect: {
                type: "effect_immunity",
                turns: 2
            },
            unlocked: true
        }
    ]
};
/* =====================================================
   POUVOIRS STAR
===================================================== */
const BRAWLER_STAR_POWER_CATALOG = {
    "Shelly": {
        id: "shelly-star-slow-super",
        name: "CHOC RALENTISSANT",
        description: "Quand le Super de Shelly touche l'adversaire, sa vitesse est réduite de 2 pendant 2 tours. La vitesse ne peut jamais descendre sous 1.",
        requiredPower: 10,
        effect: {
            type: "super_slow",
            speedReduction: 2,
            turns: 2,
            minSpeed: 1
        }
    },
    "Nita": {
        id: "nita-star-double-claw",
        name: "DOUBLE GRIFFE",
        description: "Tant que l'ours de Nita est en jeu et à distance 1, il donne 2 coups de griffe au lieu d'un à chaque attaque de Nita.",
        requiredPower: 10,
        effect: {
            type: "bear_double_claw",
            hits: 2
        }
    },
    "Bull": {
        id: "bull-star-rage",
        name: "ENRAGÉ",
        description: "Quand Bull passe sous 60 % de ses PV maximum, il devient enragé et inflige 20 % de dégâts supplémentaires. Un filtre rouge indique que la rage est active.",
        requiredPower: 10,
        effect: {
            type: "low_health_rage",
            healthThreshold: 0.60,
            damageMultiplier: 1.20
        }
    },
    "Colt": {
        id: "colt-star-seven-bullets",
        name: "SEPTIÈME BALLE",
        description: "Le chargeur de Colt contient désormais 7 balles au lieu de 6. Ses attaques principales touchent donc entre 1 et 7 balles, et 7/7 à distance 1.",
        requiredPower: 10,
        effect: {
            type: "extra_basic_bullet",
            bullets: 7
        }
    },
    "Poco": {
        id: "poco-star-damaging-super",
        name: "MÉLODIE FRACASSANTE",
        description: "Le Super de Poco soigne toujours normalement, mais il inflige aussi à l'adversaire les mêmes dégâts que l'attaque principale de Poco s'il est dans la portée du Super.",
        requiredPower: 10,
        effect: {
            type: "super_damage_basic_attack"
        }
    },
    "El Primo": {
        id: "el-primo-star-burning-super",
        name: "SAUT ARDENT",
        description: "Quand le Super d'El Primo touche l'adversaire, celui-ci brûle et subit 10 dégâts au début de chacun de ses 3 prochains tours.",
        requiredPower: 10,
        effect: {
            type: "super_burn",
            damage: 10,
            turns: 3
        }
    }
};
function createDefaultStarPowerOwnership() {
    return Object.fromEntries(
        Object.keys(
            brawlers
        ).map(
            name => [
                name,
                []
            ]
        )
    );
}
function normalizeStarPowerOwnership(
    ownership
) {
    const normalized =
        createDefaultStarPowerOwnership();
    Object.keys(
        brawlers
    ).forEach(
        name => {
            const starPower =
                BRAWLER_STAR_POWER_CATALOG[
                    name
                ];
            if (!starPower) {
                return;
            }
            const source =
                ownership &&
                typeof ownership === "object" &&
                Array.isArray(
                    ownership[name]
                )
                ?
                ownership[name]
                :
                [];
            normalized[name] =
                source.includes(
                    starPower.id
                )
                ?
                [starPower.id]
                :
                [];
        }
    );
    return normalized;
}
function getBrawlerStarPower(
    brawlerName
) {
    return (
        BRAWLER_STAR_POWER_CATALOG[
            brawlerName
        ] || null
    );
}
function isBrawlerStarPowerOwned(
    brawlerName,
    starPowerId = null
) {
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    if (!starPower) {
        return false;
    }
    const expectedId =
        starPowerId ||
        starPower.id;
    return Boolean(
        state.brawlerStarPowersOwned &&
        Array.isArray(
            state.brawlerStarPowersOwned[
                brawlerName
            ]
        ) &&
        state.brawlerStarPowersOwned[
            brawlerName
        ].includes(
            expectedId
        )
    );
}
function grantBrawlerStarPower(
    brawlerName,
    starPowerId
) {
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    if (
        !starPower ||
        starPower.id !== starPowerId
    ) {
        return false;
    }
    if (
        !Array.isArray(
            state.brawlerStarPowersOwned[
                brawlerName
            ]
        )
    ) {
        state.brawlerStarPowersOwned[
            brawlerName
        ] = [];
    }
    if (
        state.brawlerStarPowersOwned[
            brawlerName
        ].includes(
            starPowerId
        )
    ) {
        return false;
    }
    state.brawlerStarPowersOwned[
        brawlerName
    ].push(
        starPowerId
    );
    return true;
}
function buildStarPowerStatsHtml(
    brawlerName,
    powerLevel,
    ownedOverride = null
) {
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    if (!starPower) {
        return `
            <div class="star-power-symbol" aria-hidden="true">★</div>
            <strong>POUVOIR STAR</strong>
            <p>Aucun pouvoir star disponible pour ce Brawler.</p>
        `;
    }
    const power =
        Math.max(
            1,
            Number(
                powerLevel
            ) || 1
        );
    const owned =
        typeof ownedOverride === "boolean"
        ?
        ownedOverride
        :
        isBrawlerStarPowerOwned(
            brawlerName,
            starPower.id
        );
    const eligible =
        power >=
        starPower.requiredPower;
    const status =
        owned
        ?
        "✓ POSSÉDÉ · ACTIF"
        :
        (
            eligible
            ?
            "★ À OBTENIR · BOX OU BOUTIQUE"
            :
            "🔒 POUVOIR " +
            starPower.requiredPower +
            " REQUIS · PUIS BOX/BOUTIQUE"
        );
    return `
        <div class="star-power-card ${owned ? "owned" : "locked"}">
            <div class="star-power-card-head">
                <div class="star-power-card-icon" aria-hidden="true">★</div>
                <div>
                    <div class="star-power-card-title">${starPower.name}</div>
                    <div class="star-power-card-brawler">${brawlerName.toUpperCase()} · PASSIF</div>
                </div>
            </div>
            <p class="star-power-card-description">${starPower.description}</p>
            <div class="star-power-card-status">
                <span>DÉBLOCAGE</span>
                <strong>${status}</strong>
            </div>
        </div>
    `;
}
function renderBrawlerStarPowerStats() {
    const panel =
        document.getElementById(
            "starPowerStatsPanel"
        );
    const brawlerName =
        state.detailBrawler;
    const brawler =
        brawlers[
            brawlerName
        ];
    if (
        !panel ||
        !brawler
    ) {
        return;
    }
    panel.innerHTML =
        buildStarPowerStatsHtml(
            brawlerName,
            brawler.power
        );
}
function createDefaultAbilityLoadouts() {
    return Object.fromEntries(
        Object.keys(
            brawlers
        )
        .map(
            name => [
                name,
                {
                    "1": null,
                    "2": null
                }
            ]
        )
    );
}
function createDefaultAbilityOwnership() {
    return Object.fromEntries(
        Object.keys(
            brawlers
        )
        .map(
            name => [
                name,
                []
            ]
        )
    );
}
function normalizeAbilityOwnership(
    ownership,
    loadouts = null
) {
    const normalized =
        createDefaultAbilityOwnership();
    Object.keys(
        brawlers
    )
    .forEach(
        name => {
            const validIds =
                (
                    BRAWLER_ABILITY_CATALOG[
                        name
                    ] || []
                )
                .map(
                    ability =>
                        ability.id
                );
            const source =
                ownership &&
                typeof ownership === "object" &&
                Array.isArray(
                    ownership[name]
                )
                ?
                ownership[name]
                :
                [];
            normalized[name] =
                [
                    ...new Set(
                        source.filter(
                            abilityId =>
                                validIds.includes(
                                    abilityId
                                )
                        )
                    )
                ];
            /*
               Compatibilité avec les sauvegardes
               précédentes : si une capacité était déjà
               équipée avant l'arrivée de la boutique,
               on la conserve comme possédée.
            */
            const oldLoadout =
                loadouts &&
                typeof loadouts === "object" &&
                loadouts[name] &&
                typeof loadouts[name] === "object"
                ?
                loadouts[name]
                :
                {};
            [
                oldLoadout["1"],
                oldLoadout["2"]
            ]
            .forEach(
                abilityId => {
                    if (
                        validIds.includes(
                            abilityId
                        ) &&
                        !normalized[
                            name
                        ].includes(
                            abilityId
                        )
                    ) {
                        normalized[
                            name
                        ].push(
                            abilityId
                        );
                    }
                }
            );
        }
    );
    return normalized;
}
function isBrawlerAbilityOwned(
    brawlerName,
    abilityId
) {
    return Boolean(
        state.brawlerAbilitiesOwned &&
        Array.isArray(
            state.brawlerAbilitiesOwned[
                brawlerName
            ]
        ) &&
        state.brawlerAbilitiesOwned[
            brawlerName
        ].includes(
            abilityId
        )
    );
}
function normalizeAbilityLoadouts(
    loadouts
) {
    const normalized =
        createDefaultAbilityLoadouts();
    Object.keys(
        brawlers
    )
    .forEach(
        name => {
            const catalog =
                BRAWLER_ABILITY_CATALOG[
                    name
                ] || [];
            const allowedIds =
                catalog.map(
                    ability =>
                        ability.id
                );
            const source =
                loadouts &&
                typeof loadouts === "object" &&
                loadouts[name] &&
                typeof loadouts[name] === "object"
                ?
                loadouts[name]
                :
                {};
            [
                1,
                2
            ]
            .forEach(
                slot => {
                    const value =
                        source[
                            String(slot)
                        ];
                    normalized[
                        name
                    ][
                        String(slot)
                    ] =
                        allowedIds.includes(
                            value
                        )
                        ?
                        value
                        :
                        null;
                }
            );
            /*
               La même capacité ne peut jamais occuper
               les deux slots en même temps.
            */
            if (
                normalized[name]["1"] &&
                normalized[name]["1"] ===
                    normalized[name]["2"]
            ) {
                normalized[
                    name
                ]["2"] =
                    null;
            }
        }
    );
    return normalized;
}
/* =====================================================
   STATS BASE / SUPER
===================================================== */
const BRAWLER_ATTACK_DESCRIPTIONS = {
    "Shelly": {
        base: {
            title: "Chevrotine",
            text:
                "Shelly tire une salve dont les dégâts diminuent avec la distance. Plus elle est proche de sa cible, plus son attaque est puissante."
        },
        super: {
            title: "Super : Décharge",
            text:
                "Shelly déclenche une attaque transperçante dont les dégâts varient selon la distance. Elle traverse les invocations et peut toucher l'invocation ainsi que le Brawler placé derrière."
        }
    },
    "Nita": {
        base: {
            title: "Onde de choc",
            text:
                "Nita envoie une attaque transperçante. Elle peut traverser une invocation pour toucher également le Brawler situé derrière."
        },
        super: {
            title: "Super : Ours",
            text:
                "Nita invoque son ours. L'ours protège Nita en encaissant les dégâts à sa place. À distance 1, il attaque en plus lorsque Nita frappe et contre-attaque également quand l'adversaire attaque."
        }
    },
    "Colt": {
        base: {
            title: "Six coups",
            text:
                "Colt passe d'abord par le test d'esquive. S'il touche, entre 1 et 6 balles atteignent la cible. À distance 1, aucune esquive n'est possible et les 6 balles touchent automatiquement."
        },
        super: {
            title: "Super : Douze balles",
            text:
                "Le Super de Colt passe d'abord par le test d'esquive. S'il touche, entre 1 et 12 balles transperçantes atteignent la cible. À distance 1, aucune esquive n'est possible et les 12 balles touchent automatiquement."
        }
    },
    "Bull": {
        base: {
            title: "Fusil à pompe",
            text:
                "Bull inflige des dégâts qui varient fortement avec la distance. Il est particulièrement dangereux à très courte portée."
        },
        super: {
            title: "Super : Ruée",
            text:
                "Bull effectue une ruée transperçante fixe de 6 unités et touche tout ce qui se trouve sur son passage. Sa nouvelle distance dépend de sa position de départ, puis Bull attaque obligatoirement en premier."
        }
    },
    "El Primo": {
        base: {
            title: "Poings",
            text:
                "El Primo attaque à très courte portée avec une attaque transperçante capable de traverser les invocations."
        },
        super: {
            title: "Super : Saut",
            text:
                "El Primo saute sur son adversaire avec une attaque transperçante. Après le Super, il se retrouve automatiquement à distance 1 et attaque en premier."
        }
    },
    "Poco": {
        base: {
            title: "Onde musicale",
            text:
                "Poco projette une onde musicale transperçante qui traverse les invocations et peut toucher plusieurs cibles alignées."
        },
        super: {
            title: "Super : Soin",
            text:
                "Poco joue une mélodie qui lui rend des points de vie, sans dépasser ses PV maximum. Ce Super soigne au lieu d’infliger des dégâts ; la quantité de soin augmente avec son niveau de pouvoir."
        }
    }
};
let currentBrawlerStatsMode =
    "base";
function renderBrawlerSuperStats(
    brawler
) {
    const content =
        document.getElementById(
            "superStatsContent"
        );
    if (!content) {
        return;
    }
    const stats =
        brawler.superStats;
    content.classList.toggle(
        "colt-super-layout",
        brawler === brawlers["Colt"]
    );
    if (
        !stats ||
        Array.isArray(stats) ||
        typeof stats !== "object"
    ) {
        content.innerHTML = `

            <div class="super-stats-empty">

                <div class="super-stats-empty-icon">
                    ★
                </div>

                <div class="super-stats-empty-title">
                    STATS DU SUPER
                </div>

                <div class="super-stats-empty-text">
                    Les statistiques du Super de ce Brawler
                    sont prêtes à être ajoutées.
                </div>

            </div>

        `;
        return;
    }
    let html =
        "";
    /*
       ATTAQUE SELON LA DISTANCE
       Exemple : Super de Shelly
    */
    if (
        stats.attackByDistance
    ) {
        const damageItems =
            Object.entries(
                stats.attackByDistance
            )
            .map(
                ([distance, damage]) => {
                    const scaledDamage =
                        getScaledDamage(
                            damage,
                            brawler.power
                        );
                    return `

                    <div class="super-distance-item">

                        <div class="super-distance-label">
                            DIST. ${distance}
                        </div>

                        <div class="super-distance-damage">
                            ${scaledDamage}
                        </div>

                        <div class="super-distance-unit">
                            DÉGÂTS
                        </div>

                    </div>

                `;
                }
            )
            .join("");
        html += `

            <div class="super-stat-section">

                <div class="super-stat-section-title">
                    DÉGÂTS
                </div>

                <div class="super-distance-grid">
                    ${damageItems}
                </div>

            </div>

        `;
    }
    /*
       VIE D'UNE INVOCATION
       Exemple : ours de Nita
    */
    if (
        typeof stats.bearHealth ===
        "number"
    ) {
        const scaledBearHealth =
            getScaledDamage(
                stats.bearHealth,
                brawler.power
            );
        const bearHealthPercent =
            Math.min(
                100,
                (
                    scaledBearHealth /
                    MAX_HEALTH_BAR
                ) * 100
            );
        html += `

            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Vie de l'ours
                </div>

                <div class="super-stat-bottom">

                    <div class="super-continuous-gauge">

                        <div
                            class="super-continuous-fill"
                            style="width:${bearHealthPercent}%"
                        ></div>

                    </div>

                    <div class="super-stat-line-value">
                        ${scaledBearHealth}
                    </div>

                </div>

            </div>

        `;
    }
    /*
       DÉGÂTS SIMPLES
    */
    if (
        typeof stats.attack ===
        "number"
    ) {
        const scaledSuperAttack =
            getScaledDamage(
                stats.attack,
                brawler.power
            );
        const superAttackPercent =
            Math.min(
                100,
                scaledSuperAttack
            );
        html += `

            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Dégâts
                </div>

                <div class="super-stat-bottom">

                    <div class="super-continuous-gauge">

                        <div
                            class="super-continuous-fill"
                            style="width:${superAttackPercent}%"
                        ></div>

                    </div>

                    <div class="super-stat-line-value">
                        ${scaledSuperAttack}
                    </div>

                </div>

                ${
                    typeof stats.bullets === "number"
                    ?
                    `
                        <div class="super-bullets-info">
                            ${stats.bullets} BALLES TIRÉES
                        </div>
                    `
                    :
                    ""
                }

            </div>

        `;
    }
    /*
       SOIN
       Exemple : Super de Poco
    */
    if (
        typeof stats.heal ===
        "number"
    ) {
        const scaledSuperHeal =
            getScaledDamage(
                stats.heal,
                brawler.power
            );
        const superHealPercent =
            Math.min(
                100,
                scaledSuperHeal
            );
        html += `

            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Soin
                </div>

                <div class="super-stat-bottom">

                    <div class="super-continuous-gauge">

                        <div
                            class="super-continuous-fill"
                            style="width:${superHealPercent}%"
                        ></div>

                    </div>

                    <div class="super-stat-line-value">
                        ${scaledSuperHeal}
                    </div>

                </div>

            </div>

        `;
    }
    /*
       PORTÉE
    */
    if (
        typeof stats.range ===
        "number"
    ) {
        let segments =
            "";
        for (
            let i = 1;
            i <= 7;
            i++
        ) {
            segments += `

                <span
                    class="
                        super-gauge-segment
                        ${i <= stats.range ? "active" : ""}
                    "
                ></span>

            `;
        }
        html += `

            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Portée
                </div>

                <div class="super-stat-bottom">

                    <div class="super-gauge super-range-gauge">
                        ${segments}
                    </div>

                    <div class="super-stat-line-value">
                        ${stats.range}
                    </div>

                </div>

            </div>

        `;
    }
    /*
       CHAMP DE TIR
    */
    if (
        typeof stats.shotField ===
        "number"
    ) {
        let segments =
            "";
        for (
            let i = 1;
            i <= 6;
            i++
        ) {
            segments += `

                <span
                    class="
                        super-gauge-segment
                        ${i <= stats.shotField ? "active" : ""}
                    "
                ></span>

            `;
        }
        html += `

            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Champ de tir
                </div>

                <div class="super-stat-bottom">

                    <div class="super-gauge super-shotfield-gauge">
                        ${segments}
                    </div>

                    <div class="super-stat-line-value">
                        ${stats.shotField}
                    </div>

                </div>

            </div>

        `;
    }
    let propertyBadges =
        "";
    if (
        stats.piercing ===
        true
    ) {
        propertyBadges += `
            <span class="piercing-stat-badge">
                TRANSPERÇANTE
            </span>
        `;
    }
    if (
        stats.burst ===
        true
    ) {
        propertyBadges += `
            <span class="burst-stat-badge">
                RAFALE
            </span>
        `;
    }
    if (propertyBadges) {
        html += `
            <div class="attack-property-badges">
                ${propertyBadges}
            </div>
        `;
    }
    content.innerHTML =
        html;
}
let pendingAbilityEquip = {
    brawlerName: null,
    slotNumber: null
};
let pendingAbilityDetail = {
    brawlerName: null,
    slotNumber: null,
    abilityId: null
};
function getAbilityPreviewDamage(
    brawlerName,
    distance
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return 0;
    }
    let baseDamage =
        0;
    if (
        brawler.attackByDistance &&
        Number.isFinite(
            brawler.attackByDistance[
                distance
            ]
        )
    ) {
        baseDamage =
            brawler.attackByDistance[
                distance
            ];
    }
    else if (
        Number.isFinite(
            brawler.attack
        )
    ) {
        baseDamage =
            brawler.attack;
    }
    return getScaledDamage(
        baseDamage,
        brawler.power || 1
    );
}
function getAbilityStatsRows(
    brawlerName,
    ability
) {
    if (!ability) {
        return [];
    }
    if (
        ability.id ===
        "shelly-ability-a"
    ) {
        return [
            {
                label: "EFFET",
                value: "RÉDUIT LA DISTANCE DE 1"
            },
            {
                label: "TOUR",
                value: "TU PEUX REJOUER ENSUITE"
            },
            {
                label: "CONDITION",
                value: "INUTILISABLE À DISTANCE 1"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "shelly-ability-b"
    ) {
        return [
            {
                label: "CHAMP DE TIR",
                value: "2"
            },
            {
                label: "DISTANCE 1",
                value: String(
                    getAbilityPreviewDamage(
                        brawlerName,
                        1
                    )
                )
            },
            {
                label: "DISTANCE 2",
                value: String(
                    getAbilityPreviewDamage(
                        brawlerName,
                        1
                    )
                )
            },
            {
                label: "DISTANCE 3",
                value: String(
                    getAbilityPreviewDamage(
                        brawlerName,
                        2
                    )
                )
            },
            {
                label: "DISTANCE 4",
                value: String(
                    getAbilityPreviewDamage(
                        brawlerName,
                        3
                    )
                )
            },
            {
                label: "DISTANCE 5",
                value: String(
                    getAbilityPreviewDamage(
                        brawlerName,
                        4
                    )
                )
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "colt-ability-a"
    ) {
        const bulletDamage =
            getScaledDamage(
                brawlers["Colt"]?.attack || 0,
                getBattlePowerLevel(
                    "Colt"
                )
            );
        return [
            {
                label: "TYPE",
                value: "1 GROSSE BALLE"
            },
            {
                label: "DÉGÂTS",
                value: String(
                    bulletDamage * 3
                )
            },
            {
                label: "PORTÉE",
                value: "6"
            },
            {
                label: "CHAMP DE TIR",
                value: "3"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "colt-ability-b"
    ) {
        return [
            {
                label: "EFFET",
                value: "ESQUIVE GARANTIE"
            },
            {
                label: "DÉCLENCHEMENT",
                value: "PROCHAINE ATTAQUE ENNEMIE"
            },
            {
                label: "DÉGÂTS REÇUS",
                value: "0"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "nita-ability-a"
    ) {
        return [
            {
                label: "ATTAQUE",
                value: "TIR NORMAL"
            },
            {
                label: "EFFET SI TOUCHÉ",
                value: "PARALYSIE 1 TOUR"
            },
            {
                label: "ESQUIVE",
                value: "OUI"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "nita-ability-b"
    ) {
        return [
            {
                label: "RÉDUCTION",
                value: "30 %"
            },
            {
                label: "DURÉE",
                value: "3 TOURS"
            },
            {
                label: "CIBLES",
                value: "NITA + OURS"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "bull-ability-a"
    ) {
        return [
            {
                label: "TYPE",
                value: "SOIN"
            },
            {
                label: "SOIN",
                value: "+25 PV"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "bull-ability-b"
    ) {
        return [
            {
                label: "PORTÉE",
                value: "3"
            },
            {
                label: "CHAMP",
                value: "INFINI"
            },
            {
                label: "DÉGÂTS",
                value: "15"
            },
            {
                label: "EFFET",
                value: "ASSOMME 1 TOUR"
            },
            {
                label: "ESQUIVE",
                value: "AUCUNE"
            }
        ];
    }
    if (
        ability.id ===
        "el-primo-ability-a"
    ) {
        return [
            {
                label: "PORTÉE",
                value: "1"
            },
            {
                label: "DÉGÂTS",
                value: "30"
            },
            {
                label: "ESQUIVE",
                value: "AUCUNE"
            },
            {
                label: "EFFET",
                value: "ASSOMME 1 TOUR"
            },
            {
                label: "BONUS",
                value: "REJOUE À LA MÊME DISTANCE"
            }
        ];
    }
    if (
        ability.id ===
        "el-primo-ability-b"
    ) {
        return [
            {
                label: "TYPE",
                value: "MÉTÉORITE"
            },
            {
                label: "DÉGÂTS",
                value: "30"
            },
            {
                label: "BRÛLURE",
                value: "10 × 2 TOURS"
            },
            {
                label: "CONDITION",
                value: "DIFFÉRENCE DE DISTANCE < 3"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "poco-ability-a"
    ) {
        return [
            {
                label: "SOIN",
                value: "+20 PV / TOUR"
            },
            {
                label: "DURÉE",
                value: "3 TOURS"
            },
            {
                label: "TOTAL MAX",
                value: "+60 PV"
            },
            {
                label: "CIBLES",
                value: "POCO + ALLIÉS"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.id ===
        "poco-ability-b"
    ) {
        return [
            {
                label: "EFFET",
                value: "IMMUNITÉ"
            },
            {
                label: "DURÉE",
                value: "2 TOURS"
            },
            {
                label: "PROTÈGE DE",
                value: "POISON / BRÛLURE"
            },
            {
                label: "AUSSI",
                value: "PARALYSIE / STUN / RALENT."
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.effect?.type ===
        "damage"
    ) {
        return [
            {
                label: "TYPE",
                value: "DÉGÂTS GARANTIS"
            },
            {
                label: "DÉGÂTS",
                value: "+" +
                    ability.effect.amount
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    if (
        ability.effect?.type ===
        "heal"
    ) {
        return [
            {
                label: "TYPE",
                value: "SOIN"
            },
            {
                label: "SOIN",
                value: "+" +
                    ability.effect.amount +
                    " PV"
            },
            {
                label: "UTILISATION",
                value: "1 FOIS PAR PARTIE"
            }
        ];
    }
    return [
        {
            label: "UTILISATION",
            value: "1 FOIS PAR PARTIE"
        }
    ];
}
function buildAbilityStatsRowsHtml(
    brawlerName,
    ability
) {
    const rows =
        getAbilityStatsRows(
            brawlerName,
            ability
        );
    if (!rows.length) {
        return "";
    }
    return rows
        .map(
            row => `
                <div class="ability-detail-row">
                    <div class="ability-detail-label">
                        ${row.label}
                    </div>

                    <div class="ability-detail-value">
                        ${row.value}
                    </div>
                </div>
            `
        )
        .join("");
}
function openAbilityCardAction(
    brawlerName,
    slotNumber
) {
    const loadout =
        getBrawlerAbilityLoadout(
            brawlerName
        );
    const abilityId =
        loadout[
            String(
                slotNumber
            )
        ];
    if (!abilityId) {
        openAbilityEquipPicker(
            brawlerName,
            slotNumber
        );
        return;
    }
    openAbilityDetailModal(
        brawlerName,
        slotNumber,
        abilityId
    );
}
function renderAbilityDetailModal() {
    const {
        brawlerName,
        slotNumber,
        abilityId
    } =
        pendingAbilityDetail;
    const ability =
        getBrawlerAbilityById(
            brawlerName,
            abilityId
        );
    if (!ability) {
        return;
    }
    const title =
        document.getElementById(
            "abilityDetailTitle"
        );
    const slot =
        document.getElementById(
            "abilityDetailSlot"
        );
    const description =
        document.getElementById(
            "abilityDetailDescription"
        );
    const stats =
        document.getElementById(
            "abilityDetailStats"
        );
    const manage =
        document.getElementById(
            "abilityDetailManageButton"
        );
    if (title) {
        title.innerText =
            ability.name;
    }
    if (slot) {
        slot.innerText =
            brawlerName +
            " · EMPLACEMENT " +
            slotNumber;
    }
    if (description) {
        description.innerText =
            ability.description ||
            "Aucune description.";
    }
    if (stats) {
        stats.innerHTML =
            buildAbilityStatsRowsHtml(
                brawlerName,
                ability
            );
    }
    if (manage) {
        manage.innerText =
            "MODIFIER L'ÉQUIPEMENT";
    }
}
function openAbilityDetailModal(
    brawlerName,
    slotNumber,
    abilityId
) {
    pendingAbilityDetail = {
        brawlerName,
        slotNumber,
        abilityId
    };
    renderAbilityDetailModal();
    const overlay =
        document.getElementById(
            "abilityDetailOverlay"
        );
    if (overlay) {
        overlay.classList.add(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "false"
        );
    }
}
function closeAbilityDetailModal() {
    const overlay =
        document.getElementById(
            "abilityDetailOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    pendingAbilityDetail = {
        brawlerName: null,
        slotNumber: null,
        abilityId: null
    };
}
function openAbilityEquipFromDetail() {
    const {
        brawlerName,
        slotNumber
    } =
        pendingAbilityDetail;
    closeAbilityDetailModal();
    if (
        brawlerName &&
        slotNumber
    ) {
        openAbilityEquipPicker(
            brawlerName,
            slotNumber
        );
    }
}
function getBrawlerAbilityCatalog(
    brawlerName
) {
    return (
        BRAWLER_ABILITY_CATALOG[
            brawlerName
        ] || []
    );
}
function getBrawlerAbilityLoadout(
    brawlerName
) {
    if (
        !state.brawlerAbilityLoadouts[
            brawlerName
        ]
    ) {
        state.brawlerAbilityLoadouts[
            brawlerName
        ] = {
            "1": null,
            "2": null
        };
    }
    return state
        .brawlerAbilityLoadouts[
            brawlerName
        ];
}
function getBrawlerAbilityById(
    brawlerName,
    abilityId
) {
    return getBrawlerAbilityCatalog(
        brawlerName
    )
    .find(
        ability =>
            ability.id ===
            abilityId
    ) || null;
}
function getAbilitySlotRequiredPower(
    slotNumber
) {
    return (
        Number(
            slotNumber
        ) === 2
        ?
        9
        :
        7
    );
}
function isAbilitySlotUnlocked(
    brawlerName,
    slotNumber
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return false;
    }
    return (
        brawler.power >=
        getAbilitySlotRequiredPower(
            slotNumber
        )
    );
}
function openAbilityEquipPicker(
    brawlerName,
    slotNumber
) {
    const slot =
        Number(
            slotNumber
        );
    if (
        !brawlers[
            brawlerName
        ] ||
        ![
            1,
            2
        ].includes(
            slot
        ) ||
        !isAbilitySlotUnlocked(
            brawlerName,
            slot
        )
    ) {
        return;
    }
    pendingAbilityEquip = {
        brawlerName,
        slotNumber:
            slot
    };
    renderAbilityEquipPicker();
    const overlay =
        document.getElementById(
            "abilityEquipOverlay"
        );
    if (overlay) {
        overlay.classList.add(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "false"
        );
    }
}
function closeAbilityEquipPicker() {
    const overlay =
        document.getElementById(
            "abilityEquipOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    pendingAbilityEquip = {
        brawlerName: null,
        slotNumber: null
    };
}
function renderAbilityEquipPicker() {
    const {
        brawlerName,
        slotNumber
    } =
        pendingAbilityEquip;
    if (
        !brawlerName ||
        !slotNumber
    ) {
        return;
    }
    const title =
        document.getElementById(
            "abilityEquipTitle"
        );
    const brawlerLabel =
        document.getElementById(
            "abilityEquipBrawler"
        );
    const list =
        document.getElementById(
            "abilityEquipList"
        );
    const unequip =
        document.getElementById(
            "abilityUnequipButton"
        );
    const loadout =
        getBrawlerAbilityLoadout(
            brawlerName
        );
    const currentId =
        loadout[
            String(
                slotNumber
            )
        ];
    if (title) {
        title.innerText =
            "EMPLACEMENT " +
            slotNumber;
    }
    if (brawlerLabel) {
        brawlerLabel.innerText =
            brawlerName;
    }
    if (unequip) {
        unequip.hidden =
            !currentId;
    }
    if (!list) {
        return;
    }
    const catalog =
        getBrawlerAbilityCatalog(
            brawlerName
        );
    list.innerHTML =
        catalog
        .map(
            (
                ability,
                index
            ) => {
                const equippedSlot =
                    loadout["1"] ===
                    ability.id
                    ?
                    1
                    :
                    (
                        loadout["2"] ===
                        ability.id
                        ?
                        2
                        :
                        null
                    );
                const selected =
                    currentId ===
                    ability.id;
                const available =
                    isBrawlerAbilityOwned(
                        brawlerName,
                        ability.id
                    );
                return `
                    <button
                        class="
                            ability-choice-card
                            ${selected ? "selected" : ""}
                            ${available ? "" : "locked"}
                        "
                        type="button"
                        ${
                            available
                            ?
                            `onclick="equipBrawlerAbility('${ability.id}')"`
                            :
                            "disabled"
                        }
                    >

                        <div class="ability-choice-index">
                            ${index + 1}
                        </div>

                        <div class="ability-choice-copy">

                            <strong>
                                ${ability.name}
                            </strong>

                            <span>
                                ${ability.description}
                            </span>

                        </div>

                        <div class="ability-choice-state">

                            ${
                                selected
                                ?
                                "SÉLECTIONNÉE"
                                :
                                (
                                    !available
                                    ?
                                    "NON DÉBLOQUÉE"
                                    :
                                    (
                                        equippedSlot
                                        ?
                                        "SLOT " +
                                        equippedSlot
                                        :
                                        "ÉQUIPER"
                                    )
                                )
                            }

                        </div>

                    </button>
                `;
            }
        )
        .join("");
}
function equipBrawlerAbility(
    abilityId
) {
    const {
        brawlerName,
        slotNumber
    } =
        pendingAbilityEquip;
    if (
        !brawlerName ||
        !slotNumber ||
        !isAbilitySlotUnlocked(
            brawlerName,
            slotNumber
        )
    ) {
        return;
    }
    const ability =
        getBrawlerAbilityById(
            brawlerName,
            abilityId
        );
    if (
        !ability ||
        !isBrawlerAbilityOwned(
            brawlerName,
            abilityId
        )
    ) {
        return;
    }
    const loadout =
        getBrawlerAbilityLoadout(
            brawlerName
        );
    const slotKey =
        String(
            slotNumber
        );
    const otherSlotKey =
        slotNumber ===
        1
        ?
        "2"
        :
        "1";
    /*
       Si la capacité était déjà équipée dans l'autre
       slot, on la déplace au lieu de la dupliquer.
    */
    if (
        loadout[
            otherSlotKey
        ] ===
        abilityId
    ) {
        loadout[
            otherSlotKey
        ] =
            null;
    }
    loadout[
        slotKey
    ] =
        abilityId;
    saveGame();
    renderBrawlerCapabilitiesStats();
    updateBattleAbilitySlots();
    closeAbilityEquipPicker();
}
function unequipBrawlerAbility() {
    const {
        brawlerName,
        slotNumber
    } =
        pendingAbilityEquip;
    if (
        !brawlerName ||
        !slotNumber
    ) {
        return;
    }
    const loadout =
        getBrawlerAbilityLoadout(
            brawlerName
        );
    loadout[
        String(
            slotNumber
        )
    ] =
        null;
    saveGame();
    renderBrawlerCapabilitiesStats();
    updateBattleAbilitySlots();
    closeAbilityEquipPicker();
}
function buildCapabilitiesStatsHtml(
    brawlerName,
    power,
    interactive = false,
    loadoutOverride = null
) {
    const editable =
        interactive === true;
    const detailOnly =
        interactive === "details";
    const loadout =
        loadoutOverride &&
        typeof loadoutOverride === "object"
        ? loadoutOverride
        : getBrawlerAbilityLoadout(
            brawlerName
        );
    const slots = [
        {
            number: 1,
            requiredPower: 7
        },
        {
            number: 2,
            requiredPower: 9
        }
    ];
    return `
        <div class="capabilities-panel-intro">
            <strong>CAPACITÉS</strong>

            <span>
                Équipe jusqu'à 2 capacités.
            </span>
        </div>

        <div class="capabilities-slot-list">

            ${
                slots.map(
                    slot => {
                        const unlocked =
                            power >=
                            slot.requiredPower;
                        const abilityId =
                            loadout[
                                String(
                                    slot.number
                                )
                            ];
                        const equippedAbility =
                            getBrawlerAbilityById(
                                brawlerName,
                                abilityId
                            );
                        const clickable =
                            unlocked &&
                            (
                                editable ||
                                (
                                    detailOnly &&
                                    !!equippedAbility
                                )
                            );
                        const tag =
                            clickable
                            ?
                            "button"
                            :
                            "div";
                        const clickAttribute =
                            clickable
                            ?
                            (
                                detailOnly
                                ?
                                `onclick="openAbilityDetailModal('${brawlerName}', ${slot.number}, '${abilityId}')"`
                                :
                                `onclick="openAbilityCardAction('${brawlerName}', ${slot.number})"`
                            )
                            :
                            "";
                        return `
                            <${tag}
                                class="
                                    capability-stat-card
                                    ${unlocked ? "unlocked" : "locked"}
                                    ${clickable ? "clickable" : ""}
                                    ${equippedAbility ? "equipped" : "empty"}
                                "
                                ${
                                    tag ===
                                    "button"
                                    ?
                                    'type="button"'
                                    :
                                    ""
                                }
                                ${clickAttribute}
                            >

                                <div class="capability-stat-number">
                                    ${slot.number}
                                </div>

                                <div class="capability-stat-copy">

                                    <strong>
                                        ${
                                            !unlocked
                                            ?
                                            "EMPLACEMENT " +
                                            slot.number
                                            :
                                            (
                                                equippedAbility
                                                ?
                                                equippedAbility.name
                                                :
                                                "EMPLACEMENT " +
                                                slot.number
                                            )
                                        }
                                    </strong>

                                    <span>
                                        ${
                                            !unlocked
                                            ?
                                            "DÉBLOCAGE POWER " +
                                            slot.requiredPower
                                            :
                                            (
                                                equippedAbility
                                                ?
                                                "EMPLACEMENT " +
                                                slot.number
                                                :
                                                "VIDE · ÉQUIPER"
                                            )
                                        }
                                    </span>

                                </div>

                                <div class="capability-stat-state">

                                    ${
                                        !unlocked
                                        ?
                                        `
                                            <img
                                                src="Icon/lock.png"
                                                alt="Verrouillé"
                                            >
                                        `
                                        :
                                        (
                                            equippedAbility
                                            ?
                                            `
                                                <span class="capability-equipped-mark">
                                                    ✓
                                                </span>
                                            `
                                            :
                                            `
                                                <span class="capability-empty-dot"></span>
                                            `
                                        )
                                    }

                                </div>

                            </${tag}>
                        `;
                    }
                ).join("")
            }

        </div>
    `;
}
function renderBrawlerCapabilitiesStats() {
    const content =
        document.getElementById(
            "capabilitiesStatsContent"
        );
    const brawlerName =
        state.detailBrawler;
    const brawler =
        brawlers[
            brawlerName
        ];
    if (
        !content ||
        !brawler
    ) {
        return;
    }
    content.innerHTML =
        buildCapabilitiesStatsHtml(
            brawlerName,
            brawler.power,
            true
        );
    renderBrawlerStarPowerStats();
}
function updateBrawlerAttackDescription() {
    const brawlerName =
        state.detailBrawler;
    const description =
        BRAWLER_ATTACK_DESCRIPTIONS[
            brawlerName
        ]?.[
            currentBrawlerStatsMode
        ];
    const modeElement =
        document.getElementById(
            "detailDescriptionMode"
        );
    const titleElement =
        document.getElementById(
            "detailDescriptionTitle"
        );
    const textElement =
        document.getElementById(
            "detailDescriptionText"
        );
    const tankPassive =
        document.getElementById(
            "detailTankPassive"
        );
    if (modeElement) {
        modeElement.innerText =
            currentBrawlerStatsMode ===
            "super"
            ?
            "SUPER"
            :
            "ATTAQUE DE BASE";
    }
    if (titleElement) {
        titleElement.innerText =
            description?.title ||
            (
                currentBrawlerStatsMode ===
                "super"
                ?
                "SUPER"
                :
                "ATTAQUE"
            );
    }
    if (textElement) {
        textElement.innerText =
            description?.text ||
            "Description à compléter.";
    }
    if (tankPassive) {
        tankPassive.hidden =
            !(
                brawlerName ===
                "Bull" ||
                brawlerName ===
                "El Primo"
            );
    }
}
function setBrawlerStatsMode(
    mode
) {
    currentBrawlerStatsMode = ["base", "super", "abilities", "starPower"].includes(mode) ? mode : "base";
    const starActive = currentBrawlerStatsMode === "starPower";
    document.getElementById("starPowerStatsPanel")?.classList.toggle("active", starActive);
    const starButton = document.getElementById("statsModeStarPowerButton");
    starButton?.classList.toggle("active", starActive);
    starButton?.classList.toggle("inactive", !starActive);
    const basePanel =
        document.getElementById(
            "baseStatsPanel"
        );
    const superPanel =
        document.getElementById(
            "superStatsPanel"
        );
    const abilitiesPanel =
        document.getElementById(
            "capabilitiesStatsPanel"
        );
    const baseButton =
        document.getElementById(
            "statsModeBaseButton"
        );
    const superButton =
        document.getElementById(
            "statsModeSuperButton"
        );
    const abilitiesButton =
        document.getElementById(
            "statsModeAbilitiesButton"
        );
    const title =
        document.getElementById(
            "statsModeTitle"
        );
    if (
        !basePanel ||
        !superPanel ||
        !abilitiesPanel ||
        !baseButton ||
        !superButton ||
        !abilitiesButton ||
        !title
    ) {
        return;
    }
    const superActive =
        currentBrawlerStatsMode ===
        "super";
    const abilitiesActive =
        currentBrawlerStatsMode ===
        "abilities";
    const baseActive =
        !superActive &&
        !abilitiesActive && !starActive;
    basePanel.classList.toggle(
        "active",
        baseActive
    );
    superPanel.classList.toggle(
        "active",
        superActive
    );
    abilitiesPanel.classList.toggle(
        "active",
        abilitiesActive
    );
    baseButton.classList.toggle(
        "active",
        baseActive
    );
    baseButton.classList.toggle(
        "inactive",
        !baseActive
    );
    superButton.classList.toggle(
        "active",
        superActive
    );
    superButton.classList.toggle(
        "inactive",
        !superActive
    );
    abilitiesButton.classList.toggle(
        "active",
        abilitiesActive
    );
    abilitiesButton.classList.toggle(
        "inactive",
        !abilitiesActive
    );
    title.innerText =
        (
            abilitiesActive
            ?
            "CAPACITÉS"
            :
            (
                superActive
                ?
                "SUPER"
                :
                "STATISTIQUES"
            )
        );
    if (starActive) title.innerText = "POUVOIR STAR";
    const detailPage =
        document.getElementById(
            "brawlerDetailPage"
        );
    if (detailPage) {
        detailPage.classList.toggle(
            "super-stats-active",
            superActive
        );
        detailPage.classList.toggle(
            "abilities-stats-active",
            abilitiesActive
        );
    }
    const attackDescription =
        document.getElementById(
            "detailAttackDescription"
        );
    if (attackDescription) {
        attackDescription.hidden =
            abilitiesActive || starActive;
    }
    if (abilitiesActive) {
        renderBrawlerCapabilitiesStats();
    }
    if (starActive) {
        renderBrawlerStarPowerStats();
    }
    const detailSkin =
        document.getElementById(
            "detailBrawlerSkin"
        );
    const currentName =
        state.detailBrawler;
    if (
        detailSkin &&
        currentName &&
        brawlers[currentName]
    ) {
        if (
            currentName === "Nita"
        ) {
            detailSkin.className =
                "brawler-detail-skin skin-nita";
            configureNitaAlternatingPreview(
                detailSkin,
                brawlers.Nita.image,
                getNitaBearImageForSkin(
                    brawlers.Nita.image
                ),
                {
                    detail: true,
                    primaryAlt: "Nita",
                    bearAlt:
                        getNitaBearImageForSkin(
                            brawlers.Nita.image
                        ) === NITA_CHAMPION_BEAR_IMAGE
                        ? "Bruce Champion"
                        : "Bruce"
                }
            );
        }
        else {
            clearNitaAlternatingPreview(
                detailSkin
            );
            detailSkin.src =
                brawlers[currentName].image;
            detailSkin.className =
                "brawler-detail-skin skin-" +
                currentName
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );
        }
    }
    if (!abilitiesActive && !starActive) {
        updateBrawlerAttackDescription();
    }
}
function toggleBrawlerStatsMode() {
    const nextMode =
        (
            currentBrawlerStatsMode ===
            "base"
            ?
            "super"
            :
            (
                currentBrawlerStatsMode ===
                "super"
                ?
                "abilities"
                :
                "base"
            )
        );
    setBrawlerStatsMode(
        nextMode
    );
}
function openDetailStatsOverlay(
    mode
) {
    const overlay =
        document.getElementById(
            "detailStatsOverlay"
        );
    const modalBrawler =
        document.getElementById(
            "detailStatsModalBrawler"
        );
    if (modalBrawler) {
        modalBrawler.innerText =
            (
                state.detailBrawler
                ||
                "Brawler"
            )
            .toUpperCase();
    }
    setBrawlerStatsMode(
        mode || currentBrawlerStatsMode || "base"
    );
    if (overlay) {
        overlay.classList.add(
            "active"
        );
    }
}
function closeDetailStatsOverlay() {
    const overlay =
        document.getElementById(
            "detailStatsOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
    }
}
function openBattleStatsDetailOverlay(
    mode
) {
    const overlay =
        document.getElementById(
            "battleStatsDetailOverlay"
        );
    const name =
        document.getElementById(
            "battleStatsName"
        );
    const modalBrawler =
        document.getElementById(
            "battleStatsModalBrawler"
        );
    if (modalBrawler && name) {
        modalBrawler.innerText =
            (
                name.innerText ||
                "BRAWLER"
            )
            .toUpperCase();
    }
    setBattleStatsMode(
        mode || battleStatsCurrentMode || "base"
    );
    if (overlay) {
        overlay.classList.add(
            "active"
        );
    }
}
function closeBattleStatsDetailOverlay() {
    const overlay =
        document.getElementById(
            "battleStatsDetailOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
    }
}
function getMeteorPendingKey(
    side
) {
    return side === "enemy"
        ? "enemyMeteorPending"
        : "playerMeteorPending";
}
function getBurnTurnsKey(
    side
) {
    return side === "enemy"
        ? "enemyBurnTurns"
        : "playerBurnTurns";
}
function isBattleEffectImmune(
    side
) {
    return (
        side ===
        "enemy"
        ?
        (
            Number(
                battleState.enemyEffectImmunityTurns
            ) || 0
        ) > 0
        :
        (
            Number(
                battleState.playerEffectImmunityTurns
            ) || 0
        ) > 0
    );
}
function setBattleEffectImmunity(
    side,
    turns
) {
    const safeTurns =
        Math.max(
            0,
            Math.round(
                Number(turns) || 0
            )
        );
    if (side === "enemy") {
        battleState.enemyEffectImmunityTurns =
            safeTurns;
        /*
           Une immunité active nettoie les effets
           négatifs actuellement suivis par le jeu.
        */
        battleState.enemyBurnTurns = 0;
        battleState.enemyPoisonTurns = 0;
        battleState.enemySlowTurns = 0;
        battleState.enemySlowAmount = 0;
        battleState.enemyParalyzedTurns = 0;
    }
    else {
        battleState.playerEffectImmunityTurns =
            safeTurns;
        battleState.playerBurnTurns = 0;
        battleState.playerPoisonTurns = 0;
        battleState.playerSlowTurns = 0;
        battleState.playerSlowAmount = 0;
        battleState.playerParalyzedTurns = 0;
    }
}
function consumeBattleEffectImmunityTurn(
    side
) {
    if (side === "enemy") {
        battleState.enemyEffectImmunityTurns =
            Math.max(
                0,
                (
                    Number(
                        battleState.enemyEffectImmunityTurns
                    ) || 0
                ) - 1
            );
        return;
    }
    battleState.playerEffectImmunityTurns =
        Math.max(
            0,
            (
                Number(
                    battleState.playerEffectImmunityTurns
                ) || 0
            ) - 1
        );
}
function getBattleSlowTurns(
    side
) {
    return Math.max(
        0,
        Number(
            side === "enemy"
            ? battleState.enemySlowTurns
            : battleState.playerSlowTurns
        ) || 0
    );
}
function getBattleSlowAmount(
    side
) {
    if (
        getBattleSlowTurns(
            side
        ) <= 0
    ) {
        return 0;
    }
    return Math.max(
        0,
        Number(
            side === "enemy"
            ? battleState.enemySlowAmount
            : battleState.playerSlowAmount
        ) || 0
    );
}
function applyBattleBurn(
    side,
    turns
) {
    if (
        isBattleEffectImmune(
            side
        )
    ) {
        return false;
    }
    const safeTurns =
        Math.max(
            0,
            Math.round(
                Number(
                    turns
                ) || 0
            )
        );
    if (safeTurns <= 0) {
        return false;
    }
    const key =
        getBurnTurnsKey(
            side
        );
    battleState[
        key
    ] =
        Math.max(
            Number(
                battleState[
                    key
                ]
            ) || 0,
            safeTurns
        );
    return true;
}
function getBattleEffectiveSpeed(
    side,
    brawlerName
) {
    const baseSpeed =
        Math.max(
            1,
            Number(
                brawlers[
                    brawlerName
                ]?.speed
            ) || 1
        );
    if (
        side !== "player" &&
        side !== "enemy"
    ) {
        return baseSpeed;
    }
    return Math.max(
        1,
        baseSpeed -
        getBattleSlowAmount(
            side
        )
    );
}
function applyBattleSlow(
    side,
    amount,
    turns
) {
    if (
        isBattleEffectImmune(
            side
        )
    ) {
        return false;
    }
    const safeAmount =
        Math.max(
            0,
            Math.round(
                Number(
                    amount
                ) || 0
            )
        );
    const safeTurns =
        Math.max(
            0,
            Math.round(
                Number(
                    turns
                ) || 0
            )
        );
    if (
        safeAmount <= 0 ||
        safeTurns <= 0
    ) {
        return false;
    }
    if (
        side ===
        "enemy"
    ) {
        battleState.enemySlowAmount =
            Math.max(
                Number(
                    battleState.enemySlowAmount
                ) || 0,
                safeAmount
            );
        battleState.enemySlowTurns =
            Math.max(
                Number(
                    battleState.enemySlowTurns
                ) || 0,
                safeTurns
            );
    }
    else {
        battleState.playerSlowAmount =
            Math.max(
                Number(
                    battleState.playerSlowAmount
                ) || 0,
                safeAmount
            );
        battleState.playerSlowTurns =
            Math.max(
                Number(
                    battleState.playerSlowTurns
                ) || 0,
                safeTurns
            );
    }
    if (
        typeof updateBattleActionHitChanceUI ===
        "function"
    ) {
        updateBattleActionHitChanceUI();
    }
    return true;
}
function consumeBattleSlowTurn(
    side
) {
    const turns =
        getBattleSlowTurns(
            side
        );
    if (
        turns <= 0
    ) {
        return;
    }
    const nextTurns =
        Math.max(
            0,
            turns - 1
        );
    if (
        side ===
        "enemy"
    ) {
        battleState.enemySlowTurns =
            nextTurns;
        if (
            nextTurns === 0
        ) {
            battleState.enemySlowAmount =
                0;
        }
    }
    else {
        battleState.playerSlowTurns =
            nextTurns;
        if (
            nextTurns === 0
        ) {
            battleState.playerSlowAmount =
                0;
        }
    }
    if (
        typeof updateBattleActionHitChanceUI ===
        "function"
    ) {
        updateBattleActionHitChanceUI();
    }
}
function applyBattleParalysis(
    side,
    turns
) {
    if (
        isBattleEffectImmune(
            side
        )
    ) {
        return false;
    }
    const safeTurns =
        Math.max(
            0,
            Math.round(
                Number(turns) || 0
            )
        );
    if (side === "enemy") {
        battleState.enemyParalyzedTurns =
            Math.max(
                battleState.enemyParalyzedTurns,
                safeTurns
            );
    }
    else {
        battleState.playerParalyzedTurns =
            Math.max(
                battleState.playerParalyzedTurns,
                safeTurns
            );
    }
    return true;
}
function healPocoTeam(
    side,
    amount
) {
    /*
       Le prototype actuel est un duel 1v1 :
       il n'existe pas encore de coéquipiers à soigner.
       Cette fonction centralise néanmoins le soin pour
       pouvoir y brancher les alliés plus tard.
    */
    const healAmount =
        Math.max(
            0,
            Math.round(
                Number(amount) || 0
            )
        );
    if (side === "enemy") {
        const before =
            battleState.enemyHealth;
        battleState.enemyHealth =
            Math.min(
                battleState.enemyMaxHealth,
                battleState.enemyHealth +
                healAmount
            );
        updateBattleHealthUI(
            "enemy"
        );
        return (
            battleState.enemyHealth -
            before
        );
    }
    const before =
        battleState.playerHealth;
    battleState.playerHealth =
        Math.min(
            battleState.playerMaxHealth,
            battleState.playerHealth +
            healAmount
        );
    updateBattleHealthUI(
        "player"
    );
    return (
        battleState.playerHealth -
        before
    );
}
function applyPocoHealingMelodyTick(
    side = "player"
) {
    const key =
        side === "enemy"
        ?
        "enemyPocoHealingTurns"
        :
        "playerPocoHealingTurns";
    const turns =
        Number(
            battleState[
                key
            ]
        ) || 0;
    if (
        turns <= 0
    ) {
        return 0;
    }
    battleState[
        key
    ] =
        turns - 1;
    return healPocoTeam(
        side,
        20
    );
}
function getSideDisplayName(
    side
) {
    if (side === "enemy") {
        return battleState.enemyPseudo || "BOT";
    }
    return state.profile?.name || "TOI";
}
function applyBattleBurnTick(
    side
) {
    const key = getBurnTurnsKey( side );
    const turns = Number( battleState[ key ] ) || 0;
    if (
        turns > 0 &&
        isBattleEffectImmune(
            side
        )
    ) {
        /*
           Le tour de brûlure est consommé,
           mais l'immunité empêche les dégâts.
        */
        battleState[ key ] =
            turns - 1;
        return {
            applied: false,
            immune: true,
            ko: false,
            damage: 0
        };
    }
    if (turns <= 0) {
        return { applied: false, ko: false, damage: 0 };
    }
    battleState[ key ] = turns - 1;
    const damageResult =
        applyBattleDamageToSide(
            side,
            10,
            { piercing: false }
        );
    const totalDamage =
        getBattleDamageResultTotal( damageResult );
    return {
        applied: true,
        damage: totalDamage,
        ko:
            side === "enemy"
            ? battleState.enemyHealth <= 0
            : battleState.playerHealth <= 0
    };
}
function resolveBattleMeteorAfterDistanceChoice() {
    const meteor = battleState.enemyMeteorPending;
    if (!meteor || !Number.isFinite( battleState.currentDistance )) {
        return { resolved: false, escaped: false, ko: false, message: "" };
    }
    battleState.enemyMeteorPending = null;
    const difference = Math.abs( battleState.currentDistance - meteor.sourceDistance );
    if (difference >= (meteor.minDistanceChangeToEscape || 3)) {
        return {
            resolved: true,
            escaped: true,
            ko: false,
            message: "BOT évite la météorite !"
        };
    }
    const damageResult =
        applyBattleDamageToSide(
            "enemy",
            meteor.damage || 30,
            { piercing: false }
        );
    const totalDamage = getBattleDamageResultTotal( damageResult );
    battleState.enemyBurnTurns =
        Math.max(
            Number( battleState.enemyBurnTurns ) || 0,
            meteor.burnTurns || 2
        );
    registerQuestDamage( totalDamage );
    return {
        resolved: true,
        escaped: false,
        ko: battleState.enemyHealth <= 0,
        message: "MÉTÉORITE · BOT prend -" + totalDamage + " PV et brûle 2 tours"
    };
}
/* =====================================================
   VIE DES BRAWLERS
===================================================== */
/*
   health = vie au niveau de pouvoir 1.
   À chaque niveau supplémentaire :
   +10 % sur la vie du niveau précédent,
   puis arrondi à l'unité.
*/
const MAX_HEALTH_BAR =
    340;
function getBrawlerHealth(
    brawler
) {
    let health =
        brawler.health;
    for (
        let level = 1;
        level < brawler.power;
        level++
    ) {
        health =
            Math.round(
                health * 1.10
            );
    }
    return health;
}
function updateBrawlerShotFieldStat(
    brawler
) {
    const shotField =
        brawler.shotField;
    const segments =
        document.querySelectorAll(
            "#statShotField .shot-field-segment"
        );
    segments.forEach(
        (
            segment,
            index
        ) => {
            segment.classList.toggle(
                "active",
                index < shotField
            );
        }
    );
    document
        .getElementById(
            "statShotFieldValue"
        )
        .innerText =
            brawler.shotFieldLabel ||
            shotField;
}
function getScaledDamage(
    baseDamage,
    powerLevel
) {
    /*
       Fonction utilisée pour toutes les valeurs
       qui évoluent avec le Power Level :
       dégâts, vie et soin.
    */
    let damage =
        baseDamage;
    /*
       +10 % par niveau,
       arrondi à l'unité après
       chaque montée de niveau.
    */
    for (
        let level = 1;
        level < powerLevel;
        level++
    ) {
        damage =
            Math.round(
                damage * 1.10
            );
    }
    return damage;
}
function getBrawlerAttackDamage(
    brawler
) {
    /*
       Toutes les attaques mobiles,
       y compris Colt,
       gagnent +10 % par niveau.
    */
    return getScaledDamage(
        brawler.attack || 0,
        brawler.power
    );
}
function updateBrawlerAttackStat(
    brawler
) {
    const simpleStat =
        document.getElementById(
            "simpleAttackStat"
        );
    const distanceStat =
        document.getElementById(
            "distanceAttackStat"
        );
    const grid =
        document.getElementById(
            "attackDistanceGrid"
        );
    /*
       Si le Brawler possède des dégâts
       définis selon la distance, on affiche
       le détail complet.
    */
    if (brawler.attackByDistance) {
        simpleStat.style.display =
            "none";
        distanceStat.style.display =
            "block";
        const baseAttackExtra =
            document.getElementById(
                "baseAttackExtra"
            );
        if (baseAttackExtra) {
            baseAttackExtra.style.display =
                "none";
        }
        grid.innerHTML =
            Object.entries(
                brawler.attackByDistance
            )
            .map(
                ([distance, baseDamage]) => {
                    const damage =
                        getScaledDamage(
                            baseDamage,
                            brawler.power
                        );
                    return `

                        <div class="attack-distance-item">

                            <div class="attack-distance-number">
                                DIST. ${distance}
                            </div>

                            <div class="attack-distance-damage">
                                ${damage}
                            </div>

                            <div class="attack-distance-unit">
                                DÉGÂTS
                            </div>

                        </div>

                    `;
                }
            )
            .join("");
        return;
    }
    /*
       Les autres Brawlers gardent leur
       ancienne statistique tant que leurs
       dégâts détaillés n'ont pas été définis.
    */
    distanceStat.style.display =
        "none";
    simpleStat.style.display =
        "grid";
    grid.innerHTML =
        "";
    const attack =
        getBrawlerAttackDamage(
            brawler
        );
    document
        .getElementById(
            "statAttack"
        )
        .style.width =
            Math.min(
                attack,
                100
            ) + "%";
    document
        .getElementById(
            "statAttackValue"
        )
        .innerText =
            String(attack);
    const baseAttackExtra =
        document.getElementById(
            "baseAttackExtra"
        );
    if (baseAttackExtra) {
        let extraHtml =
            "";
        let badgesHtml =
            "";
        if (
            typeof brawler.bullets ===
            "number"
        ) {
            extraHtml += `
                <span class="base-bullet-info">
                    ${brawler.bullets} BALLES TIRÉES
                </span>
            `;
        }
        if (
            brawler.piercingAttack ===
            true
        ) {
            badgesHtml += `
                <span class="piercing-stat-badge">
                    TRANSPERÇANTE
                </span>
            `;
        }
        if (
            brawler.burstAttack ===
            true
        ) {
            badgesHtml += `
                <span class="burst-stat-badge">
                    RAFALE
                </span>
            `;
        }
        if (badgesHtml) {
            extraHtml += `
                <div class="attack-property-badges">
                    ${badgesHtml}
                </div>
            `;
        }
        baseAttackExtra.innerHTML =
            extraHtml;
        baseAttackExtra.style.display =
            extraHtml
            ?
            "block"
            :
            "none";
    }
}
function updateBrawlerRangeStat(
    brawler
) {
    const range =
        brawler.range;
    const segments =
        document.querySelectorAll(
            "#statRange .range-segment"
        );
    segments.forEach(
        (
            segment,
            index
        ) => {
            segment.classList.toggle(
                "active",
                index < range
            );
        }
    );
    document
        .getElementById(
            "statRangeValue"
        )
        .innerText =
            range;
}
function updateBrawlerSpeedStat(
    brawler
) {
    const speed =
        brawler.speed;
    const segments =
        document.querySelectorAll(
            "#statSpeed .speed-segment"
        );
    segments.forEach(
        (
            segment,
            index
        ) => {
            segment.classList.toggle(
                "active",
                index < speed
            );
        }
    );
    document
        .getElementById(
            "statSpeedValue"
        )
        .innerText =
            speed;
}
function updateBrawlerHealthStat(
    brawler
) {
    const currentHealth =
        getBrawlerHealth(
            brawler
        );
    document
        .getElementById(
            "statHealth"
        )
        .style.width =
            Math.min(
                100,
                (
                    currentHealth /
                    MAX_HEALTH_BAR
                ) * 100
            ) + "%";
    document
        .getElementById(
            "statHealthValue"
        )
        .innerText =
            currentHealth;
}
/* =====================================================
   COÛTS D'AMÉLIORATION
   niveau actuel -> niveau suivant
===================================================== */
const POWER_UPGRADE_COSTS = {
    1:  { coins: 20,   power: 20 },
    2:  { coins: 35,   power: 30 },
    3:  { coins: 75,   power: 50 },
    4:  { coins: 140,  power: 80 },
    5:  { coins: 290,  power: 130 },
    6:  { coins: 480,  power: 210 },
    7:  { coins: 800,  power: 340 },
    8:  { coins: 1250, power: 550 },
    9:  { coins: 1875, power: 890 }
};
/* =====================================================
   SAUVEGARDE
===================================================== */
/* =====================================================
   ICÔNES DE PROFIL
===================================================== */
const LEGACY_SEASON_ONE_ICON = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#17102f"/><circle cx="50" cy="46" r="33" fill="#33215d" stroke="#ffc857" stroke-width="3"/><path d="M50 15 59 35 81 38 65 54 69 77 50 66 31 77 35 54 19 38 41 35Z" fill="#ffc857"/><text x="50" y="56" text-anchor="middle" font-family="Arial" font-size="28" font-weight="bold" fill="#33215d">1</text></svg>').replace(/'/g, "%27");
const SEASON_ONE_ICON = "Profil/shelly_star.png";
const LEGACY_SEASON_ONE_GLOBAL_ICON = "Profil/Ohlala.webp";
const SEASON_ONE_GLOBAL_ICON = "Profil/Saison_1.png";
const COLT_CHALLENGER_ICON = "Profil/colt_challenger.png";
const PROFILE_ICON_CHOICES = [
    {
        name: "Default",
        icon: "Profil/default.webp"
    },
    {
        name: "Robot",
        icon: "Profil/robot.webp"
    },
    {
        name: "Bandana",
        icon: "Profil/bandana.webp"
    },
    {
        name: "Little Spike",
        icon: "Profil/little_spike.webp"
    },
    {
        name: "500 TR",
        icon: "Profil/500tr.png"
    },
    {
        name: "1000 TR",
        icon: "Profil/1000tr.png"
    },
    {
        name: "2000 TR",
        icon: "Profil/2000tr.png"
    },
    {
        name: "3000 TR",
        icon: "Profil/3000tr.png"
    },
    {
        name: "Shelly",
        icon: "Brawlers_icon/Shelly_icon.png"
    },
    {
        name: "Nita",
        icon: "Brawlers_icon/Nita_icon.webp"
    },
    {
        name: "Colt",
        icon: "Brawlers_icon/Colt_icon.png"
    },
    {
        name: "Bull",
        icon: "Brawlers_icon/Bull_icon.png"
    },
    {
        name: "El Primo",
        icon: "Brawlers_icon/El_Primo_icon.png"
    },
    {
        name: "Poco",
        icon: "Brawlers_icon/Poco_icon.png"
    },
    { name: "Saison 1", icon: SEASON_ONE_GLOBAL_ICON },
    { name: "Shelly star", icon: SEASON_ONE_ICON },
    { name: "Colt Challenger", icon: COLT_CHALLENGER_ICON }
];
const DEFAULT_PROFILE_ICON =
    "Profil/default.webp";
const DEFAULT_UNLOCKED_PROFILE_ICONS = [
    DEFAULT_PROFILE_ICON
];
function getAllowedProfileIconPaths() {
    return PROFILE_ICON_CHOICES.map(
        choice =>
            choice.icon
    );
}
function normalizeProfileIcon(
    value
) {
    return getAllowedProfileIconPaths().includes(
        value
    )
    ?
    value
    :
    DEFAULT_PROFILE_ICON;
}
const SAVE_KEY = "brawlvs_save";
const CURRENT_SAVE_VERSION = 16;
/* =====================================================
   QUÊTES
===================================================== */
let QUEST_DEFINITIONS = [];
const QUEST_FINAL_REWARD = {
    starTokens: 3
};
function getBelgiumClock(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit',
        day: '2-digit', hour: '2-digit', hourCycle: 'h23'
    }).formatToParts(now);
    return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
}
function getQuestDateKey(now = new Date()) {
    const p = getBelgiumClock(now);
    const day = new Date(Date.UTC(p.year, p.month - 1, p.day));
    if (p.hour < 10) day.setUTCDate(day.getUTCDate() - 1);
    return day.toISOString().slice(0, 10);
}
function getNextDailyReset(now = new Date()) {
    const p = getBelgiumClock(now);
    const target = new Date(Date.UTC(p.year, p.month - 1, p.day + (p.hour >= 10 ? 1 : 0), 10));
    const offsetHours = getBelgiumClock(target).hour - 10;
    return target.getTime() - offsetHours * 3600000;
}
function getDailyCountdown(now = new Date()) {
    const remaining = Math.max(0, Math.ceil((getNextDailyReset(now) - now.getTime()) / 1000));
    return [Math.floor(remaining / 3600), Math.floor(remaining / 60) % 60, remaining % 60]
        .map(n => String(n).padStart(2, '0')).join(':');
}
const DAILY_GIFT_REWARDS = [
    {key:'coins', amount:50, name:'50 pièces', icon:'Icon/coin.png'},
    {key:'power', amount:30, name:'30 points de pouvoir', icon:'Icon/power.png'},
    {key:'gems', amount:1, name:'1 gemme', icon:'Icon/gemme.png'},
    {key:'box', amount:1, name:'Brawl Box', icon:'Icon/Brawl_Box.webp'},
    {key:'tokens', amount:10, name:'10 jetons', icon:'Icon/Jeton.png'}
];
function normalizeDailyGift(value) {
    const gift = value && typeof value === 'object' ? value : {};
    return {
        date: typeof gift.date === 'string' ? gift.date : '',
        rewardIndex: Number.isInteger(gift.rewardIndex) && gift.rewardIndex >= 0 && gift.rewardIndex < DAILY_GIFT_REWARDS.length ? gift.rewardIndex : 0,
        claimed: gift.claimed === true
    };
}
function ensureDailyGift() {
    const today = getQuestDateKey();
    if (state.dailyGift.date !== today) {
        state.dailyGift = {date:today, rewardIndex:Math.floor(Math.random() * DAILY_GIFT_REWARDS.length), claimed:false};
        saveGame();
    }
}
function renderDailyGift() {
    const panel = document.getElementById('shopGlobalPanel');
    if (!panel) return;
    ensureDailyGift();
    let card = document.getElementById('dailyGiftCard');
    if (!card) {
        card = document.createElement('section');
        card.id = 'dailyGiftCard';
        card.className = 'daily-gift-card';
        panel.prepend(card);
    }
    const gift = state.dailyGift;
    const reward = DAILY_GIFT_REWARDS[gift.rewardIndex];
    card.innerHTML = `
        <div class="daily-gift-heading">CADEAU QUOTIDIEN <span>GRATUIT</span></div>
        <div class="daily-gift-content">
            <img src="${reward.icon}" alt="${reward.name}">
            <div><strong>${reward.name}</strong><p>Une récompense aléatoire offerte chaque jour</p></div>
        </div>
        <button type="button" onclick="claimDailyGift()" ${gift.claimed ? 'disabled' : ''}>${gift.claimed ? '✓ RÉCUPÉRÉ' : 'RÉCUPÉRER GRATUITEMENT'}</button>
        <p class="daily-reset-note">Prochain cadeau dans <strong data-daily-countdown>${getDailyCountdown()}</strong> · 10 h (Belgique)</p>`;
}
function claimDailyGift() {
    ensureDailyGift();
    if (state.dailyGift.claimed || boxOpeningActive) return;
    const reward = DAILY_GIFT_REWARDS[state.dailyGift.rewardIndex];
    state.dailyGift.claimed = true;
    if (reward.key === 'box') {
        if (!openFreeTrophyRoadBox('brawl')) {
            state.dailyGift.claimed = false;
            return;
        }
    } else {
        state.resources[reward.key] += reward.amount;
    }
    saveGame();
    updateResources();
    renderDailyGift();
    if (reward.key !== 'box') showReward(reward.icon, reward.name, 'Ton cadeau quotidien gratuit !', 'CADEAU QUOTIDIEN', 'rare');
}
function refreshDailyContent() {
    const previousDate = state.quests.date;
    ensureDailyQuests();
    if (state.quests.date !== previousDate) renderQuests();
    const previousGiftDate = state.dailyGift.date;
    ensureDailyGift();
    if (state.dailyGift.date !== previousGiftDate || !document.getElementById('dailyGiftCard')) renderDailyGift();
    const countdown = getDailyCountdown();
    document.querySelectorAll('[data-daily-countdown]').forEach(el => {el.textContent = countdown;});
}
function createDefaultQuestState() {
    return {
        date: "",
        definitions: [],
        progress: {},
        claimed: {},
        finalRewardClaimed: false
    };
}
function normalizeQuestState(
    quests
) {
    const normalized =
        createDefaultQuestState();
    if (
        quests &&
        typeof quests === "object"
    ) {
        normalized.date =
            typeof quests.date === "string"
            ?
            quests.date
            :
            "";
        normalized.definitions =
            Array.isArray(
                quests.definitions
            )
            ?
            quests.definitions
            .filter(
                quest =>
                    quest &&
                    typeof quest === "object" &&
                    typeof quest.id === "string" &&
                    typeof quest.type === "string" &&
                    Number.isFinite(
                        Number(
                            quest.target
                        )
                    )
            )
            .slice(
                0,
                3
            )
            .map(
                quest => ({
                    ...quest,
                    target:
                        Math.max(
                            1,
                            Math.floor(
                                Number(
                                    quest.target
                                )
                            )
                        ),
                    rewards: {
                        starTokens: 1
                    }
                })
            )
            :
            [];
        if (
            quests.progress &&
            typeof quests.progress === "object"
        ) {
            Object.entries(
                quests.progress
            )
            .forEach(
                (
                    [
                        key,
                        value
                    ]
                ) => {
                    normalized.progress[
                        key
                    ] =
                        Math.max(
                            0,
                            Math.floor(
                                Number(
                                    value
                                ) || 0
                            )
                        );
                }
            );
        }
        if (
            quests.claimed &&
            typeof quests.claimed === "object"
        ) {
            Object.entries(
                quests.claimed
            )
            .forEach(
                (
                    [
                        key,
                        value
                    ]
                ) => {
                    normalized.claimed[
                        key
                    ] =
                        value === true;
                }
            );
        }
        normalized.finalRewardClaimed =
            quests.finalRewardClaimed === true;
    }
    return normalized;
}
function getRandomQuestValue(
    values
) {
    return values[
        Math.floor(
            Math.random() *
            values.length
        )
    ];
}
function makeDailyQuest(
    config,
    index,
    today
) {
    const cleanBrawler =
        String(
            config.brawler ||
            ""
        )
        .toLowerCase()
        .replace(
            /[^a-z0-9]+/g,
            "-"
        )
        .replace(
            /^-+|-+$/g,
            ""
        );
    return {
        id:
            today +
            "-" +
            config.type +
            (
                cleanBrawler
                ?
                "-" + cleanBrawler
                :
                ""
            ) +
            "-" +
            index,
        type:
            config.type,
        brawler:
            config.brawler || null,
        icon:
            config.icon,
        name:
            config.name,
        description:
            config.description,
        target:
            config.target,
        rewards: {
            starTokens: 1
        }
    };
}
function generateDailyQuestDefinitions() {
    const today =
        getQuestDateKey();
    const owned =
        Array.isArray(
            state.ownedBrawlers
        ) &&
        state.ownedBrawlers.length > 0
        ?
        state.ownedBrawlers
        :
        [
            "Shelly"
        ];
    const chosenBrawler =
        owned[
            Math.floor(
                Math.random() *
                owned.length
            )
        ];
    /*
       Trois familles différentes sont tirées chaque jour
       afin d'éviter trois quêtes trop similaires.
       Difficulté visée :
       environ 3 à 5 combats pour chaque quête.
    */
    const generalGroup = [
        () => {
            const target =
                getRandomQuestValue(
                    [
                        2,
                        3
                    ]
                );
            return {
                type: "wins",
                icon: "⚔",
                name: "VICTOIRES",
                description:
                    "Gagne " +
                    target +
                    " duels",
                target
            };
        },
        () => {
            const target =
                getRandomQuestValue(
                    [
                        4,
                        5
                    ]
                );
            return {
                type: "battles",
                icon: "🎮",
                name: "COMBATS",
                description:
                    "Joue " +
                    target +
                    " duels",
                target
            };
        }
    ];
    const combatGroup = [
        () => {
            const target =
                getRandomQuestValue(
                    [
                        400,
                        500,
                        600
                    ]
                );
            return {
                type: "damage",
                icon: "💥",
                name: "DÉGÂTS",
                description:
                    "Inflige " +
                    target +
                    " dégâts",
                target
            };
        },
        () => {
            const target =
                getRandomQuestValue(
                    [
                        3,
                        4
                    ]
                );
            return {
                type: "supers",
                icon: "⭐",
                name: "SUPERS",
                description:
                    "Utilise ton Super " +
                    target +
                    " fois",
                target
            };
        }
    ];
    const brawlerGroup = [
        () => {
            const target =
                getRandomQuestValue(
                    [
                        3,
                        4
                    ]
                );
            return {
                type: "brawlerBattles",
                brawler:
                    chosenBrawler,
                icon: "🎯",
                name:
                    chosenBrawler.toUpperCase(),
                description:
                    "Joue " +
                    target +
                    " duels avec " +
                    chosenBrawler,
                target
            };
        },
        () => {
            const target =
                getRandomQuestValue(
                    [
                        2,
                        3
                    ]
                );
            return {
                type: "brawlerWins",
                brawler:
                    chosenBrawler,
                icon: "🏆",
                name:
                    chosenBrawler.toUpperCase(),
                description:
                    "Gagne " +
                    target +
                    " duels avec " +
                    chosenBrawler,
                target
            };
        },
        () => {
            const target =
                getRandomQuestValue(
                    [
                        250,
                        350
                    ]
                );
            return {
                type: "brawlerDamage",
                brawler:
                    chosenBrawler,
                icon: "🔥",
                name:
                    chosenBrawler.toUpperCase(),
                description:
                    "Inflige " +
                    target +
                    " dégâts avec " +
                    chosenBrawler,
                target
            };
        }
    ];
    const selected =
        [
            getRandomQuestValue(
                generalGroup
            )(),
            getRandomQuestValue(
                combatGroup
            )(),
            getRandomQuestValue(
                brawlerGroup
            )()
        ];
    return selected.map(
        (
            quest,
            index
        ) =>
            makeDailyQuest(
                quest,
                index,
                today
            )
    );
}
function ensureDailyQuests() {
    const today =
        getQuestDateKey();
    const hasValidDailyQuests =
        state.quests &&
        state.quests.date ===
            today &&
        Array.isArray(
            state.quests.definitions
        ) &&
        state.quests.definitions.length ===
            3;
    if (
        !hasValidDailyQuests
    ) {
        state.quests = {
            date:
                today,
            definitions:
                generateDailyQuestDefinitions(),
            progress: {},
            claimed: {},
            finalRewardClaimed:
                false
        };
        saveGame();
    }
    QUEST_DEFINITIONS =
        state.quests.definitions.map(
            quest => ({
                ...quest,
                rewards: {
                    starTokens: 1
                }
            })
        );
    QUEST_DEFINITIONS.forEach(
        quest => {
            if (
                !Number.isFinite(
                    Number(
                        state.quests.progress[
                            quest.id
                        ]
                    )
                )
            ) {
                state.quests.progress[
                    quest.id
                ] = 0;
            }
            if (
                typeof state.quests.claimed[
                    quest.id
                ] !== "boolean"
            ) {
                state.quests.claimed[
                    quest.id
                ] = false;
            }
        }
    );
    return QUEST_DEFINITIONS;
}
function createDefaultChampionSkins() {
    return Object.fromEntries(
        Object.keys(CHAMPION_SKIN_IMAGES).map(name => [
            name,
            {
                owned: false,
                equipped: false
            }
        ])
    );
}
function normalizeChampionSkins(value) {
    const source = value && typeof value === "object"
        ? value
        : {};
    const normalized = createDefaultChampionSkins();
    Object.keys(normalized).forEach(name => {
        const entry = source[name] && typeof source[name] === "object"
            ? source[name]
            : {};
        normalized[name] = {
            owned: entry.owned === true,
            equipped: entry.owned === true && entry.equipped === true
        };
    });
    return normalized;
}
function ensureChampionSkinState(name) {
    if (!state.championSkins || typeof state.championSkins !== "object") {
        state.championSkins = createDefaultChampionSkins();
    }
    if (!state.championSkins[name]) {
        state.championSkins[name] = {
            owned: false,
            equipped: false
        };
    }
    return state.championSkins[name];
}
function getDefaultSkinImage(name) {
    if (name === "Shelly") return SHELLY_DEFAULT_IMAGE;
    if (name === "Colt") return COLT_DEFAULT_IMAGE;
    return DEFAULT_BRAWLER_IMAGES[name] || brawlers[name]?.image || "";
}
function applyCurrentSkinForBrawler(name) {
    if (!brawlers[name]) return;
    const champion = state?.championSkins?.[name];
    if (champion?.owned && champion?.equipped && CHAMPION_SKIN_IMAGES[name]) {
        brawlers[name].image = CHAMPION_SKIN_IMAGES[name];
        return;
    }
    if (name === "Shelly") {
        brawlers.Shelly.image = state?.seasonOne?.skinOwned && state?.seasonOne?.skinEquipped
            ? SHELLY_STAR_IMAGE
            : SHELLY_DEFAULT_IMAGE;
        return;
    }
    if (name === "Colt") {
        brawlers.Colt.image = state?.seasonOne?.coltSkinOwned && state?.seasonOne?.coltSkinEquipped
            ? COLT_CHALLENGER_IMAGE
            : COLT_DEFAULT_IMAGE;
        return;
    }
    brawlers[name].image = getDefaultSkinImage(name);
}
function applyChampionSkinsFromState() {
    Object.keys(CHAMPION_SKIN_IMAGES).forEach(name => {
        applyCurrentSkinForBrawler(name);
    });
}
function createDefaultSave() {
    const brawlerPowers = {};
    const brawlerTrophies = {};
    Object.keys(brawlers).forEach(
        name => {
            brawlerPowers[name] =
                brawlers[name].power;
            brawlerTrophies[name] =
                0;
        }
    );
    return {
        version:
            CURRENT_SAVE_VERSION,
        profile: {
            name: "",
            icon: DEFAULT_PROFILE_ICON
        },
        profileIconsUnlocked: [
            ...DEFAULT_UNLOCKED_PROFILE_ICONS
        ],
        trophyRoadClaimed: [],
        brawlerTrophyRoadClaimed:
            Object.fromEntries(
                Object.keys(brawlers).map(name => [name, []])
            ),
        championSkins:
            createDefaultChampionSkins(),
        selectedBrawler:
            "Shelly",
        detailBrawler:
            "Shelly",
        resources: {
            trophies: 0,
            coins: 0,
            gems: 0,
            power: 0,
            tokens: 0,
            starTokens: 0
        },
        ownedBrawlers: [
            "Shelly"
        ],
        brawlerPowers:
            brawlerPowers,
        brawlerTrophies:
            brawlerTrophies,
        brawlerAbilityLoadouts:
            createDefaultAbilityLoadouts(),
        brawlerAbilitiesOwned:
            createDefaultAbilityOwnership(),
        brawlerStarPowersOwned:
            createDefaultStarPowerOwnership(),
        friends: [],
        friendRequests: {
            incoming: [],
            outgoing: []
        },
        quests:
            createDefaultQuestState()
    };
}
function migrateSave(save) {
    if (
        !save ||
        typeof save !== "object"
    ) {
        return createDefaultSave();
    }
    if (
        typeof save.version !== "number"
    ) {
        save.version = 1;
    }
    if (
        save.version < 2
    ) {
        if (
            !save.profile
        ) {
            save.profile = {
                name:
                    localStorage.getItem(
                        "brawlvs_username"
                    ) || "",
                icon:
                    DEFAULT_PROFILE_ICON
            };
        }
        if (
            !save.selectedBrawler
        ) {
            save.selectedBrawler =
                "Shelly";
        }
        if (
            !save.detailBrawler
        ) {
            save.detailBrawler =
                "Shelly";
        }
        if (
            !save.resources
        ) {
            save.resources = {
                trophies: 0,
                coins: 0,
                gems: 0,
                power: 0,
                tokens: 0,
                starTokens: 0
            };
        }
        if (
            !Array.isArray(
                save.ownedBrawlers
            )
        ) {
            save.ownedBrawlers = [
                "Shelly"
            ];
        }
        if (
            !save.brawlerPowers
        ) {
            save.brawlerPowers = {};
        }
        Object.keys(
            brawlers
        ).forEach(
            name => {
                if (
                    typeof
                    save.brawlerPowers[name]
                    !== "number"
                ) {
                    save.brawlerPowers[name] =
                        brawlers[name].power;
                }
            }
        );
        save.version =
            2;
    }
    if (
        !save.profile
    ) {
        save.profile = {
            name: "",
            icon: DEFAULT_PROFILE_ICON
        };
    }
    if (
        !Array.isArray(
            save.profileIconsUnlocked
        )
    ) {
        save.profileIconsUnlocked = [
            ...DEFAULT_UNLOCKED_PROFILE_ICONS
        ];
    }
    else {
        save.profileIconsUnlocked =
            save.profileIconsUnlocked.filter(
                icon =>
                    getAllowedProfileIconPaths().includes(
                        icon
                    )
            );
        DEFAULT_UNLOCKED_PROFILE_ICONS.forEach(
            icon => {
                if (
                    !save.profileIconsUnlocked.includes(
                        icon
                    )
                ) {
                    save.profileIconsUnlocked.push(
                        icon
                    );
                }
            }
        );
    }
    save.profile.icon =
        normalizeProfileIcon(
            save.profile.icon
        );
    if (
        !Array.isArray(
            save.trophyRoadClaimed
        )
    ) {
        save.trophyRoadClaimed = [];
    }
    else {
        save.trophyRoadClaimed =
            save.trophyRoadClaimed
            .map(
                value =>
                    Number(value)
            )
            .filter(
                value =>
                    Number.isFinite(value) &&
                    value > 0
            );
    }
    if (
        !save.brawlerTrophyRoadClaimed ||
        typeof save.brawlerTrophyRoadClaimed !== "object"
    ) {
        save.brawlerTrophyRoadClaimed = {};
    }
    Object.keys(brawlers).forEach(name => {
        const claimed = Array.isArray(save.brawlerTrophyRoadClaimed[name])
            ? save.brawlerTrophyRoadClaimed[name]
            : [];
        save.brawlerTrophyRoadClaimed[name] = [
            ...new Set(
                claimed
                    .map(value => Number(value))
                    .filter(value => [250, 500, 750, 1000].includes(value))
            )
        ];
    });
    save.championSkins =
        normalizeChampionSkins(
            save.championSkins
        );
    if (
        !save.resources
    ) {
        save.resources = {
            trophies: 0,
            coins: 0,
            gems: 0,
            power: 0,
            tokens: 0,
            starTokens: 0
        };
    }
    if (
        !Array.isArray(
            save.ownedBrawlers
        )
    ) {
        save.ownedBrawlers = [
            "Shelly"
        ];
    }
    if (
        !save.brawlerPowers
    ) {
        save.brawlerPowers = {};
    }
    if (
        typeof save.resources.tokens !== "number"
    ) {
        save.resources.tokens = 0;
    }
    if (
        typeof save.resources.starTokens !== "number"
    ) {
        save.resources.starTokens = 0;
    }
    if (
        !save.brawlerTrophies ||
        typeof save.brawlerTrophies !== "object"
    ) {
        const legacyTrophies =
            Math.max(
                0,
                Number(
                    save.resources.trophies
                ) || 0
            );
        save.brawlerTrophies =
            {};
        Object.keys(
            brawlers
        ).forEach(
            name => {
                save.brawlerTrophies[name] =
                    0;
            }
        );
        if (
            legacyTrophies > 0 &&
            brawlers[
                save.selectedBrawler
            ]
        ) {
            save.brawlerTrophies[
                save.selectedBrawler
            ] =
                legacyTrophies;
        }
    }
    Object.keys(
        brawlers
    ).forEach(
        name => {
            if (
                typeof
                save.brawlerTrophies[name]
                !== "number"
            ) {
                save.brawlerTrophies[name] =
                    0;
            }
            save.brawlerTrophies[name] =
                Math.max(
                    0,
                    Math.floor(
                        save.brawlerTrophies[name]
                    )
                );
        }
    );
    save.resources.trophies =
        Object.values(
            save.brawlerTrophies
        )
        .reduce(
            (
                total,
                trophies
            ) =>
                total +
                trophies,
            0
        );
    if (
        !Array.isArray(
            save.friends
        )
    ) {
        save.friends = [];
    }
    if (
        !save.friendRequests ||
        typeof save.friendRequests !== "object"
    ) {
        save.friendRequests = {
            incoming: [],
            outgoing: []
        };
    }
    if (
        !Array.isArray(
            save.friendRequests.incoming
        )
    ) {
        save.friendRequests.incoming = [];
    }
    if (
        !Array.isArray(
            save.friendRequests.outgoing
        )
    ) {
        save.friendRequests.outgoing = [];
    }
    Object.keys(
        brawlers
    ).forEach(
        name => {
            if (
                typeof
                save.brawlerPowers[name]
                !== "number"
            ) {
                save.brawlerPowers[name] =
                    brawlers[name].power;
            }
        }
    );
    if (
        !save.selectedBrawler ||
        !brawlers[
            save.selectedBrawler
        ] ||
        !save.ownedBrawlers.includes(
            save.selectedBrawler
        )
    ) {
        save.selectedBrawler =
            "Shelly";
    }
    if (
        !save.detailBrawler ||
        !brawlers[
            save.detailBrawler
        ] ||
        !save.ownedBrawlers.includes(
            save.detailBrawler
        )
    ) {
        save.detailBrawler =
            save.selectedBrawler;
    }
    save.quests =
        normalizeQuestState(
            save.quests
        );
    save.brawlerAbilityLoadouts =
        normalizeAbilityLoadouts(
            save.brawlerAbilityLoadouts
        );
    save.brawlerAbilitiesOwned =
        normalizeAbilityOwnership(
            save.brawlerAbilitiesOwned,
            save.brawlerAbilityLoadouts
        );
    /*
       VERSION 16 : remise à zéro UNIQUE des Pouvoirs Star.
       La version 15 pouvait déjà avoir sauvegardé de faux états
       "POSSÉDÉ". Pour cette correction, le passage à la V16 efface
       ces anciens états une seule fois. Après cette migration, un
       Pouvoir Star ne peut être ajouté que par un vrai drop de box
       ou par un achat dans la boutique.
    */
    if (
        save.version < 16
    ) {
        save.brawlerStarPowersOwned =
            createDefaultStarPowerOwnership();
    }
    save.brawlerStarPowersOwned =
        normalizeStarPowerOwnership(
            save.brawlerStarPowersOwned
        );
    save.version =
        CURRENT_SAVE_VERSION;
    return save;
}
function loadSave() {
    let savedData = null;
    try {
        savedData =
            localStorage.getItem(
                SAVE_KEY
            );
    }
    catch(error) {
        savedData = null;
    }
    let save;
    if (
        savedData
    ) {
        try {
            save =
                JSON.parse(
                    savedData
                );
        }
        catch(error) {
            save =
                createDefaultSave();
        }
    }
    else {
        save =
            createDefaultSave();
    }
    // Conserve les achats et les icônes de la Saison 1 entre les mises à jour.
    if (save && typeof save === "object") {
        // Conserve la sélection et la possession de l'ancienne icône Ohlala.
        if (save.profile?.icon === LEGACY_SEASON_ONE_GLOBAL_ICON) {
            save.profile.icon = SEASON_ONE_GLOBAL_ICON;
        }
        if (Array.isArray(save.profileIconsUnlocked)) {
            save.profileIconsUnlocked = save.profileIconsUnlocked.map(
                icon => icon === LEGACY_SEASON_ONE_GLOBAL_ICON ? SEASON_ONE_GLOBAL_ICON : icon
            );
        }
        if (save.profile?.icon === LEGACY_SEASON_ONE_ICON) save.profile.icon = SEASON_ONE_ICON;
        if (Array.isArray(save.profileIconsUnlocked)) {
            save.profileIconsUnlocked = save.profileIconsUnlocked.map(
                icon => icon === LEGACY_SEASON_ONE_ICON ? SEASON_ONE_ICON : icon
            );
        }
        const seasonSave = save.seasonOne || {};
        const unlockedSeasonIcons = [
            ...(save.profileIconsUnlocked || [])
        ];
        // "iconOwned" était l'ancien champ de l'icône Shelly Star.
        if (seasonSave.iconOwned === true || seasonSave.shellyIconOwned === true) {
            unlockedSeasonIcons.push(SEASON_ONE_ICON);
        }
        if (seasonSave.globalIconOwned === true) {
            unlockedSeasonIcons.push(SEASON_ONE_GLOBAL_ICON);
        }
        if (seasonSave.coltIconOwned === true) {
            unlockedSeasonIcons.push(COLT_CHALLENGER_ICON);
        }
        save.profileIconsUnlocked = [...new Set(unlockedSeasonIcons)];
    }
    save =
        migrateSave(save);
    Object.keys(
        brawlers
    ).forEach(
        name => {
            if (
                typeof
                save.brawlerPowers[name]
                === "number"
            ) {
                brawlers[name].power =
                    Math.min(
                        10,
                        Math.max(
                            1,
                            save.brawlerPowers[name]
                        )
                    );
                save.brawlerPowers[name] =
                    brawlers[name].power;
            }
        }
    );
    saveGame(
        save
    );
    return save;
}
function saveGame(
    save = state
) {
    const data = {
        dailyGift: normalizeDailyGift(save.dailyGift),
        seasonOne: normalizeSeasonOne(save.seasonOne),
        championSkins: normalizeChampionSkins(save.championSkins),
        version:
            CURRENT_SAVE_VERSION,
        profile: {
            name:
                save.profile.name,
            icon:
                save.profile.icon
        },
        profileIconsUnlocked:
            Array.isArray(
                save.profileIconsUnlocked
            )
            ?
            [
                ...save.profileIconsUnlocked
            ]
            :
            [
                ...DEFAULT_UNLOCKED_PROFILE_ICONS
            ],
        trophyRoadClaimed:
            Array.isArray(
                save.trophyRoadClaimed
            )
            ?
            [
                ...save.trophyRoadClaimed
            ]
            :
            [],
        brawlerTrophyRoadClaimed:
            Object.fromEntries(
                Object.keys(brawlers).map(name => [
                    name,
                    Array.isArray(save.brawlerTrophyRoadClaimed?.[name])
                        ? [...save.brawlerTrophyRoadClaimed[name]]
                        : []
                ])
            ),
        selectedBrawler:
            save.selectedBrawler,
        detailBrawler:
            save.detailBrawler,
        resources: {
            trophies:
                save.resources.trophies,
            coins:
                save.resources.coins,
            gems:
                save.resources.gems,
            power:
                save.resources.power,
            tokens:
                save.resources.tokens,
            starTokens:
                save.resources.starTokens || 0
        },
        ownedBrawlers:
            [
                ...save.ownedBrawlers
            ],
        friends:
            Array.isArray(save.friends)
            ?
            save.friends.map(
                friend => ({
                    ...friend
                })
            )
            :
            [],
        friendRequests: {
            incoming:
                save.friendRequests &&
                Array.isArray(
                    save.friendRequests.incoming
                )
                ?
                save.friendRequests.incoming.map(
                    request => ({
                        ...request
                    })
                )
                :
                [],
            outgoing:
                save.friendRequests &&
                Array.isArray(
                    save.friendRequests.outgoing
                )
                ?
                save.friendRequests.outgoing.map(
                    request => ({
                        ...request
                    })
                )
                :
                []
        },
        quests:
            normalizeQuestState(
                save.quests
            ),
        brawlerAbilityLoadouts:
            normalizeAbilityLoadouts(
                save.brawlerAbilityLoadouts
            ),
        brawlerAbilitiesOwned:
            normalizeAbilityOwnership(
                save.brawlerAbilitiesOwned,
                save.brawlerAbilityLoadouts
            ),
        brawlerStarPowersOwned:
            normalizeStarPowerOwnership(
                save.brawlerStarPowersOwned
            ),
        brawlerPowers: {},
        brawlerTrophies: {}
    };
    Object.keys(
        brawlers
    ).forEach(
        name => {
            data.brawlerPowers[name] =
                brawlers[name].power;
            data.brawlerTrophies[name] =
                Math.max(
                    0,
                    Math.floor(
                        (
                            save.brawlerTrophies &&
                            save.brawlerTrophies[name]
                        )
                        || 0
                    )
                );
        }
    );
    data.resources.trophies =
        Object.values(
            data.brawlerTrophies
        )
        .reduce(
            (
                total,
                trophies
            ) =>
                total +
                trophies,
            0
        );
    try {
        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(data)
        );
    }
    catch(error) {
        console.error(
            "Impossible de sauvegarder BRAWL VS.",
            error
        );
    }
}
function normalizeSeasonOne(value) {
    const s = value && typeof value === "object" ? value : {};
    const shellyIconOwned =
        s.shellyIconOwned === true ||
        s.iconOwned === true;
    return {
        megaBought: Math.min(3, Math.max(0, Math.floor(Number(s.megaBought) || 0))),
        shellyWins: Math.max(0, Math.floor(Number(s.shellyWins) || 0)),
        coltWins: Math.max(0, Math.floor(Number(s.coltWins) || 0)),
        shellyMatches: Math.max(0, Math.floor(Number(s.shellyMatches ?? s.shellyWins) || 0)),
        coltMatches: Math.max(0, Math.floor(Number(s.coltMatches ?? s.coltWins) || 0)),
        gemsBought: Math.min(3, Math.max(0, Math.floor(Number(s.gemsBought ?? s.tokensBought) || 0))),
        coinsBought: s.coinsBought === true,
        globalIconOwned: s.globalIconOwned === true,
        // Champs Shelly historiques conservés pour compatibilité.
        iconOwned: shellyIconOwned,
        shellyIconOwned,
        skinOwned: s.skinOwned === true,
        skinEquipped: s.skinOwned === true && s.skinEquipped === true,
        coltIconOwned: s.coltIconOwned === true,
        coltSkinOwned: s.coltSkinOwned === true,
        coltSkinEquipped:
            s.coltSkinOwned === true &&
            s.coltSkinEquipped === true
    };
}
const loadedSave =
    loadSave();
/* =====================================================
   STATE
===================================================== */
const state = {
    dailyGift: normalizeDailyGift(loadedSave.dailyGift),
    seasonOne: normalizeSeasonOne(loadedSave.seasonOne),
    championSkins: normalizeChampionSkins(loadedSave.championSkins),
    profile: {
        name:
            loadedSave.profile.name,
        icon:
            normalizeProfileIcon(
                loadedSave.profile.icon
            )
    },
    profileIconsUnlocked:
        Array.isArray(
            loadedSave.profileIconsUnlocked
        )
        ?
        [
            ...loadedSave.profileIconsUnlocked
        ]
        :
        [
            ...DEFAULT_UNLOCKED_PROFILE_ICONS
        ],
    trophyRoadClaimed:
        Array.isArray(
            loadedSave.trophyRoadClaimed
        )
        ?
        [
            ...loadedSave.trophyRoadClaimed
        ]
        :
        [],
    brawlerTrophyRoadClaimed:
        Object.fromEntries(
            Object.keys(brawlers).map(name => [
                name,
                Array.isArray(loadedSave.brawlerTrophyRoadClaimed?.[name])
                    ? [...loadedSave.brawlerTrophyRoadClaimed[name]]
                    : []
            ])
        ),
    selectedBrawler:
        loadedSave.selectedBrawler,
    detailBrawler:
        loadedSave.detailBrawler,
    resources: {
        trophies:
            loadedSave.resources.trophies,
        coins:
            loadedSave.resources.coins,
        gems:
            loadedSave.resources.gems,
        power:
            loadedSave.resources.power,
        tokens:
            loadedSave.resources.tokens || 0,
        starTokens:
            loadedSave.resources.starTokens || 0
    },
    ownedBrawlers: [
        ...loadedSave.ownedBrawlers
    ],
    brawlerTrophies:
        Object.fromEntries(
            Object.keys(
                brawlers
            )
            .map(
                name => [
                    name,
                    Math.max(
                        0,
                        Math.floor(
                            (
                                loadedSave.brawlerTrophies &&
                                loadedSave.brawlerTrophies[name]
                            )
                            || 0
                        )
                    )
                ]
            )
        ),
    friends:
        Array.isArray(
            loadedSave.friends
        )
        ?
        loadedSave.friends.map(
            friend => ({
                ...friend
            })
        )
        :
        [],
    friendRequests: {
        incoming:
            loadedSave.friendRequests &&
            Array.isArray(
                loadedSave.friendRequests.incoming
            )
            ?
            loadedSave.friendRequests.incoming.map(
                request => ({
                    ...request
                })
            )
            :
            [],
        outgoing:
            loadedSave.friendRequests &&
            Array.isArray(
                loadedSave.friendRequests.outgoing
            )
            ?
            loadedSave.friendRequests.outgoing.map(
                request => ({
                    ...request
                })
            )
            :
            []
    },
    quests:
        normalizeQuestState(
            loadedSave.quests
        ),
    brawlerAbilityLoadouts:
        normalizeAbilityLoadouts(
            loadedSave.brawlerAbilityLoadouts
        ),
    brawlerAbilitiesOwned:
        normalizeAbilityOwnership(
            loadedSave.brawlerAbilitiesOwned,
            loadedSave.brawlerAbilityLoadouts
        ),
    brawlerStarPowersOwned:
        normalizeStarPowerOwnership(
            loadedSave.brawlerStarPowersOwned
        )
};
function getBrawlerNameFromProfileIcon(
    icon
) {
    const match =
        Object.entries(
            brawlers
        )
        .find(
            (
                [
                    name,
                    brawler
                ]
            ) =>
                brawler.icon ===
                icon
        );
    return match
    ?
    match[0]
    :
    null;
}
function isProfileIconUnlocked(
    icon
) {
    /*
       Les PDP représentant directement un Brawler
       se débloquent uniquement à 250 trophées sur CE Brawler.
       Cette règle passe avant l'ancienne liste sauvegardée afin
       qu'une vieille sauvegarde ne les débloque pas trop tôt.
    */
    const brawlerName =
        getBrawlerNameFromProfileIcon(
            icon
        );
    if (brawlerName) {
        /*
           L'icône du Brawler n'est utilisable qu'après avoir
           réellement récupéré la récompense du palier 250
           sur sa Route des trophées personnelle.
        */
        return (
            isBrawlerUnlocked(brawlerName) &&
            isBrawlerTrophyRoadRewardClaimed(
                brawlerName,
                250
            )
        );
    }
    /*
       Les autres icônes spéciales / achetées / saisonnières
       continuent d'utiliser la liste sauvegardée.
    */
    if (
        Array.isArray(
            state.profileIconsUnlocked
        ) &&
        state.profileIconsUnlocked.includes(
            icon
        )
    ) {
        return true;
    }
    return false;
}
/*
   Si une ancienne sauvegarde utilisait une icône qui
   n'est pas encore débloquée dans ce nouveau système,
   on revient proprement sur l'icône par défaut.
*/
if (
    !isProfileIconUnlocked(
        state.profile.icon
    )
) {
    state.profile.icon =
        DEFAULT_PROFILE_ICON;
}
/* =====================================================
   TROPHÉES PAR BRAWLER
===================================================== */
function getBrawlerTrophies(
    name
) {
    return Math.max(
        0,
        Math.floor(
            (
                state.brawlerTrophies &&
                state.brawlerTrophies[name]
            )
            || 0
        )
    );
}
function getBrawlerTrophyGaugeData(name) {
    const actual = getBrawlerTrophies(name);
    const capped = Math.min(1000, actual);
    if (capped >= 1000) {
        return {
            actual,
            start: 750,
            end: 1000,
            progress: 100
        };
    }
    /*
       La barre repart exactement au début à chaque palier :
       0, 250, 500 et 750 = 0 % du nouveau segment.
       Entre deux paliers, elle représente la progression vers
       le prochain palier. À 1000, elle reste définitivement pleine.
    */
    const segmentIndex = Math.floor(capped / 250);
    const start = segmentIndex * 250;
    const end = start + 250;
    const progress = Math.max(
        0,
        Math.min(
            100,
            ((capped - start) / 250) * 100
        )
    );
    return {
        actual,
        start,
        end,
        progress
    };
}
function getTotalTrophies() {
    return Object.keys(
        brawlers
    )
    .reduce(
        (
            total,
            name
        ) =>
            total +
            getBrawlerTrophies(
                name
            ),
        0
    );
}
function syncTotalTrophies() {
    state.resources.trophies =
        getTotalTrophies();
    return state.resources.trophies;
}
/* =====================================================
   ROUTE DES TROPHÉES PAR BRAWLER · 0 → 1000
===================================================== */
const BRAWLER_TROPHY_ROAD_REWARDS = [
    {
        trophies: 250,
        label: "ICÔNE DE PROFIL",
        description: "L'icône de profil du Brawler se débloque.",
        type: "profile",
        amount: 1
    },
    {
        trophies: 500,
        label: "500 PIÈCES",
        description: "Une réserve de pièces pour tes améliorations.",
        type: "coins",
        amount: 500,
        icon: "Icon/coin.png"
    },
    {
        trophies: 750,
        label: "250 POINTS DE POUVOIR",
        description: "Des points de pouvoir pour améliorer tes Brawlers.",
        type: "power",
        amount: 250,
        icon: "Icon/power.png"
    },
    {
        trophies: 1000,
        label: "SKIN CHAMPION",
        description: "Le skin Champion du Brawler rejoint ta collection.",
        type: "championSkin",
        amount: 1,
        icon: "Icon/trophy.png"
    }
];
function getBrawlerTrophyRoadClaims(name) {
    if (!state.brawlerTrophyRoadClaimed || typeof state.brawlerTrophyRoadClaimed !== "object") {
        state.brawlerTrophyRoadClaimed = {};
    }
    if (!Array.isArray(state.brawlerTrophyRoadClaimed[name])) {
        state.brawlerTrophyRoadClaimed[name] = [];
    }
    return state.brawlerTrophyRoadClaimed[name];
}
function isBrawlerTrophyRoadRewardClaimed(name, trophies) {
    return getBrawlerTrophyRoadClaims(name).includes(Number(trophies));
}
function hasClaimableBrawlerTrophyRoadReward(name) {
    const current = getBrawlerTrophies(name);
    return BRAWLER_TROPHY_ROAD_REWARDS.some(step =>
        current >= step.trophies &&
        !isBrawlerTrophyRoadRewardClaimed(name, step.trophies)
    );
}
function updateBrawlerTrophyRoadEntryState() {
    const entry = document.getElementById("brawlerTrophyRoadEntry");
    const name = state.detailBrawler;
    if (!entry || !name || !brawlers[name]) return;
    entry.classList.toggle(
        "has-reward",
        hasClaimableBrawlerTrophyRoadReward(name)
    );
}
function renderBrawlerTrophyRoad() {
    const name = state.detailBrawler;
    const brawler = brawlers[name];
    const hero = document.getElementById("brawlerTrophyRoadHero");
    const list = document.getElementById("brawlerTrophyRoadList");
    const progress = document.getElementById("brawlerTrophyRoadProgressFill");
    const title = document.getElementById("brawlerTrophyRoadTitle");
    if (!name || !brawler || !hero || !list) return;
    const current = getBrawlerTrophies(name);
    const progressPercent = Math.max(0, Math.min(100, (current / 1000) * 100));
    if (title) title.textContent = "ROUTE DE " + name.toUpperCase();
    hero.innerHTML = `
        <div class="brawler-trophy-road-portrait">
            <img src="${brawler.icon}" alt="${name}">
        </div>
        <div>
            <div class="brawler-trophy-road-name">${name}</div>
            <div class="brawler-trophy-road-sub">ROUTE PERSONNELLE · OBJECTIF 1000</div>
        </div>
        <div class="brawler-trophy-road-current">
            <img src="Icon/trophy.png" alt="">
            <strong>${current}</strong>
        </div>
    `;
    if (progress) progress.style.width = progressPercent + "%";
    /* La barre horizontale représente exactement 0 → 1000 trophées. */
    const routeFill = Math.max(0, Math.min(100, (current / 1000) * 100));
    const nextReward = BRAWLER_TROPHY_ROAD_REWARDS.find(step => current < step.trophies)?.trophies || null;
    /* 1000 en haut et 250 en bas : la progression monte visuellement. */
    const roadSteps = [...BRAWLER_TROPHY_ROAD_REWARDS]
        .sort((a, b) => b.trophies - a.trophies);
    list.innerHTML = `
        <div class="brawler-trophy-road-line-fill"></div>
    ` + roadSteps.map(step => {
        const reached = current >= step.trophies;
        const claimed = isBrawlerTrophyRoadRewardClaimed(name, step.trophies);
        const isNext = nextReward === step.trophies;
        const icon = step.type === "profile"
            ? brawler.icon
            : step.type === "championSkin"
            ? (CHAMPION_SKIN_IMAGES[name] || step.icon)
            : step.icon;
        const iconClass = step.type === "profile" ? " brawler-icon" : "";
        const rewardLabel = step.type === "championSkin"
            ? "SKIN " + getChampionSkinGenderLabel(name).toUpperCase()
            : step.label;
        const rewardDescription = step.type === "championSkin"
            ? "Le skin " + getChampionSkinGenderLabel(name) + " du Brawler rejoint ta collection."
            : step.description;
        let action = `<div class="brawler-trophy-road-status">${Math.max(0, step.trophies - current)} TROPHÉES RESTANTS</div>`;
        if (claimed) {
            action = `<div class="brawler-trophy-road-status claimed">✓ RÉCUPÉRÉE</div>`;
        } else if (reached) {
            action = `
                <button
                    type="button"
                    class="brawler-trophy-road-claim"
                    onclick="claimBrawlerTrophyRoadReward(${step.trophies})"
                >RÉCUPÉRER</button>
            `;
        } else if (isNext) {
            action = `<div class="brawler-trophy-road-status next">PROCHAINE · ${step.trophies - current} RESTANTS</div>`;
        }
        return `
            <div class="brawler-trophy-road-step ${claimed ? "claimed" : (reached ? "reached" : (isNext ? "next" : ""))}">
                <div class="brawler-trophy-road-node">${step.trophies}</div>
                <div class="brawler-trophy-road-card">
                    <div class="brawler-trophy-road-reward-icon${iconClass}">
                        <img src="${icon}" alt="${rewardLabel}">
                    </div>
                    <div>
                        <div class="brawler-trophy-road-step-title">PALIER ${step.trophies}</div>
                        <div class="brawler-trophy-road-step-reward">${rewardLabel}</div>
                        <div class="brawler-trophy-road-step-meta">${rewardDescription}</div>
                        ${action}
                    </div>
                </div>
            </div>
        `;
    }).join("");
    updateBrawlerTrophyRoadEntryState();
    /*
       Aligne la progression verticale sur les vrais nœuds de la route.
       Ainsi 250, 500, 750 et 1000 tombent exactement au centre de leur palier,
       et les valeurs intermédiaires sont interpolées proprement.
    */
    requestAnimationFrame(() => {
        updateBrawlerTrophyRoadLine(current);
    });
}
function updateBrawlerTrophyRoadLine(currentTrophies) {
    const list = document.getElementById("brawlerTrophyRoadList");
    const fill = list?.querySelector(".brawler-trophy-road-line-fill");
    if (!list || !fill) return;
    const current = Math.max(0, Math.min(1000, Number(currentTrophies) || 0));
    const nodes = [...list.querySelectorAll(".brawler-trophy-road-node")];
    const nodeY = new Map();
    nodes.forEach(node => {
        const step = node.closest(".brawler-trophy-road-step");
        const value = Number(node.textContent);
        if (!step || !Number.isFinite(value)) return;
        nodeY.set(
            value,
            step.offsetTop + node.offsetTop + (node.offsetHeight / 2)
        );
    });
    const bottomY = Math.max(0, list.scrollHeight - 30);
    const anchors = [
        { value: 0, y: bottomY },
        { value: 250, y: nodeY.get(250) },
        { value: 500, y: nodeY.get(500) },
        { value: 750, y: nodeY.get(750) },
        { value: 1000, y: nodeY.get(1000) }
    ].filter(anchor => Number.isFinite(anchor.y));
    if (anchors.length < 2) return;
    let targetY = bottomY;
    if (current >= 1000) {
        targetY = anchors[anchors.length - 1].y;
    } else {
        for (let index = 0; index < anchors.length - 1; index++) {
            const low = anchors[index];
            const high = anchors[index + 1];
            if (current >= low.value && current <= high.value) {
                const range = Math.max(1, high.value - low.value);
                const ratio = (current - low.value) / range;
                targetY = low.y + ((high.y - low.y) * ratio);
                break;
            }
        }
    }
    const bottomOffset = Math.max(0, list.scrollHeight - bottomY);
    const exactHeight = Math.max(0, bottomY - targetY);
    fill.style.setProperty("--road-line-bottom", bottomOffset + "px");
    fill.style.setProperty("--road-line-height", exactHeight + "px");
    fill.dataset.trophies = String(current);
}
function showBrawlerTrophyRoad() {
    const name = state.detailBrawler;
    if (!name || !brawlers[name] || !isBrawlerUnlocked(name)) return;
    const overlay = document.getElementById("brawlerTrophyRoadOverlay");
    if (!overlay) return;
    /* Toujours replacer la route en dernier dans le téléphone et la forcer au premier plan. */
    const phone = document.querySelector(".phone");
    if (phone) {
        phone.appendChild(overlay);
    }
    renderBrawlerTrophyRoad();
    overlay.style.zIndex = "7000";
    overlay.style.display = "flex";
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    /* La route commence en bas : on ouvre près de la progression actuelle. */
    requestAnimationFrame(() => {
        const list = document.getElementById("brawlerTrophyRoadList");
        if (!list) return;
        const current = getBrawlerTrophies(name);
        const targetValue = current >= 1000
            ? 1000
            : Math.max(250, Math.ceil(Math.max(current, 1) / 250) * 250);
        const target = [...list.querySelectorAll(".brawler-trophy-road-node")]
            .find(node => Number(node.textContent) === targetValue);
        if (target) {
            target.scrollIntoView({ block: "center", behavior: "auto" });
        } else {
            list.scrollTop = list.scrollHeight;
        }
        updateBrawlerTrophyRoadLine(current);
    });
}
function closeBrawlerTrophyRoad() {
    const overlay = document.getElementById("brawlerTrophyRoadOverlay");
    if (!overlay) return;
    overlay.classList.remove("active");
    overlay.style.display = "none";
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.setAttribute("aria-hidden", "true");
}
function showProfileIconRewardAnimation(iconPath, iconName, description, sourceLabel = "NOUVELLE ICÔNE DE PROFIL") {
    if (!iconPath) return;
    ensureRewardUI();
    resetRewardPopupUI();
    const popup = document.getElementById("rewardPopup");
    const rewardIcon = document.getElementById("rewardIcon");
    const rewardName = document.getElementById("rewardName");
    const rewardDescription = document.getElementById("rewardDescription");
    const rewardRarity = document.getElementById("rewardRarity");
    const hero = document.getElementById("rewardHero");
    if (!popup || !rewardIcon || !rewardName || !rewardDescription || !rewardRarity) return;
    popup.classList.add("profile-icon-unlock-mode");
    if (hero) hero.style.display = "none";
    rewardIcon.style.display = "flex";
    rewardIcon.innerHTML = `<span class="profile-icon-art"><img src="${iconPath}" alt="${iconName || "Icône de profil"}"></span>`;
    rewardName.textContent = "ICÔNE DÉBLOQUÉE";
    rewardDescription.textContent = description || String(iconName || "Nouvelle icône de profil").toUpperCase();
    rewardRarity.textContent = sourceLabel;
    rewardRarity.className = "reward-rarity";
    /* Relance l'animation même si plusieurs icônes sont obtenues à la suite. */
    popup.classList.remove("active");
    void popup.offsetWidth;
    popup.classList.add("active");
}
function showProfileIconUnlockAnimation(brawlerName) {
    const brawler = brawlers[brawlerName];
    if (!brawler) return;
    showProfileIconRewardAnimation(
        brawler.icon,
        "Icône de profil " + brawlerName,
        `${brawlerName.toUpperCase()} · 250 TROPHÉES`,
        "NOUVELLE ICÔNE DE PROFIL"
    );
}
function claimBrawlerTrophyRoadReward(target) {
    const name = state.detailBrawler;
    const brawler = brawlers[name];
    const step = BRAWLER_TROPHY_ROAD_REWARDS.find(item => item.trophies === Number(target));
    if (!name || !brawler || !step) return;
    if (getBrawlerTrophies(name) < step.trophies) return;
    if (isBrawlerTrophyRoadRewardClaimed(name, step.trophies)) return;
    getBrawlerTrophyRoadClaims(name).push(step.trophies);
    if (step.type === "coins") state.resources.coins += step.amount;
    if (step.type === "power") state.resources.power += step.amount;
    if (step.type === "gems") state.resources.gems += step.amount;
    if (step.type === "championSkin") {
        const championState = ensureChampionSkinState(name);
        championState.owned = true;
        championState.equipped = championState.equipped === true;
    }
    saveGame();
    updateResources();
    renderProfileIconChoices();
    renderBrawlerTrophyRoad();
    renderBrawlers();
    const rewardIcon = step.type === "profile"
        ? brawler.icon
        : step.type === "championSkin"
        ? (CHAMPION_SKIN_IMAGES[name] || step.icon)
        : step.icon;
    const rewardDescription = step.type === "profile"
        ? `L'icône de profil de ${name} est maintenant disponible.`
        : step.type === "championSkin"
        ? `Le skin ${getChampionSkinGenderLabel(name)} de ${name} est maintenant disponible dans son catalogue.`
        : `Palier ${step.trophies} trophées atteint avec ${name}.`;
    if (step.type === "profile") {
        showProfileIconUnlockAnimation(name);
    } else if (step.type === "championSkin") {
        showSeasonSkinUnlock(
            name,
            getChampionSkinDisplayName(name),
            CHAMPION_SKIN_IMAGES[name],
            {
                sourceLabel: 'ROUTE DE ' + name.toUpperCase(),
                description: 'Skin ' + getChampionSkinGenderLabel(name) + ' débloqué · Tu peux l’équiper maintenant.',
                equipType: 'champion'
            }
        );
    } else {
        showReward(
            rewardIcon,
            step.label,
            rewardDescription,
            "ROUTE DE " + name.toUpperCase(),
            "rare"
        );
    }
}
/* =====================================================
   FRIEND SYSTEM
===================================================== */
let activeFriendsTab =
    "friends";
function normalizeFriendName(
    name
) {
    return String(
        name || ""
    )
    .trim()
    .toLowerCase();
}
function createFriendId(
    prefix = "friend"
) {
    return (
        prefix +
        "-" +
        Date.now() +
        "-" +
        Math.floor(
            Math.random() * 100000
        )
    );
}
function getFriendInitial(
    name
) {
    const clean =
        String(
            name || "?"
        )
        .trim();
    return (
        clean.charAt(0) ||
        "?"
    )
    .toUpperCase();
}
function setFriendFeedback(
    message,
    type = ""
) {
    const feedback =
        document.getElementById(
            "friendFeedback"
        );
    if (!feedback) {
        return;
    }
    feedback.innerText =
        message || "";
    feedback.className =
        "friend-feedback" +
        (
            type
            ?
            " " + type
            :
            ""
        );
    if (message) {
        clearTimeout(
            setFriendFeedback.timer
        );
        setFriendFeedback.timer =
            setTimeout(
                () => {
                    feedback.innerText =
                        "";
                    feedback.className =
                        "friend-feedback";
                },
                3500
            );
    }
}
function switchFriendsTab(
    tab
) {
    activeFriendsTab =
        (
            tab === "requests"
            ?
            "requests"
            :
            "friends"
        );
    const friendsButton =
        document.getElementById(
            "friendsTabButton"
        );
    const requestsButton =
        document.getElementById(
            "requestsTabButton"
        );
    const friendsPanel =
        document.getElementById(
            "friendsTabPanel"
        );
    const requestsPanel =
        document.getElementById(
            "requestsTabPanel"
        );
    if (
        !friendsButton ||
        !requestsButton ||
        !friendsPanel ||
        !requestsPanel
    ) {
        return;
    }
    friendsButton.classList.toggle(
        "active",
        activeFriendsTab === "friends"
    );
    requestsButton.classList.toggle(
        "active",
        activeFriendsTab === "requests"
    );
    friendsPanel.classList.toggle(
        "active",
        activeFriendsTab === "friends"
    );
    requestsPanel.classList.toggle(
        "active",
        activeFriendsTab === "requests"
    );
}
function sendFriendRequest() {
    const input =
        document.getElementById(
            "friendSearchInput"
        );
    if (!input) {
        return;
    }
    const name =
        input.value.trim();
    const normalized =
        normalizeFriendName(
            name
        );
    if (!normalized) {
        setFriendFeedback(
            "Entre un pseudo.",
            "error"
        );
        return;
    }
    if (
        normalized ===
        normalizeFriendName(
            state.profile.name
        )
    ) {
        setFriendFeedback(
            "Tu ne peux pas t'ajouter toi-même.",
            "error"
        );
        return;
    }
    const alreadyFriend =
        state.friends.some(
            friend =>
                normalizeFriendName(
                    friend.name
                ) === normalized
        );
    if (alreadyFriend) {
        setFriendFeedback(
            name + " est déjà dans tes amis.",
            "error"
        );
        return;
    }
    const alreadyIncoming =
        state.friendRequests.incoming.some(
            request =>
                normalizeFriendName(
                    request.name
                ) === normalized
        );
    if (alreadyIncoming) {
        setFriendFeedback(
            "Tu as déjà une demande de " +
            name +
            ".",
            "error"
        );
        switchFriendsTab(
            "requests"
        );
        return;
    }
    const alreadyOutgoing =
        state.friendRequests.outgoing.some(
            request =>
                normalizeFriendName(
                    request.name
                ) === normalized
        );
    if (alreadyOutgoing) {
        setFriendFeedback(
            "Demande déjà envoyée à " +
            name +
            ".",
            "error"
        );
        return;
    }
    state.friendRequests.outgoing.push(
        {
            id:
                createFriendId(
                    "outgoing"
                ),
            name:
                name,
            createdAt:
                Date.now()
        }
    );
    input.value =
        "";
    saveGame();
    renderFriends();
    setFriendFeedback(
        "Demande envoyée à " +
        name +
        " !",
        "success"
    );
    switchFriendsTab(
        "requests"
    );
}
function cancelFriendRequest(
    requestId
) {
    state.friendRequests.outgoing =
        state.friendRequests.outgoing.filter(
            request =>
                request.id !==
                requestId
        );
    saveGame();
    renderFriends();
}
function acceptFriendRequest(
    requestId
) {
    const request =
        state.friendRequests.incoming.find(
            item =>
                item.id ===
                requestId
        );
    if (!request) {
        return;
    }
    const alreadyFriend =
        state.friends.some(
            friend =>
                normalizeFriendName(
                    friend.name
                ) ===
                normalizeFriendName(
                    request.name
                )
        );
    if (!alreadyFriend) {
        state.friends.push(
            {
                id:
                    createFriendId(
                        "friend"
                    ),
                name:
                    request.name,
                online:
                    Boolean(
                        request.online
                    ),
                createdAt:
                    Date.now()
            }
        );
    }
    state.friendRequests.incoming =
        state.friendRequests.incoming.filter(
            item =>
                item.id !==
                requestId
        );
    saveGame();
    renderFriends();
    switchFriendsTab(
        "friends"
    );
    setFriendFeedback(
        request.name +
        " est maintenant ton ami !",
        "success"
    );
}
function rejectFriendRequest(
    requestId
) {
    state.friendRequests.incoming =
        state.friendRequests.incoming.filter(
            request =>
                request.id !==
                requestId
        );
    saveGame();
    renderFriends();
}
function removeFriend(
    friendId
) {
    const friend =
        state.friends.find(
            item =>
                item.id ===
                friendId
        );
    if (!friend) {
        return;
    }
    const confirmed =
        confirm(
            "Retirer " +
            friend.name +
            " de ta liste d'amis ?"
        );
    if (!confirmed) {
        return;
    }
    state.friends =
        state.friends.filter(
            item =>
                item.id !==
                friendId
        );
    saveGame();
    renderFriends();
}
function inviteFriend(
    friendId
) {
    const friend =
        state.friends.find(
            item =>
                item.id ===
                friendId
        );
    if (!friend) {
        return;
    }
    setFriendFeedback(
        "Invitation de duel envoyée à " +
        friend.name +
        " !",
        "success"
    );
}
function addIncomingFriendRequest(
    name
) {
    /*
       Point d'entrée prévu pour une future connexion
       serveur / multijoueur.
       Exemple :
       addIncomingFriendRequest("Joueur2");
    */
    const cleanName =
        String(
            name || ""
        )
        .trim();
    if (!cleanName) {
        return false;
    }
    const normalized =
        normalizeFriendName(
            cleanName
        );
    const exists =
        state.friends.some(
            friend =>
                normalizeFriendName(
                    friend.name
                ) === normalized
        )
        ||
        state.friendRequests.incoming.some(
            request =>
                normalizeFriendName(
                    request.name
                ) === normalized
        )
        ||
        state.friendRequests.outgoing.some(
            request =>
                normalizeFriendName(
                    request.name
                ) === normalized
        );
    if (exists) {
        return false;
    }
    state.friendRequests.incoming.push(
        {
            id:
                createFriendId(
                    "incoming"
                ),
            name:
                cleanName,
            online:
                true,
            createdAt:
                Date.now()
        }
    );
    saveGame();
    renderFriends();
    return true;
}
function renderFriendEmpty(
    title,
    text,
    icon = "👥"
) {
    return `

        <div class="friend-empty">

            <div class="friend-empty-icon">
                ${icon}
            </div>

            <div class="friend-empty-title">
                ${title}
            </div>

            <div class="friend-empty-text">
                ${text}
            </div>

        </div>

    `;
}
function renderFriends() {
    const friendsList =
        document.getElementById(
            "friendsList"
        );
    const incomingList =
        document.getElementById(
            "incomingRequestsList"
        );
    const outgoingList =
        document.getElementById(
            "outgoingRequestsList"
        );
    /*
       La fonction peut être appelée même
       avant que la page soit visible.
    */
    if (
        !friendsList ||
        !incomingList ||
        !outgoingList
    ) {
        return;
    }
    const friends =
        state.friends;
    const incoming =
        state.friendRequests.incoming;
    const outgoing =
        state.friendRequests.outgoing;
    if (
        friends.length === 0
    ) {
        friendsList.innerHTML =
            renderFriendEmpty(
                "AUCUN AMI",
                "Ajoute un joueur avec son pseudo pour commencer.",
                "👤"
            );
    }
    else {
        friendsList.innerHTML =
            friends
            .map(
                friend => `

                    <div class="friend-card">

                        <div class="friend-avatar">

                            ${getFriendInitial(friend.name)}

                            <span
                                class="
                                    friend-status-dot
                                    ${friend.online ? "online" : ""}
                                "
                            ></span>

                        </div>


                        <div class="friend-main">

                            <div class="friend-name">
                                ${friend.name}
                            </div>

                            <div
                                class="
                                    friend-state
                                    ${friend.online ? "online" : ""}
                                "
                            >
                                ${
                                    friend.online
                                    ?
                                    "EN LIGNE"
                                    :
                                    "HORS LIGNE"
                                }
                            </div>

                        </div>


                        <div class="friend-actions">

                            <button
                                class="friend-action invite"
                                type="button"
                                onclick="inviteFriend('${friend.id}')"
                            >
                                INVITER
                            </button>

                            <button
                                class="friend-action remove"
                                type="button"
                                title="Retirer l'ami"
                                onclick="removeFriend('${friend.id}')"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");
    }
    if (
        incoming.length === 0
    ) {
        incomingList.innerHTML =
            renderFriendEmpty(
                "AUCUNE DEMANDE",
                "Les demandes reçues apparaîtront ici.",
                "📨"
            );
    }
    else {
        incomingList.innerHTML =
            incoming
            .map(
                request => `

                    <div class="friend-card">

                        <div class="friend-avatar">

                            ${getFriendInitial(request.name)}

                            <span class="friend-status-dot online"></span>

                        </div>


                        <div class="friend-main">

                            <div class="friend-name">
                                ${request.name}
                            </div>

                            <div class="friend-state">
                                VEUT DEVENIR TON AMI
                            </div>

                        </div>


                        <div class="friend-actions">

                            <button
                                class="friend-action accept"
                                type="button"
                                title="Accepter"
                                onclick="acceptFriendRequest('${request.id}')"
                            >
                                ✓
                            </button>

                            <button
                                class="friend-action reject"
                                type="button"
                                title="Refuser"
                                onclick="rejectFriendRequest('${request.id}')"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");
    }
    if (
        outgoing.length === 0
    ) {
        outgoingList.innerHTML =
            renderFriendEmpty(
                "AUCUNE DEMANDE EN ATTENTE",
                "Les demandes que tu envoies seront listées ici.",
                "📤"
            );
    }
    else {
        outgoingList.innerHTML =
            outgoing
            .map(
                request => `

                    <div class="friend-card">

                        <div class="friend-avatar">
                            ${getFriendInitial(request.name)}
                        </div>


                        <div class="friend-main">

                            <div class="friend-name">
                                ${request.name}
                            </div>

                            <div class="friend-state">
                                DEMANDE EN ATTENTE
                            </div>

                        </div>


                        <div class="friend-actions">

                            <button
                                class="friend-action reject"
                                type="button"
                                onclick="cancelFriendRequest('${request.id}')"
                            >
                                ANNULER
                            </button>

                        </div>

                    </div>

                `
            )
            .join("");
    }
    const friendCount =
        friends.length;
    const incomingCount =
        incoming.length;
    const outgoingCount =
        outgoing.length;
    const onlineCount =
        friends.filter(
            friend =>
                friend.online
        ).length;
    const counters = {
        friendsCount:
            friendCount,
        friendsTabCount:
            friendCount,
        requestsTabCount:
            incomingCount +
            outgoingCount,
        incomingRequestCount:
            incomingCount,
        outgoingRequestCount:
            outgoingCount
    };
    Object.entries(
        counters
    ).forEach(
        ([id, value]) => {
            const element =
                document.getElementById(
                    id
                );
            if (element) {
                element.innerText =
                    value;
            }
        }
    );
    const onlineElement =
        document.getElementById(
            "onlineFriendsCount"
        );
    if (onlineElement) {
        onlineElement.innerText =
            onlineCount +
            " EN LIGNE";
    }
    const navBadge =
        document.getElementById(
            "friendNavBadge"
        );
    if (navBadge) {
        navBadge.innerText =
            incomingCount;
        navBadge.classList.toggle(
            "visible",
            incomingCount > 0
        );
    }
    switchFriendsTab(
        activeFriendsTab
    );
}
/* =====================================================
   NAVIGATION
===================================================== */
let battleEnemyAttackTimer =
    null;
let battleLaunchTransitionTimer =
    null;
function hideAllPages() {
    document
        .querySelectorAll(".page")
        .forEach(
            page =>
                page.classList.remove(
                    "active"
                )
        );
    document
        .querySelectorAll(".nav")
        .forEach(
            nav =>
                nav.classList.remove(
                    "active"
                )
        );
    const bottomNav =
        document.querySelector(
            ".bottom-nav"
        );
    if (bottomNav) {
        bottomNav.style.display =
            "grid";
    }
    const appHeader =
        document.querySelector(
            "header"
        );
    if (appHeader) {
        appHeader.style.display =
            "none";
    }
    if (battleEnemyAttackTimer) {
        clearTimeout(
            battleEnemyAttackTimer
        );
        battleEnemyAttackTimer =
            null;
    }
    if (battleLaunchTransitionTimer) {
        clearTimeout(
            battleLaunchTransitionTimer
        );
        battleLaunchTransitionTimer =
            null;
    }
}
function getQuestDefinition(
    questId
) {
    return QUEST_DEFINITIONS.find(
        quest =>
            quest.id === questId
    ) || null;
}
function isQuestCompleted(
    questId
) {
    const quest =
        getQuestDefinition(
            questId
        );
    if (!quest) {
        return false;
    }
    return (
        (
            state.quests.progress[
                questId
            ] || 0
        ) >=
        quest.target
    );
}
function areAllQuestsCompleted() {
    return QUEST_DEFINITIONS.every(
        quest =>
            isQuestCompleted(
                quest.id
            )
    );
}
function getQuestCompletedCount() {
    return QUEST_DEFINITIONS.filter(
        quest =>
            isQuestCompleted(
                quest.id
            )
    ).length;
}
function buildQuestRewardChips(
    rewards
) {
    if (
        rewards.starTokens > 0
    ) {
        return `
            <div class="quest-reward-chip star-tokens">
                <img
                    src="Icon/Fly_token.png"
                    alt="Star Token"
                >
                <span>+${rewards.starTokens}</span>
            </div>
        `;
    }
    if (
        rewards.coins > 0
    ) {
        return `
            <div class="quest-reward-chip coins">
                <img
                    src="Icon/coin.png"
                    alt="Pièces"
                >
                <span>+${rewards.coins}</span>
            </div>
        `;
    }
    if (
        rewards.power > 0
    ) {
        return `
            <div class="quest-reward-chip power">
                <img
                    src="Icon/power.png"
                    alt="Points de pouvoir"
                >
                <span>+${rewards.power}</span>
            </div>
        `;
    }
    if (
        rewards.tokens > 0
    ) {
        return `
            <div class="quest-reward-chip tokens">
                <img
                    src="Icon/Jeton.png"
                    alt="Tokens"
                >
                <span>+${rewards.tokens}</span>
            </div>
        `;
    }
    return "";
}
function hasClaimableQuestReward() {
    const individualRewardReady =
        QUEST_DEFINITIONS.some(
            quest =>
                isQuestCompleted(
                    quest.id
                ) &&
                state.quests.claimed[
                    quest.id
                ] !== true
        );
    const finalRewardReady =
        areAllQuestsCompleted() &&
        state.quests.finalRewardClaimed !==
            true;
    return (
        individualRewardReady ||
        finalRewardReady
    );
}
function hasClaimableTrophyRoadReward() {
    const currentTrophies =
        syncTotalTrophies();
    return TROPHY_ROAD_VISUAL.some(
        step =>
            step.trophies > 0 &&
            currentTrophies >=
                step.trophies &&
            !isTrophyRoadRewardClaimed(
                step.trophies
            )
    );
}
function updateClaimNotificationDots() {
    const trophyDot =
        document.getElementById(
            "trophyRoadNotificationDot"
        );
    const questsDot =
        document.getElementById(
            "questsNotificationDot"
        );
    const trophyReady =
        hasClaimableTrophyRoadReward();
    const questReady =
        hasClaimableQuestReward();
    if (trophyDot) {
        trophyDot.classList.toggle(
            "active",
            trophyReady
        );
        trophyDot.setAttribute(
            "aria-hidden",
            trophyReady
            ?
            "false"
            :
            "true"
        );
    }
    if (questsDot) {
        questsDot.classList.toggle(
            "active",
            questReady
        );
        questsDot.setAttribute(
            "aria-hidden",
            questReady
            ?
            "false"
            :
            "true"
        );
    }
}
function renderQuests() {
    ensureDailyQuests();
    const questsList =
        document.getElementById(
            "questsList"
        );
    const bonusStatus =
        document.getElementById(
            "questsBonusStatus"
        );
    const footerNote =
        document.getElementById(
            "questsFooterNote"
        );
    if (!questsList) {
        return;
    }
    questsList.innerHTML =
        QUEST_DEFINITIONS.map(
            quest => {
                const progress =
                    Math.min(
                        quest.target,
                        state.quests.progress[
                            quest.id
                        ] || 0
                    );
                const percent =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            (
                                progress /
                                quest.target
                            ) * 100
                        )
                    );
                const completed =
                    isQuestCompleted(
                        quest.id
                    );
                const claimed =
                    state.quests.claimed[
                        quest.id
                    ] === true;
                let questActionHtml =
                    `
                        <div class="quest-status-pill pending">
                            EN COURS
                        </div>
                    `;
                if (
                    completed &&
                    !claimed
                ) {
                    questActionHtml = `
                        <button
                            class="quest-claim-button"
                            type="button"
                            onclick="claimQuestReward('${quest.id}')"
                        >
                            RÉCUPÉRER
                        </button>
                    `;
                }
                else if (claimed) {
                    questActionHtml = `
                        <div class="quest-status-pill claimed">
                            RÉCUPÉRÉE
                        </div>
                    `;
                }
                return `
                    <article class="quest-card ${completed ? "completed" : ""} ${claimed ? "claimed" : ""}">

                        <div class="quest-card-top">

                            <div class="quest-icon">
                                ${quest.icon}
                            </div>

                            <div class="quest-copy">

                                <div class="quest-name">
                                    ${quest.name}
                                </div>

                                <div class="quest-description">
                                    ${quest.description}
                                </div>

                            </div>

                            <div class="quest-reward">

                                ${questActionHtml}

                                <div class="quest-reward-list">
                                    ${buildQuestRewardChips(quest.rewards)}
                                </div>

                            </div>

                        </div>

                        <div class="quest-progress-row">

                            <div class="quest-progress-bar">
                                <div
                                    class="quest-progress-fill"
                                    style="width:${percent}%"
                                ></div>
                            </div>

                            <strong>${progress} / ${quest.target}</strong>

                        </div>

                    </article>
                `;
            }
        ).join("");
    const questsSummaryDone =
        document.getElementById(
            "questsSummaryDone"
        );
    const questsSummaryBonus =
        document.getElementById(
            "questsSummaryBonus"
        );
    const completedCount =
        getQuestCompletedCount();
    if (questsSummaryDone) {
        questsSummaryDone.innerText =
            completedCount +
            " / " +
            QUEST_DEFINITIONS.length;
    }
    if (questsSummaryBonus) {
        questsSummaryBonus.innerText =
            state.quests.finalRewardClaimed
            ?
            "RÉCUPÉRÉ"
            :
            "3 STAR TOKENS";
    }
    if (bonusStatus) {
        const completedCount =
            getQuestCompletedCount();
        const allCompleted =
            areAllQuestsCompleted();
        const done =
            state.quests.finalRewardClaimed === true;
        bonusStatus.classList.toggle(
            "done",
            done
        );
        if (done) {
            bonusStatus.innerHTML =
                `
                    <div class="quests-final-status claimed">
                        ✓ BONUS RÉCUPÉRÉ : +3 STAR TOKENS
                    </div>
                `;
        }
        else if (allCompleted) {
            bonusStatus.innerHTML =
                `
                    <button
                        class="quests-final-claim-button"
                        type="button"
                        onclick="claimQuestFinalReward()"
                    >
                        RÉCUPÉRER +3 STAR TOKENS
                    </button>
                `;
        }
        else {
            bonusStatus.innerHTML =
                `
                    <div class="quests-final-status">
                        ${completedCount}/3 QUÊTES TERMINÉES
                    </div>
                `;
        }
    }
    if (footerNote) {
        footerNote.innerText =
            "3 nouvelles quêtes aléatoires chaque jour à 10 h (Belgique) · 1 Star Token par quête.";
    }
    updateClaimNotificationDots();
}
function claimQuestReward(
    questId
) {
    ensureDailyQuests();
    const quest =
        getQuestDefinition(
            questId
        );
    if (
        !quest ||
        state.quests.claimed[
            questId
        ] === true ||
        !isQuestCompleted(
            questId
        )
    ) {
        return;
    }
    state.quests.claimed[
        questId
    ] = true;
    state.resources.coins +=
        quest.rewards.coins || 0;
    state.resources.power +=
        quest.rewards.power || 0;
    state.resources.tokens +=
        quest.rewards.tokens || 0;
    state.resources.starTokens +=
        quest.rewards.starTokens || 0;
    saveGame();
    updateResources();
    renderQuests();
}
function claimQuestFinalReward() {
    ensureDailyQuests();
    if (
        state.quests.finalRewardClaimed ||
        !areAllQuestsCompleted()
    ) {
        return;
    }
    state.quests.finalRewardClaimed =
        true;
    state.resources.starTokens +=
        QUEST_FINAL_REWARD.starTokens;
    saveGame();
    updateResources();
    renderQuests();
    showReward(
        "Icon/Fly_token.png",
        "BONUS FINAL",
        "+3 Star Tokens",
        "QUÊTES",
        "rare"
    );
}
function checkQuestRewards() {
    /*
       Aucune récompense de quête n'est automatique.
       - Chaque quête terminée doit être récupérée.
       - Quand les 3 quêtes sont terminées,
         le bouton du BONUS FINAL apparaît.
       - Les 3 Star Tokens sont ajoutés uniquement
         quand le joueur clique sur RÉCUPÉRER.
    */
    updateResources();
    saveGame();
    renderQuests();
}
function addQuestProgress(
    questId,
    amount = 1
) {
    const quest =
        getQuestDefinition(
            questId
        );
    if (!quest) {
        return;
    }
    const current =
        Math.max(
            0,
            Math.floor(
                Number(
                    state.quests.progress[
                        questId
                    ]
                ) || 0
            )
        );
    const next =
        Math.min(
            quest.target,
            current +
            Math.max(
                0,
                Math.floor(
                    Number(amount) || 0
                )
            )
        );
    state.quests.progress[
        questId
    ] = next;
    checkQuestRewards();
}
function addQuestProgressByType(
    type,
    amount = 1,
    brawlerName = null
) {
    ensureDailyQuests();
    QUEST_DEFINITIONS
    .filter(
        quest =>
            quest.type ===
            type
    )
    .forEach(
        quest => {
            if (
                quest.brawler &&
                quest.brawler !==
                    brawlerName
            ) {
                return;
            }
            addQuestProgress(
                quest.id,
                amount
            );
        }
    );
}
function registerSeasonMatchCompleted() {
    if (battleState.playerName === "Shelly") state.seasonOne.shellyMatches++;
    if (battleState.playerName === "Colt") state.seasonOne.coltMatches++;
}
function registerQuestBattleStarted() {
    const brawlerName =
        battleState.playerName;
    addQuestProgressByType(
        "battles",
        1,
        brawlerName
    );
    addQuestProgressByType(
        "brawlerBattles",
        1,
        brawlerName
    );
}
function registerQuestWin() {
    const brawlerName =
        battleState.playerName;
    if (brawlerName === "Shelly") {
        state.seasonOne.shellyWins++;
    }
    if (brawlerName === "Colt") {
        state.seasonOne.coltWins++;
    }
    addQuestProgressByType(
        "wins",
        1,
        brawlerName
    );
    addQuestProgressByType(
        "brawlerWins",
        1,
        brawlerName
    );
}
function registerQuestDamage(
    amount
) {
    const brawlerName =
        battleState.playerName;
    addQuestProgressByType(
        "damage",
        amount,
        brawlerName
    );
    addQuestProgressByType(
        "brawlerDamage",
        amount,
        brawlerName
    );
}
function registerQuestSuperUsed() {
    addQuestProgressByType(
        "supers",
        1,
        battleState.playerName
    );
}
function getBattleDamageResultTotal(
    result
) {
    if (
        !result ||
        typeof result !== "object"
    ) {
        return 0;
    }
    return (
        Math.max(
            0,
            Number(
                result.bearDamage
            ) || 0
        ) +
        Math.max(
            0,
            Number(
                result.brawlerDamage
            ) || 0
        )
    );
}
const TROPHY_ROAD_VISUAL = [
    {
        trophies: 0,
        label: "DÉPART",
        reward: "Bienvenue",
        icon: "Icon/trophy.png"
    },
    {
        trophies: 20,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 50,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 100,
        label: "250 POINTS DE POUVOIR",
        reward: "Récompense",
        icon: "Icon/power.png"
    },
    {
        trophies: 200,
        label: "BRAWL BOX",
        reward: "Récompense",
        icon: "Icon/Brawl_Box.webp"
    },
    {
        trophies: 300,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 400,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 500,
        label: "ICÔNE 500TR",
        reward: "Icône de profil",
        icon: "Profil/500tr.png"
    },
    {
        trophies: 600,
        label: "250 POINTS DE POUVOIR",
        reward: "Récompense",
        icon: "Icon/power.png"
    },
    {
        trophies: 700,
        label: "BRAWL BOX",
        reward: "Récompense",
        icon: "Icon/Brawl_Box.webp"
    },
    {
        trophies: 800,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 900,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 1000,
        label: "ICÔNE 1000TR",
        reward: "Icône de profil",
        icon: "Profil/1000tr.png"
    },
    {
        trophies: 1100,
        label: "250 POINTS DE POUVOIR",
        reward: "Récompense",
        icon: "Icon/power.png"
    },
    {
        trophies: 1200,
        label: "BRAWL BOX",
        reward: "Récompense",
        icon: "Icon/Brawl_Box.webp"
    },
    {
        trophies: 1300,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 1400,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 1500,
        label: "GROSSE BOÎTE",
        reward: "Récompense",
        icon: "Icon/Big_Box.webp"
    },
    {
        trophies: 1600,
        label: "250 POINTS DE POUVOIR",
        reward: "Récompense",
        icon: "Icon/power.png"
    },
    {
        trophies: 1700,
        label: "BRAWL BOX",
        reward: "Récompense",
        icon: "Icon/Brawl_Box.webp"
    },
    {
        trophies: 1800,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 1900,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 2000,
        label: "ICÔNE 2000TR",
        reward: "Icône de profil",
        icon: "Profil/2000tr.png"
    },
    {
        trophies: 2100,
        label: "250 POINTS DE POUVOIR",
        reward: "Récompense",
        icon: "Icon/power.png"
    },
    {
        trophies: 2200,
        label: "BRAWL BOX",
        reward: "Récompense",
        icon: "Icon/Brawl_Box.webp"
    },
    {
        trophies: 2300,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 2400,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 2500,
        label: "GROSSE BOÎTE",
        reward: "Récompense",
        icon: "Icon/Big_Box.webp"
    },
    {
        trophies: 2600,
        label: "250 POINTS DE POUVOIR",
        reward: "Récompense",
        icon: "Icon/power.png"
    },
    {
        trophies: 2700,
        label: "BRAWL BOX",
        reward: "Récompense",
        icon: "Icon/Brawl_Box.webp"
    },
    {
        trophies: 2800,
        label: "400 PIÈCES",
        reward: "Récompense",
        icon: "Icon/coin.png"
    },
    {
        trophies: 2900,
        label: "30 TOKENS",
        reward: "Récompense",
        icon: "Icon/Jeton.png"
    },
    {
        trophies: 3000,
        label: "ICÔNE 3000TR",
        reward: "Icône de profil",
        icon: "Profil/3000tr.png"
    }
];
function isTrophyRoadRewardClaimed(
    trophies
) {
    return (
        Array.isArray(
            state.trophyRoadClaimed
        ) &&
        state.trophyRoadClaimed.includes(
            Number(trophies)
        )
    );
}
function markTrophyRoadRewardClaimed(
    trophies
) {
    const value =
        Number(trophies);
    if (
        !Number.isFinite(value) ||
        value <= 0
    ) {
        return;
    }
    if (
        !state.trophyRoadClaimed.includes(
            value
        )
    ) {
        state.trophyRoadClaimed.push(
            value
        );
    }
}
function openFreeTrophyRoadBox(
    boxId
) {
    if (boxOpeningActive) {
        return false;
    }
    const box =
        BOXES[
            boxId
        ];
    if (!box) {
        return false;
    }
    const results = {
        coins: 0,
        gems: 0,
        power: 0,
        brawlers: [],
        abilities: [],
        starPowers: []
    };
    for (
        let i = 0;
        i < box.draws;
        i++
    ) {
        const reward =
            drawSingleReward();
        if (
            reward.type ===
            "coins"
        ) {
            results.coins +=
                reward.amount;
        }
        else if (
            reward.type ===
            "gems"
        ) {
            results.gems +=
                reward.amount;
        }
        else if (
            reward.type ===
            "power"
        ) {
            results.power +=
                reward.amount;
        }
        else if (
            reward.type ===
            "brawler"
        ) {
            results.brawlers.push(
                reward.name
            );
        }
        else if (
            reward.type ===
            "ability"
        ) {
            results.abilities.push({
                brawlerName:
                    reward.brawlerName,
                abilityId:
                    reward.abilityId,
                name:
                    reward.name,
                icon:
                    reward.icon
            });
        }
        else if (
            reward.type ===
            "starPower"
        ) {
            results.starPowers.push({
                brawlerName:
                    reward.brawlerName,
                starPowerId:
                    reward.starPowerId,
                name:
                    reward.name,
                icon:
                    reward.icon
            });
        }
    }
    state.resources.coins +=
        results.coins;
    state.resources.gems +=
        results.gems;
    state.resources.power +=
        results.power;
    saveGame();
    updateResources();
    updateBrawlerCount();
    renderBrawlers();
    renderProfileIconChoices();
    renderAbilityShop();
    renderStarPowerShop();
    renderBrawlerCapabilitiesStats();
    renderBrawlerStarPowerStats();
    playBoxOpeningAnimation(
        box,
        () => {
            showBoxRewards(
                box,
                results
            );
        }
    );
    return true;
}
function claimTrophyRoadReward(
    trophies
) {
    const target =
        Number(trophies);
    const step =
        TROPHY_ROAD_VISUAL.find(
            item =>
                item.trophies ===
                target
        );
    if (
        !step ||
        target <= 0 ||
        isTrophyRoadRewardClaimed(
            target
        )
    ) {
        return;
    }
    const currentTrophies =
        syncTotalTrophies();
    if (
        currentTrophies <
        target
    ) {
        return;
    }
    /*
       Les récompenses de box déclenchent directement
       une ouverture gratuite de la box correspondante.
    */
    if (
        step.label ===
        "BRAWL BOX"
    ) {
        if (
            boxOpeningActive
        ) {
            return;
        }
        markTrophyRoadRewardClaimed(
            target
        );
        saveGame();
        renderTrophyRoad();
        closeTrophyRoad();
        openFreeTrophyRoadBox(
            "brawl"
        );
        return;
    }
    if (
        step.label ===
        "GROSSE BOÎTE"
    ) {
        if (
            boxOpeningActive
        ) {
            return;
        }
        markTrophyRoadRewardClaimed(
            target
        );
        saveGame();
        renderTrophyRoad();
        closeTrophyRoad();
        openFreeTrophyRoadBox(
            "big"
        );
        return;
    }
    /*
       Icônes de profil spéciales.
    */
    if (
        step.label.startsWith(
            "ICÔNE "
        )
    ) {
        if (
            !state.profileIconsUnlocked.includes(
                step.icon
            )
        ) {
            state.profileIconsUnlocked.push(
                step.icon
            );
        }
        markTrophyRoadRewardClaimed(
            target
        );
        saveGame();
        renderProfileIconChoices();
        renderTrophyRoad();
        showProfileIconRewardAnimation(
            step.icon,
            step.label,
            `ROUTE DES TROPHÉES · PALIER ${target} TROPHÉES`,
            "NOUVELLE ICÔNE DE PROFIL"
        );
        return;
    }
    /*
       Ressources classiques.
    */
    let amount =
        0;
    let resourceKey =
        null;
    let description =
        "";
    if (
        step.label.includes(
            "PIÈCES"
        )
    ) {
        amount =
            400;
        resourceKey =
            "coins";
        description =
            "+400 pièces";
    }
    else if (
        step.label.includes(
            "TOKENS"
        )
    ) {
        amount =
            30;
        resourceKey =
            "tokens";
        description =
            "+30 tokens";
    }
    else if (
        step.label.includes(
            "POINTS DE POUVOIR"
        )
    ) {
        amount =
            250;
        resourceKey =
            "power";
        description =
            "+250 points de pouvoir";
    }
    if (
        !resourceKey
    ) {
        return;
    }
    state.resources[
        resourceKey
    ] +=
        amount;
    markTrophyRoadRewardClaimed(
        target
    );
    saveGame();
    updateResources();
    renderTrophyRoad();
    showReward(
        step.icon,
        step.label,
        description,
        "ROUTE DES TROPHÉES",
        "rare"
    );
}
function getTrophyRoadVisualProgress(
    currentTrophies
) {
    /*
       IMPORTANT :
       La jauge ne doit pas se remplir avec un simple
       "pourcentage global".
       Elle doit avancer selon la POSITION VISUELLE
       des récompenses sur la route.
       Exemples attendus :
       - 20 trophées  -> pile sur la récompense 20
       - 30 trophées  -> entre 20 et 50
       - 450 trophées -> entre 400 et 500
       - 500 trophées -> pile sur la récompense 500
    */
    const steps =
        TROPHY_ROAD_VISUAL;
    const lastIndex =
        steps.length - 1;
    const startX = 55;
    const endX = 4360;
    const rewardTrackWidth =
        endX - startX;
    /*
       Ces valeurs correspondent à la ligne visuelle
       de progression.
    */
    const progressLineStart = 42;
    const progressLineEnd = 4378;
    const progressLineWidth =
        progressLineEnd -
        progressLineStart;
    if (
        lastIndex <= 0
    ) {
        return 0;
    }
    if (
        currentTrophies >=
        steps[lastIndex].trophies
    ) {
        return progressLineWidth;
    }
    let previousIndex =
        0;
    let nextIndex =
        1;
    for (
        let i = 1;
        i < steps.length;
        i++
    ) {
        if (
            currentTrophies <
            steps[i].trophies
        ) {
            nextIndex =
                i;
            previousIndex =
                i - 1;
            break;
        }
    }
    const previousTrophies =
        steps[
            previousIndex
        ].trophies;
    const nextTrophies =
        steps[
            nextIndex
        ].trophies;
    const span =
        Math.max(
            1,
            nextTrophies -
            previousTrophies
        );
    const localProgress =
        Math.max(
            0,
            Math.min(
                1,
                (
                    currentTrophies -
                    previousTrophies
                ) /
                span
            )
        );
    const previousX =
        startX +
        (
            previousIndex /
            Math.max(
                1,
                lastIndex
            )
        ) * rewardTrackWidth;
    const nextX =
        startX +
        (
            nextIndex /
            Math.max(
                1,
                lastIndex
            )
        ) * rewardTrackWidth;
    const currentX =
        previousX +
        (
            nextX -
            previousX
        ) *
        localProgress;
    return Math.max(
        0,
        Math.min(
            progressLineWidth,
            currentX -
            progressLineStart
        )
    );
}
function renderTrophyRoad() {
    const track =
        document.getElementById(
            "trophyRoadTrack"
        );
    const totalElement =
        document.getElementById(
            "trophyRoadCurrentTotal"
        );
    const progressFill =
        document.getElementById(
            "trophyRoadProgressFill"
        );
    if (!track) {
        return;
    }
    const currentTrophies =
        syncTotalTrophies();
    if (totalElement) {
        totalElement.innerText =
            currentTrophies;
    }
    const maxMilestone =
        TROPHY_ROAD_VISUAL[
            TROPHY_ROAD_VISUAL.length - 1
        ]?.trophies || 1;
    const startX = 55;
    const endX = 4360;
    const width = endX - startX;
    const nextMilestone =
        TROPHY_ROAD_VISUAL.find(
            step =>
                currentTrophies <
                step.trophies
        )?.trophies || null;
    const itemsHtml =
        TROPHY_ROAD_VISUAL
        .map(
            (step, index) => {
                /*
                   Espacement visuel FIXE :
                   chaque récompense est séparée de la suivante
                   par exactement la même distance, peu importe
                   le nombre de trophées requis.
                */
                const left =
                    startX +
                    (
                        index /
                        Math.max(
                            1,
                            TROPHY_ROAD_VISUAL.length - 1
                        )
                    ) * width;
                const positionClass =
                    "top";
                const reached =
                    currentTrophies >=
                    step.trophies;
                const claimed =
                    step.trophies > 0 &&
                    isTrophyRoadRewardClaimed(
                        step.trophies
                    );
                const isNext =
                    nextMilestone ===
                    step.trophies;
                const stepClass =
                    claimed
                    ? "claimed"
                    : (
                        reached
                        ? "reached"
                        : (
                            isNext
                            ? "next"
                            : ""
                        )
                    );
                let statusHtml =
                    `
                        <div class="trophy-road-card-status">
                            À VENIR
                        </div>
                    `;
                if (
                    step.trophies === 0
                ) {
                    statusHtml =
                        `
                            <div class="trophy-road-card-status start">
                                DÉPART
                            </div>
                        `;
                }
                else if (
                    claimed
                ) {
                    statusHtml =
                        `
                            <div class="trophy-road-card-status claimed-status">
                                ✓ RÉCUPÉRÉE
                            </div>
                        `;
                }
                else if (
                    reached
                ) {
                    statusHtml =
                        `
                            <button
                                class="trophy-road-claim-button"
                                type="button"
                                onclick="claimTrophyRoadReward(${step.trophies})"
                            >
                                RÉCUPÉRER
                            </button>
                        `;
                }
                else if (
                    isNext
                ) {
                    statusHtml =
                        `
                            <div class="trophy-road-card-status next-status">
                                PROCHAINE
                            </div>
                        `;
                }
                return `
                    <div
                        class="trophy-road-step ${positionClass} ${stepClass}"
                        style="left:${left}px"
                    >
                        <div class="trophy-road-card">
                            <div class="trophy-road-card-head">
                                <img
                                    src="Icon/trophy.png"
                                    alt="Trophées"
                                >
                                <strong>${step.trophies}</strong>
                            </div>

                            <div class="trophy-road-card-preview">
                                <img
                                    src="${step.icon}"
                                    alt="${step.label}"
                                >
                            </div>

                            <div class="trophy-road-card-label">
                                ${step.label}
                            </div>

                            <div class="trophy-road-card-meta">
                                ${step.reward}
                            </div>

                            ${statusHtml}
                        </div>

                        <div class="trophy-road-node">
                            <img
                                src="${step.icon}"
                                alt="${step.label}"
                            >
                        </div>
                    </div>
                `;
            }
        )
        .join(
            ""
        );
    /*
       Largeur réelle en pixels de la jauge,
       calculée selon la position visuelle exacte
       entre les récompenses.
    */
    const progressFillWidth =
        getTrophyRoadVisualProgress(
            currentTrophies
        );
    track.innerHTML =
        `
            <div class="trophy-road-progress-line">
                <div
                    id="trophyRoadProgressFill"
                    class="trophy-road-progress-fill"
                    style="width:${progressFillWidth}px"
                ></div>
            </div>
        ` +
        itemsHtml;
    updateClaimNotificationDots();
}
function scrollTrophyRoadToCurrentPosition() {
    const wrapper =
        document.getElementById(
            "trophyRoadTrackWrap"
        );
    if (!wrapper) {
        return;
    }
    const currentTrophies =
        syncTotalTrophies();
    /*
       La jauge commence visuellement à X = 42px.
       getTrophyRoadVisualProgress() retourne ensuite
       la distance exacte jusqu'à la progression actuelle.
    */
    const progressLineStart =
        42;
    const currentX =
        progressLineStart +
        getTrophyRoadVisualProgress(
            currentTrophies
        );
    /*
       On place la progression légèrement à gauche du
       centre pour voir aussi les prochaines récompenses.
    */
    const desiredScroll =
        currentX -
        wrapper.clientWidth *
        0.42;
    const maxScroll =
        Math.max(
            0,
            wrapper.scrollWidth -
            wrapper.clientWidth
        );
    wrapper.scrollLeft =
        Math.max(
            0,
            Math.min(
                maxScroll,
                desiredScroll
            )
        );
}
function showTrophyRoad() {
    closeGameGuide();
    closeQuests();
    const overlay =
        document.getElementById(
            "trophyRoadOverlay"
        );
    if (!overlay) {
        return;
    }
    renderTrophyRoad();
    overlay.classList.add(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
    /*
       L'overlay doit être visible avant de calculer
       correctement clientWidth / scrollWidth.
    */
    requestAnimationFrame(
        () => {
            requestAnimationFrame(
                scrollTrophyRoadToCurrentPosition
            );
        }
    );
}
function closeTrophyRoad() {
    const overlay =
        document.getElementById(
            "trophyRoadOverlay"
        );
    if (!overlay) {
        return;
    }
    overlay.classList.remove(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}
function showGameGuide() {
    closeTrophyRoad();
    closeQuests();
    const overlay =
        document.getElementById(
            "gameGuideOverlay"
        );
    if (!overlay) {
        return;
    }
    overlay.classList.add(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}
function closeGameGuide() {
    const overlay =
        document.getElementById(
            "gameGuideOverlay"
        );
    if (!overlay) {
        return;
    }
    overlay.classList.remove(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}
function showQuests() {
    ensureDailyQuests();
    closeGameGuide();
    closeTrophyRoad();
    const overlay =
        document.getElementById(
            "questsOverlay"
        );
    if (!overlay) {
        return;
    }
    renderQuests();
    overlay.classList.add(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}
function closeQuests() {
    const overlay =
        document.getElementById(
            "questsOverlay"
        );
    if (!overlay) {
        return;
    }
    overlay.classList.remove(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}
function showHome() {
    closeQuests();
    closeGameGuide();
    closeTrophyRoad();
    hideAllPages();
    const appHeader =
        document.querySelector(
            "header"
        );
    if (appHeader) {
        appHeader.style.display =
            "flex";
    }
    document
        .getElementById(
            "homePage"
        )
        .classList.add(
            "active"
        );
    document
        .getElementById(
            "navHome"
        )
        .classList.add(
            "active"
        );
    updateSelectedBrawler();
    /*
       MUSIQUE HOME :
       dès que l'application arrive réellement sur l'accueil,
       on sélectionne Son/Home_ss1.mp3 et on tente la lecture.
    */
    if (
        window.brawlMusic &&
        typeof window.brawlMusic.playHome === "function"
    ) {
        window.brawlMusic.playHome();
    }
}
function showBattle() {
    closeBattleStats();
    hideAllPages();
    const victoryRecap =
        document.getElementById(
            "battleVictoryRecap"
        );
    if (victoryRecap) {
        victoryRecap.classList.remove(
            "active"
        );
        victoryRecap.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    const lossRecap =
        document.getElementById(
            "battleLossToast"
        );
    if (lossRecap) {
        lossRecap.classList.remove(
            "active"
        );
        lossRecap.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    const postBattleRewards =
        document.getElementById(
            "postBattleRewardsOverlay"
        );
    if (postBattleRewards) {
        postBattleRewards.classList.remove(
            "active"
        );
        postBattleRewards.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    document
        .getElementById(
            "battlePage"
        )
        .classList.add(
            "active"
        );
    const bottomNav =
        document.querySelector(
            ".bottom-nav"
        );
    if (bottomNav) {
        bottomNav.style.display =
            "none";
    }
    const appHeader =
        document.querySelector(
            "header"
        );
    if (appHeader) {
        appHeader.style.display =
            "none";
    }
}
let battleState = {
    playerName: "",
    enemyName: "",
    playerHealth: 0,
    playerMaxHealth: 0,
    enemyHealth: 0,
    enemyMaxHealth: 0,
    playerBearHealth: 0,
    playerBearMaxHealth: 0,
    enemyBearHealth: 0,
    enemyBearMaxHealth: 0,
    playerShieldTurns: 0,
    enemyShieldTurns: 0,
    playerParalyzedTurns: 0,
    enemyParalyzedTurns: 0,
    playerCowboyRollDodges: 0,
    enemyCowboyRollDodges: 0,
    playerBurnTurns: 0,
    enemyBurnTurns: 0,
    playerPoisonTurns: 0,
    enemyPoisonTurns: 0,
    playerSlowTurns: 0,
    enemySlowTurns: 0,
    playerSlowAmount: 0,
    enemySlowAmount: 0,
    playerPocoHealingTurns: 0,
    enemyPocoHealingTurns: 0,
    playerEffectImmunityTurns: 0,
    enemyEffectImmunityTurns: 0,
    playerMeteorPending: null,
    enemyMeteorPending: null,
    enemyPseudo: "",
    enemyTurn: false,
    rewardsGranted: false,
    trophyChange: 0,
    superCharge: 0,
    enemySuperCharge: 0,
    currentDistance: null,
    distanceChoices: [],
    distanceChosen: false,
    distanceRoundChooser: null,
    distanceRoundAttackIndex: 0,
    usedAbilities: {},
    enemyUsedAbilities: {},
    enemyAbilityIds: [],
    enemyHasStarPower: false,
    enemySourceTrophies: 0,
    questSnapshot: null,
    resourcesSnapshot: null,
    quitCancelledProgress: false
};
const BATTLE_ENEMY_PSEUDOS = [
    "Shadow",
    "Nova",
    "SpikeMaster",
    "DarkWolf",
    "Pixel",
    "Blaze",
    "Storm",
    "Rival"
];
function getRandomEnemyPseudo() {
    /*
       Tant qu'il n'y a pas de vrai joueur multijoueur,
       l'adversaire local s'appelle toujours BOT.
    */
    return "BOT";
}
function getRandomEnemyName(
    playerName
) {
    const candidates =
        Object.keys(
            brawlers
        );
    if (
        candidates.length === 0
    ) {
        return playerName;
    }
    return candidates[
        Math.floor(
            Math.random() *
            candidates.length
        )
    ];
}
function getEnemyPowerRangeFromTrophies(trophies) {
    const value =
        Math.max(
            0,
            Math.floor(
                Number(trophies) || 0
            )
        );
    if (value >= 1000) return { min: 10, max: 10, guaranteedMaxLoadout: true };
    if (value >= 800)  return { min: 8,  max: 10, guaranteedMaxLoadout: false };
    if (value >= 600)  return { min: 5,  max: 8,  guaranteedMaxLoadout: false };
    if (value >= 400)  return { min: 3,  max: 6,  guaranteedMaxLoadout: false };
    if (value >= 200)  return { min: 2,  max: 4,  guaranteedMaxLoadout: false };
    return { min: 1, max: 2, guaranteedMaxLoadout: false };
}
function randomIntegerBetween(min, max) {
    const low = Math.ceil(Number(min) || 0);
    const high = Math.floor(Number(max) || low);
    return Math.floor(
        Math.random() *
        (high - low + 1)
    ) + low;
}
function createEnemyBattleLoadout(playerName, enemyName) {
    const sourceTrophies =
        getBrawlerTrophies(
            playerName
        );
    const range =
        getEnemyPowerRangeFromTrophies(
            sourceTrophies
        );
    const power =
        range.guaranteedMaxLoadout
        ? 10
        : randomIntegerBetween(
            range.min,
            range.max
        );
    const catalog =
        getBrawlerAbilityCatalog(
            enemyName
        );
    const eligibleAbilities =
        catalog
        .map(
            (ability, index) => ({
                ability,
                slotNumber: index + 1
            })
        )
        .filter(
            entry =>
                power >=
                getAbilitySlotRequiredPower(
                    entry.slotNumber
                )
        );
    let abilityIds = [];
    if (range.guaranteedMaxLoadout) {
        abilityIds =
            eligibleAbilities
            .slice(0, 2)
            .map(entry => entry.ability.id);
    }
    else {
        /*
           Sous 1000 trophées : chaque capacité réellement
           accessible par le Power du BOT a 50 % de chance
           d'être équipée. Donc P8 = maximum 1 capacité,
           P9/P10 = maximum 2, et il peut aussi n'en avoir aucune.
        */
        abilityIds =
            eligibleAbilities
            .filter(() => Math.random() < 0.50)
            .map(entry => entry.ability.id);
    }
    const starPower =
        getBrawlerStarPower(
            enemyName
        );
    const starPowerEligible =
        Boolean(
            starPower &&
            power >= starPower.requiredPower
        );
    const hasStarPower =
        starPowerEligible &&
        (
            range.guaranteedMaxLoadout ||
            Math.random() < 0.40
        );
    return {
        sourceTrophies,
        power,
        abilityIds,
        hasStarPower
    };
}
function getEnemyBattleAbilityLoadout() {
    const catalog =
        getBrawlerAbilityCatalog(
            battleState.enemyName
        );
    const selected =
        Array.isArray(
            battleState.enemyAbilityIds
        )
        ? battleState.enemyAbilityIds
        : [];
    return Object.fromEntries(
        catalog.map(
            (ability, index) => [
                String(index + 1),
                selected.includes(ability.id)
                ? ability.id
                : null
            ]
        )
    );
}
function isEnemyStarPowerBattleActive(
    brawlerName
) {
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    return Boolean(
        starPower &&
        battleState.enemyName === brawlerName &&
        Number(battleState.enemyPower) >= starPower.requiredPower &&
        battleState.enemyHasStarPower === true
    );
}
function renderBattle(
    playerName,
    enemyName
) {
    const player =
        brawlers[playerName];
    const enemy =
        brawlers[enemyName];
    if (
        !player ||
        !enemy
    ) {
        return;
    }
    const playerHealth =
        getBrawlerHealth(
            player
        );
    /*
       Le niveau du BOT dépend des trophées DU BRAWLER
       actuellement joué, pas du Power du joueur.
       0–199    : Power 1–2
       200–399  : Power 2–4
       400–599  : Power 3–6
       600–799  : Power 5–8
       800–999  : Power 8–10
       1000+    : Power 10 + Pouvoir Star + 2 capacités
    */
    const enemyLoadout =
        createEnemyBattleLoadout(
            playerName,
            enemyName
        );
    const enemyPower =
        enemyLoadout.power;
    console.log(
        "[BOT LOADOUT] trophées=" + enemyLoadout.sourceTrophies +
        " | " + enemyName +
        " P" + enemyPower +
        " | capacités=" + (enemyLoadout.abilityIds.join(", ") || "aucune") +
        " | star=" + (enemyLoadout.hasStarPower ? "oui" : "non")
    );
    const enemyBattleData = {
        ...enemy,
        power:
            enemyPower
    };
    const enemyHealth =
        getBrawlerHealth(
            enemyBattleData
        );
    const enemyPseudo =
        getRandomEnemyPseudo();
    battleState = {
        playerName:
            playerName,
        enemyName:
            enemyName,
        enemyPower:
            enemyPower,
        enemyAbilityIds:
            enemyLoadout.abilityIds,
        enemyHasStarPower:
            enemyLoadout.hasStarPower,
        enemySourceTrophies:
            enemyLoadout.sourceTrophies,
        playerHealth:
            playerHealth,
        playerMaxHealth:
            playerHealth,
        enemyHealth:
            enemyHealth,
        enemyMaxHealth:
            enemyHealth,
        playerBearHealth:
            0,
        playerBearMaxHealth:
            0,
        enemyBearHealth:
            0,
        enemyBearMaxHealth:
            0,
        playerShieldTurns:
            0,
        enemyShieldTurns:
            0,
        playerParalyzedTurns:
            0,
        enemyParalyzedTurns:
            0,
        playerCowboyRollDodges:
            0,
        enemyCowboyRollDodges:
            0,
        playerBurnTurns:
            0,
        enemyBurnTurns:
            0,
        playerPoisonTurns:
            0,
        enemyPoisonTurns:
            0,
        playerSlowTurns:
            0,
        enemySlowTurns:
            0,
        playerSlowAmount:
            0,
        enemySlowAmount:
            0,
        playerPocoHealingTurns:
            0,
        enemyPocoHealingTurns:
            0,
        playerEffectImmunityTurns:
            0,
        enemyEffectImmunityTurns:
            0,
        playerMeteorPending:
            null,
        enemyMeteorPending:
            null,
        enemyPseudo:
            enemyPseudo,
        enemyTurn:
            false,
        rewardsGranted:
            false,
        trophyChange:
            0,
        superCharge:
            0,
        enemySuperCharge:
            0,
        currentDistance:
            null,
        distanceChoices:
            [],
        distanceChosen:
            false,
        distanceRoundChooser:
            null,
        distanceRoundAttackIndex:
            0,
        usedAbilities: {},
        enemyUsedAbilities: {}
    };
    const textValues = {
        battlePlayerPseudo:
            state.profile.name ||
            "Joueur",
        battleEnemyPseudo:
            enemyPseudo,
        battlePlayerName:
            playerName,
        battleEnemyName:
            enemyName,
        battlePlayerPower:
            "POWER " +
            player.power,
        battleEnemyPower:
            "POWER " +
            enemyPower,
        battlePlayerHealthText:
            playerHealth +
            " / " +
            playerHealth,
        battleEnemyHealthText:
            enemyHealth +
            " / " +
            enemyHealth
    };
    Object.entries(
        textValues
    )
    .forEach(
        ([id, value]) => {
            const element =
                document.getElementById(
                    id
                );
            if (element) {
                element.innerText =
                    value;
            }
        }
    );
    const playerImage =
        document.getElementById(
            "battlePlayerImage"
        );
    const enemyImage =
        document.getElementById(
            "battleEnemyImage"
        );
    playerImage.src =
        player.image;
    playerImage.alt =
        playerName;
    /*
       Les BOT utilisent toujours le skin de base,
       même si le joueur possède/équipe un autre skin
       pour ce même Brawler.
    */
    enemyImage.src =
        getDefaultSkinImage(
            enemyName
        );
    enemyImage.alt =
        enemyName;
    document
        .getElementById(
            "battlePlayerHealthFill"
        )
        .style.width =
            "100%";
    document
        .getElementById(
            "battleEnemyHealthFill"
        )
        .style.width =
            "100%";
    updateBattleBearUI("player");
    updateBattleBearUI("enemy");
    updateBullRageVisuals();
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    if (attackButton) {
        attackButton.disabled =
            true;
    }
    battleState.enemyTurn =
        true;
    updateBattleDistanceUI();
    applyBattleDistanceVisual(
        7
    );
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (actionMessage) {
        actionMessage.innerText =
            "Pile ou face pour décider qui commence...";
    }
    const coin =
        document.getElementById(
            "battleCoin"
        );
    const coinText =
        document.getElementById(
            "battleCoinText"
        );
    if (coin) {
        coin.className =
            "battle-coin";
        coin.innerText =
            "?";
    }
    if (coinText) {
        coinText.innerText =
            "PILE OU FACE...";
    }
    const transitionCoin =
        document.getElementById(
            "battleTransitionCoin"
        );
    const transitionCoinText =
        document.getElementById(
            "battleTransitionCoinText"
        );
    if (transitionCoin) {
        transitionCoin.className =
            "battle-transition-coin";
        transitionCoin.innerText =
            "?";
    }
    if (transitionCoinText) {
        transitionCoinText.innerText =
            "PILE OU FACE...";
    }
    const starterAnnouncement =
        document.getElementById(
            "battleStarterAnnouncement"
        );
    const startTransition =
        document.getElementById(
            "battleStartTransition"
        );
    if (starterAnnouncement) {
        starterAnnouncement.innerText =
            "";
        starterAnnouncement.classList.remove(
            "player-start",
            "enemy-start"
        );
    }
    if (startTransition) {
        startTransition.classList.remove(
            "starter-mode"
        );
    }
    updateBattleSuperUI();
    updateBattleShieldVisuals();
    const dodgeMessage =
        document.getElementById(
            "battleDodgeMessage"
        );
    if (dodgeMessage) {
        dodgeMessage.classList.remove(
            "active",
            "player",
            "enemy"
        );
    }
}
/* =====================================================
   ACTION DE COMBAT
===================================================== */
function getBattleDistanceChoices() {
    const first =
        Math.floor(
            Math.random() * 7
        ) + 1;
    let second =
        first;
    while (
        second === first
    ) {
        second =
            Math.floor(
                Math.random() * 7
            ) + 1;
    }
    return [
        first,
        second
    ];
}
function applyBattleDistanceVisual(
    distance
) {
    const playerStage =
        document.getElementById(
            "battlePlayerStage"
        );
    const enemyStage =
        document.getElementById(
            "battleEnemyStage"
        );
    /*
       DISTANCE VISUELLE
       -----------------
       IMPORTANT : on ne touche plus à `transform` ici.
       Les Brawlers utilisent déjà `transform` pour leur animation idle.
       On déplace donc directement les stages avec left/right/bottom, ce qui
       permet au déplacement de distance + idle + tremblement de coexister.
       1 = très proches
       7 = très éloignés
    */
    const safeDistance =
        Math.max(
            1,
            Math.min(
                7,
                Number(distance) || 7
            )
        );
    const closeness =
        7 -
        safeDistance;
    if (playerStage) {
        playerStage.style.left =
            (2 + closeness * 10) +
            "px";
        playerStage.style.bottom =
            (16 + closeness * 2) +
            "px";
    }
    if (enemyStage) {
        enemyStage.style.right =
            (2 + closeness * 9) +
            "px";
        enemyStage.style.bottom =
            (165 - closeness * 2) +
            "px";
    }
}
function updateBattleDistanceUI() {
    /*
       La position des combattants suit TOUJOURS la distance actuelle.
       Cela couvre aussi les capacités / Supers qui modifient la distance.
    */
    applyBattleDistanceVisual(
        Number.isInteger(
            battleState.currentDistance
        )
        ? battleState.currentDistance
        : 7
    );
    const panel =
        document.getElementById(
            "battleDistancePanel"
        );
    const title =
        document.getElementById(
            "battleDistanceTitle"
        );
    const current =
        document.getElementById(
            "battleCurrentDistance"
        );
    const popupCurrent =
        document.getElementById(
            "battleDistancePopupCurrent"
        );
    const card1 =
        document.getElementById(
            "battleDistanceCard1"
        );
    const card2 =
        document.getElementById(
            "battleDistanceCard2"
        );
    const cards =
        [
            card1,
            card2
        ];
    const displayedDistance =
        battleState.currentDistance === null
        ?
        "—"
        :
        String(
            battleState.currentDistance
        );
    if (current) {
        current.innerText =
            displayedDistance;
    }
    if (popupCurrent) {
        popupCurrent.innerText =
            battleState.currentDistance === null
            ?
            "—"
            :
            "DISTANCE " +
            battleState.currentDistance;
    }
    if (title) {
        title.innerText =
            battleState.enemyTurn
            ?
            "TOUR ADVERSE"
            :
            (
                battleState.distanceChosen
                ?
                "DISTANCE CHOISIE"
                :
                "CHOISIS LA DISTANCE"
            );
    }
    if (panel) {
        panel.classList.toggle(
            "active",
            !battleState.enemyTurn &&
            !battleState.distanceChosen
        );
        panel.classList.toggle(
            "waiting",
            battleState.enemyTurn
        );
    }
    cards.forEach(
        (
            card,
            index
        ) => {
            if (!card) {
                return;
            }
            const value =
                battleState.distanceChoices[
                    index
                ];
            if (
                Number.isInteger(
                    value
                )
            ) {
                card.dataset.distance =
                    value;
                const strong =
                    card.querySelector(
                        "strong"
                    );
                if (strong) {
                    strong.innerText =
                        value;
                }
            }
            card.disabled =
                battleState.enemyTurn ||
                battleState.distanceChosen ||
                !Number.isInteger(
                    value
                );
            card.classList.toggle(
                "selected",
                battleState.distanceChosen &&
                Number(
                    card.dataset.distance
                ) ===
                battleState.currentDistance
            );
        }
    );
}
function getBattleActionDisplayName(
    brawlerName,
    mode
) {
    const description =
        BRAWLER_ATTACK_DESCRIPTIONS[
            brawlerName
        ]?.[
            mode
        ];
    if (
        !description ||
        !description.title
    ) {
        return (
            mode === "super"
            ?
            "SUPER"
            :
            "ATTAQUE"
        );
    }
    /*
       Dans les descriptions, les Supers sont écrits
       "Super : Nom". Sur le bouton on garde uniquement
       le vrai nom de l'action.
    */
    return description.title
        .replace(
            /^Super\s*:\s*/i,
            ""
        )
        .toUpperCase();
}
function updateBattleActionTitles() {
    const attackTitle =
        document.getElementById(
            "battleAttackButtonTitle"
        );
    const superTitle =
        document.getElementById(
            "battleSuperButtonTitle"
        );
    const brawlerName =
        battleState.playerName;
    if (attackTitle) {
        attackTitle.innerText =
            getBattleActionDisplayName(
                brawlerName,
                "base"
            );
    }
    if (superTitle) {
        superTitle.innerText =
            getBattleActionDisplayName(
                brawlerName,
                "super"
            );
    }
}
function isBattleAbilityUsed(
    abilityId
) {
    return (
        Boolean(
            abilityId
        ) &&
        battleState.usedAbilities &&
        battleState.usedAbilities[
            abilityId
        ] === true
    );
}
function markBattleAbilityUsed(
    abilityId
) {
    if (!abilityId) {
        return;
    }
    if (
        !battleState.usedAbilities ||
        typeof battleState.usedAbilities !==
            "object"
    ) {
        battleState.usedAbilities =
            {};
    }
    battleState.usedAbilities[
        abilityId
    ] =
        true;
}
function canUseBattleAbility(
    ability,
    slotNumber
) {
    if (
        !ability ||
        !isAbilitySlotUnlocked(
            battleState.playerName,
            slotNumber
        ) ||
        isBattleAbilityUsed(
            ability.id
        )
    ) {
        return false;
    }
    const canAct =
        !battleState.enemyTurn &&
        battleState.distanceChosen &&
        battleState.playerHealth > 0 &&
        battleState.enemyHealth > 0;
    if (!canAct) {
        return false;
    }
    /*
       AVANCE RAPIDE :
       impossible à distance 1 car Shelly
       ne peut pas se rapprocher davantage.
    */
    if (
        ability.id ===
            "shelly-ability-a" &&
        battleState.currentDistance <=
            1
    ) {
        return false;
    }
    /*
       BALLES D'ARGENT :
       le tir conserve la portée normale de Shelly.
       On évite donc de consommer la capacité
       lorsqu'elle est hors de portée.
    */
    if (
        ability.id ===
            "shelly-ability-b" &&
        !isBattleTargetInRange(
            "Shelly",
            battleState.currentDistance,
            false
        )
    ) {
        return false;
    }
    /*
       NITA — CAPACITÉ A :
       c'est un tir normal, donc la cible
       doit être dans sa portée.
    */
    if (
        ability.id ===
            "nita-ability-a" &&
        !isBattleTargetInRange(
            "Nita",
            battleState.currentDistance,
            false
        )
    ) {
        return false;
    }
    /*
       BULL — GROS SABOTS :
       portée 3 maximum.
    */
    if (
        ability.id ===
            "bull-ability-b" &&
        battleState.currentDistance >
            3
    ) {
        return false;
    }
    /*
       EL PRIMO — SUPLEX FATAL :
       uniquement à distance 1.
    */
    if (
        ability.id ===
            "el-primo-ability-a" &&
        battleState.currentDistance !==
            1
    ) {
        return false;
    }
    /*
       On évite de gaspiller la capacité B
       lorsque les PV sont déjà au maximum.
    */
    if (
        ability.effect?.type ===
            "heal" &&
        battleState.playerHealth >=
            battleState.playerMaxHealth
    ) {
        return false;
    }
    return true;
}
function useBattleAbility(
    slotNumber
) {
    const slot =
        Number(
            slotNumber
        );
    if (
        ![
            1,
            2
        ].includes(
            slot
        )
    ) {
        return;
    }
    const brawlerName =
        battleState.playerName;
    const loadout =
        getBrawlerAbilityLoadout(
            brawlerName
        );
    const abilityId =
        loadout[
            String(
                slot
            )
        ];
    const ability =
        getBrawlerAbilityById(
            brawlerName,
            abilityId
        );
    if (
        !canUseBattleAbility(
            ability,
            slot
        )
    ) {
        return;
    }
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    beginBattleActionTracking(
        "player"
    );
    /*
       =================================================
       SHELLY — AVANCE RAPIDE
       =================================================
       - réduit la distance de 1
       - ne termine PAS le tour
       - permet d'enchaîner avec une autre action
       - reste utilisable une seule fois par duel
    */
    if (
        ability.id ===
        "shelly-ability-a"
    ) {
        markBattleAbilityUsed(
            ability.id
        );
        const previousDistance =
            battleState.currentDistance;
        battleState.currentDistance =
            Math.max(
                1,
                previousDistance -
                1
            );
        battleState.enemyTurn =
            false;
        updateBattleDistanceUI();
        updateBattleBasicAttackUI();
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "AVANCE RAPIDE · DISTANCE " +
                battleState.currentDistance +
                " · ENCHAÎNE UNE AUTRE ACTION !";
        }
        return;
    }
    /*
       =================================================
       SHELLY — BALLES D'ARGENT
       =================================================
       Champ de tir : 2.
       Dégâts :
       D1 -> dégâts D1
       D2 -> dégâts D1
       D3 -> dégâts D2
       D4 -> dégâts D3
       D5 -> dégâts D4
    */
    if (
        ability.id ===
        "shelly-ability-b"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        const distance =
            battleState.currentDistance;
        const damageDistance =
            distance <=
            1
            ?
            1
            :
            distance -
                1;
        const attackHits =
            battleAttackHitsWithShotField(
                battleState.enemyName,
                2,
                "enemy"
            );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (!attackHits) {
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BALLES D'ARGENT · BOT ESQUIVE !";
            }
            showBattleDodgeMessage(
                "BOT ESQUIVE !",
                "enemy"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        advanceDistanceRoundAfterAttack(
                            "player"
                        );
                    },
                    3000
                );
            return;
        }
        const DAMAGE =
            getBattleBasicDamage(
                "Shelly",
                damageDistance
            );
        const damageResult =
            applyBattleDamageToSide(
                "enemy",
                DAMAGE,
                {
                    piercing: false
                }
            );
        registerQuestDamage(
            damageResult.actualDamage
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BALLES D'ARGENT · -" +
                damageResult.actualDamage +
                " PV · CHAMP DE TIR 2";
        }
        if (
            battleState.enemyHealth <=
            0
        ) {
            battleState.enemyTurn =
                false;
            if (actionMessage) {
                actionMessage.innerText =
                    "BALLES D'ARGENT · BOT EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       COLT — GROS CALIBRE
       =================================================
       - 1 seule grosse balle
       - dégâts = 3 balles en une fois
       - portée 6
       - champ de tir 3
       - l'esquive reste possible sauf à distance 1
    */
    if (
        ability.id ===
        "colt-ability-a"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        const distance =
            battleState.currentDistance;
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (distance > 6) {
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "GROS CALIBRE · BOT HORS PORTÉE";
            }
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer = null;
                        advanceDistanceRoundAfterAttack(
                            "player"
                        );
                    },
                    2800
                );
            return;
        }
        const attackHits =
            battleAttackHitsWithShotField(
                battleState.enemyName,
                3,
                "enemy"
            );
        if (!attackHits) {
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "GROS CALIBRE · BOT ESQUIVE !";
            }
            showBattleDodgeMessage(
                "BOT ESQUIVE !",
                "enemy"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer = null;
                        advanceDistanceRoundAfterAttack(
                            "player"
                        );
                    },
                    3000
                );
            return;
        }
        const damagePerBullet =
            getBattleBasicDamage(
                "Colt",
                Math.min(
                    distance,
                    6
                )
            );
        const totalDamage =
            damagePerBullet * 3;
        const damageResult =
            applyBattleDamageToSide(
                "enemy",
                totalDamage,
                {
                    piercing: false
                }
            );
        const superChargeGain =
            Math.max(
                20,
                Math.round(
                    getBasicAttackSuperCharge(
                        "Colt",
                        distance
                    ) * 0.5
                )
            );
        if (
            damageResult.brawlerDamage > 0
        ) {
            addBattleSuperCharge(
                superChargeGain
            );
            addTankSuperChargeFromIncomingHit(
                "enemy",
                superChargeGain
            );
        }
        registerQuestDamage(
            getBattleDamageResultTotal(
                damageResult
            )
        );
        if (actionMessage) {
            actionMessage.innerText =
                "GROS CALIBRE · -" +
                getBattleDamageResultTotal(
                    damageResult
                ) +
                " PV";
        }
        if (
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn = false;
            if (actionMessage) {
                actionMessage.innerText =
                    "GROS CALIBRE · BOT EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       COLT — ROULADE DE COWBOY
       =================================================
       Colt prépare une esquive garantie :
       la prochaine attaque du BOT est annulée.
    */
    if (
        ability.id ===
        "colt-ability-b"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        battleState.playerCowboyRollDodges =
            1;
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "ROULADE DE COWBOY · PROCHAINE ATTAQUE ENNEMIE ESQUIVÉE";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                1900
            );
        return;
    }
    /*
       =================================================
       NITA — CAPACITÉ A
       =================================================
       Tir normal.
       Si le tir touche :
       le BOT saute son prochain tour.
    */
    if (
        ability.id ===
        "nita-ability-a"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        const distance =
            battleState.currentDistance;
        const attackHits =
            battleAttackHits(
                "Nita",
                battleState.enemyName,
                false,
                "enemy"
            );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (!attackHits) {
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "CAPACITÉ A · BOT ESQUIVE · PAS DE PARALYSIE";
            }
            showBattleDodgeMessage(
                "BOT ESQUIVE !",
                "enemy"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        advanceDistanceRoundAfterAttack(
                            "player"
                        );
                    },
                    2800
                );
            return;
        }
        const DAMAGE =
            getBattleBasicDamage(
                "Nita",
                distance
            );
        const damageResult =
            applyBattleDamageToSide(
                "enemy",
                DAMAGE,
                {
                    piercing:
                        isBattleAttackPiercing(
                            "Nita",
                            false
                        )
                }
            );
        const superChargeGain =
            getBasicAttackSuperCharge(
                "Nita",
                distance
            );
        if (
            damageResult.brawlerDamage > 0
        ) {
            addBattleSuperCharge(
                superChargeGain
            );
            addTankSuperChargeFromIncomingHit(
                "enemy",
                superChargeGain
            );
        }
        registerQuestDamage(
            getBattleDamageResultTotal(
                damageResult
            )
        );
        applyBattleParalysis(
            "enemy",
            1
        );
        if (actionMessage) {
            actionMessage.innerText =
                "CAPACITÉ A · -" +
                getBattleDamageResultTotal(
                    damageResult
                ) +
                " PV · BOT PARALYSÉ 1 TOUR";
        }
        if (
            battleState.enemyHealth <=
            0
        ) {
            battleState.enemyTurn =
                false;
            grantBattleVictoryRewards();
            return;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2800
            );
        return;
    }
    /*
       =================================================
       NITA — CAPACITÉ B
       =================================================
       Bouclier :
       -30 % de dégâts
       pendant 3 tours adverses.
       Protège Nita ET son ours.
    */
    if (
        ability.id ===
        "nita-ability-b"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        setBattleShieldTurns(
            "player",
            3
        );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "CAPACITÉ B · BOUCLIER ACTIF · -30 % DÉGÂTS · 3 TOURS";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2200
            );
        return;
    }
    /*
       =================================================
       BULL — SECOND SOUFFLE
       =================================================
    */
    if (
        ability.id ===
        "bull-ability-a"
    ) {
        battleState.enemyTurn = true;
        markBattleAbilityUsed( ability.id );
        const before = battleState.playerHealth;
        battleState.playerHealth =
            Math.min(
                battleState.playerMaxHealth,
                battleState.playerHealth + 25
            );
        const actualHeal = battleState.playerHealth - before;
        updateBattleHealthUI( "player" );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "SECOND SOUFFLE · +" + actualHeal + " PV";
        }
        battleEnemyAttackTimer = setTimeout(
            () => {
                battleEnemyAttackTimer = null;
                advanceDistanceRoundAfterAttack( "player" );
            },
            2300
        );
        return;
    }
    /*
       =================================================
       BULL — GROS SABOTS
       =================================================
    */
    if (
        ability.id ===
        "bull-ability-b"
    ) {
        battleState.enemyTurn = true;
        markBattleAbilityUsed( ability.id );
        const distance = battleState.currentDistance;
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (distance > 3) {
            healBattleDodger( "enemy" );
            if (actionMessage) {
                actionMessage.innerText =
                    "GROS SABOTS · BOT EST HORS PORTÉE";
            }
            battleEnemyAttackTimer = setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    advanceDistanceRoundAfterAttack( "player" );
                },
                2600
            );
            return;
        }
        const bullStompDamage =
            applyBullRageDamageBonus(
                15,
                "player"
            );
        const damageResult =
            applyBattleDamageToSide(
                "enemy",
                bullStompDamage,
                { piercing: false }
            );
        applyBattleParalysis(
            "enemy",
            1
        );
        registerQuestDamage( getBattleDamageResultTotal( damageResult ) );
        if (actionMessage) {
            actionMessage.innerText =
                "GROS SABOTS · -" +
                getBattleDamageResultTotal( damageResult ) +
                " PV · BOT ASSOMMÉ · BULL REJOUE !";
        }
        if (battleState.enemyHealth <= 0) {
            battleState.enemyTurn = false;
            grantBattleVictoryRewards();
            return;
        }
        /*
           L'assommement reste actif pour le prochain
           vrai tour du BOT, mais Bull rejoue immédiatement
           à la même distance.
        */
        battleEnemyAttackTimer = setTimeout(
            () => {
                battleEnemyAttackTimer = null;
                finalizeBattleActionRegen(
                    "player"
                );
                beginPlayerActionSameDistance();
            },
            2100
        );
        return;
    }
    /*
       =================================================
       EL PRIMO — SUPLEX FATAL
       =================================================
    */
    if (
        ability.id ===
        "el-primo-ability-a"
    ) {
        markBattleAbilityUsed( ability.id );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (battleState.currentDistance > 1) {
            battleState.enemyTurn = true;
            healBattleDodger( "enemy" );
            if (actionMessage) {
                actionMessage.innerText =
                    "SUPLEX FATAL · DISTANCE 1 REQUISE";
            }
            battleEnemyAttackTimer = setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    advanceDistanceRoundAfterAttack( "player" );
                },
                2400
            );
            return;
        }
        const damageResult =
            applyBattleDamageToSide(
                "enemy",
                30,
                { piercing: false }
            );
        applyBattleParalysis(
            "enemy",
            1
        );
        registerQuestDamage( getBattleDamageResultTotal( damageResult ) );
        if (actionMessage) {
            actionMessage.innerText =
                "SUPLEX FATAL · -" +
                getBattleDamageResultTotal( damageResult ) +
                " PV · BOT ASSOMMÉ · TU REJOUES !";
        }
        if (battleState.enemyHealth <= 0) {
            battleState.enemyTurn = false;
            grantBattleVictoryRewards();
            return;
        }
        battleState.distanceChosen = true;
        battleState.distanceChoices = [];
        battleState.distanceRoundAttackIndex = 0;
        battleEnemyAttackTimer = setTimeout(
            () => {
                battleEnemyAttackTimer = null;
                finalizeBattleActionRegen(
                    "player"
                );
                beginPlayerActionSameDistance();
            },
            2400
        );
        return;
    }
    /*
       =================================================
       EL PRIMO — MÉTÉORITE
       =================================================
    */
    if (
        ability.id ===
        "el-primo-ability-b"
    ) {
        battleState.enemyTurn = true;
        markBattleAbilityUsed( ability.id );
        battleState.enemyMeteorPending = {
            sourceDistance: battleState.currentDistance,
            damage: 30,
            burnTurns: 2,
            minDistanceChangeToEscape: 3
        };
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "MÉTÉORITE PRÊTE · SI BOT NE CHANGE PAS ASSEZ DE DISTANCE, IL SERA FRAPPÉ";
        }
        battleEnemyAttackTimer = setTimeout(
            () => {
                battleEnemyAttackTimer = null;
                advanceDistanceRoundAfterAttack( "player" );
            },
            2400
        );
        return;
    }
    /*
       =================================================
       POCO — CAPACITÉ A
       =================================================
       +20 PV par tour pendant 3 tours.
       Le premier tick est appliqué immédiatement,
       puis deux ticks lors des deux prochains tours
       de Poco.
    */
    if (
        ability.id ===
        "poco-ability-a"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        /*
           Après le soin immédiat, il restera
           encore deux tours de mélodie.
        */
        battleState.playerPocoHealingTurns =
            2;
        const actualHeal =
            healPocoTeam(
                "player",
                20
            );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "DOUCE MÉLODIE · +" +
                actualHeal +
                " PV · SOIN ACTIF ENCORE 2 TOURS";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2300
            );
        return;
    }
    /*
       =================================================
       POCO — CAPACITÉ B
       =================================================
       Immunité aux effets négatifs pendant
       les deux prochaines actions ennemies.
    */
    if (
        ability.id ===
        "poco-ability-b"
    ) {
        battleState.enemyTurn =
            true;
        markBattleAbilityUsed(
            ability.id
        );
        setBattleEffectImmunity(
            "player",
            2
        );
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (actionMessage) {
            actionMessage.innerText =
                "MÉLODIE D'IMMUNITÉ · PROTÉGÉ DES EFFETS PENDANT 2 TOURS";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2300
            );
        return;
    }
    /*
       Une capacité utilisée consomme le tour du joueur.
    */
    battleState.enemyTurn =
        true;
    markBattleAbilityUsed(
        ability.id
    );
    if (
        ability.effect?.type ===
        "damage"
    ) {
        const DAMAGE =
            Math.max(
                0,
                Math.round(
                    Number(
                        ability.effect.amount
                    ) || 0
                )
            );
        /*
           Dégâts GARANTIS :
           - aucune vérification de portée
           - aucune esquive
           - le bouclier éventuel réduit quand même
             les dégâts reçus
        */
        const damageResult =
            applyBattleDamageToSide(
                "enemy",
                DAMAGE,
                {
                    piercing: true
                }
            );
        const actualDamage =
            getBattleDamageResultTotal(
                damageResult
            );
        registerQuestDamage(
            actualDamage
        );
        if (actionMessage) {
            actionMessage.innerText =
                ability.name +
                " · -" +
                actualDamage +
                " PV GARANTIS À BOT";
        }
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        if (
            battleState.enemyHealth <=
            0
        ) {
            battleState.enemyTurn =
                false;
            if (actionMessage) {
                actionMessage.innerText =
                    ability.name +
                    " · BOT EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2600
            );
        return;
    }
    if (
        ability.effect?.type ===
        "heal"
    ) {
        const HEAL =
            Math.max(
                0,
                Math.round(
                    Number(
                        ability.effect.amount
                    ) || 0
                )
            );
        const before =
            battleState.playerHealth;
        battleState.playerHealth =
            Math.min(
                battleState.playerMaxHealth,
                battleState.playerHealth +
                HEAL
            );
        const actualHeal =
            battleState.playerHealth -
            before;
        updateBattleHealthUI(
            "player"
        );
        if (actionMessage) {
            actionMessage.innerText =
                ability.name +
                " · +" +
                actualHeal +
                " PV";
        }
        updateBattleAbilitySlots();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2600
            );
        return;
    }
    /*
       Sécurité si une future capacité n'a pas encore
       d'effet défini : elle n'est pas consommée.
    */
    battleState.usedAbilities[
        ability.id
    ] =
        false;
    battleState.enemyTurn =
        false;
    syncBattleActionAvailability();
}
function updateBattleAbilitySlots() {
    const slot1 =
        document.getElementById(
            "battleAbilitySlot1"
        );
    const slot2 =
        document.getElementById(
            "battleAbilitySlot2"
        );
    const brawlerName =
        battleState.playerName;
    const player =
        brawlers[
            brawlerName
        ];
    const power =
        Math.max(
            1,
            Math.min(
                10,
                Number(
                    player?.power
                ) || 1
            )
        );
    const loadout =
        state.brawlerAbilityLoadouts[
            brawlerName
        ] ||
        {
            "1": null,
            "2": null
        };
    function renderAbilitySlot(
        element,
        requiredPower,
        slotNumber
    ) {
        if (!element) {
            return;
        }
        const unlocked =
            power >=
            requiredPower;
        const abilityId =
            loadout[
                String(
                    slotNumber
                )
            ];
        const ability =
            getBrawlerAbilityById(
                brawlerName,
                abilityId
            );
        /*
           Nettoyage des anciens événements du slot.
        */
        element.removeAttribute(
            "onclick"
        );
        element.removeAttribute(
            "role"
        );
        element.setAttribute(
            "aria-disabled",
            "true"
        );
        if (!unlocked) {
            element.className =
                "battle-action-slot battle-locked-slot";
            element.setAttribute(
                "aria-label",
                "Capacité " +
                slotNumber +
                " verrouillée jusqu'au Power " +
                requiredPower
            );
            element.innerHTML = `
                <img
                    src="Icon/lock.png"
                    alt="Verrouillé"
                >

                <span class="battle-ability-lock-level">
                    POWER ${requiredPower}
                </span>
            `;
            return;
        }
        if (!ability) {
            /*
               Débloqué mais vide :
               le rectangle reste visible, sans cadenas.
            */
            element.className =
                "battle-action-slot battle-empty-ability-slot";
            element.setAttribute(
                "aria-label",
                "Emplacement de capacité " +
                slotNumber +
                " vide"
            );
            element.innerHTML =
                "";
            return;
        }
        const used =
            isBattleAbilityUsed(
                ability.id
            );
        const canUse =
            canUseBattleAbility(
                ability,
                slotNumber
            );
        element.className =
            "battle-action-slot battle-equipped-ability-slot" +
            (
                used
                ?
                " used"
                :
                (
                    canUse
                    ?
                    " usable"
                    :
                    " unavailable"
                )
            );
        element.setAttribute(
            "aria-label",
            ability.name +
            (
                used
                ?
                " déjà utilisée"
                :
                " équipée"
            )
        );
        if (canUse) {
            element.setAttribute(
                "role",
                "button"
            );
            element.setAttribute(
                "aria-disabled",
                "false"
            );
            element.setAttribute(
                "onclick",
                "useBattleAbility(" +
                slotNumber +
                ")"
            );
        }
        let detailText =
            "";
        if (used) {
            detailText =
                "UTILISÉE";
        }
        else if (
            ability.id ===
            "bull-ability-a"
        ) {
            detailText =
                battleState.playerHealth >=
                battleState.playerMaxHealth
                ?
                "PV MAX"
                :
                "+25 PV";
        }
        else if (
            ability.id ===
            "bull-ability-b"
        ) {
            detailText =
                "15 DÉGÂTS · STUN";
        }
        else if (
            ability.id ===
            "el-primo-ability-a"
        ) {
            detailText =
                "30 DÉGÂTS · STUN";
        }
        else if (
            ability.id ===
            "el-primo-ability-b"
        ) {
            detailText =
                "30 DÉGÂTS · BRÛLURE";
        }
        else if (
            ability.id ===
            "poco-ability-a"
        ) {
            detailText =
                "+20 PV × 3 TOURS";
        }
        else if (
            ability.id ===
            "poco-ability-b"
        ) {
            detailText =
                "IMMUNITÉ · 2 TOURS";
        }
        else if (
            ability.effect?.type ===
            "damage"
        ) {
            detailText =
                "20 DÉGÂTS";
        }
        else if (
            ability.effect?.type ===
            "heal"
        ) {
            detailText =
                battleState.playerHealth >=
                battleState.playerMaxHealth
                ?
                "PV MAX"
                :
                "+" + ( ability.effect.amount || 20 ) + " PV";
        }
        element.innerHTML = `
            <span class="battle-action-slot-title">
                ${ability.name}
            </span>

            <span class="battle-action-slot-detail">
                ${detailText}
            </span>
        `;
    }
    renderAbilitySlot(
        slot1,
        7,
        1
    );
    renderAbilitySlot(
        slot2,
        9,
        2
    );
}
function passBattleTurn() {
    const canAct =
        !battleState.enemyTurn &&
        battleState.distanceChosen &&
        battleState.playerHealth > 0 &&
        battleState.enemyHealth > 0;
    if (!canAct) {
        return;
    }
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    const passButton =
        document.getElementById(
            "battlePassTurnButton"
        );
    beginBattleActionTracking(
        "player"
    );
    markBattleActionSkipped();
    /*
       Passer son tour :
       les deux Brawlers récupèrent jusqu'à 5 PV.
    */
    const playerHealed =
        healBattleDodger(
            "player"
        );
    const enemyHealed =
        healBattleDodger(
            "enemy"
        );
    battleState.enemyTurn =
        true;
    if (passButton) {
        passButton.disabled =
            true;
    }
    updateBattleSuperUI();
    syncBattleActionAvailability();
    if (actionMessage) {
        const playerHealText =
            playerHealed > 0
            ?
            "TOI +" + playerHealed + " PV"
            :
            "TOI PV MAX";
        const enemyHealText =
            enemyHealed > 0
            ?
            "BOT +" + enemyHealed + " PV"
            :
            "BOT PV MAX";
        actionMessage.innerText =
            "TU PASSES TON TOUR · " +
            playerHealText +
            " · " +
            enemyHealText;
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                advanceDistanceRoundAfterAttack(
                    "player"
                );
            },
            1800
        );
}
function syncBattleActionAvailability() {
    updateBattleActionTitles();
    updateBattleBasicAttackUI();
    updateBattleAbilitySlots();
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    const superButton =
        document.getElementById(
            "battleSuperButton"
        );
    const passButton =
        document.getElementById(
            "battlePassTurnButton"
        );
    const canAct =
        !battleState.enemyTurn &&
        battleState.distanceChosen &&
        battleState.playerHealth > 0 &&
        battleState.enemyHealth > 0;
    if (attackButton) {
        attackButton.disabled =
            !canAct;
    }
    if (superButton) {
        superButton.disabled =
            !(
                canAct &&
                battleState.superCharge >= 100
            );
    }
    if (passButton) {
        passButton.disabled =
            !canAct;
    }
    updateBattleActionHitChanceUI();
}
function beginPlayerTurn() {
    if (window.brawlSfx) {
        window.brawlSfx.play('turn');
    }
    /*
       Le joueur choisit une nouvelle distance.
       Cette distance restera ensuite valable
       pendant DEUX attaques :
       joueur -> BOT.
    */
    startDistanceRound(
        "player"
    );
}
function startDistanceRound(
    chooser
) {
    if (
        battleState.playerHealth <= 0 ||
        battleState.enemyHealth <= 0
    ) {
        return;
    }
    battleState.distanceRoundChooser =
        chooser;
    battleState.distanceRoundAttackIndex =
        0;
    battleState.distanceChosen =
        false;
    battleState.distanceChoices =
        [];
    if (
        chooser ===
        "player"
    ) {
        battleState.enemyTurn =
            false;
        const melodyHeal =
            applyPocoHealingMelodyTick(
                "player"
            );
        battleState.distanceChoices =
            getBattleDistanceChoices();
        updateBattleDistanceUI();
        updateBattleSuperUI();
        syncBattleActionAvailability();
        const actionMessage =
            document.getElementById(
                "battleActionMessage"
            );
        if (actionMessage) {
            actionMessage.innerText =
                melodyHeal > 0
                ?
                "MÉLODIE DE POCO · +" +
                melodyHeal +
                " PV · Choisis la distance."
                :
                "Choisis la distance pour les 2 prochains tours.";
        }
        return;
    }
    /*
       Quand c'est au BOT de choisir,
       il tire UNE SEULE distance
       aléatoire entre 1 et 7.
    */
    battleState.enemyTurn =
        true;
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (actionMessage) {
        actionMessage.innerText =
            "BOT choisit une nouvelle distance...";
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                const botChoice =
                    Math.floor(
                        Math.random() * 7
                    ) + 1;
                battleState.currentDistance =
                    botChoice;
                battleState.distanceChosen =
                    true;
                applyBattleDistanceVisual(
                    botChoice
                );
                updateBattleDistanceUI();
                updateBattleSuperUI();
                syncBattleActionAvailability();
                const meteorResolution =
                    resolveBattleMeteorAfterDistanceChoice();
                if (actionMessage) {
                    actionMessage.innerText =
                        meteorResolution.resolved
                        ?
                        meteorResolution.message
                        :
                        (
                            "BOT choisit la distance " +
                            botChoice +
                            " !"
                        );
                }
                if (meteorResolution.ko) {
                    battleEnemyAttackTimer =
                        setTimeout(
                            () => {
                                battleEnemyAttackTimer = null;
                                battleState.enemyTurn = false;
                                grantBattleVictoryRewards();
                            },
                            2400
                        );
                    return;
                }
                /*
                   Le BOT, qui vient de choisir,
                   joue le premier tour de cette distance.
                */
                battleEnemyAttackTimer =
                    setTimeout(
                        () => {
                            battleEnemyAttackTimer =
                                null;
                            enemyAttack();
                        },
                        3000
                    );
            },
            3000
        );
}
function chooseBattleDistance(
    distance
) {
    if (
        battleState.enemyTurn ||
        battleState.distanceChosen ||
        battleState.distanceRoundChooser !==
            "player" ||
        !battleState.distanceChoices.includes(
            distance
        )
    ) {
        return;
    }
    battleState.currentDistance =
        distance;
    battleState.distanceChosen =
        true;
    /*
       Petite pause volontaire avant de pouvoir attaquer,
       pour laisser le temps de lire la distance choisie.
    */
    battleState.enemyTurn =
        true;
    applyBattleDistanceVisual(
        distance
    );
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    let distanceAnnouncement =
        "Distance " + distance + " choisie...";
    const meteorResolution =
        resolveBattleMeteorAfterDistanceChoice();
    if (meteorResolution.resolved) {
        distanceAnnouncement = meteorResolution.message;
    }
    if (actionMessage) {
        actionMessage.innerText =
            distanceAnnouncement;
    }
    if (meteorResolution.ko) {
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    battleState.enemyTurn = false;
                    grantBattleVictoryRewards();
                },
                2200
            );
        return;
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                battleState.enemyTurn =
                    false;
                updateBattleSuperUI();
                syncBattleActionAvailability();
                if (actionMessage) {
                    actionMessage.innerText =
                        meteorResolution.resolved
                        ?
                        (
                            meteorResolution.escaped
                            ?
                            "BOT évite la météorite · À toi de jouer · distance " + distance + "."
                            :
                            "À toi de jouer · distance " + distance + "."
                        )
                        :
                        "À toi de jouer · distance " +
                        distance +
                        ".";
                }
            },
            2200
        );
}
function beginPlayerActionSameDistance() {
    if (window.brawlSfx) {
        window.brawlSfx.play('turn');
    }
    if (
        battleState.playerHealth <= 0 ||
        battleState.enemyHealth <= 0
    ) {
        return;
    }
    /*
       On garde les boutons bloqués quelques secondes
       avant de rendre réellement la main au joueur.
    */
    battleState.enemyTurn =
        true;
    battleState.distanceChosen =
        true;
    battleState.distanceChoices =
        [];
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (actionMessage) {
        actionMessage.innerText =
            "Prépare-toi · distance " +
            battleState.currentDistance +
            "...";
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                battleState.enemyTurn =
                    false;
                const melodyHeal =
                    applyPocoHealingMelodyTick(
                        "player"
                    );
                updateBattleSuperUI();
                syncBattleActionAvailability();
                if (actionMessage) {
                    actionMessage.innerText =
                        melodyHeal > 0
                        ?
                        "MÉLODIE DE POCO · +" +
                        melodyHeal +
                        " PV · À toi de jouer · distance " +
                        battleState.currentDistance +
                        "."
                        :
                        "À toi de jouer · distance " +
                        battleState.currentDistance +
                        ".";
                }
            },
            2200
        );
}
function beginEnemyActionSameDistance() {
    if (
        battleState.playerHealth <= 0 ||
        battleState.enemyHealth <= 0
    ) {
        return;
    }
    battleState.enemyTurn =
        true;
    battleState.distanceChosen =
        true;
    battleState.distanceChoices =
        [];
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (actionMessage) {
        actionMessage.innerText =
            "BOT joue à la distance " +
            battleState.currentDistance +
            "...";
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                enemyAttack();
            },
            2250
        );
}
function advanceDistanceRoundAfterAttack(
    actor
) {
    if (
        battleState.playerHealth <= 0 ||
        battleState.enemyHealth <= 0
    ) {
        return;
    }
    finalizeBattleActionRegen(
        actor
    );
    /*
       Un tour adverse vient de se terminer :
       le bouclier du camp ciblé perd 1 tour.
    */
    if (
        actor ===
        "player"
    ) {
        consumeBattleShieldTurn(
            "enemy"
        );
        /*
           Un tour offensif du joueur vient de passer :
           l'immunité éventuelle du BOT perd un tour.
        */
        consumeBattleEffectImmunityTurn(
            "enemy"
        );
    }
    else if (
        actor ===
        "bot"
    ) {
        consumeBattleShieldTurn(
            "player"
        );
        /*
           L'immunité de Poco couvre deux actions ennemies.
        */
        consumeBattleEffectImmunityTurn(
            "player"
        );
    }
    /*
       Première attaque avec cette distance :
       l'autre joueur joue immédiatement
       avec EXACTEMENT la même distance.
    */
    if (
        battleState.distanceRoundAttackIndex ===
        0
    ) {
        battleState.distanceRoundAttackIndex =
            1;
        if (
            actor ===
            "player"
        ) {
            beginEnemyActionSameDistance();
        }
        else {
            beginPlayerActionSameDistance();
        }
        return;
    }
    /*
       Les deux joueurs ont utilisé cette distance.
       Le droit de choisir la prochaine distance
       passe à l'autre joueur.
       Exemple si le joueur commence :
       JOUEUR choisit -> JOUEUR joue -> BOT joue
       BOT choisit    -> BOT joue    -> JOUEUR joue
       JOUEUR choisit -> ...
    */
    const nextChooser =
        battleState.distanceRoundChooser ===
        "player"
        ?
        "bot"
        :
        "player";
    startDistanceRound(
        nextChooser
    );
}
function beginEnemyTurn() {
    /*
       Conservé comme alias pour les anciens appels.
       Ici le BOT devient le prochain joueur
       à choisir une nouvelle distance.
    */
    startDistanceRound(
        "bot"
    );
}
function setBattleEnemyTurnUI() {
    battleState.enemyTurn =
        true;
    battleState.distanceChoices =
        [];
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
}
function getBattleSuperAttackDamage(
    brawlerName,
    distance,
    side = "player"
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    const stats =
        brawler?.superStats;
    if (!stats) {
        return 0;
    }
    let baseDamage =
        0;
    if (
        stats.attackByDistance &&
        Number.isFinite(
            stats.attackByDistance[
                distance
            ]
        )
    ) {
        baseDamage =
            stats.attackByDistance[
                distance
            ];
    }
    else if (
        Number.isFinite(
            stats.attack
        )
    ) {
        baseDamage =
            stats.attack;
    }
    return getScaledDamage(
        baseDamage,
        getBattlePowerLevel(
            brawlerName,
            side
        )
    );
}
function getBattleSuperHeal(
    brawlerName,
    side = "player"
) {
    const heal =
        brawlers[
            brawlerName
        ]?.superStats?.heal;
    if (
        !Number.isFinite(
            heal
        )
    ) {
        return 0;
    }
    return getScaledDamage(
        heal,
        getBattlePowerLevel(
            brawlerName,
            side
        )
    );
}
function rollColtSuperBulletHits() {
    /*
       Super de Colt = 12 balles.
       À distance 1 :
       aucune esquive possible,
       donc 12/12 touchent automatiquement.
    */
    if (
        battleState.currentDistance ===
        1
    ) {
        return 12;
    }
    /*
       Aux autres distances :
       entre 1 et 12 balles touchent.
    */
    return Math.floor(
        Math.random() * 12
    ) + 1;
}
function getColtSuperAttackDamage(
    brawlerName,
    side = "player"
) {
    const damagePerBullet =
        getBattleSuperAttackDamage(
            brawlerName,
            battleState.currentDistance,
            side
        );
    const maxBullets =
        12;
    const bulletsHit =
        rollColtSuperBulletHits();
    const totalDamage =
        damagePerBullet *
        bulletsHit;
    console.log(
        "[SUPER COLT] " +
        bulletsHit +
        "/12 balles touchent" +
        " | dégâts/balle=" +
        damagePerBullet +
        " | total=" +
        totalDamage
    );
    return {
        bulletsHit,
        maxBullets,
        damagePerBullet,
        totalDamage
    };
}
function getBattleSuperReadyLabel() {
    const brawlerName =
        battleState.playerName;
    const distance =
        battleState.currentDistance;
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return "SUPER PRÊT";
    }
    /*
       Poco :
       son Super soigne uniquement Poco pour l'instant.
       Portée et champ de tir seront utiles plus tard
       pour les alliés en 3v3.
    */
    if (
        brawlerName ===
        "Poco"
    ) {
        return (
            "SOIN " +
            getBattleSuperHeal(
                brawlerName
            ) +
            " PV"
        );
    }
    if (
        brawlerName ===
        "Nita"
    ) {
        return (
            "OURS " +
            getBattleBearMaxHealth(
                "player"
            ) +
            " PV"
        );
    }
    if (
        !Number.isFinite(
            distance
        )
    ) {
        return "SUPER PRÊT";
    }
    /*
       Bull effectue toujours sa ruée complète de 6.
       Même à distance 7, le Super reste utilisable :
       il termine alors à distance 1.
    */
    if (
        brawlerName ===
        "Bull"
    ) {
        const nextDistance =
            getBullSuperNextDistance(
                distance
            );
        if (
            distance <=
            brawler.superStats.range
        ) {
            return (
                applyBullRageDamageBonus(
                    getBattleSuperAttackDamage(
                        brawlerName,
                        distance
                    ),
                    "player"
                ) +
                " DÉGÂTS → D" +
                nextDistance
            );
        }
        return (
            "RUÉE → D" +
            nextDistance
        );
    }
    if (
        !isBattleTargetInRange(
            brawlerName,
            distance,
            true
        )
    ) {
        return "HORS PORTÉE";
    }
    if (
        brawlerName ===
        "Shelly"
    ) {
        return (
            getBattleSuperAttackDamage(
                brawlerName,
                distance
            ) +
            " DÉGÂTS"
        );
    }
    if (
        brawlerName ===
        "Colt"
    ) {
        const damagePerBullet =
            getBattleSuperAttackDamage(
                brawlerName,
                distance
            );
        if (
            distance ===
            1
        ) {
            return (
                damagePerBullet +
                " × 12 BALLES"
            );
        }
        return (
            damagePerBullet +
            " × 1–12 BALLES"
        );
    }
    if (
        brawlerName ===
        "El Primo"
    ) {
        return (
            getBattleSuperAttackDamage(
                brawlerName,
                distance
            ) +
            " DÉGÂTS"
        );
    }
    /*
       Les autres Supers restent inchangés
       pour le moment.
    */
    return "40 DÉGÂTS";
}
function updateBattleSuperUI() {
    const charge =
        Math.max(
            0,
            Math.min(
                100,
                battleState.superCharge || 0
            )
        );
    const superButton =
        document.getElementById(
            "battleSuperButton"
        );
    const superButtonFill =
        document.getElementById(
            "battleSuperButtonFill"
        );
    const superButtonState =
        document.getElementById(
            "battleSuperButtonState"
        );
    const playerHudSuperFill =
        document.getElementById(
            "battlePlayerSuperHudFill"
        );
    const enemyHudSuperFill =
        document.getElementById(
            "battleEnemySuperHudFill"
        );
    const enemyCharge =
        Math.max(
            0,
            Math.min(
                100,
                battleState.enemySuperCharge || 0
            )
        );
    const canUseSuper =
        charge >= 100 &&
        !battleState.enemyTurn &&
        battleState.distanceChosen &&
        battleState.playerHealth > 0 &&
        battleState.enemyHealth > 0;
    if (superButtonFill) {
        superButtonFill.style.width =
            charge + "%";
    }
    if (superButton) {
        superButton.classList.toggle(
            "ready",
            charge >= 100
        );
        superButton.disabled =
            !canUseSuper;
    }
    if (superButtonState) {
        superButtonState.innerText =
            charge >= 100
            ?
            getBattleSuperReadyLabel()
            :
            "SUPER " +
            Math.round(charge) +
            "%";
    }
    if (playerHudSuperFill) {
        playerHudSuperFill.style.width =
            charge + "%";
        playerHudSuperFill.classList.toggle(
            "ready",
            charge >= 100
        );
    }
    if (enemyHudSuperFill) {
        enemyHudSuperFill.style.width =
            enemyCharge + "%";
        enemyHudSuperFill.classList.toggle(
            "ready",
            enemyCharge >= 100
        );
    }
}
function getBasicAttackSuperCharge(
    brawlerName,
    distance,
    options = {}
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return 0;
    }
    /*
       OBJECTIF :
       environ 4 attaques réussies en moyenne
       pour charger un Super complet.
       Une attaque "moyenne" vaut donc 25%.
       On ne se base PAS sur les dégâts réellement infligés.
    */
    /*
       COLT
       ----
       La charge est calibrée sur la moyenne du chargeur.
       Chargeur normal : 1 à 6 -> moyenne 3,5.
       Avec le Pouvoir Star : 1 à 7 -> moyenne 4.
       Dans les deux cas, une attaque moyenne vaut 25 %.
    */
    if (
        brawlerName ===
        "Colt"
    ) {
        const maxBullets =
            Math.max(
                1,
                Number(
                    options.maxBullets
                ) || 6
            );
        const bulletsHit =
            Math.max(
                0,
                Math.min(
                    maxBullets,
                    Number(
                        options.bulletsHit
                    ) || 0
                )
            );
        const averageBullets =
            (
                1 +
                maxBullets
            ) / 2;
        return (
            25 *
            (
                bulletsHit /
                averageBullets
            )
        );
    }
    /*
       SHELLY / BULL
       -------------
       Leur charge dépend de la distance,
       mais pas du Power Level ni des dégâts
       réellement retirés à l'adversaire.
       On prend comme référence la moyenne
       de leurs valeurs d'attaque par distance.
       Ainsi, en parcourant leurs distances,
       la charge moyenne reste autour de 25%.
    */
    if (
        brawler.attackByDistance
    ) {
        const values =
            Object.values(
                brawler.attackByDistance
            )
            .filter(
                value =>
                    Number.isFinite(
                        value
                    )
            );
        if (
            values.length >
            0
        ) {
            const averageAttack =
                values.reduce(
                    (
                        total,
                        value
                    ) =>
                        total +
                        value,
                    0
                ) /
                values.length;
            const currentAttack =
                brawler.attackByDistance[
                    distance
                ];
            if (
                Number.isFinite(
                    currentAttack
                ) &&
                averageAttack >
                0
            ) {
                return (
                    25 *
                    (
                        currentAttack /
                        averageAttack
                    )
                );
            }
        }
    }
    /*
       Nita, El Primo, Poco, etc.
       Une attaque réussie = 25%.
    */
    return 25;
}
function isTankBrawler(
    brawlerName
) {
    return (
        brawlerName ===
        "Bull" ||
        brawlerName ===
        "El Primo"
    );
}
function addTankSuperChargeFromIncomingHit(
    defenderSide,
    attackerChargeGain
) {
    if (
        !Number.isFinite(
            attackerChargeGain
        ) ||
        attackerChargeGain <= 0
    ) {
        return;
    }
    const defenderName =
        defenderSide ===
        "player"
        ?
        battleState.playerName
        :
        battleState.enemyName;
    if (
        !isTankBrawler(
            defenderName
        )
    ) {
        return;
    }
    const tankCharge =
        attackerChargeGain *
        0.5;
    if (
        defenderSide ===
        "player"
    ) {
        addBattleSuperCharge(
            tankCharge
        );
    }
    else {
        addEnemyBattleSuperCharge(
            tankCharge
        );
    }
    console.log(
        "[TANK] " +
        defenderName +
        " encaisse un coup | +" +
        tankCharge.toFixed(
            1
        ) +
        "% de Super"
    );
}
function addBattleSuperCharge(
    chargeAmount
) {
    if (
        chargeAmount <= 0 ||
        battleState.superCharge >= 100
    ) {
        return;
    }
    const nextPlayerSuperCharge =
        Math.min(
            100,
            battleState.superCharge +
            chargeAmount
        );
    /*
       L'interface arrondit le pourcentage affiché.
       Sans ce snap, 99.99999999999999 pouvait afficher 100%
       tout en laissant le bouton Super désactivé.
    */
    battleState.superCharge =
        nextPlayerSuperCharge >= 99.5
        ? 100
        : nextPlayerSuperCharge;
    console.log(
        "[SUPER] +" +
        chargeAmount.toFixed(
            1
        ) +
        "% | total=" +
        battleState.superCharge.toFixed(
            1
        ) +
        "%"
    );
    updateBattleSuperUI();
}
function addEnemyBattleSuperCharge(
    chargeAmount
) {
    if (
        chargeAmount <= 0 ||
        battleState.enemySuperCharge >= 100
    ) {
        return;
    }
    const nextEnemySuperCharge =
        Math.min(
            100,
            battleState.enemySuperCharge +
            chargeAmount
        );
    battleState.enemySuperCharge =
        nextEnemySuperCharge >= 99.5
        ? 100
        : nextEnemySuperCharge;
    console.log(
        "[SUPER BOT] +" +
        chargeAmount.toFixed(
            1
        ) +
        "% | total=" +
        battleState.enemySuperCharge.toFixed(
            1
        ) +
        "%"
    );
    updateBattleSuperUI();
}
function flashBattleHealthBar(
    element
) {
    if (!element) {
        return;
    }
    element.classList.remove(
        "battle-hit-flash"
    );
    void element.offsetWidth;
    element.classList.add(
        "battle-hit-flash"
    );
    setTimeout(
        () => {
            element.classList.remove(
                "battle-hit-flash"
            );
        },
        180
    );
}
const BATTLE_SHIELD_REDUCTION =
    0.30;
function getBattleShieldTurns(
    side
) {
    return (
        side ===
        "enemy"
        ?
        battleState.enemyShieldTurns
        :
        battleState.playerShieldTurns
    ) || 0;
}
function setBattleShieldTurns(
    side,
    turns
) {
    const safeTurns =
        Math.max(
            0,
            Math.round(
                Number(turns) || 0
            )
        );
    if (
        side ===
        "enemy"
    ) {
        battleState.enemyShieldTurns =
            safeTurns;
    }
    else {
        battleState.playerShieldTurns =
            safeTurns;
    }
    updateBattleShieldVisuals();
}
function ensureNitaShieldVisual(element) {
    if (!element || element.querySelector(".nita-shield-vfx")) return;
    const effect = document.createElement("div");
    effect.className = "nita-shield-vfx";
    effect.setAttribute("aria-hidden", "true");
    effect.innerHTML = '<i class="nita-shield-orbit"></i><i class="nita-shield-orbit second"></i>' +
        '<svg class="nita-shield-crest" viewBox="0 0 32 38" fill="none"><path d="M16 2L29 7V19C29 27 22 33 16 36C10 33 3 27 3 19V7Z" fill="#805017" stroke="#fff0b2" stroke-width="2"/><path d="M16 6L25 10V19C25 25 20 30 16 32C12 30 7 25 7 19V10Z" fill="#ffd365"/><path d="M10 19L14 23L23 13" stroke="#704111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    [[20,8],[75,12],[96,35],[94,73],[72,94],[24,92],[1,65],[3,30]].forEach(([x,y], index) => {
        const spark = document.createElement("i");
        spark.className = "nita-shield-spark";
        spark.style.setProperty("--x", x + "%");
        spark.style.setProperty("--y", y + "%");
        spark.style.setProperty("--delay", (-index * 240) + "ms");
        effect.appendChild(spark);
    });
    element.appendChild(effect);
}
function updateBattleShieldVisuals() {
    const playerShielded =
        getBattleShieldTurns(
            "player"
        ) > 0;
    const enemyShielded =
        getBattleShieldTurns(
            "enemy"
        ) > 0;
    const playerStage =
        document.getElementById(
            "battlePlayerStage"
        );
    const enemyStage =
        document.getElementById(
            "battleEnemyStage"
        );
    const playerBear =
        document.getElementById(
            "battlePlayerBearUnit"
        );
    const enemyBear =
        document.getElementById(
            "battleEnemyBearUnit"
        );
    [playerStage, enemyStage, playerBear, enemyBear].forEach(ensureNitaShieldVisual);
    if (playerStage) {
        playerStage.classList.toggle(
            "shielded",
            playerShielded
        );
    }
    if (enemyStage) {
        enemyStage.classList.toggle(
            "shielded",
            enemyShielded
        );
    }
    if (playerBear) {
        playerBear.classList.toggle(
            "shielded",
            playerShielded &&
            hasActiveBattleBear(
                "player"
            )
        );
    }
    if (enemyBear) {
        enemyBear.classList.toggle(
            "shielded",
            enemyShielded &&
            hasActiveBattleBear(
                "enemy"
            )
        );
    }
}
function consumeBattleShieldTurn(
    side
) {
    const turns =
        getBattleShieldTurns(
            side
        );
    if (
        turns <=
        0
    ) {
        return;
    }
    setBattleShieldTurns(
        side,
        turns - 1
    );
}
function getBattleDamageAfterShield(
    side,
    damage
) {
    const amount =
        Math.max(
            0,
            Math.round(
                Number(damage) || 0
            )
        );
    if (
        getBattleShieldTurns(
            side
        ) <= 0
    ) {
        return amount;
    }
    return Math.max(
        0,
        Math.round(
            amount *
            (
                1 -
                BATTLE_SHIELD_REDUCTION
            )
        )
    );
}
function getBattleBearPower(
    side
) {
    return (
        side === "enemy"
        ?
        (
            battleState.enemyPower ||
            1
        )
        :
        (
            brawlers["Nita"]?.power ||
            1
        )
    );
}
function getBattleBearMaxHealth(
    side
) {
    const base =
        brawlers["Nita"]?.superStats?.bearHealth || 0;
    return getScaledDamage(
        base,
        getBattleBearPower(side)
    );
}
function getBattleBearAttack(
    side
) {
    const base =
        brawlers["Nita"]?.superStats?.attack || 0;
    return getScaledDamage(
        base,
        getBattleBearPower(side)
    );
}
function hasActiveBattleBear(
    side
) {
    return (
        side === "enemy"
        ?
        battleState.enemyBearHealth
        :
        battleState.playerBearHealth
    ) > 0;
}
function updateBattleBearUI(
    side
) {
    const isEnemy =
        side === "enemy";
    const unit =
        document.getElementById(
            isEnemy
            ? "battleEnemyBearUnit"
            : "battlePlayerBearUnit"
        );
    const bearImage =
        document.getElementById(
            isEnemy
            ? "battleEnemyBearImage"
            : "battlePlayerBearImage"
        );
    const healthText =
        document.getElementById(
            isEnemy
            ? "battleEnemyBearHealthText"
            : "battlePlayerBearHealthText"
        );
    const healthFill =
        document.getElementById(
            isEnemy
            ? "battleEnemyBearHealthFill"
            : "battlePlayerBearHealthFill"
        );
    const health =
        isEnemy
        ? battleState.enemyBearHealth
        : battleState.playerBearHealth;
    const maxHealth =
        isEnemy
        ? battleState.enemyBearMaxHealth
        : battleState.playerBearMaxHealth;
    if (bearImage) {
        const ownerName =
            isEnemy
            ? battleState.enemyName
            : battleState.playerName;
        if (ownerName === "Nita") {
            /*
               Le joueur garde le Bruce correspondant
               au skin équipé de Nita. Le BOT, lui,
               utilise toujours Bruce classique.
            */
            const bearSkin =
                isEnemy
                ? NITA_DEFAULT_BEAR_IMAGE
                : getNitaBearImageForSkin(
                    brawlers.Nita?.image
                );
            bearImage.src =
                bearSkin;
            bearImage.alt =
                bearSkin ===
                NITA_CHAMPION_BEAR_IMAGE
                ? "Bruce Champion"
                : "Bruce";
        }
        else {
            bearImage.src =
                NITA_DEFAULT_BEAR_IMAGE;
            bearImage.alt =
                "Bruce";
        }
    }
    if (unit) {
        unit.classList.toggle(
            "hidden",
            !(
                health > 0 &&
                (
                    isEnemy
                    ? battleState.enemyName === "Nita"
                    : battleState.playerName === "Nita"
                )
            )
        );
    }
    if (healthText) {
        healthText.innerText =
            health > 0
            ?
            health + " / " + maxHealth
            :
            "0 / 0";
    }
    if (healthFill) {
        const percent =
            maxHealth > 0
            ? Math.max(0, Math.min(100, (health / maxHealth) * 100))
            : 0;
        healthFill.style.width =
            percent + "%";
    }
    updateBattleShieldVisuals();
}
function summonBattleBear(
    side
) {
    const maxHealth =
        getBattleBearMaxHealth(
            side
        );
    if (side === "enemy") {
        battleState.enemyBearMaxHealth =
            maxHealth;
        battleState.enemyBearHealth =
            maxHealth;
    }
    else {
        battleState.playerBearMaxHealth =
            maxHealth;
        battleState.playerBearHealth =
            maxHealth;
    }
    updateBattleBearUI(side);
    updateBattleShieldVisuals();
}
function getPiercingBattleMessageSuffix(
    result
) {
    if (
        !result ||
        result.targetType !==
        "bear+brawler"
    ) {
        return "";
    }
    return " · TRANSPERCE L'OURS ET NITA";
}
function triggerBattleDamageShake(
    side
) {
    const stageId =
        side === "enemy"
        ? "battleEnemyStage"
        : "battlePlayerStage";
    const stage =
        document.getElementById(
            stageId
        );
    if (!stage) {
        return;
    }
    /*
       Le stage possède déjà une animation idle permanente sur `transform`.
       Le Web Animations API anime uniquement `translate` : le shake ne peut
       donc plus écraser l'idle ni le déplacement lié à la distance.
    */
    if (typeof stage.animate === "function") {
        stage.animate(
            [
                { translate: "0px 0px" },
                { translate: "-4px 0px" },
                { translate: "4px 0px" },
                { translate: "-3px 0px" },
                { translate: "3px 0px" },
                { translate: "-1px 0px" },
                { translate: "0px 0px" }
            ],
            {
                duration: 240,
                easing: "ease-out"
            }
        );
        return;
    }
    /* Fallback ancien navigateur. */
    stage.classList.remove(
        "damage-shake"
    );
    void stage.offsetWidth;
    stage.classList.add(
        "damage-shake"
    );
    setTimeout(
        () => stage.classList.remove(
            "damage-shake"
        ),
        260
    );
}
function playBattleShieldImpact(side) {
    if (getBattleShieldTurns(side) <= 0) return;
    if (window.brawlSfx) {
        window.brawlSfx.play('shield');
    }
    const prefix = side === "enemy" ? "battleEnemy" : "battlePlayer";
    ["Stage", "BearUnit"].forEach(suffix => {
        const element = document.getElementById(prefix + suffix);
        if (!element || !element.classList.contains("shielded")) return;
        clearTimeout(element.shieldImpactTimer);
        element.classList.remove("shield-impact");
        void element.offsetWidth;
        element.classList.add("shield-impact");
        element.shieldImpactTimer = setTimeout(() => element.classList.remove("shield-impact"), 430);
    });
}
function applyBattleDamageToSide(
    side,
    damage,
    options = {}
) {
    const rawAmount =
        Math.max(
            0,
            Math.round(
                Number(damage) || 0
            )
        );
    const amount =
        getBattleDamageAfterShield(
            side,
            rawAmount
        );
    const piercing =
        options.piercing ===
        true;
    if (amount <= 0) {
        return {
            redirectedToBear: false,
            piercing: piercing,
            bearDamage: 0,
            brawlerDamage: 0,
            actualDamage: 0,
            targetKO: false,
            targetType: "none"
        };
    }
    playBattleShieldImpact(side);
    if (window.brawlSfx) {
        window.brawlSfx.play(
            side === "player"
            ? 'hurt'
            : 'impact'
        );
    }
    const brawlerName =
        side === "enemy"
        ?
        battleState.enemyName
        :
        battleState.playerName;
    const bearActive =
        (
            brawlerName ===
            "Nita"
        ) &&
        hasActiveBattleBear(
            side
        );
    /*
       INVOCATION DE NITA
       ------------------
       Attaque normale :
       l'ours absorbe tous les dégâts à la place de Nita.
       Attaque transperçante :
       le projectile / déplacement traverse l'ours
       et touche aussi Nita derrière.
    */
    if (bearActive) {
        if (side === "enemy") {
            battleState.enemyBearHealth =
                Math.max(
                    0,
                    battleState.enemyBearHealth -
                    amount
                );
        }
        else {
            battleState.playerBearHealth =
                Math.max(
                    0,
                    battleState.playerBearHealth -
                    amount
                );
        }
        updateBattleBearUI(
            side
        );
        if (!piercing) {
            return {
                redirectedToBear: true,
                piercing: false,
                bearDamage: amount,
                brawlerDamage: 0,
                actualDamage: amount,
                targetKO:
                    side === "enemy"
                    ?
                    battleState.enemyBearHealth <= 0
                    :
                    battleState.playerBearHealth <= 0,
                targetType: "bear"
            };
        }
    }
    /*
       Si l'attaque est transperçante,
       Nita reçoit les dégâts même si son ours
       était encore vivant devant elle.
    */
    if (side === "enemy") {
        battleState.enemyHealth =
            Math.max(
                0,
                battleState.enemyHealth -
                amount
            );
    }
    else {
        battleState.playerHealth =
            Math.max(
                0,
                battleState.playerHealth -
                amount
            );
    }
    triggerBattleDamageShake(
        side
    );
    updateBattleHealthUI(
        side
    );
    markBattleBrawlerHit(
        side,
        amount
    );
    return {
        redirectedToBear:
            bearActive,
        piercing:
            piercing,
        bearDamage:
            bearActive
            ?
            amount
            :
            0,
        brawlerDamage:
            amount,
        actualDamage:
            amount,
        targetKO:
            side === "enemy"
            ?
            battleState.enemyHealth <= 0
            :
            battleState.playerHealth <= 0,
        targetType:
            bearActive &&
            piercing
            ?
            "bear+brawler"
            :
            "brawler"
    };
}
function isBattleStarPowerActive(
    side,
    brawlerName
) {
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    if (!starPower) return false;
    if (side === "enemy") {
        return isEnemyStarPowerBattleActive(
            brawlerName
        );
    }
    return Boolean(
        battleState.playerName === brawlerName &&
        Number(brawlers[brawlerName]?.power) >= starPower.requiredPower &&
        isBrawlerStarPowerOwned(
            brawlerName,
            starPower.id
        )
    );
}
function isPlayerStarPowerBattleActive(
    brawlerName
) {
    return isBattleStarPowerActive(
        "player",
        brawlerName
    );
}
function getColtBasicBulletCapacity(
    side = "player",
    brawlerName = "Colt"
) {
    if (
        brawlerName === "Colt" &&
        isBattleStarPowerActive(
            side,
            "Colt"
        )
    ) {
        const starPower =
            getBrawlerStarPower(
                "Colt"
            );
        return Math.max(
            6,
            Number(
                starPower?.effect?.bullets
            ) || 7
        );
    }
    return 6;
}
function isBullRageActive(
    side = "player"
) {
    const isEnemy =
        side === "enemy";
    const currentHealth =
        isEnemy
        ? battleState.enemyHealth
        : battleState.playerHealth;
    const maxHealth =
        isEnemy
        ? battleState.enemyMaxHealth
        : battleState.playerMaxHealth;
    const correctBrawler =
        isEnemy
        ? battleState.enemyName === "Bull"
        : battleState.playerName === "Bull";
    if (
        !correctBrawler ||
        !isBattleStarPowerActive(
            side,
            "Bull"
        ) ||
        !(maxHealth > 0)
    ) {
        return false;
    }
    const starPower =
        getBrawlerStarPower(
            "Bull"
        );
    const threshold =
        Number(
            starPower?.effect?.healthThreshold
        ) || 0.60;
    return (
        currentHealth /
        maxHealth
    ) < threshold;
}
function applyBullRageDamageBonus(
    damage,
    side = "player"
) {
    const safeDamage =
        Math.max(
            0,
            Number(damage) || 0
        );
    if (!isBullRageActive(side)) {
        return Math.round(safeDamage);
    }
    const starPower =
        getBrawlerStarPower(
            "Bull"
        );
    const multiplier =
        Number(
            starPower?.effect?.damageMultiplier
        ) || 1.20;
    return Math.round(
        safeDamage * multiplier
    );
}
function updateBullRageVisuals() {
    const playerStage =
        document.getElementById(
            "battlePlayerStage"
        );
    const enemyStage =
        document.getElementById(
            "battleEnemyStage"
        );
    if (playerStage) {
        playerStage.classList.toggle(
            "bull-rage-active",
            isBullRageActive(
                "player"
            )
        );
    }
    if (enemyStage) {
        enemyStage.classList.toggle(
            "bull-rage-active",
            isBullRageActive(
                "enemy"
            )
        );
    }
}
function applyNitaBearClaw(
    bearOwnerSide,
    targetSide
) {
    if (
        battleState.currentDistance !== 1 ||
        !hasActiveBattleBear(bearOwnerSide)
    ) {
        return {
            applied: false,
            damage: 0,
            result: null
        };
    }
    const clawDamage =
        getBattleBearAttack(
            bearOwnerSide
        );
    const nitaStarPower =
        getBrawlerStarPower(
            "Nita"
        );
    const bearOwnerBrawlerName =
        bearOwnerSide === "enemy"
        ? battleState.enemyName
        : battleState.playerName;
    const doubleClawActive =
        bearOwnerBrawlerName === "Nita" &&
        nitaStarPower &&
        isBattleStarPowerActive(
            bearOwnerSide,
            "Nita"
        );
    const requestedHits =
        doubleClawActive
        ? Math.max(
            2,
            Number(
                nitaStarPower.effect?.hits
            ) || 2
        )
        : 1;
    const results = [];
    let totalDamage = 0;
    let hits = 0;
    for (
        let i = 0;
        i < requestedHits;
        i++
    ) {
        const targetHealth =
            targetSide === "enemy"
            ? battleState.enemyHealth
            : battleState.playerHealth;
        if (targetHealth <= 0) {
            break;
        }
        const result =
            applyBattleDamageToSide(
                targetSide,
                clawDamage
            );
        results.push(
            result
        );
        totalDamage +=
            getBattleDamageResultTotal(
                result
            );
        hits += 1;
    }
    return {
        applied: hits > 0,
        damage: totalDamage,
        perHitDamage: clawDamage,
        hits,
        starPowerActive: doubleClawActive,
        result: results[
            results.length - 1
        ] || null,
        results
    };
}
function showBattleBearStats(
    side
) {
    if (
        side !== "player" &&
        side !== "enemy"
    ) {
        return;
    }
    if (
        !hasActiveBattleBear(
            side
        )
    ) {
        return;
    }
    const brawlerName =
        side === "enemy"
        ?
        battleState.enemyName
        :
        battleState.playerName;
    /*
       L'ours utilise exactement la même fiche
       que Nita.
       Clic sur l'ours :
       -> ouvre Nita
       -> directement sur l'onglet SUPER
       -> photo de l'ours.
    */
    if (
        brawlerName !==
        "Nita"
    ) {
        return;
    }
    showBattleStats(
        side
    );
    setBattleStatsMode(
        "super"
    );
}
function setBattleHealthVisualOnly(
    side,
    health
) {
    const isEnemy =
        side ===
        "enemy";
    const maxHealth =
        isEnemy
        ?
        battleState.enemyMaxHealth
        :
        battleState.playerMaxHealth;
    const textId =
        isEnemy
        ?
        "battleEnemyHealthText"
        :
        "battlePlayerHealthText";
    const fillId =
        isEnemy
        ?
        "battleEnemyHealthFill"
        :
        "battlePlayerHealthFill";
    const healthText =
        document.getElementById(
            textId
        );
    const healthFill =
        document.getElementById(
            fillId
        );
    const safeHealth =
        Math.max(
            0,
            Math.min(
                maxHealth,
                Math.round(
                    health
                )
            )
        );
    if (healthText) {
        healthText.innerText =
            safeHealth +
            " / " +
            maxHealth;
    }
    if (healthFill) {
        const percent =
            maxHealth > 0
            ?
            (
                safeHealth /
                maxHealth
            ) * 100
            :
            0;
        healthFill.style.width =
            Math.max(
                0,
                Math.min(
                    100,
                    percent
                )
            ) + "%";
        flashBattleHealthBar(
            healthFill
        );
    }
}
function animateColtHealthByBullets(
    side,
    startHealth,
    finalHealth,
    bulletsHit,
    damagePerBullet
) {
    const bulletCount =
        Math.max(
            0,
            Math.round(
                Number(
                    bulletsHit
                ) || 0
            )
        );
    /*
       Si les dégâts ont été absorbés par l'ours de Nita
       ou qu'aucun PV du Brawler n'a été perdu,
       on laisse l'affichage normal.
    */
    if (
        bulletCount <= 0 ||
        finalHealth >=
            startHealth
    ) {
        return;
    }
    const perBullet =
        Math.max(
            0,
            Number(
                damagePerBullet
            ) || 0
        );
    /*
       applyBattleDamageToSide() a déjà calculé le résultat
       final. On remet simplement l'AFFICHAGE au niveau de
       départ avant le prochain repaint, puis on le descend
       balle par balle sans modifier une seconde fois les PV.
    */
    setBattleHealthVisualOnly(
        side,
        startHealth
    );
    let bulletIndex =
        0;
    const playNextBullet =
        () => {
            bulletIndex +=
                1;
            const displayedHealth =
                Math.max(
                    finalHealth,
                    startHealth -
                    perBullet *
                    bulletIndex
                );
            setBattleHealthVisualOnly(
                side,
                displayedHealth
            );
            if (
                bulletIndex <
                bulletCount &&
                displayedHealth >
                finalHealth
            ) {
                setTimeout(
                    playNextBullet,
                    190
                );
            }
            else {
                /*
                   Synchronisation finale exacte avec l'état
                   réel du combat.
                */
                setBattleHealthVisualOnly(
                    side,
                    finalHealth
                );
            }
        };
    setTimeout(
        playNextBullet,
        90
    );
}
function updateBattleHealthUI(
    side
) {
    const isEnemy =
        side ===
        "enemy";
    const health =
        isEnemy
        ?
        battleState.enemyHealth
        :
        battleState.playerHealth;
    const maxHealth =
        isEnemy
        ?
        battleState.enemyMaxHealth
        :
        battleState.playerMaxHealth;
    const textId =
        isEnemy
        ?
        "battleEnemyHealthText"
        :
        "battlePlayerHealthText";
    const fillId =
        isEnemy
        ?
        "battleEnemyHealthFill"
        :
        "battlePlayerHealthFill";
    const healthText =
        document.getElementById(
            textId
        );
    const healthFill =
        document.getElementById(
            fillId
        );
    if (healthText) {
        healthText.innerText =
            health +
            " / " +
            maxHealth;
    }
    if (healthFill) {
        const percent =
            maxHealth > 0
            ?
            (
                health /
                maxHealth
            ) * 100
            :
            0;
        healthFill.style.width =
            Math.max(
                0,
                Math.min(
                    100,
                    percent
                )
            ) + "%";
        flashBattleHealthBar(
            healthFill
        );
    }
    updateBullRageVisuals();
}
function snapshotBattleQuestState() {
    battleState.questSnapshot =
        JSON.parse(
            JSON.stringify(
                state.quests
            )
        );
    battleState.resourcesSnapshot =
        JSON.parse(
            JSON.stringify(
                state.resources
            )
        );
    battleState.seasonOneSnapshot =
        JSON.parse(
            JSON.stringify(
                state.seasonOne
            )
        );
    battleState.quitCancelledProgress =
        false;
}
function clearBattleQuestSnapshot() {
    battleState.questSnapshot =
        null;
    battleState.resourcesSnapshot =
        null;
    battleState.seasonOneSnapshot =
        null;
    battleState.quitCancelledProgress =
        false;
}
function restoreBattleQuestStateFromSnapshot() {
    if (
        !battleState.questSnapshot ||
        !battleState.resourcesSnapshot
    ) {
        return;
    }
    state.quests =
        JSON.parse(
            JSON.stringify(
                battleState.questSnapshot
            )
        );
    state.resources =
        JSON.parse(
            JSON.stringify(
                battleState.resourcesSnapshot
            )
        );
    if (battleState.seasonOneSnapshot) {
        state.seasonOne =
            JSON.parse(
                JSON.stringify(
                    battleState.seasonOneSnapshot
                )
            );
    }
    battleState.quitCancelledProgress =
        true;
    clearBattleQuestSnapshot();
    updateResources();
    renderQuests();
    saveGame();
}
function quitBattleMatch() {
    restoreBattleQuestStateFromSnapshot();
    battleState.rewardsGranted =
        true;
    playTransitionLoading(
        "RETOUR AU LOBBY",
        () => {
            showHome();
        },
        750
    );
}
function startBattleLaunchTransition() {
    snapshotBattleQuestState();
    registerQuestBattleStarted();
    const transition =
        document.getElementById(
            "battleStartTransition"
        );
    const versus =
        document.getElementById(
            "battleStartVersus"
        );
    const transitionCoin =
        document.getElementById(
            "battleTransitionCoin"
        );
    const transitionCoinText =
        document.getElementById(
            "battleTransitionCoinText"
        );
    const starterAnnouncement =
        document.getElementById(
            "battleStarterAnnouncement"
        );
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (attackButton) {
        attackButton.disabled =
            true;
    }
    battleState.enemyTurn =
        true;
    if (versus) {
        versus.innerText =
            battleState.playerName +
            "  VS  " +
            battleState.enemyName;
    }
    if (actionMessage) {
        actionMessage.innerText =
            "Prépare-toi...";
    }
    if (starterAnnouncement) {
        starterAnnouncement.innerText =
            "";
        starterAnnouncement.classList.remove(
            "player-start",
            "enemy-start"
        );
    }
    if (transitionCoin) {
        transitionCoin.className =
            "battle-transition-coin";
        transitionCoin.innerText =
            "?";
    }
    if (transitionCoinText) {
        transitionCoinText.innerText =
            "PILE OU FACE...";
    }
    if (transition) {
        transition.classList.remove(
            "active",
            "starter-mode"
        );
        void transition.offsetWidth;
        transition.classList.add(
            "active"
        );
    }
    /*
       1) La pièce tourne sur l'écran COMBAT.
    */
    battleLaunchTransitionTimer =
        setTimeout(
            () => {
                battleLaunchTransitionTimer =
                    null;
                if (transitionCoin) {
                    transitionCoin.className =
                        "battle-transition-coin flipping";
                }
                if (transitionCoinText) {
                    transitionCoinText.innerText =
                        "LA PIÈCE TOURNE...";
                }
                const playerStarts =
                    Math.random() <
                    0.5;
                /*
                   2) Résultat PILE / FACE.
                */
                battleLaunchTransitionTimer =
                    setTimeout(
                        () => {
                            battleLaunchTransitionTimer =
                                null;
                            if (transitionCoin) {
                                transitionCoin.className =
                                    "battle-transition-coin " +
                                    (
                                        playerStarts
                                        ?
                                        "result-player"
                                        :
                                        "result-enemy"
                                    );
                                transitionCoin.innerText =
                                    playerStarts
                                    ?
                                    "PILE"
                                    :
                                    "FACE";
                            }
                            if (transitionCoinText) {
                                transitionCoinText.innerText =
                                    playerStarts
                                    ?
                                    "PILE"
                                    :
                                    "FACE";
                            }
                            const startingPseudo =
                                playerStarts
                                ?
                                (
                                    state.profile.name ||
                                    "Joueur"
                                )
                                :
                                battleState.enemyPseudo;
                            /*
                               3) Ensuite une grosse annonce
                               au centre de l'écran.
                            */
                            battleLaunchTransitionTimer =
                                setTimeout(
                                    () => {
                                        battleLaunchTransitionTimer =
                                            null;
                                        if (starterAnnouncement) {
                                            starterAnnouncement.innerText =
                                                startingPseudo +
                                                " COMMENCE LA PARTIE !";
                                            starterAnnouncement.classList.remove(
                                                "player-start",
                                                "enemy-start"
                                            );
                                            starterAnnouncement.classList.add(
                                                playerStarts
                                                ?
                                                "player-start"
                                                :
                                                "enemy-start"
                                            );
                                        }
                                        if (transition) {
                                            transition.classList.add(
                                                "starter-mode"
                                            );
                                        }
                                        /*
                                           4) L'interface de combat arrive
                                           seulement après l'annonce.
                                        */
                                        battleLaunchTransitionTimer =
                                            setTimeout(
                                                () => {
                                                    battleLaunchTransitionTimer =
                                                        null;
                                                    if (transition) {
                                                        transition.classList.remove(
                                                            "active",
                                                            "starter-mode"
                                                        );
                                                    }
                                                    if (playerStarts) {
                                                        battleState.enemyTurn =
                                                            false;
                                                        if (actionMessage) {
                                                            actionMessage.innerText =
                                                                startingPseudo +
                                                                " commence !";
                                                        }
                                                        startDistanceRound(
                                                            "player"
                                                        );
                                                    }
                                                    else {
                                                        battleState.enemyTurn =
                                                            true;
                                                        if (actionMessage) {
                                                            actionMessage.innerText =
                                                                startingPseudo +
                                                                " commence !";
                                                        }
                                                        battleEnemyAttackTimer =
                                                            setTimeout(
                                                                () => {
                                                                    battleEnemyAttackTimer =
                                                                        null;
                                                                    startDistanceRound(
                                                                        "bot"
                                                                    );
                                                                },
                                                                450
                                                            );
                                                    }
                                                },
                                                1750
                                            );
                                    },
                                    650
                                );
                        },
                        760
                    );
            },
            330
        );
}
const BATTLE_TROPHY_TIERS = [
    { max: 249, win: 20, loss: 0 },
    { max: 499, win: 15, loss: -3 },
    { max: 749, win: 10, loss: -5 },
    { max: 999, win: 7, loss: -7 },
    { max: Infinity, win: 5, loss: -10 }
];
function getBattleTrophyDelta(
    brawlerName,
    victory
) {
    const trophies =
        getBrawlerTrophies(
            brawlerName
        );
    const tier =
        BATTLE_TROPHY_TIERS.find(
            item => trophies <= item.max
        ) || BATTLE_TROPHY_TIERS[BATTLE_TROPHY_TIERS.length - 1];
    return victory
        ? tier.win
        : tier.loss;
}
function applyBattleTrophyDelta(
    brawlerName,
    victory
) {
    const before =
        getBrawlerTrophies(
            brawlerName
        );
    const requestedDelta =
        getBattleTrophyDelta(
            brawlerName,
            victory
        );
    const after =
        Math.max(
            0,
            before + requestedDelta
        );
    state.brawlerTrophies[
        brawlerName
    ] = after;
    /*
       Retourne le changement réellement appliqué.
       Cela évite d'afficher une perte impossible
       si le Brawler est déjà proche de 0 trophée.
    */
    return after - before;
}
function grantBattleVictoryRewards() {
    clearBattleQuestSnapshot();
    if (
        battleState.rewardsGranted
    ) {
        return;
    }
    battleState.rewardsGranted =
        true;
    if (window.brawlSfx) {
        window.brawlSfx.play('victory');
    }
    registerSeasonMatchCompleted();
    const DUEL_TOKEN_REWARD =
        25;
    const selectedName =
        battleState.playerName;
    registerQuestWin();
    state.resources.tokens +=
        DUEL_TOKEN_REWARD;
    battleState.trophyChange =
        applyBattleTrophyDelta(
            selectedName,
            true
        );
    syncTotalTrophies();
    saveGame();
    updateResources();
    updateSelectedBrawler();
    renderBrawlers();
    setTimeout(
        () => {
            showBattleVictoryRecap();
        },
        1400
    );
}
function grantBattleDefeatRewards() {
    clearBattleQuestSnapshot();
    if (
        battleState.rewardsGranted
    ) {
        return;
    }
    battleState.rewardsGranted =
        true;
    if (window.brawlSfx) {
        window.brawlSfx.play('defeat');
    }
    registerSeasonMatchCompleted();
    const DUEL_DEFEAT_TOKEN_REWARD =
        10;
    const selectedName =
        battleState.playerName;
    state.resources.tokens +=
        DUEL_DEFEAT_TOKEN_REWARD;
    battleState.trophyChange =
        applyBattleTrophyDelta(
            selectedName,
            false
        );
    syncTotalTrophies();
    saveGame();
    updateResources();
    updateSelectedBrawler();
    renderBrawlers();
}
function showBattleLossMessage() {
    grantBattleDefeatRewards();
    const recap =
        document.getElementById(
            "battleLossToast"
        );
    if (!recap) {
        return;
    }
    const defeatMessage =
        recap.querySelector(
            ".battle-defeat-message"
        );
    if (defeatMessage) {
        const trophyChange =
            Number.isFinite(
                battleState.trophyChange
            )
            ? battleState.trophyChange
            : 0;
        defeatMessage.innerText =
            "+10 TOKENS · " +
            (
                trophyChange > 0
                ? "+" + trophyChange
                : String(trophyChange)
            ) +
            " TR";
    }
    recap.classList.add(
        "active"
    );
    recap.setAttribute(
        "aria-hidden",
        "false"
    );
}
function closeBattleLossRecap() {
    const recap =
        document.getElementById(
            "battleLossToast"
        );
    if (recap) {
        recap.classList.remove(
            "active"
        );
        recap.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    playTransitionLoading(
        "RETOUR AU LOBBY",
        () => {
            showHome();
            setTimeout(
                () => {
                    showPostBattleRewards(
                        false
                    );
                },
                220
            );
        },
        1200
    );
}
function showBattleVictoryRecap() {
    const recap =
        document.getElementById(
            "battleVictoryRecap"
        );
    const brawlerName =
        document.getElementById(
            "battleVictoryBrawler"
        );
    if (brawlerName) {
        brawlerName.innerText =
            battleState.playerName;
    }
    if (recap) {
        recap.classList.add(
            "active"
        );
        recap.setAttribute(
            "aria-hidden",
            "false"
        );
    }
}
function closeBattleVictoryRecap() {
    const recap =
        document.getElementById(
            "battleVictoryRecap"
        );
    if (recap) {
        recap.classList.remove(
            "active"
        );
        recap.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    playTransitionLoading(
        "RETOUR AU LOBBY",
        () => {
            showHome();
            setTimeout(
                () => {
                    showPostBattleRewards(
                        true
                    );
                },
                220
            );
        },
        1200
    );
}
function showPostBattleRewards(
    victory
) {
    const overlay =
        document.getElementById(
            "postBattleRewardsOverlay"
        );
    const title =
        document.getElementById(
            "postBattleRewardsTitle"
        );
    const subtitle =
        document.getElementById(
            "postBattleRewardsSubtitle"
        );
    const content =
        document.getElementById(
            "postBattleRewardsContent"
        );
    if (
        !overlay ||
        !content
    ) {
        return;
    }
    if (title) {
        title.innerText =
            "RÉCOMPENSES";
    }
    if (subtitle) {
        subtitle.innerText =
            victory
            ?
            battleState.playerName +
            " · VICTOIRE"
            :
            battleState.playerName +
            " · DÉFAITE";
    }
    const trophyChange =
        Number.isFinite(
            battleState.trophyChange
        )
        ? battleState.trophyChange
        : 0;
    const trophyChangeText =
        trophyChange > 0
        ? "+" + trophyChange
        : String(trophyChange);
    if (victory) {
        content.innerHTML =
            `
                <div class="post-battle-reward-row">

                    <img
                        src="Icon/trophy.png"
                        alt="Trophées"
                    >

                    <div class="post-battle-reward-copy">

                        <strong>
                            TROPHÉES
                        </strong>

                        <span>
                            PROGRESSION DU BRAWLER
                        </span>

                    </div>

                    <div class="post-battle-reward-amount">
                        ${trophyChangeText}
                    </div>

                </div>

                <div class="post-battle-reward-row">

                    <img
                        src="Icon/Jeton.png"
                        alt="Tokens"
                    >

                    <div class="post-battle-reward-copy">

                        <strong>
                            TOKENS
                        </strong>

                        <span>
                            AJOUTÉS AU COMPTE
                        </span>

                    </div>

                    <div class="post-battle-reward-amount">
                        +25
                    </div>

                </div>
            `;
    }
    else {
        content.innerHTML =
            `
                <div class="post-battle-reward-row">

                    <img
                        src="Icon/trophy.png"
                        alt="Trophées"
                    >

                    <div class="post-battle-reward-copy">

                        <strong>
                            TROPHÉES
                        </strong>

                        <span>
                            ${trophyChange < 0 ? "PERTE DU BRAWLER" : "AUCUNE PERTE"}
                        </span>

                    </div>

                    <div class="post-battle-reward-amount">
                        ${trophyChangeText}
                    </div>

                </div>

                <div class="post-battle-reward-row">

                    <img
                        src="Icon/Jeton.png"
                        alt="Tokens"
                    >

                    <div class="post-battle-reward-copy">

                        <strong>
                            TOKENS
                        </strong>

                        <span>
                            RÉCOMPENSE DE DÉFAITE
                        </span>

                    </div>

                    <div class="post-battle-reward-amount">
                        +10
                    </div>

                </div>
            `;
    }
    overlay.classList.add(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}
function closePostBattleRewards() {
    const overlay =
        document.getElementById(
            "postBattleRewardsOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}
function beginBattleActionTracking(
    actor
) {
    battleState.battleActionTrackingActive =
        true;
    battleState.battleActionActor =
        actor;
    battleState.battleActionPlayerWasHit =
        false;
    battleState.battleActionEnemyWasHit =
        false;
    battleState.battleActionPlayerRegenGranted =
        false;
    battleState.battleActionEnemyRegenGranted =
        false;
    battleState.battleActionSkipped =
        false;
}
function markBattleBrawlerHit(
    side,
    damage
) {
    if (
        !battleState.battleActionTrackingActive ||
        !Number.isFinite(
            Number(
                damage
            )
        ) ||
        Number(
            damage
        ) <= 0
    ) {
        return;
    }
    if (
        side ===
        "player"
    ) {
        battleState.battleActionPlayerWasHit =
            true;
    }
    else {
        battleState.battleActionEnemyWasHit =
            true;
    }
}
function markBattleActionSkipped() {
    if (
        battleState.battleActionTrackingActive
    ) {
        battleState.battleActionSkipped =
            true;
    }
}
function finalizeBattleActionRegen(
    actor
) {
    if (
        !battleState.battleActionTrackingActive
    ) {
        return;
    }
    const targetSide =
        actor ===
        "player"
        ?
        "enemy"
        :
        "player";
    const targetWasHit =
        targetSide ===
        "player"
        ?
        battleState.battleActionPlayerWasHit
        :
        battleState.battleActionEnemyWasHit;
    /*
       RÈGLE DE RÉGÉNÉRATION
       ---------------------
       Un Brawler récupère 5 PV dès qu'il ne se fait
       pas toucher pendant l'action adverse.
       L'ours de Nita est une cible séparée :
       si l'ours prend les dégâts mais pas Nita,
       Nita est considérée comme non touchée et régénère.
    */
    if (
        !targetWasHit
    ) {
        healBattleDodger(
            targetSide
        );
    }
    /*
       Si le joueur actif n'a exécuté aucune action
       (passage de tour / tour sauté), il régénère aussi.
    */
    if (
        battleState.battleActionSkipped
    ) {
        healBattleDodger(
            actor ===
            "player"
            ?
            "player"
            :
            "enemy"
        );
    }
    battleState.battleActionTrackingActive =
        false;
}
function healBattleDodger(
    side
) {
    const HEAL =
        5;
    /*
       Évite qu'une esquive / un hors-portée déjà soigné
       soit soigné une seconde fois à la fin de la même action.
    */
    if (
        battleState.battleActionTrackingActive
    ) {
        const regenKey =
            side ===
            "player"
            ?
            "battleActionPlayerRegenGranted"
            :
            "battleActionEnemyRegenGranted";
        if (
            battleState[
                regenKey
            ]
        ) {
            return 0;
        }
        battleState[
            regenKey
        ] =
            true;
    }
    if (
        side ===
        "player"
    ) {
        const before =
            battleState.playerHealth;
        battleState.playerHealth =
            Math.min(
                battleState.playerMaxHealth,
                battleState.playerHealth +
                HEAL
            );
        const healed =
            battleState.playerHealth -
            before;
        if (healed > 0) {
            updateBattleHealthUI(
                "player"
            );
            if (window.brawlSfx) {
                window.brawlSfx.play('heal');
            }
        }
        return healed;
    }
    const before =
        battleState.enemyHealth;
    battleState.enemyHealth =
        Math.min(
            battleState.enemyMaxHealth,
            battleState.enemyHealth +
            HEAL
        );
    const healed =
        battleState.enemyHealth -
        before;
    if (healed > 0) {
        updateBattleHealthUI(
            "enemy"
        );
        if (window.brawlSfx) {
            window.brawlSfx.play('heal');
        }
    }
    return healed;
}
function showBattleDodgeMessage(
    text,
    side,
    label = "ESQUIVE"
) {
    if (window.brawlSfx) {
        window.brawlSfx.play('dodge');
    }
    const wrapper =
        document.getElementById(
            "battleDodgeMessage"
        );
    const textElement =
        document.getElementById(
            "battleDodgeText"
        );
    const labelElement =
        document.getElementById(
            "battleCenterMessageLabel"
        );
    if (
        !wrapper ||
        !textElement
    ) {
        return;
    }
    textElement.innerText =
        text;
    if (labelElement) {
        labelElement.innerText =
            label;
    }
    wrapper.classList.remove(
        "active",
        "player",
        "enemy"
    );
    wrapper.classList.add(
        side === "player"
        ?
        "player"
        :
        "enemy"
    );
    void wrapper.offsetWidth;
    wrapper.classList.add(
        "active"
    );
    setTimeout(
        () => {
            wrapper.classList.remove(
                "active"
            );
        },
        800
    );
}
let battleStatsCurrentSide =
    "player";
let battleStatsCurrentMode =
    "base";
function getBattleStatsPower(
    side
) {
    if (
        side ===
        "enemy"
    ) {
        return (
            battleState.enemyPower ||
            1
        );
    }
    return (
        brawlers[
            battleState.playerName
        ]?.power ||
        1
    );
}
function getBattleStatsSegments(
    value,
    total,
    className
) {
    let html =
        "";
    for (
        let index = 0;
        index < total;
        index++
    ) {
        html += `
            <span class="${className}${index < value ? " active" : ""}"></span>
        `;
    }
    return html;
}
function buildBattleBaseStatsHtml(
    brawler,
    power,
    currentHp,
    maxHp,
    side = "player"
) {
    const healthPercent =
        maxHp > 0
        ?
        Math.max(
            0,
            Math.min(
                100,
                (
                    currentHp /
                    maxHp
                ) * 100
            )
        )
        :
        0;
    let attackHtml =
        "";
    if (
        brawler.attackByDistance
    ) {
        const items =
            Object.entries(
                brawler.attackByDistance
            )
            .map(
                ([distance, baseDamage]) => {
                    const damage =
                        getScaledDamage(
                            baseDamage,
                            power
                        );
                    return `
                        <div class="attack-distance-item">

                            <div class="attack-distance-number">
                                DIST. ${distance}
                            </div>

                            <div class="attack-distance-damage">
                                ${damage}
                            </div>

                            <div class="attack-distance-unit">
                                DÉGÂTS
                            </div>

                        </div>
                    `;
                }
            )
            .join("");
        attackHtml = `
            <div class="attack-distance-stat">

                <div class="attack-distance-header">

                    <div class="brawler-stat-label">
                        Attaque
                    </div>

                    <div class="attack-distance-subtitle">
                        DÉGÂTS / DISTANCE
                    </div>

                </div>

                <div class="attack-distance-grid">
                    ${items}
                </div>

            </div>
        `;
    }
    else {
        const attack =
            getScaledDamage(
                brawler.attack || 0,
                power
            );
        let extraContent =
            "";
        let basePropertyBadges =
            "";
        if (
            typeof brawler.bullets ===
            "number"
        ) {
            extraContent += `
                <span class="base-bullet-info">
                    ${brawler.bullets} BALLES TIRÉES
                </span>
            `;
        }
        if (
            brawler.piercingAttack ===
            true
        ) {
            basePropertyBadges += `
                <span class="piercing-stat-badge">
                    TRANSPERÇANTE
                </span>
            `;
        }
        if (
            brawler.burstAttack ===
            true
        ) {
            basePropertyBadges += `
                <span class="burst-stat-badge">
                    RAFALE
                </span>
            `;
        }
        if (basePropertyBadges) {
            extraContent += `
                <div class="attack-property-badges">
                    ${basePropertyBadges}
                </div>
            `;
        }
        const extra =
            extraContent
            ?
            `
                <div class="base-attack-extra">
                    ${extraContent}
                </div>
            `
            :
            "";
        attackHtml = `
            <div class="brawler-stat">

                <div class="brawler-stat-label">
                    Attaque
                </div>

                <div class="brawler-stat-bar">

                    <div
                        class="brawler-stat-fill"
                        style="width:${Math.min(attack, 100)}%"
                    ></div>

                </div>

                <div class="brawler-stat-value">
                    ${attack}
                </div>

                ${extra}

            </div>
        `;
    }
    const currentDistance =
        Number.isFinite(
            battleState.currentDistance
        )
        ?
        battleState.currentDistance
        :
        null;
    let currentDamage =
        "—";
    if (
        currentDistance !== null
    ) {
        if (
            currentDistance >
            brawler.range
        ) {
            currentDamage =
                "HORS PORTÉE";
        }
        else {
            const statsBrawlerName =
                brawler.name ||
                (
                    brawler ===
                    brawlers[
                        battleState.enemyName
                    ]
                    ?
                    battleState.enemyName
                    :
                    battleState.playerName
                );
            const baseDamage =
                getBattleBasicDamage(
                    statsBrawlerName,
                    currentDistance,
                    side
                );
            currentDamage =
                statsBrawlerName ===
                "Colt"
                ?
                baseDamage +
                " × 1–" +
                (
                    side === "player"
                    ? getColtBasicBulletCapacity(
                        "player",
                        statsBrawlerName
                    )
                    : 6
                ) +
                " BALLES"
                :
                baseDamage;
        }
    }
    return `

        <div class="brawler-stat">

            <div class="brawler-stat-label">
                Vie
            </div>

            <div class="brawler-stat-bar">

                <div
                    class="brawler-stat-fill"
                    style="width:${healthPercent}%"
                ></div>

            </div>

            <div class="brawler-stat-value battle-base-health-value">
                ${currentHp}/${maxHp}
            </div>

        </div>


        ${attackHtml}


        <div class="brawler-stat">

            <div class="brawler-stat-label">
                Vitesse
            </div>

            <div class="speed-gauge">
                ${getBattleStatsSegments(
                    brawler.speed,
                    5,
                    "speed-segment"
                )}
            </div>

            <div class="brawler-stat-value">
                ${brawler.speed}
            </div>

        </div>


        <div class="brawler-stat">

            <div class="brawler-stat-label">
                Portée
            </div>

            <div class="range-gauge">
                ${getBattleStatsSegments(
                    brawler.range,
                    7,
                    "range-segment"
                )}
            </div>

            <div class="brawler-stat-value">
                ${brawler.range}
            </div>

        </div>


        <div class="brawler-stat">

            <div class="brawler-stat-label">
                Champ tir
            </div>

            <div class="shot-field-gauge">
                ${getBattleStatsSegments(
                    brawler.shotField,
                    6,
                    "shot-field-segment"
                )}
            </div>

            <div class="brawler-stat-value">
                ${
                    brawler.shotFieldLabel ||
                    (
                        brawler.attackByDistance &&
                        brawler.shotField > 1
                        ?
                        (
                            "1–" +
                            brawler.shotField
                        )
                        :
                        brawler.shotField
                    )
                }
            </div>

        </div>


        <div class="battle-stats-current-distance">
            DISTANCE ACTUELLE :
            ${currentDistance ?? "—"}
            ${
                currentDistance === null
                ?
                ""
                :
                " · DÉGÂTS : " +
                currentDamage
            }
        </div>

    `;
}
function buildBattleSuperStatsHtml(
    brawler,
    power
) {
    const stats =
        brawler.superStats;
    if (
        !stats ||
        Array.isArray(stats) ||
        typeof stats !==
        "object"
    ) {
        return `
            <div class="super-stats-empty">

                <div class="super-stats-empty-icon">
                    ★
                </div>

                <div class="super-stats-empty-title">
                    STATS DU SUPER
                </div>

            </div>
        `;
    }
    let html =
        "";
    if (
        stats.attackByDistance
    ) {
        const items =
            Object.entries(
                stats.attackByDistance
            )
            .map(
                ([distance, baseDamage]) => {
                    return `
                        <div class="super-distance-item">

                            <div class="super-distance-label">
                                DIST. ${distance}
                            </div>

                            <div class="super-distance-damage">
                                ${getScaledDamage(baseDamage, power)}
                            </div>

                            <div class="super-distance-unit">
                                DÉGÂTS
                            </div>

                        </div>
                    `;
                }
            )
            .join("");
        html += `
            <div class="super-stat-section">

                <div class="super-stat-section-title">
                    DÉGÂTS
                </div>

                <div class="super-distance-grid">
                    ${items}
                </div>

            </div>
        `;
    }
    if (
        typeof stats.bearHealth ===
        "number"
    ) {
        const bearHealth =
            getScaledDamage(
                stats.bearHealth,
                power
            );
        html += `
            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Vie de l'ours
                </div>

                <div class="super-stat-bottom">

                    <div class="super-continuous-gauge">

                        <div
                            class="super-continuous-fill"
                            style="width:${Math.min(100, (bearHealth / MAX_HEALTH_BAR) * 100)}%"
                        ></div>

                    </div>

                    <div class="super-stat-line-value">
                        ${bearHealth}
                    </div>

                </div>

            </div>
        `;
    }
    if (
        typeof stats.attack ===
        "number"
    ) {
        const attack =
            getScaledDamage(
                stats.attack,
                power
            );
        html += `
            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Dégâts
                </div>

                <div class="super-stat-bottom">

                    <div class="super-continuous-gauge">

                        <div
                            class="super-continuous-fill"
                            style="width:${Math.min(attack, 100)}%"
                        ></div>

                    </div>

                    <div class="super-stat-line-value">
                        ${attack}
                    </div>

                </div>

                ${
                    typeof stats.bullets === "number"
                    ?
                    `
                        <div class="super-bullets-info">
                            ${stats.bullets} BALLES TIRÉES
                        </div>
                    `
                    :
                    ""
                }

            </div>
        `;
    }
    if (
        typeof stats.heal ===
        "number"
    ) {
        const heal =
            getScaledDamage(
                stats.heal,
                power
            );
        html += `
            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Soin
                </div>

                <div class="super-stat-bottom">

                    <div class="super-continuous-gauge">

                        <div
                            class="super-continuous-fill"
                            style="width:${Math.min(heal, 100)}%"
                        ></div>

                    </div>

                    <div class="super-stat-line-value">
                        ${heal}
                    </div>

                </div>

            </div>
        `;
    }
    if (
        Number.isFinite(
            stats.range
        )
    ) {
        html += `
            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Portée
                </div>

                <div class="super-stat-bottom">

                    <div class="super-gauge super-range-gauge">
                        ${
                            getBattleStatsSegments(
                                stats.range,
                                7,
                                "super-gauge-segment"
                            )
                        }
                    </div>

                    <div class="super-stat-line-value">
                        ${stats.range}
                    </div>

                </div>

            </div>
        `;
    }
    if (
        Number.isFinite(
            stats.shotField
        )
    ) {
        html += `
            <div class="super-stat-line gauge-line">

                <div class="super-stat-line-label">
                    Champ tir
                </div>

                <div class="super-stat-bottom">

                    <div class="super-gauge">
                        ${
                            getBattleStatsSegments(
                                stats.shotField,
                                6,
                                "super-gauge-segment"
                            )
                        }
                    </div>

                    <div class="super-stat-line-value">
                        ${stats.shotField}
                    </div>

                </div>

            </div>
        `;
    }
    let combatPropertyBadges =
        "";
    if (
        stats.piercing ===
        true
    ) {
        combatPropertyBadges += `
            <span class="piercing-stat-badge">
                TRANSPERÇANTE
            </span>
        `;
    }
    if (
        stats.burst ===
        true
    ) {
        combatPropertyBadges += `
            <span class="burst-stat-badge">
                RAFALE
            </span>
        `;
    }
    if (combatPropertyBadges) {
        html += `
            <div class="attack-property-badges">
                ${combatPropertyBadges}
            </div>
        `;
    }
    return html;
}
function updateBattleStatsSkinForMode() {
    const side =
        battleStatsCurrentSide;
    const brawlerName =
        side === "enemy"
        ?
        battleState.enemyName
        :
        battleState.playerName;
    const brawler =
        brawlers[
            brawlerName
        ];
    const skin =
        document.getElementById(
            "battleStatsSkin"
        );
    if (
        !brawler ||
        !skin
    ) {
        return;
    }
    /*
       Nita :
       BASE  = Nita
       SUPER = Ours
    */
    if (
        brawlerName ===
        "Nita" &&
        battleStatsCurrentMode ===
        "super"
    ) {
        skin.src =
            "Brawlers_skin/Bear_skin_def.webp";
        skin.alt =
            "Ours de Nita";
        skin.className =
            "brawler-detail-skin skin-nita-bear";
        return;
    }
    /*
       BASE de Nita ou n'importe quel autre Brawler :
       on remet le skin normal du Brawler.
    */
    skin.src =
        brawler.image;
    skin.alt =
        brawlerName;
    skin.className =
        "brawler-detail-skin skin-" +
        brawlerName
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );
}
function setBattleStatsMode(
    mode
) {
    battleStatsCurrentMode = ["base", "super", "abilities", "starPower"].includes(mode) ? mode : "base";
    const starActive = battleStatsCurrentMode === "starPower";
    document.getElementById("battleStatsStarPowerPanel")?.classList.toggle("active", starActive);
    document.getElementById("battleStatsStarPowerButton")?.classList.toggle("active", starActive);
    const baseButton =
        document.getElementById(
            "battleStatsBaseButton"
        );
    const superButton =
        document.getElementById(
            "battleStatsSuperButton"
        );
    const abilitiesButton =
        document.getElementById(
            "battleStatsAbilitiesButton"
        );
    const basePanel =
        document.getElementById(
            "battleStatsBasePanel"
        );
    const superPanel =
        document.getElementById(
            "battleStatsSuperPanel"
        );
    const abilitiesPanel =
        document.getElementById(
            "battleStatsAbilitiesPanel"
        );
    if (baseButton) {
        baseButton.classList.toggle(
            "active",
            battleStatsCurrentMode ===
            "base"
        );
    }
    if (superButton) {
        superButton.classList.toggle(
            "active",
            battleStatsCurrentMode ===
            "super"
        );
    }
    if (abilitiesButton) {
        abilitiesButton.classList.toggle(
            "active",
            battleStatsCurrentMode ===
            "abilities"
        );
    }
    if (basePanel) {
        basePanel.classList.toggle(
            "active",
            battleStatsCurrentMode ===
            "base"
        );
    }
    if (superPanel) {
        superPanel.classList.toggle(
            "active",
            battleStatsCurrentMode ===
            "super"
        );
    }
    if (abilitiesPanel) {
        abilitiesPanel.classList.toggle(
            "active",
            battleStatsCurrentMode ===
            "abilities"
        );
    }
    updateBattleStatsSkinForMode();
}
function showBattleStats(
    side
) {
    if (
        side !==
        "player" &&
        side !==
        "enemy"
    ) {
        return;
    }
    battleStatsCurrentSide =
        side;
    battleStatsCurrentMode =
        "base";
    const isEnemy =
        side ===
        "enemy";
    const brawlerName =
        isEnemy
        ?
        battleState.enemyName
        :
        battleState.playerName;
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return;
    }
    const power =
        getBattleStatsPower(
            side
        );
    const currentHp =
        isEnemy
        ?
        battleState.enemyHealth
        :
        battleState.playerHealth;
    const maxHp =
        isEnemy
        ?
        battleState.enemyMaxHealth
        :
        battleState.playerMaxHealth;
    const owner =
        document.getElementById(
            "battleStatsOwner"
        );
    const name =
        document.getElementById(
            "battleStatsName"
        );
    const rarity =
        document.getElementById(
            "battleStatsRarity"
        );
    const skin =
        document.getElementById(
            "battleStatsSkin"
        );
    const powerElement =
        document.getElementById(
            "battleStatsPower"
        );
    const basePanel =
        document.getElementById(
            "battleStatsBasePanel"
        );
    const superContent =
        document.getElementById(
            "battleStatsSuperContent"
        );
    const abilitiesContent =
        document.getElementById(
            "battleStatsAbilitiesContent"
        );
    const starPowerPanel =
        document.getElementById(
            "battleStatsStarPowerPanel"
        );
    const overlay =
        document.getElementById(
            "battleStatsOverlay"
        );
    if (owner) {
        owner.innerText =
            isEnemy
            ?
            "STATS DU BOT"
            :
            "MES STATS";
    }
    if (name) {
        name.innerText =
            brawlerName;
    }
    if (rarity) {
        rarity.innerText =
            brawler.rarity;
        rarity.className =
            "brawler-detail-rarity " +
            brawler.rarityClass;
    }
    if (skin) {
        skin.src =
            brawler.image;
        skin.alt =
            brawlerName;
        skin.className =
            "brawler-detail-skin skin-" +
            brawlerName
                .toLowerCase()
                .replace(
                    /\s+/g,
                    "-"
                );
    }
    if (powerElement) {
        powerElement.innerText =
            power;
        powerElement.classList.toggle(
            "max-power-number",
            power >= 10
        );
    }
    if (basePanel) {
        /*
           Ajout d'un nom temporaire non destructif
           pour le calcul des dégâts à la distance.
        */
        const originalName =
            brawler.name;
        brawler.name =
            brawlerName;
        basePanel.innerHTML =
            buildBattleBaseStatsHtml(
                brawler,
                power,
                currentHp,
                maxHp,
                side
            );
        if (
            originalName ===
            undefined
        ) {
            delete brawler.name;
        }
        else {
            brawler.name =
                originalName;
        }
    }
    if (superContent) {
        superContent.innerHTML =
            buildBattleSuperStatsHtml(
                brawler,
                power
            );
    }
    if (abilitiesContent) {
        abilitiesContent.innerHTML =
            buildCapabilitiesStatsHtml(
                brawlerName,
                power,
                "details",
                isEnemy
                ? getEnemyBattleAbilityLoadout()
                : null
            );
    }
    if (starPowerPanel) {
        starPowerPanel.innerHTML =
            buildStarPowerStatsHtml(
                brawlerName,
                power,
                isEnemy
                ?
                isEnemyStarPowerBattleActive(
                    brawlerName
                )
                :
                isBrawlerStarPowerOwned(
                    brawlerName
                )
            );
    }
    setBattleStatsMode(
        "base"
    );
    if (overlay) {
        overlay.classList.add(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "false"
        );
    }
}
function closeBattleStats() {
    closeBattleStatsDetailOverlay();
    const overlay =
        document.getElementById(
            "battleStatsOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}
function isBattleAttackPiercing(
    brawlerName,
    useSuper = false
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return false;
    }
    if (useSuper) {
        return (
            brawler.superStats?.piercing ===
            true
        );
    }
    return (
        brawler.piercingAttack ===
        true
    );
}
function getBattlePowerLevel(
    brawlerName,
    side = "player"
) {
    /*
       IMPORTANT :
       on ne détermine plus le Power avec le nom du Brawler.
       En miroir (ex. Shelly vs Shelly), les deux côtés ont
       le même nom mais peuvent avoir des Power différents.
    */
    if (
        side ===
        "enemy"
    ) {
        return Math.max(
            1,
            Math.min(
                10,
                Number(
                    battleState.enemyPower
                ) ||
                Number(
                    brawlers[brawlerName]?.power
                ) ||
                1
            )
        );
    }
    return Math.max(
        1,
        Math.min(
            10,
            Number(
                brawlers[brawlerName]?.power
            ) ||
            1
        )
    );
}
function getBattleRange(
    brawlerName,
    useSuper = false
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return 0;
    }
    if (
        useSuper &&
        brawler.superStats &&
        Number.isFinite(
            brawler.superStats.range
        )
    ) {
        return brawler.superStats.range;
    }
    return brawler.range || 0;
}
function isBattleTargetInRange(
    attackerName,
    distance,
    useSuper = false
) {
    return (
        Number(distance) <=
        getBattleRange(
            attackerName,
            useSuper
        )
    );
}
function rollColtBulletHits(
    maxBullets = 6
) {
    const safeMaxBullets =
        Math.max(
            1,
            Math.round(
                Number(maxBullets) || 6
            )
        );
    /*
       À distance 1, aucune esquive n'est possible :
       toutes les balles du chargeur touchent.
    */
    if (
        battleState.currentDistance ===
        1
    ) {
        return safeMaxBullets;
    }
    /*
       Aux autres distances :
       entre 1 et le nombre maximum de balles touchent.
    */
    return Math.floor(
        Math.random() *
        safeMaxBullets
    ) + 1;
}
function getColtBasicAttackDamage(
    brawlerName,
    side = "player"
) {
    const damagePerBullet =
        getBattleBasicDamage(
            brawlerName,
            battleState.currentDistance,
            side
        );
    const maxBullets =
        getColtBasicBulletCapacity(
            side,
            brawlerName
        );
    const bulletsHit =
        rollColtBulletHits(
            maxBullets
        );
    const totalDamage =
        damagePerBullet *
        bulletsHit;
    console.log(
        "[COLT] " +
        brawlerName +
        " | balles touchées=" +
        bulletsHit +
        "/" +
        maxBullets +
        " | dégâts/balle=" +
        damagePerBullet +
        " | total=" +
        totalDamage
    );
    return {
        bulletsHit,
        damagePerBullet,
        totalDamage
    };
}
function getBattleBasicDamage(
    brawlerName,
    distance,
    side = "player"
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return 0;
    }
    const powerLevel =
        getBattlePowerLevel(
            brawlerName,
            side
        );
    let baseDamage =
        0;
    /*
       Shelly / Bull :
       dégâts propres à chaque distance.
       Autres Brawlers :
       dégâts fixes, quelle que soit
       la distance tant qu'ils sont à portée.
    */
    if (
        brawler.attackByDistance &&
        Number.isFinite(
            brawler.attackByDistance[
                distance
            ]
        )
    ) {
        baseDamage =
            brawler.attackByDistance[
                distance
            ];
    }
    else if (
        Number.isFinite(
            brawler.attack
        )
    ) {
        baseDamage =
            brawler.attack;
    }
    const damage =
        getScaledDamage(
            baseDamage,
            powerLevel
        );
    console.log(
        "[DÉGÂTS] " +
        brawlerName +
        " P" +
        powerLevel +
        " | distance=" +
        distance +
        " | portée=" +
        getBattleRange(
            brawlerName,
            false
        ) +
        " | dégâts base=" +
        baseDamage +
        " | dégâts finaux=" +
        damage
    );
    return damage;
}
function updateBattleBasicAttackUI() {
    const stateElement =
        document.getElementById(
            "battleAttackButtonState"
        );
    if (!stateElement) {
        return;
    }
    const distance =
        battleState.currentDistance;
    if (
        !Number.isFinite(
            distance
        )
    ) {
        stateElement.innerText =
            "CHOISIS DISTANCE";
        return;
    }
    if (
        !isBattleTargetInRange(
            battleState.playerName,
            distance,
            false
        )
    ) {
        stateElement.innerText =
            "HORS PORTÉE";
        return;
    }
    let damage =
        getBattleBasicDamage(
            battleState.playerName,
            distance
        );
    if (
        battleState.playerName ===
        "Bull"
    ) {
        damage =
            applyBullRageDamageBonus(
                damage,
                "player"
            );
    }
    if (
        battleState.playerName ===
        "Colt"
    ) {
        stateElement.innerText =
            damage +
            " × 1–" +
            getColtBasicBulletCapacity(
                "player",
                battleState.playerName
            ) +
            " BALLES";
        return;
    }
    stateElement.innerText =
        damage +
        " DÉGÂTS";
}
function getBattleShotField(
    brawlerName,
    useSuper = false
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    if (!brawler) {
        return 1;
    }
    if (
        useSuper &&
        brawler.superStats &&
        Number.isFinite(
            brawler.superStats.shotField
        )
    ) {
        return brawler.superStats.shotField;
    }
    return brawler.shotField || 1;
}
const BATTLE_DODGE_BASE =
    3;
function getBattleHitChance(
    attackerName,
    defenderName,
    useSuper = false,
    defenderSide = null
) {
    /*
       À distance 1, aucune esquive n'est possible.
       Si l'attaque est à portée, elle touche forcément.
    */
    if (
        battleState.currentDistance ===
        1
    ) {
        return 1;
    }
    const attacker =
        brawlers[
            attackerName
        ];
    const defender =
        brawlers[
            defenderName
        ];
    if (
        !attacker ||
        !defender
    ) {
        return 1;
    }
    const defenderSpeed =
        getBattleEffectiveSpeed(
            defenderSide,
            defenderName
        );
    const shotField =
        getBattleShotField(
            attackerName,
            useSuper
        );
    /*
       Formule officielle BRAWL VS :
                3 + champ de tir
       -----------------------------------
       (3 + champ de tir) + vitesse cible
       Le 3 est une CONSTANTE universelle.
       La vitesse de l'attaquant n'intervient jamais.
    */
    const attackScore =
        BATTLE_DODGE_BASE +
        shotField;
    const totalScore =
        attackScore +
        defenderSpeed;
    if (totalScore <= 0) {
        return 1;
    }
    return (
        attackScore /
        totalScore
    );
}
function battleAttackHitsWithShotField(
    defenderName,
    shotField,
    defenderSide = null
) {
    /*
       Distance 1 :
       aucune esquive possible.
       Un tour de ralentissement est quand même consommé
       puisque la cible vient d'être attaquée.
    */
    if (
        battleState.currentDistance ===
        1
    ) {
        if (
            defenderSide === "player" ||
            defenderSide === "enemy"
        ) {
            consumeBattleSlowTurn(
                defenderSide
            );
        }
        return true;
    }
    const defender =
        brawlers[
            defenderName
        ];
    if (!defender) {
        return true;
    }
    const defenderSpeed =
        getBattleEffectiveSpeed(
            defenderSide,
            defenderName
        );
    const safeShotField =
        Math.max(
            0,
            Number(
                shotField
            ) || 0
        );
    const attackScore =
        BATTLE_DODGE_BASE +
        safeShotField;
    const totalScore =
        attackScore +
        defenderSpeed;
    if (
        totalScore <=
        0
    ) {
        if (
            defenderSide === "player" ||
            defenderSide === "enemy"
        ) {
            consumeBattleSlowTurn(
                defenderSide
            );
        }
        return true;
    }
    const chance =
        attackScore /
        totalScore;
    const hit =
        Math.random() <
        chance;
    if (
        defenderSide === "player" ||
        defenderSide === "enemy"
    ) {
        consumeBattleSlowTurn(
            defenderSide
        );
    }
    return hit;
}
function battleAttackHits(
    attackerName,
    defenderName,
    useSuper = false,
    defenderSide = null
) {
    const attacker =
        brawlers[
            attackerName
        ];
    const defender =
        brawlers[
            defenderName
        ];
    const defenderSpeed =
        getBattleEffectiveSpeed(
            defenderSide,
            defenderName
        );
    const shotField =
        getBattleShotField(
            attackerName,
            useSuper
        );
    const chance =
        getBattleHitChance(
            attackerName,
            defenderName,
            useSuper,
            defenderSide
        );
    const roll =
        Math.random();
    const hit =
        roll <
        chance;
    /*
       Vérification visible avec F12 > Console.
       Cela affiche les vraies statistiques
       utilisées pour CE tir précis.
    */
    console.log(
        "[ESQUIVE] " +
        attackerName +
        " -> " +
        defenderName +
        (
            useSuper
            ?
            " [SUPER]"
            :
            " [BASE]"
        ) +
        " | constante=" +
        BATTLE_DODGE_BASE +
        " | champ de tir=" +
        shotField +
        " | vitesse cible=" +
        defenderSpeed +
        (
            getBattleSlowTurns(
                defenderSide
            ) > 0
            ?
            " (RALENTI)"
            :
            ""
        ) +
        " | score attaque=" +
        (
            BATTLE_DODGE_BASE +
            shotField
        ) +
        " | distance=" +
        battleState.currentDistance +
        (
            battleState.currentDistance === 1
            ?
            " (ESQUIVE IMPOSSIBLE)"
            :
            ""
        ) +
        " | chance toucher=" +
        (
            chance * 100
        ).toFixed(
            1
        ) +
        "% | tirage=" +
        (
            roll * 100
        ).toFixed(
            1
        ) +
        "% | résultat=" +
        (
            hit
            ?
            "TOUCHÉ"
            :
            "ESQUIVÉ"
        )
    );
    if (
        defenderSide === "player" ||
        defenderSide === "enemy"
    ) {
        consumeBattleSlowTurn(
            defenderSide
        );
    }
    return hit;
}
function getBattleHitChancePercent(
    attackerName,
    defenderName,
    useSuper = false,
    defenderSide = null
) {
    return Math.round(
        getBattleHitChance(
            attackerName,
            defenderName,
            useSuper,
            defenderSide
        ) * 100
    );
}
function getBullSuperNextDistance(
    currentDistance
) {
    /*
       Mapping demandé pour une ruée fixe de 6 :
       7 -> 1
       6 -> 2
       5 -> 3
       4 -> 4
       3 -> 5
       2 -> 6
       1 -> 7
    */
    const distance =
        Math.max(
            1,
            Math.min(
                7,
                Number(
                    currentDistance
                ) || 1
            )
        );
    return 8 -
        distance;
}
function startBullRushRound(
    bullSide,
    previousDistance
) {
    if (
        battleState.playerHealth <= 0 ||
        battleState.enemyHealth <= 0
    ) {
        return;
    }
    const newDistance =
        getBullSuperNextDistance(
            previousDistance
        );
    /*
       Bull a terminé sa ruée de 6.
       Cette nouvelle position devient
       la distance du prochain tour.
       Bull ouvre obligatoirement ce tour.
    */
    battleState.currentDistance =
        newDistance;
    battleState.distanceChosen =
        true;
    battleState.distanceChoices =
        [];
    battleState.distanceRoundChooser =
        bullSide;
    battleState.distanceRoundAttackIndex =
        0;
    applyBattleDistanceVisual(
        newDistance
    );
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (
        bullSide ===
        "player"
    ) {
        battleState.enemyTurn =
            true;
        if (actionMessage) {
            actionMessage.innerText =
                "BULL TERMINE SA RUÉE · DISTANCE " +
                newDistance +
                " · BULL ATTAQUE EN PREMIER...";
        }
        syncBattleActionAvailability();
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    battleState.enemyTurn =
                        false;
                    updateBattleSuperUI();
                    syncBattleActionAvailability();
                    if (actionMessage) {
                        actionMessage.innerText =
                            "À BULL D'ATTAQUER · DISTANCE " +
                            newDistance +
                            ".";
                    }
                },
                3000
            );
        return;
    }
    battleState.enemyTurn =
        true;
    if (actionMessage) {
        actionMessage.innerText =
            "BULL BOT TERMINE SA RUÉE · DISTANCE " +
            newDistance +
            " · IL ATTAQUE EN PREMIER...";
    }
    syncBattleActionAvailability();
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                enemyAttack();
            },
            3000
        );
}
function startPrimoCloseCombatRound(
    primoSide
) {
    if (
        battleState.playerHealth <= 0 ||
        battleState.enemyHealth <= 0
    ) {
        return;
    }
    /*
       Le Super d'El Primo le projette au corps-à-corps.
       La nouvelle distance devient donc 1,
       et El Primo est considéré comme celui
       qui "ouvre" cette nouvelle distance.
    */
    battleState.currentDistance =
        1;
    battleState.distanceChosen =
        true;
    battleState.distanceChoices =
        [];
    battleState.distanceRoundChooser =
        primoSide;
    battleState.distanceRoundAttackIndex =
        0;
    applyBattleDistanceVisual(
        1
    );
    updateBattleDistanceUI();
    updateBattleSuperUI();
    syncBattleActionAvailability();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (
        primoSide ===
        "player"
    ) {
        /*
           On bloque brièvement les boutons,
           puis El Primo joueur attaque en premier.
        */
        battleState.enemyTurn =
            true;
        if (actionMessage) {
            actionMessage.innerText =
                "EL PRIMO SE RAPPROCHE · DISTANCE 1 · IL ATTAQUE EN PREMIER...";
        }
        syncBattleActionAvailability();
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    battleState.enemyTurn =
                        false;
                    updateBattleSuperUI();
                    syncBattleActionAvailability();
                    if (actionMessage) {
                        actionMessage.innerText =
                            "À EL PRIMO D'ATTAQUER · DISTANCE 1.";
                    }
                },
                3000
            );
        return;
    }
    /*
       El Primo BOT attaque en premier
       après son rapprochement.
    */
    battleState.enemyTurn =
        true;
    if (actionMessage) {
        actionMessage.innerText =
            "EL PRIMO BOT SE RAPPROCHE · DISTANCE 1 · IL ATTAQUE EN PREMIER...";
    }
    syncBattleActionAvailability();
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                enemyAttack();
            },
            3000
        );
}
function canEnemyUseBattleSuper() {
    if (
        battleState.enemySuperCharge < 100 ||
        battleState.enemyHealth <= 0 ||
        battleState.playerHealth <= 0
    ) {
        return false;
    }
    if (
        battleState.enemyName ===
        "Poco"
    ) {
        /*
           Poco garde son Super s'il est déjà full vie.
        */
        return (
            battleState.enemyHealth <
            battleState.enemyMaxHealth
        );
    }
    if (
        battleState.enemyName ===
        "Nita"
    ) {
        /*
           Nita peut réutiliser son Super même si
           un ours est déjà présent : le nouvel ours
           remplace l'ancien avec tous ses PV.
        */
        return true;
    }
    if (
        battleState.enemyName ===
        "Bull"
    ) {
        /*
           Bull charge obligatoirement sur 6 :
           sa ruée est utile même si l'ennemi
           commence à distance 7.
        */
        return true;
    }
    return isBattleTargetInRange(
        battleState.enemyName,
        battleState.currentDistance,
        true
    );
}
function useEnemyBattleSuper() {
    if (
        !canEnemyUseBattleSuper()
    ) {
        return false;
    }
    if (window.brawlSfx) {
        window.brawlSfx.play('enemySuper');
    }
    const brawlerName =
        battleState.enemyName;
    showBattleSuperBanner(brawlerName, "enemy");
    const attackDistance =
        battleState.currentDistance;
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    battleState.enemySuperCharge =
        0;
    updateBattleSuperUI();
    /*
       POCO BOT : soin personnel.
    */
    if (
        brawlerName ===
        "Poco"
    ) {
        const healAmount =
            getBattleSuperHeal(
                brawlerName,
                "enemy"
            );
        const healthBefore =
            battleState.enemyHealth;
        battleState.enemyHealth =
            Math.min(
                battleState.enemyMaxHealth,
                battleState.enemyHealth +
                healAmount
            );
        const actualHeal =
            battleState.enemyHealth -
            healthBefore;
        if (actualHeal > 0 && window.brawlSfx) {
            window.brawlSfx.play('heal');
        }
        updateBattleHealthUI(
            "enemy"
        );
        const pocoStarPower =
            getBrawlerStarPower(
                "Poco"
            );
        const pocoStarPowerActive =
            isEnemyStarPowerBattleActive(
                "Poco"
            );
        let pocoStarDamage = 0;
        if (
            pocoStarPowerActive &&
            isBattleTargetInRange(
                "Poco",
                attackDistance,
                true
            )
        ) {
            const damageResult =
                applyBattleDamageToSide(
                    "player",
                    getBattleBasicDamage(
                        "Poco",
                        attackDistance,
                        "enemy"
                    ),
                    { piercing: true }
                );
            pocoStarDamage =
                getBattleDamageResultTotal(
                    damageResult
                );
        }
        if (actionMessage) {
            actionMessage.innerText =
                "BOT UTILISE LE SUPER DE POCO · SOIN DE " +
                actualHeal +
                " PV" +
                (
                    pocoStarPowerActive
                    ?
                    (
                        pocoStarDamage > 0
                        ? " · ★ -" + pocoStarDamage + " PV"
                        : " · ★ HORS DE PORTÉE"
                    )
                    : ""
                );
        }
        if (battleState.playerHealth <= 0) {
            battleState.enemyTurn = false;
            battleEnemyAttackTimer = setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    clearBattleQuestSnapshot();
                    showBattleLossMessage();
                },
                1650
            );
            return true;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return true;
    }
    /*
       NITA BOT : invoque son ours.
    */
    if (
        brawlerName ===
        "Nita"
    ) {
        const hadPreviousBear =
            hasActiveBattleBear(
                "enemy"
            );
        summonBattleBear("enemy");
        if (actionMessage) {
            actionMessage.innerText =
                hadPreviousBear
                ?
                "BOT RÉUTILISE LE SUPER DE NITA · NOUVEL OURS FULL LIFE"
                :
                "BOT INVOQUE L'OURS DE NITA !";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return true;
    }
    /*
       COLT BOT :
       test d'esquive avec le champ de tir du Super,
       puis 1 à 12 balles si le Super touche.
    */
    if (
        brawlerName ===
        "Colt"
    ) {
        const superHits =
            battleAttackHits(
                brawlerName,
                battleState.playerName,
                true,
                "player"
            );
        if (!superHits) {
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "TU ESQUIVES LE SUPER DE COLT !";
            }
            showBattleDodgeMessage(
                "TU ESQUIVES !",
                "player"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        advanceDistanceRoundAfterAttack(
                            "bot"
                        );
                    },
                    2250
                );
            return true;
        }
        const coltSuper =
            getColtSuperAttackDamage(
                brawlerName,
                "enemy"
            );
        const DAMAGE =
            coltSuper.totalDamage;
        applyBattleDamageToSide(
            "player",
            DAMAGE,
            {
                piercing:
                    isBattleAttackPiercing(
                        brawlerName,
                        true
                    )
            }
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT UTILISE LE SUPER DE COLT · " +
                coltSuper.bulletsHit +
                "/12 BALLES · -" +
                DAMAGE +
                " PV";
        }
        if (
            battleState.playerHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        clearBattleQuestSnapshot();
                        showBattleLossMessage();
                    },
                    1650
                );
            return true;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return true;
    }
    /*
       SHELLY BOT : dégâts selon la distance
       + calcul d'esquive avec ses stats de Super.
    */
    if (
        brawlerName ===
        "Shelly"
    ) {
        const superHits =
            battleAttackHits(
                brawlerName,
                battleState.playerName,
                true,
                "player"
            );
        if (!superHits) {
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "TU ESQUIVES LE SUPER DE SHELLY !";
            }
            showBattleDodgeMessage(
                "TU ESQUIVES !",
                "player"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        advanceDistanceRoundAfterAttack(
                            "bot"
                        );
                    },
                    2250
                );
            return true;
        }
        const DAMAGE =
            getBattleSuperAttackDamage(
                brawlerName,
                attackDistance,
                "enemy"
            );
        applyBattleDamageToSide(
            "player",
            DAMAGE,
            {
                piercing:
                    isBattleAttackPiercing(
                        brawlerName,
                        true
                    )
            }
        );
        const shellyStarPower =
            getBrawlerStarPower(
                "Shelly"
            );
        const shellyStarPowerActive =
            isEnemyStarPowerBattleActive(
                "Shelly"
            );
        const shellySlowApplied =
            shellyStarPowerActive
            ? applyBattleSlow(
                "player",
                shellyStarPower?.effect?.speedReduction || 2,
                shellyStarPower?.effect?.turns || 2
            )
            : false;
        if (actionMessage) {
            actionMessage.innerText =
                "BOT UTILISE LE SUPER DE SHELLY · -" +
                DAMAGE +
                " PV" +
                (
                    shellyStarPowerActive
                    ?
                    (
                        shellySlowApplied
                        ? " · ★ VITESSE -" + (shellyStarPower?.effect?.speedReduction || 2) + " / " + (shellyStarPower?.effect?.turns || 2) + " TOURS"
                        : " · ★ RALENTISSEMENT BLOQUÉ"
                    )
                    : ""
                );
        }
        if (
            battleState.playerHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        clearBattleQuestSnapshot();
                        showBattleLossMessage();
                    },
                    1650
                );
            return true;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return true;
    }
    /*
       EL PRIMO BOT
       ------------
       - dégâts selon sa statistique Super
       - portée Super = 5
       - champ de tir Super = 4
       - Power Level appliqué
       - après le saut : distance = 1
       - El Primo BOT attaque en premier
    */
    if (
        brawlerName ===
        "El Primo"
    ) {
        const superHits =
            battleAttackHits(
                brawlerName,
                battleState.playerName,
                true,
                "player"
            );
        if (!superHits) {
            /*
               Aucun dégât reçu = +5 PV discret,
               mais El Primo se rapproche quand même.
            */
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "TU ESQUIVES LES DÉGÂTS DU SUPER D'EL PRIMO · MAIS IL SE RAPPROCHE !";
            }
            showBattleDodgeMessage(
                "TU ESQUIVES !",
                "player"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        finalizeBattleActionRegen(
                            "bot"
                        );
                        startPrimoCloseCombatRound(
                            "bot"
                        );
                    },
                    2250
                );
            return true;
        }
        const DAMAGE =
            getBattleSuperAttackDamage(
                brawlerName,
                attackDistance,
                "enemy"
            );
        applyBattleDamageToSide(
            "player",
            DAMAGE,
            {
                piercing:
                    isBattleAttackPiercing(
                        brawlerName,
                        true
                    )
            }
        );
        const primoStarPower =
            getBrawlerStarPower(
                "El Primo"
            );
        const primoStarPowerActive =
            isEnemyStarPowerBattleActive(
                "El Primo"
            );
        const primoBurnApplied =
            primoStarPowerActive &&
            battleState.playerHealth > 0
            ? applyBattleBurn(
                "player",
                primoStarPower?.effect?.turns || 3
            )
            : false;
        if (actionMessage) {
            actionMessage.innerText =
                "BOT UTILISE LE SUPER D'EL PRIMO · -" +
                DAMAGE +
                " PV · IL SE RAPPROCHE !" +
                (
                    primoStarPowerActive && battleState.playerHealth > 0
                    ?
                    (
                        primoBurnApplied
                        ? " · ★ BRÛLURE " + (primoStarPower?.effect?.turns || 3) + " TOURS"
                        : " · ★ BRÛLURE BLOQUÉE"
                    )
                    : ""
                );
        }
        if (
            battleState.playerHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        clearBattleQuestSnapshot();
                        showBattleLossMessage();
                    },
                    1650
                );
            return true;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    finalizeBattleActionRegen(
                        "bot"
                    );
                    startPrimoCloseCombatRound(
                        "bot"
                    );
                },
                2250
            );
        return true;
    }
    /*
       BULL BOT
       --------
       Bull effectue toujours une ruée de 6.
       Nouvelle distance :
       D7->1, D6->2, D5->3, D4->4,
       D3->5, D2->6, D1->7.
       Après la ruée, Bull attaque en premier.
    */
    if (
        brawlerName ===
        "Bull"
    ) {
        const previousDistance =
            attackDistance;
        const targetWasInRushPath =
            previousDistance <=
            brawlers[
                brawlerName
            ].superStats.range;
        if (
            targetWasInRushPath
        ) {
            const superHits =
                battleAttackHits(
                    brawlerName,
                    battleState.playerName,
                    true,
                "player"
                );
            if (
                superHits
            ) {
                const DAMAGE =
                    applyBullRageDamageBonus(
                        getBattleSuperAttackDamage(
                            brawlerName,
                            previousDistance,
                            "enemy"
                        ),
                        "enemy"
                    );
                applyBattleDamageToSide(
                    "player",
                    DAMAGE,
                    {
                        piercing:
                            true
                    }
                );
                if (actionMessage) {
                    actionMessage.innerText =
                        "BULL BOT SE RUE SUR TOI · -" +
                        DAMAGE +
                        " PV · IL CONTINUE SA COURSE !";
                }
                if (
                    battleState.playerHealth <= 0
                ) {
                    battleState.enemyTurn =
                        false;
                    battleEnemyAttackTimer =
                        setTimeout(
                            () => {
                                battleEnemyAttackTimer =
                                    null;
                                showBattleLossMessage();
                            },
                            1650
                        );
                    return true;
                }
            }
            else {
                healBattleDodger(
                    "player"
                );
                if (actionMessage) {
                    actionMessage.innerText =
                        "TU ESQUIVES LES DÉGÂTS DU SUPER DE BULL · MAIS IL CONTINUE SA RUÉE !";
                }
                showBattleDodgeMessage(
                    "TU ESQUIVES !",
                    "player"
                );
            }
        }
        else {
            /*
               À D7, Bull parcourt 6 unités
               mais ne traverse pas encore la cible.
            */
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BULL BOT CHARGE SUR 6 · IL NE TE TOUCHE PAS MAIS ARRIVE TOUT PRÈS !";
            }
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    finalizeBattleActionRegen(
                        "bot"
                    );
                    startBullRushRound(
                        "bot",
                        previousDistance
                    );
                },
                2250
            );
        return true;
    }
    /*
       Autres Brawlers :
       on conserve le Super générique actuel.
    */
    const superHits =
        battleAttackHits(
            brawlerName,
            battleState.playerName,
            true,
                "player"
        );
    if (!superHits) {
        healBattleDodger(
            "player"
        );
        if (actionMessage) {
            actionMessage.innerText =
                "TU ESQUIVES LE SUPER DU BOT !";
        }
        showBattleDodgeMessage(
            "TU ESQUIVES !",
            "player"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return true;
    }
    const DAMAGE =
        40;
    battleState.playerHealth =
        Math.max(
            0,
            battleState.playerHealth -
            DAMAGE
        );
    updateBattleHealthUI(
        "player"
    );
    markBattleBrawlerHit(
        "player",
        DAMAGE
    );
    if (actionMessage) {
        actionMessage.innerText =
            "BOT UTILISE SON SUPER · -" +
            DAMAGE +
            " PV";
    }
    if (
        battleState.playerHealth <= 0
    ) {
        battleState.enemyTurn =
            false;
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    showBattleLossMessage();
                },
                1650
            );
        return true;
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                advanceDistanceRoundAfterAttack(
                    "bot"
                );
            },
            2250
        );
    return true;
}
/* =====================================================
   IA BOT · CAPACITÉS + PASSAGE DE TOUR
===================================================== */
function isEnemyBattleAbilityUsed(
    abilityId
) {
    return (
        Boolean(
            abilityId
        ) &&
        battleState.enemyUsedAbilities &&
        battleState.enemyUsedAbilities[
            abilityId
        ] === true
    );
}
function markEnemyBattleAbilityUsed(
    abilityId
) {
    if (!abilityId) {
        return;
    }
    if (
        !battleState.enemyUsedAbilities ||
        typeof battleState.enemyUsedAbilities !==
            "object"
    ) {
        battleState.enemyUsedAbilities =
            {};
    }
    battleState.enemyUsedAbilities[
        abilityId
    ] =
        true;
}
function getEnemyBattleAbilityCandidates() {
    const brawlerName =
        battleState.enemyName;
    const catalog =
        BRAWLER_ABILITY_CATALOG[
            brawlerName
        ] || [];
    const power =
        Math.max(
            1,
            Math.min(
                10,
                Number(
                    battleState.enemyPower
                ) || 1
            )
        );
    return catalog
        .map(
            (
                ability,
                index
            ) => ({
                ability,
                slotNumber:
                    index + 1
            })
        )
        .filter(
            entry => {
                const requiredPower =
                    getAbilitySlotRequiredPower(
                        entry.slotNumber
                    );
                if (
                    power <
                    requiredPower ||
                    isEnemyBattleAbilityUsed(
                        entry.ability.id
                    )
                ) {
                    return false;
                }
                const id =
                    entry.ability.id;
                const equippedAbilityIds =
                    Array.isArray(
                        battleState.enemyAbilityIds
                    )
                    ? battleState.enemyAbilityIds
                    : [];
                if (
                    !equippedAbilityIds.includes(
                        id
                    )
                ) {
                    return false;
                }
                const distance =
                    battleState.currentDistance;
                if (
                    id ===
                        "shelly-ability-a" &&
                    distance <= 1
                ) {
                    return false;
                }
                if (
                    id ===
                        "shelly-ability-b" &&
                    !isBattleTargetInRange(
                        "Shelly",
                        distance,
                        false
                    )
                ) {
                    return false;
                }
                if (
                    id ===
                        "nita-ability-a" &&
                    !isBattleTargetInRange(
                        "Nita",
                        distance,
                        false
                    )
                ) {
                    return false;
                }
                if (
                    id ===
                        "nita-ability-b" &&
                    battleState.enemyShieldTurns >
                        0
                ) {
                    return false;
                }
                if (
                    id ===
                        "colt-ability-a" &&
                    distance > 6
                ) {
                    return false;
                }
                if (
                    id ===
                        "colt-ability-b" &&
                    battleState.enemyCowboyRollDodges >
                        0
                ) {
                    return false;
                }
                if (
                    id ===
                        "bull-ability-a" &&
                    battleState.enemyHealth >=
                        battleState.enemyMaxHealth
                ) {
                    return false;
                }
                if (
                    id ===
                        "bull-ability-b" &&
                    distance > 3
                ) {
                    return false;
                }
                if (
                    id ===
                        "el-primo-ability-a" &&
                    distance !== 1
                ) {
                    return false;
                }
                if (
                    id ===
                        "el-primo-ability-b" &&
                    battleState.playerMeteorPending
                ) {
                    return false;
                }
                if (
                    id ===
                        "poco-ability-a" &&
                    battleState.enemyHealth >=
                        battleState.enemyMaxHealth &&
                    !hasActiveBattleBear(
                        "enemy"
                    )
                ) {
                    return false;
                }
                if (
                    id ===
                        "poco-ability-b" &&
                    battleState.enemyEffectImmunityTurns >
                        0
                ) {
                    return false;
                }
                return true;
            }
        );
}
function finishEnemyAbilityTurn(
    delay = 2400
) {
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                if (
                    battleState.playerHealth <=
                    0
                ) {
                    showBattleLossMessage();
                    return;
                }
                advanceDistanceRoundAfterAttack(
                    "bot"
                );
            },
            Math.round(delay * 0.75)
        );
}
function tryEnemyBattleAbility() {
    const candidates =
        getEnemyBattleAbilityCandidates();
    if (
        candidates.length === 0
    ) {
        return false;
    }
    /*
       Le BOT n'utilise pas systématiquement une capacité :
       il choisit parfois attaque / Super / passage de tour,
       ce qui évite une IA trop prévisible.
    */
    let abilityUseChance =
        0.34;
    if (
        battleState.enemyHealth <=
        battleState.enemyMaxHealth *
            0.45
    ) {
        abilityUseChance =
            0.52;
    }
    if (
        Math.random() >
        abilityUseChance
    ) {
        return false;
    }
    const choice =
        candidates[
            Math.floor(
                Math.random() *
                candidates.length
            )
        ];
    const ability =
        choice.ability;
    const id =
        ability.id;
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    const distance =
        battleState.currentDistance;
    markEnemyBattleAbilityUsed(
        id
    );
    /*
       SHELLY · AVANCE RAPIDE
       Ne termine pas le tour : le BOT enchaîne.
    */
    if (
        id ===
        "shelly-ability-a"
    ) {
        battleState.currentDistance =
            Math.max(
                1,
                distance - 1
            );
        updateBattleDistanceUI();
        if (actionMessage) {
            actionMessage.innerText =
                "BOT UTILISE AVANCE RAPIDE · DISTANCE " +
                battleState.currentDistance +
                " · IL ENCHAÎNE";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    enemyAttack();
                },
                1100
            );
        return true;
    }
    /*
       SHELLY · BALLES D'ARGENT
    */
    if (
        id ===
        "shelly-ability-b"
    ) {
        const attackHits =
            battleAttackHitsWithShotField(
                battleState.playerName,
                2,
                "player"
            );
        if (!attackHits) {
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BOT UTILISE BALLES D'ARGENT · TU ESQUIVES";
            }
            showBattleDodgeMessage(
                "TU ESQUIVES !",
                "player"
            );
            finishEnemyAbilityTurn(
                2500
            );
            return true;
        }
        const damageDistance =
            distance <= 1
            ?
            1
            :
            distance - 1;
        const damage =
            getBattleBasicDamage(
                "Shelly",
                damageDistance,
                "enemy"
            );
        const result =
            applyBattleDamageToSide(
                "player",
                damage,
                {
                    piercing: false
                }
            );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · BALLES D'ARGENT · -" +
                getBattleDamageResultTotal(
                    result
                ) +
                " PV";
        }
        finishEnemyAbilityTurn(
            2600
        );
        return true;
    }
    /*
       COLT · GROS CALIBRE
    */
    if (
        id ===
        "colt-ability-a"
    ) {
        const attackHits =
            battleAttackHitsWithShotField(
                battleState.playerName,
                3,
                "player"
            );
        if (!attackHits) {
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BOT · GROS CALIBRE · TU ESQUIVES";
            }
            showBattleDodgeMessage(
                "TU ESQUIVES !",
                "player"
            );
            finishEnemyAbilityTurn(
                2500
            );
            return true;
        }
        const damagePerBullet =
            getBattleBasicDamage(
                "Colt",
                Math.min(
                    distance,
                    6
                ),
                "enemy"
            );
        const result =
            applyBattleDamageToSide(
                "player",
                damagePerBullet * 3,
                {
                    piercing: false
                }
            );
        if (
            result.brawlerDamage >
            0
        ) {
            const superChargeGain =
                Math.max(
                    20,
                    Math.round(
                        getBasicAttackSuperCharge(
                            "Colt",
                            distance
                        ) * 0.5
                    )
                );
            addEnemyBattleSuperCharge(
                superChargeGain
            );
            addTankSuperChargeFromIncomingHit(
                "player",
                superChargeGain
            );
        }
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · GROS CALIBRE · -" +
                getBattleDamageResultTotal(
                    result
                ) +
                " PV";
        }
        finishEnemyAbilityTurn(
            2600
        );
        return true;
    }
    /*
       COLT · ROULADE DE COWBOY
    */
    if (
        id ===
        "colt-ability-b"
    ) {
        battleState.enemyCowboyRollDodges =
            1;
        if (actionMessage) {
            actionMessage.innerText =
                "BOT UTILISE ROULADE DE COWBOY · TA PROCHAINE ATTAQUE SERA ESQUIVÉE";
        }
        finishEnemyAbilityTurn(
            1900
        );
        return true;
    }
    /*
       NITA · CHOC SAUVAGE
    */
    if (
        id ===
        "nita-ability-a"
    ) {
        const attackHits =
            battleAttackHits(
                "Nita",
                battleState.playerName,
                false,
                "player"
            );
        if (!attackHits) {
            healBattleDodger(
                "player"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BOT · CHOC SAUVAGE · TU ESQUIVES";
            }
            showBattleDodgeMessage(
                "TU ESQUIVES !",
                "player"
            );
            finishEnemyAbilityTurn(
                2500
            );
            return true;
        }
        const damage =
            getBattleBasicDamage(
                "Nita",
                distance,
                "enemy"
            );
        const result =
            applyBattleDamageToSide(
                "player",
                damage,
                {
                    piercing:
                        isBattleAttackPiercing(
                            "Nita",
                            false
                        )
                }
            );
        if (
            result.brawlerDamage >
            0
        ) {
            const superChargeGain =
                getBasicAttackSuperCharge(
                    "Nita",
                    distance
                );
            addEnemyBattleSuperCharge(
                superChargeGain
            );
            addTankSuperChargeFromIncomingHit(
                "player",
                superChargeGain
            );
            applyBattleParalysis(
                "player",
                1
            );
        }
        if (actionMessage) {
            actionMessage.innerText =
                result.brawlerDamage > 0
                ?
                "BOT · CHOC SAUVAGE · -" +
                getBattleDamageResultTotal(
                    result
                ) +
                " PV · TU ES PARALYSÉ"
                :
                "BOT · CHOC SAUVAGE · L'OURS DE NITA PREND LE COUP";
        }
        finishEnemyAbilityTurn(
            2700
        );
        return true;
    }
    /*
       NITA · PEAU D'OURS
    */
    if (
        id ===
        "nita-ability-b"
    ) {
        setBattleShieldTurns(
            "enemy",
            3
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · PEAU D'OURS · BOUCLIER -30% · 3 TOURS";
        }
        finishEnemyAbilityTurn(
            2100
        );
        return true;
    }
    /*
       BULL · SECOND SOUFFLE
    */
    if (
        id ===
        "bull-ability-a"
    ) {
        const before =
            battleState.enemyHealth;
        battleState.enemyHealth =
            Math.min(
                battleState.enemyMaxHealth,
                battleState.enemyHealth +
                    25
            );
        const actualHeal =
            battleState.enemyHealth -
            before;
        updateBattleHealthUI(
            "enemy"
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · SECOND SOUFFLE · +" +
                actualHeal +
                " PV";
        }
        finishEnemyAbilityTurn(
            2100
        );
        return true;
    }
    /*
       BULL · GROS SABOTS
    */
    if (
        id ===
        "bull-ability-b"
    ) {
        const bullStompDamage =
            applyBullRageDamageBonus(
                15,
                "enemy"
            );
        const result =
            applyBattleDamageToSide(
                "player",
                bullStompDamage,
                {
                    piercing: false
                }
            );
        if (
            result.brawlerDamage >
            0
        ) {
            applyBattleParalysis(
                "player",
                1
            );
        }
        if (actionMessage) {
            actionMessage.innerText =
                result.brawlerDamage > 0
                ?
                "BOT · GROS SABOTS · -" +
                getBattleDamageResultTotal(
                    result
                ) +
                " PV · TU ES ASSOMMÉ"
                :
                "BOT · GROS SABOTS · L'OURS DE NITA ENCAISSE";
        }
        finishEnemyAbilityTurn(
            2300
        );
        return true;
    }
    /*
       EL PRIMO · SUPLEX FATAL
    */
    if (
        id ===
        "el-primo-ability-a"
    ) {
        const result =
            applyBattleDamageToSide(
                "player",
                30,
                {
                    piercing: false
                }
            );
        if (
            result.brawlerDamage >
            0
        ) {
            applyBattleParalysis(
                "player",
                1
            );
        }
        if (actionMessage) {
            actionMessage.innerText =
                result.brawlerDamage > 0
                ?
                "BOT · SUPLEX FATAL · -" +
                getBattleDamageResultTotal(
                    result
                ) +
                " PV · BOT REJOUE"
                :
                "BOT · SUPLEX FATAL · L'OURS DE NITA PREND LE COUP · BOT REJOUE";
        }
        if (
            battleState.playerHealth <=
            0
        ) {
            finishEnemyAbilityTurn(
                1900
            );
            return true;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    finalizeBattleActionRegen(
                        "bot"
                    );
                    beginEnemyActionSameDistance();
                },
                2200
            );
        return true;
    }
    /*
       EL PRIMO · MÉTÉORITE
    */
    if (
        id ===
        "el-primo-ability-b"
    ) {
        battleState.playerMeteorPending = {
            sourceDistance:
                battleState.currentDistance,
            damage: 30,
            burnTurns: 2,
            minDistanceChangeToEscape: 3
        };
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · MÉTÉORITE PRÊTE · CHANGE ASSEZ DE DISTANCE POUR L'ÉVITER";
        }
        finishEnemyAbilityTurn(
            2100
        );
        return true;
    }
    /*
       POCO · MÉLODIE APAISANTE
    */
    if (
        id ===
        "poco-ability-a"
    ) {
        battleState.enemyPocoHealingTurns =
            2;
        const actualHeal =
            healPocoTeam(
                "enemy",
                20
            );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · MÉLODIE APAISANTE · +" +
                actualHeal +
                " PV · SOIN ACTIF 2 TOURS";
        }
        finishEnemyAbilityTurn(
            2100
        );
        return true;
    }
    /*
       POCO · ACCORD PURIFICATEUR
    */
    if (
        id ===
        "poco-ability-b"
    ) {
        setBattleEffectImmunity(
            "enemy",
            2
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT · ACCORD PURIFICATEUR · IMMUNITÉ 2 TOURS";
        }
        finishEnemyAbilityTurn(
            2100
        );
        return true;
    }
    return false;
}
function shouldEnemyPassBattleTurn() {
    const missingHealth =
        Math.max(
            0,
            battleState.enemyMaxHealth -
                battleState.enemyHealth
        );
    const inBasicRange =
        isBattleTargetInRange(
            battleState.enemyName,
            battleState.currentDistance,
            false
        );
    /*
       Hors de portée et blessé : le BOT a davantage
       intérêt à passer pour récupérer 5 PV.
    */
    if (
        missingHealth >= 5 &&
        !inBasicRange
    ) {
        return Math.random() < 0.55;
    }
    /*
       Sinon il peut parfois passer volontairement.
    */
    if (
        missingHealth >= 15
    ) {
        return Math.random() < 0.16;
    }
    return Math.random() < 0.045;
}
function enemyPassBattleTurn() {
    markBattleActionSkipped();
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    if (actionMessage) {
        actionMessage.innerText =
            "BOT PASSE SON TOUR · LES DEUX BRAWLERS RÉCUPÈRENT 5 PV";
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                advanceDistanceRoundAfterAttack(
                    "bot"
                );
            },
            1900
        );
}
function enemyAttack() {
    if (window.brawlSfx) {
        window.brawlSfx.play('enemyAttack');
    }
    if (
        battleState.enemyHealth <= 0 ||
        battleState.playerHealth <= 0
    ) {
        return;
    }
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    const attackDistance =
        battleState.currentDistance;
    beginBattleActionTracking(
        "bot"
    );
    /*
       ROULADE DE COWBOY :
       Colt esquive automatiquement l'action offensive
       suivante du BOT, Super compris.
    */
    if (
        battleState.playerCowboyRollDodges >
        0
    ) {
        battleState.playerCowboyRollDodges -=
            1;
        if (actionMessage) {
            actionMessage.innerText =
                "ROULADE DE COWBOY · TU ESQUIVES L'ATTAQUE !";
        }
        showBattleDodgeMessage(
            "ROULADE !",
            "player"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                1425
            );
        return;
    }
    const enemyBurnTick =
        applyBattleBurnTick(
            "enemy"
        );
    if (enemyBurnTick.applied) {
        if (actionMessage) {
            actionMessage.innerText =
                "BOT BRÛLE · -" +
                enemyBurnTick.damage +
                " PV";
        }
        if (enemyBurnTick.ko) {
            battleState.enemyTurn = false;
            battleEnemyAttackTimer = setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    grantBattleVictoryRewards();
                },
                1350
            );
            return;
        }
    }
    if (
        battleState.enemyParalyzedTurns >
        0
    ) {
        battleState.enemyParalyzedTurns -=
            1;
        markBattleActionSkipped();
        if (actionMessage) {
            actionMessage.innerText =
                "BOT EST PARALYSÉ · IL SAUTE SON TOUR !";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                1425
            );
        return;
    }
    playBattleSquashStretch(
        "enemy",
        "attack"
    );
    /*
       Si son Super est chargé et pertinent,
       le BOT l'utilise à la place de son attaque basique.
    */
    if (
        useEnemyBattleSuper()
    ) {
        return;
    }
    /*
       Le BOT peut maintenant utiliser les capacités
       débloquées par son niveau de pouvoir.
    */
    if (
        tryEnemyBattleAbility()
    ) {
        return;
    }
    /*
       Le BOT peut aussi choisir de passer son tour.
       La régénération est appliquée par
       finalizeBattleActionRegen().
    */
    if (
        shouldEnemyPassBattleTurn()
    ) {
        enemyPassBattleTurn();
        return;
    }
    /*
       La portée est vérifiée AVANT l'esquive.
       Si la cible est trop loin, impossible
       de la toucher.
    */
    if (
        !isBattleTargetInRange(
            battleState.enemyName,
            attackDistance,
            false
        )
    ) {
        /*
           Le joueur n'a subi aucun dégât :
           il récupère 5 PV.
        */
        healBattleDodger(
            "player"
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT ne peut pas t'atteindre à cette distance !";
        }
        showBattleDodgeMessage(
            "BOT NE PEUT PAS T'ATTEINDRE !",
            "player",
            "HORS DE PORTÉE"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return;
    }
    let DAMAGE =
        getBattleBasicDamage(
            battleState.enemyName,
            attackDistance,
            "enemy"
        );
    let coltBulletsHit =
        null;
    /*
       TOUS les Brawlers passent d'abord par
       le test d'esquive, Colt BOT compris.
    */
    const attackHits =
        battleAttackHits(
            battleState.enemyName,
            battleState.playerName,
            false,
            "player"
        );
    if (!attackHits) {
        healBattleDodger(
            "player"
        );
        if (actionMessage) {
            actionMessage.innerText =
                "TU ESQUIVES ! · BOT rate son attaque.";
        }
        showBattleDodgeMessage(
            "TU ESQUIVES !",
            "player"
        );
        const enemyBearClawMiss =
            applyNitaBearClaw(
                "enemy",
                "player"
            );
        if (
            enemyBearClawMiss.applied &&
            battleState.playerHealth <= 0
        ) {
            battleState.enemyTurn = false;
            if (actionMessage) {
                actionMessage.innerText =
                    "TU ESQUIVES LE BOT · MAIS L'OURS DE NITA FRAPPE · -" +
                    enemyBearClawMiss.damage +
                    " PV";
            }
            battleEnemyAttackTimer = setTimeout(
                () => {
                    battleEnemyAttackTimer = null;
                    showBattleLossMessage();
                },
                1650
            );
            return;
        }
        const playerBearClawMiss =
            applyNitaBearClaw(
                "player",
                "enemy"
            );
        if (
            playerBearClawMiss.applied
        ) {
            registerQuestDamage(
                playerBearClawMiss.damage
            );
        }
        if (
            playerBearClawMiss.applied &&
            actionMessage
        ) {
            actionMessage.innerText =
                "TU ESQUIVES ! · L'OURS CONTRE-ATTAQUE · -" +
                playerBearClawMiss.damage +
                " PV À BOT";
        }
        if (
            playerBearClawMiss.applied &&
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn = false;
            grantBattleVictoryRewards();
            return;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "bot"
                    );
                },
                2250
            );
        return;
    }
    /*
       Colt BOT : après le test d'esquive réussi,
       on détermine combien de balles touchent.
    */
    if (
        battleState.enemyName ===
        "Bull"
    ) {
        DAMAGE =
            applyBullRageDamageBonus(
                DAMAGE,
                "enemy"
            );
    }
    if (
        battleState.enemyName ===
        "Colt"
    ) {
        const coltAttack =
            getColtBasicAttackDamage(
                battleState.enemyName,
                "enemy"
            );
        coltBulletsHit =
            coltAttack.bulletsHit;
        DAMAGE =
            coltAttack.totalDamage;
    }
    const playerHealthBeforeHit =
        battleState.playerHealth;
    const playerDamageResult =
        applyBattleDamageToSide(
            "player",
            DAMAGE,
            {
                piercing:
                    isBattleAttackPiercing(
                        battleState.enemyName,
                        false
                    )
            }
        );
    if (
        battleState.enemyName ===
        "Colt" &&
        coltBulletsHit
    ) {
        animateColtHealthByBullets(
            "player",
            playerHealthBeforeHit,
            battleState.playerHealth,
            coltBulletsHit,
            DAMAGE /
                coltBulletsHit
        );
    }
    const enemySuperChargeGain =
        getBasicAttackSuperCharge(
            battleState.enemyName,
            attackDistance,
            {
                bulletsHit:
                    coltBulletsHit,
                maxBullets:
                    getColtBasicBulletCapacity(
                        "enemy",
                        battleState.enemyName
                    )
            }
        );
    if (
        playerDamageResult.brawlerDamage > 0
    ) {
        addEnemyBattleSuperCharge(
            enemySuperChargeGain
        );
        addTankSuperChargeFromIncomingHit(
            "player",
            enemySuperChargeGain
        );
    }
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    if (
        battleState.playerHealth <= 0
    ) {
        battleState.enemyTurn =
            false;
        if (actionMessage) {
            actionMessage.innerText =
                "Tu es K.O. !";
        }
        if (attackButton) {
            attackButton.disabled =
                true;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    showBattleLossMessage();
                },
                1875
            );
        return;
    }
    const enemyBearClawHit =
        applyNitaBearClaw(
            "enemy",
            "player"
        );
    if (
        enemyBearClawHit.applied &&
        battleState.playerHealth <= 0
    ) {
        battleState.enemyTurn = false;
        if (actionMessage) {
            actionMessage.innerText =
                "BOT NITA ET SON OURS FRAPPENT · -" +
                enemyBearClawHit.damage +
                " PV";
        }
        battleEnemyAttackTimer = setTimeout(
            () => {
                battleEnemyAttackTimer = null;
                showBattleLossMessage();
            },
            1650
        );
        return;
    }
    const playerBearClawHit =
        applyNitaBearClaw(
            "player",
            "enemy"
        );
    if (
        playerBearClawHit.applied
    ) {
        registerQuestDamage(
            playerBearClawHit.damage
        );
    }
    if (
        playerBearClawHit.applied &&
        battleState.enemyHealth <= 0
    ) {
        battleState.enemyTurn = false;
        if (actionMessage) {
            actionMessage.innerText =
                "L'OURS DE NITA CONTRE-ATTAQUE · -" +
                playerBearClawHit.damage +
                " PV · BOT EST K.O. !";
        }
        grantBattleVictoryRewards();
        return;
    }
    if (actionMessage) {
        actionMessage.innerText =
            (
                battleState.enemyName ===
                "Colt"
                ?
                "BOT COLT TOUCHE " +
                coltBulletsHit +
                "/" +
                getColtBasicBulletCapacity(
                    "enemy",
                    battleState.enemyName
                ) +
                " BALLES · -" +
                DAMAGE +
                " PV"
                :
                "BOT TOUCHE ! · -" +
                DAMAGE +
                " PV"
            ) +
            (
                enemyBearClawHit.applied
                ? " · OURS BOT: -" + enemyBearClawHit.damage + " PV"
                : ""
            ) +
            (
                playerBearClawHit.applied
                ? " · TON OURS: -" + playerBearClawHit.damage + " PV À BOT"
                : ""
            ) +
            getPiercingBattleMessageSuffix(
                playerDamageResult
            );
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                advanceDistanceRoundAfterAttack(
                    "bot"
                );
            },
            2250
        );
}
function playBattleSquashStretch(side, intensity = "attack") {
    /*
       Le squash & stretch est désormais une animation idle permanente.
       On conserve cette fonction pour ne pas toucher à la logique des combats,
       mais les attaques ne relancent plus une animation rapide.
    */
    return;
}
function attackEnemy() {
    if (
        battleState.enemyHealth <= 0 ||
        battleState.playerHealth <= 0 ||
        battleState.enemyTurn ||
        !battleState.distanceChosen
    ) {
        return;
    }
    playBattleSquashStretch(
        "player",
        "attack"
    );
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    const attackDistance =
        battleState.currentDistance;
    beginBattleActionTracking(
        "player"
    );
    /*
       ROULADE DE COWBOY DU BOT :
       la prochaine attaque offensive du joueur
       est automatiquement esquivée.
    */
    if (
        battleState.enemyCowboyRollDodges >
        0
    ) {
        battleState.enemyCowboyRollDodges -=
            1;
        healBattleDodger(
            "enemy"
        );
        battleState.enemyTurn =
            true;
        if (attackButton) {
            attackButton.disabled =
                true;
        }
        if (actionMessage) {
            actionMessage.innerText =
                "ROULADE DE COWBOY DU BOT · TON ATTAQUE EST ESQUIVÉE";
        }
        showBattleDodgeMessage(
            "BOT ESQUIVE !",
            "enemy",
            "ROULADE DE COWBOY"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2200
            );
        return;
    }
    /*
       Hors de portée = aucun tirage d'esquive,
       aucun dégât et aucune charge de Super.
    */
    if (
        !isBattleTargetInRange(
            battleState.playerName,
            attackDistance,
            false
        )
    ) {
        /*
           BOT n'a subi aucun dégât :
           il récupère 5 PV.
        */
        healBattleDodger(
            "enemy"
        );
        battleState.enemyTurn =
            true;
        if (attackButton) {
            attackButton.disabled =
                true;
        }
        updateBattleSuperUI();
        if (actionMessage) {
            actionMessage.innerText =
                "Tu ne peux pas atteindre BOT à cette distance !";
        }
        showBattleDodgeMessage(
            "TU NE PEUX PAS ATTEINDRE BOT !",
            "enemy",
            "HORS DE PORTÉE"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    let DAMAGE =
        getBattleBasicDamage(
            battleState.playerName,
            attackDistance
        );
    let coltBulletsHit =
        null;
    battleState.enemyTurn =
        true;
    if (attackButton) {
        attackButton.disabled =
            true;
    }
    updateBattleSuperUI();
    /*
       TOUS les Brawlers passent d'abord par
       le test d'esquive, Colt compris.
    */
    const attackHits =
        battleAttackHits(
            battleState.playerName,
            battleState.enemyName,
            false,
            "enemy"
        );
    if (!attackHits) {
        healBattleDodger(
            "enemy"
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT ESQUIVE ! · Ton attaque rate.";
        }
        showBattleDodgeMessage(
            "BOT ESQUIVE !",
            "enemy"
        );
        const playerBearAssistMiss =
            applyNitaBearClaw(
                "player",
                "enemy"
            );
        if (
            playerBearAssistMiss.applied
        ) {
            registerQuestDamage(
                playerBearAssistMiss.damage
            );
        }
        if (
            playerBearAssistMiss.applied &&
            actionMessage
        ) {
            actionMessage.innerText =
                "BOT ESQUIVE ! · L'OURS ATTAQUE · -" +
                playerBearAssistMiss.damage +
                " PV À BOT";
        }
        if (
            playerBearAssistMiss.applied &&
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn = false;
            grantBattleVictoryRewards();
            return;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       Colt : si le test d'esquive est réussi,
       on détermine ensuite combien de balles touchent.
    */
    if (
        battleState.playerName ===
        "Colt"
    ) {
        const coltAttack =
            getColtBasicAttackDamage(
                battleState.playerName,
                "player"
            );
        coltBulletsHit =
            coltAttack.bulletsHit;
        DAMAGE =
            coltAttack.totalDamage;
    }
    if (
        battleState.playerName ===
        "Bull"
    ) {
        DAMAGE =
            applyBullRageDamageBonus(
                DAMAGE,
                "player"
            );
    }
    const enemyHealthBeforeHit =
        battleState.enemyHealth;
    const enemyDamageResult =
        applyBattleDamageToSide(
            "enemy",
            DAMAGE,
            {
                piercing:
                    isBattleAttackPiercing(
                        battleState.playerName,
                        false
                    )
            }
        );
    if (
        battleState.playerName ===
        "Colt" &&
        coltBulletsHit
    ) {
        animateColtHealthByBullets(
            "enemy",
            enemyHealthBeforeHit,
            battleState.enemyHealth,
            coltBulletsHit,
            DAMAGE /
                coltBulletsHit
        );
    }
    /*
       La charge du Super dépend désormais
       du type d'attaque réussie, pas des dégâts.
    */
    const superChargeGain =
        getBasicAttackSuperCharge(
            battleState.playerName,
            attackDistance,
            {
                bulletsHit:
                    coltBulletsHit,
                maxBullets:
                    getColtBasicBulletCapacity(
                        "player",
                        battleState.playerName
                    )
            }
        );
    if (
        enemyDamageResult.brawlerDamage > 0
    ) {
        addBattleSuperCharge(
            superChargeGain
        );
        addTankSuperChargeFromIncomingHit(
            "enemy",
            superChargeGain
        );
    }
    registerQuestDamage(
        getBattleDamageResultTotal(
            enemyDamageResult
        )
    );
    if (
        battleState.enemyHealth <= 0
    ) {
        battleState.enemyTurn =
            false;
        if (actionMessage) {
            actionMessage.innerText =
                battleState.enemyPseudo +
                " est K.O. ! VICTOIRE !";
        }
        grantBattleVictoryRewards();
        return;
    }
    const playerBearAssistHit =
        applyNitaBearClaw(
            "player",
            "enemy"
        );
    if (
        playerBearAssistHit.applied
    ) {
        registerQuestDamage(
            playerBearAssistHit.damage
        );
    }
    if (
        playerBearAssistHit.applied &&
        battleState.enemyHealth <= 0
    ) {
        battleState.enemyTurn = false;
        if (actionMessage) {
            actionMessage.innerText =
                "NITA ET SON OURS FRAPPENT · BOT EST K.O. !";
        }
        grantBattleVictoryRewards();
        return;
    }
    if (actionMessage) {
        actionMessage.innerText =
            (
                battleState.playerName ===
                "Colt"
                ?
                "COLT TOUCHE " +
                coltBulletsHit +
                "/" +
                getColtBasicBulletCapacity(
                    "player",
                    battleState.playerName
                ) +
                " BALLES · -" +
                DAMAGE +
                " PV À BOT"
                :
                "TOUCHÉ ! " +
                getBattleHitChancePercent(
            battleState.playerName,
            battleState.enemyName,
            false,
            "enemy"
                ) +
                "% de chance · -" +
                DAMAGE +
                " PV à BOT"
            ) +
            (
                playerBearAssistHit.applied
                ? " · OURS: -" + playerBearAssistHit.damage + " PV"
                : ""
            ) +
            getPiercingBattleMessageSuffix(
                enemyDamageResult
            );
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                advanceDistanceRoundAfterAttack(
                    "player"
                );
            },
            3000
        );
}
function useBattleSuper() {
    if (
        battleState.enemyHealth <= 0 ||
        battleState.playerHealth <= 0 ||
        battleState.enemyTurn ||
        !battleState.distanceChosen ||
        battleState.superCharge < 100
    ) {
        return;
    }
    playBattleSquashStretch(
        "player",
        "super"
    );
    const brawlerName =
        battleState.playerName;
    showBattleSuperBanner(brawlerName, "player");
    registerQuestSuperUsed();
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    const actionMessage =
        document.getElementById(
            "battleActionMessage"
        );
    const attackDistance =
        battleState.currentDistance;
    beginBattleActionTracking(
        "player"
    );
    /*
       =================================================
       POCO
       =================================================
       Pour l'instant, Poco se soigne lui-même.
       Sa portée et son champ de tir ne sont pas utilisés
       tant qu'il n'y a pas d'alliés à soigner.
    */
    if (
        brawlerName ===
        "Poco"
    ) {
        battleState.enemyTurn =
            true;
        if (attackButton) {
            attackButton.disabled =
                true;
        }
        battleState.superCharge =
            0;
        const healAmount =
            getBattleSuperHeal(
                brawlerName
            );
        const healthBefore =
            battleState.playerHealth;
        battleState.playerHealth =
            Math.min(
                battleState.playerMaxHealth,
                battleState.playerHealth +
                healAmount
            );
        const actualHeal =
            battleState.playerHealth -
            healthBefore;
        if (actualHeal > 0 && window.brawlSfx) {
            window.brawlSfx.play('heal');
        }
        updateBattleHealthUI(
            "player"
        );
        updateBattleSuperUI();
        /*
           POUVOIR STAR DE POCO : MÉLODIE FRACASSANTE
           Le Super garde son soin et inflige aussi les mêmes
           dégâts que l'attaque principale de Poco. Les dégâts
           utilisent le niveau de pouvoir actuel et ne sont
           appliqués que si BOT est dans la portée du Super.
        */
        const pocoStarPower =
            getBrawlerStarPower(
                "Poco"
            );
        const pocoStarPowerActive =
            Boolean(
                pocoStarPower &&
                isBrawlerStarPowerOwned(
                    "Poco",
                    pocoStarPower.id
                )
            );
        let pocoStarDamage =
            0;
        if (
            pocoStarPowerActive &&
            isBattleTargetInRange(
                "Poco",
                attackDistance,
                true
            )
        ) {
            const requestedDamage =
                getBattleBasicDamage(
                    "Poco",
                    attackDistance
                );
            const damageResult =
                applyBattleDamageToSide(
                    "enemy",
                    requestedDamage,
                    {
                        piercing: true
                    }
                );
            pocoStarDamage =
                getBattleDamageResultTotal(
                    damageResult
                );
            registerQuestDamage(
                pocoStarDamage
            );
        }
        const healMessage =
            actualHeal > 0
            ?
            "SOIN DE " +
            actualHeal +
            " PV"
            :
            "PV DÉJÀ AU MAXIMUM";
        const pocoStarMessage =
            pocoStarPowerActive
            ?
            (
                pocoStarDamage > 0
                ?
                " · ★ -" +
                pocoStarDamage +
                " PV À BOT"
                :
                " · ★ BOT HORS DE PORTÉE"
            )
            :
            "";
        if (
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            if (actionMessage) {
                actionMessage.innerText =
                    "SUPER DE POCO ! · " +
                    healMessage +
                    pocoStarMessage +
                    " · " +
                    battleState.enemyPseudo +
                    " EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        if (actionMessage) {
            actionMessage.innerText =
                "SUPER DE POCO ! · " +
                healMessage +
                pocoStarMessage;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       NITA
       =================================================
       Nita invoque son ours.
    */
    if (
        brawlerName ===
        "Nita"
    ) {
        battleState.enemyTurn =
            true;
        if (attackButton) {
            attackButton.disabled =
                true;
        }
        battleState.superCharge =
            0;
        updateBattleSuperUI();
        const hadPreviousBear =
            hasActiveBattleBear(
                "player"
            );
        /*
           summonBattleBear() remet directement la vie
           de l'ours à son maximum. S'il y en avait déjà
           un, il est donc remplacé par le nouveau.
        */
        summonBattleBear("player");
        if (actionMessage) {
            actionMessage.innerText =
                hadPreviousBear
                ?
                "SUPER DE NITA ! · NOUVEL OURS · ANCIEN OURS REMPLACÉ · PV MAX"
                :
                "SUPER DE NITA ! · L'OURS ENTRE EN JEU";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       ROULADE DE COWBOY DU BOT :
       les Supers offensifs sont également esquivés.
       Poco (soin) et Nita (invocation) sont traités
       plus haut et ne consomment pas la roulade.
    */
    if (
        battleState.enemyCowboyRollDodges >
        0
    ) {
        battleState.enemyCowboyRollDodges -=
            1;
        healBattleDodger(
            "enemy"
        );
        battleState.enemyTurn =
            true;
        battleState.superCharge =
            0;
        updateBattleSuperUI();
        if (actionMessage) {
            actionMessage.innerText =
                "ROULADE DE COWBOY DU BOT · TON SUPER EST ESQUIVÉ";
        }
        showBattleDodgeMessage(
            "BOT ESQUIVE LE SUPER !",
            "enemy",
            "ROULADE DE COWBOY"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                2300
            );
        return;
    }
    /*
       =================================================
       SUPERS QUI CIBLENT L'ADVERSAIRE
       =================================================
    */
    if (
        brawlerName !==
        "Bull" &&
        !isBattleTargetInRange(
            brawlerName,
            attackDistance,
            true
        )
    ) {
        /*
           L'adversaire n'a pas été touché car
           il était hors de portée : +5 PV discret.
        */
        healBattleDodger(
            "enemy"
        );
        battleState.enemyTurn =
            true;
        if (attackButton) {
            attackButton.disabled =
                true;
        }
        battleState.superCharge =
            0;
        updateBattleSuperUI();
        if (actionMessage) {
            actionMessage.innerText =
                "Ton Super ne peut pas atteindre BOT à cette distance !";
        }
        showBattleDodgeMessage(
            "SUPER HORS DE PORTÉE !",
            "enemy",
            "HORS DE PORTÉE"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    battleState.enemyTurn =
        true;
    if (attackButton) {
        attackButton.disabled =
            true;
    }
    /*
       Le Super est consommé dès l'utilisation.
    */
    battleState.superCharge =
        0;
    updateBattleSuperUI();
    /*
       =================================================
       COLT
       =================================================
       Super :
       - passe d'abord par le test d'esquive
       - si le Super touche : 1 à 12 balles touchent
       - distance 1 : esquive impossible et 12/12 touchent
       - dégâts d'une balle = statistique Super de Colt
       - Power Level appliqué
    */
    if (
        brawlerName ===
        "Colt"
    ) {
        const superHits =
            battleAttackHits(
                brawlerName,
                battleState.enemyName,
                true,
                "enemy"
            );
        if (!superHits) {
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BOT ESQUIVE LE SUPER DE COLT !";
            }
            showBattleDodgeMessage(
                "BOT ESQUIVE !",
                "enemy"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        advanceDistanceRoundAfterAttack(
                            "player"
                        );
                    },
                    3000
                );
            return;
        }
        const coltSuper =
            getColtSuperAttackDamage(
                brawlerName
            );
        const DAMAGE =
            coltSuper.totalDamage;
        const coltSuperDamageResult =
            applyBattleDamageToSide(
                "enemy",
                DAMAGE,
                {
                    piercing:
                        isBattleAttackPiercing(
                            brawlerName,
                            true
                        )
                }
            );
        registerQuestDamage(
            getBattleDamageResultTotal(
                coltSuperDamageResult
            )
        );
        if (
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            if (actionMessage) {
                actionMessage.innerText =
                    "SUPER DE COLT ! · " +
                    coltSuper.bulletsHit +
                    "/12 BALLES · -" +
                    DAMAGE +
                    " PV · " +
                    battleState.enemyPseudo +
                    " EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        if (actionMessage) {
            actionMessage.innerText =
                "SUPER DE COLT ! · " +
                coltSuper.bulletsHit +
                "/12 BALLES TOUCHENT · -" +
                DAMAGE +
                " PV";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       SHELLY
       =================================================
       Dégâts du Super selon la distance :
       D1 60 / D2 48 / D3 36 / D4 24 / D5 12
       et sa portée de Super est 5.
       Le Power Level augmente ces valeurs.
       Son champ de tir de Super (5) est utilisé
       par le calcul d'esquive.
    */
    if (
        brawlerName ===
        "Shelly"
    ) {
        const superHits =
            battleAttackHits(
                brawlerName,
                battleState.enemyName,
                true,
                "enemy"
            );
        if (!superHits) {
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BOT ESQUIVE LE SUPER DE SHELLY !";
            }
            showBattleDodgeMessage(
                "BOT ESQUIVE !",
                "enemy"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        advanceDistanceRoundAfterAttack(
                            "player"
                        );
                    },
                    3000
                );
            return;
        }
        const DAMAGE =
            getBattleSuperAttackDamage(
                brawlerName,
                attackDistance
            );
        const shellySuperDamageResult =
            applyBattleDamageToSide(
                "enemy",
                DAMAGE,
                {
                    piercing:
                        isBattleAttackPiercing(
                            brawlerName,
                            true
                        )
                }
            );
        registerQuestDamage(
            getBattleDamageResultTotal(
                shellySuperDamageResult
            )
        );
        /*
           POUVOIR STAR DE SHELLY : CHOC RALENTISSANT
           Si le Super touche, la cible perd 2 points
           de vitesse pendant 2 tours, sans jamais
           pouvoir descendre sous 1.
        */
        const shellyStarPower =
            getBrawlerStarPower(
                "Shelly"
            );
        const shellyStarPowerActive =
            Boolean(
                shellyStarPower &&
                isBrawlerStarPowerOwned(
                    "Shelly",
                    shellyStarPower.id
                )
            );
        const shellySlowApplied =
            shellyStarPowerActive
            ?
            applyBattleSlow(
                "enemy",
                shellyStarPower.effect?.speedReduction || 2,
                shellyStarPower.effect?.turns || 2
            )
            :
            false;
        const shellyStarPowerMessage =
            shellyStarPowerActive
            ?
            (
                shellySlowApplied
                ?
                " · ★ BOT RALENTI : VITESSE -" +
                (
                    shellyStarPower.effect?.speedReduction || 2
                ) +
                " PENDANT " +
                (
                    shellyStarPower.effect?.turns || 2
                ) +
                " TOURS"
                :
                " · ★ RALENTISSEMENT BLOQUÉ"
            )
            :
            "";
        if (
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            if (actionMessage) {
                actionMessage.innerText =
                    "SUPER DE SHELLY ! · DISTANCE " +
                    attackDistance +
                    " · -" +
                    DAMAGE +
                    " PV" +
                    shellyStarPowerMessage +
                    " · " +
                    battleState.enemyPseudo +
                    " EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        if (actionMessage) {
            actionMessage.innerText =
                "SUPER DE SHELLY ! · DISTANCE " +
                attackDistance +
                " · -" +
                DAMAGE +
                " PV" +
                shellyStarPowerMessage;
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       EL PRIMO
       =================================================
       Super :
       - dégâts = statistique Super d'El Primo
       - portée = 5
       - champ de tir = 4
       - Power Level appliqué
       - après le saut : distance = 1
       - El Primo attaque en premier au nouveau tour
    */
    if (
        brawlerName ===
        "El Primo"
    ) {
        const superHits =
            battleAttackHits(
                brawlerName,
                battleState.enemyName,
                true,
                "enemy"
            );
        if (!superHits) {
            /*
               BOT ne subit aucun dégât et récupère
               donc ses 5 PV discrets.
               Le déplacement d'El Primo reste effectué.
            */
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BOT ESQUIVE LES DÉGÂTS DU SUPER D'EL PRIMO · MAIS EL PRIMO SE RAPPROCHE !";
            }
            showBattleDodgeMessage(
                "BOT ESQUIVE !",
                "enemy"
            );
            battleEnemyAttackTimer =
                setTimeout(
                    () => {
                        battleEnemyAttackTimer =
                            null;
                        finalizeBattleActionRegen(
                            "player"
                        );
                        startPrimoCloseCombatRound(
                            "player"
                        );
                    },
                    3000
                );
            return;
        }
        const DAMAGE =
            getBattleSuperAttackDamage(
                brawlerName,
                attackDistance
            );
        const primoSuperDamageResult =
            applyBattleDamageToSide(
                "enemy",
                DAMAGE,
                {
                    piercing:
                        isBattleAttackPiercing(
                            brawlerName,
                            true
                        )
                }
            );
        registerQuestDamage(
            getBattleDamageResultTotal(
                primoSuperDamageResult
            )
        );
        /*
           POUVOIR STAR D'EL PRIMO : SAUT ARDENT
           Pouvoir 10 = éligible seulement. L'effet ne s'active
           que si le Pouvoir Star a réellement été acheté ou drop.
           Quand le Super touche, BOT brûle pendant 3 de ses tours
           et reçoit 10 dégâts au début de chacun de ces tours.
        */
        const primoStarPower =
            getBrawlerStarPower(
                "El Primo"
            );
        const primoStarPowerActive =
            Boolean(
                primoStarPower &&
                isBrawlerStarPowerOwned(
                    "El Primo",
                    primoStarPower.id
                )
            );
        const primoBurnApplied =
            primoStarPowerActive &&
            battleState.enemyHealth > 0
            ?
            applyBattleBurn(
                "enemy",
                primoStarPower.effect?.turns || 3
            )
            :
            false;
        const primoStarPowerMessage =
            primoStarPowerActive &&
            battleState.enemyHealth > 0
            ?
            (
                primoBurnApplied
                ?
                " · ★ BRÛLURE : -" +
                (primoStarPower.effect?.damage || 10) +
                " PV PENDANT " +
                (primoStarPower.effect?.turns || 3) +
                " TOURS"
                :
                " · ★ BRÛLURE BLOQUÉE"
            )
            :
            "";
        if (
            battleState.enemyHealth <= 0
        ) {
            battleState.enemyTurn =
                false;
            if (actionMessage) {
                actionMessage.innerText =
                    "SUPER D'EL PRIMO ! · -" +
                    DAMAGE +
                    " PV · " +
                    battleState.enemyPseudo +
                    " EST K.O. !";
            }
            grantBattleVictoryRewards();
            return;
        }
        if (actionMessage) {
            actionMessage.innerText =
                "SUPER D'EL PRIMO ! · -" +
                DAMAGE +
                " PV" +
                primoStarPowerMessage +
                " · EL PRIMO SE RAPPROCHE !";
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    finalizeBattleActionRegen(
                        "player"
                    );
                    startPrimoCloseCombatRound(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       BULL
       =================================================
       Bull charge toujours sur une longueur de 6.
       Distance après la ruée :
       7->1
       6->2
       5->3
       4->4
       3->5
       2->6
       1->7
       Bull attaque automatiquement en premier
       sur cette nouvelle distance.
    */
    if (
        brawlerName ===
        "Bull"
    ) {
        const previousDistance =
            attackDistance;
        const targetWasInRushPath =
            previousDistance <=
            brawlers[
                brawlerName
            ].superStats.range;
        if (
            targetWasInRushPath
        ) {
            const superHits =
                battleAttackHits(
                    brawlerName,
                    battleState.enemyName,
                    true,
                "enemy"
                );
            if (
                superHits
            ) {
                const DAMAGE =
                    applyBullRageDamageBonus(
                        getBattleSuperAttackDamage(
                            brawlerName,
                            previousDistance
                        ),
                        "player"
                    );
                const bullSuperDamageResult =
                    applyBattleDamageToSide(
                        "enemy",
                        DAMAGE,
                        {
                            piercing:
                                true
                        }
                    );
                registerQuestDamage(
                    getBattleDamageResultTotal(
                        bullSuperDamageResult
                    )
                );
                if (
                    battleState.enemyHealth <= 0
                ) {
                    battleState.enemyTurn =
                        false;
                    if (actionMessage) {
                        actionMessage.innerText =
                            "SUPER DE BULL ! · -" +
                            DAMAGE +
                            " PV · " +
                            battleState.enemyPseudo +
                            " EST K.O. !";
                    }
                    grantBattleVictoryRewards();
                    return;
                }
                if (actionMessage) {
                    actionMessage.innerText =
                        "SUPER DE BULL ! · -" +
                        DAMAGE +
                        " PV · BULL CONTINUE SA RUÉE !";
                }
            }
            else {
                healBattleDodger(
                    "enemy"
                );
                if (actionMessage) {
                    actionMessage.innerText =
                        "BOT ESQUIVE LES DÉGÂTS DU SUPER DE BULL · MAIS BULL CONTINUE SA RUÉE !";
                }
                showBattleDodgeMessage(
                    "BOT ESQUIVE !",
                    "enemy"
                );
            }
        }
        else {
            /*
               D7 :
               Bull charge 6 unités et termine à D1,
               sans atteindre la cible pendant la ruée.
            */
            healBattleDodger(
                "enemy"
            );
            if (actionMessage) {
                actionMessage.innerText =
                    "BULL CHARGE SUR 6 · PAS DE DÉGÂTS · IL ARRIVE À DISTANCE 1 !";
            }
        }
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    finalizeBattleActionRegen(
                        "player"
                    );
                    startBullRushRound(
                        "player",
                        previousDistance
                    );
                },
                3000
            );
        return;
    }
    /*
       =================================================
       AUTRES BRAWLERS
       =================================================
       Comportement précédent conservé pour l'instant.
    */
    const DAMAGE =
        40;
    const superHits =
        battleAttackHits(
            brawlerName,
            battleState.enemyName,
            true,
                "enemy"
        );
    if (!superHits) {
        healBattleDodger(
            "enemy"
        );
        if (actionMessage) {
            actionMessage.innerText =
                "BOT ESQUIVE TON SUPER !";
        }
        showBattleDodgeMessage(
            "BOT ESQUIVE !",
            "enemy"
        );
        battleEnemyAttackTimer =
            setTimeout(
                () => {
                    battleEnemyAttackTimer =
                        null;
                    advanceDistanceRoundAfterAttack(
                        "player"
                    );
                },
                3000
            );
        return;
    }
    battleState.enemyHealth =
        Math.max(
            0,
            battleState.enemyHealth -
            DAMAGE
        );
    updateBattleHealthUI(
        "enemy"
    );
    markBattleBrawlerHit(
        "enemy",
        DAMAGE
    );
    registerQuestDamage(
        DAMAGE
    );
    if (
        battleState.enemyHealth <= 0
    ) {
        battleState.enemyTurn =
            false;
        if (actionMessage) {
            actionMessage.innerText =
                "SUPER ! " +
                battleState.enemyPseudo +
                " est K.O. ! VICTOIRE !";
        }
        grantBattleVictoryRewards();
        return;
    }
    if (actionMessage) {
        actionMessage.innerText =
            "Distance " +
            attackDistance +
            " · SUPER ! -40 PV à " +
            battleState.enemyPseudo +
            " · Tour de l'adversaire...";
    }
    battleEnemyAttackTimer =
        setTimeout(
            () => {
                battleEnemyAttackTimer =
                    null;
                advanceDistanceRoundAfterAttack(
                    "player"
                );
            },
            3000
        );
}
function showBrawlers() {
    hideAllPages();
    document
        .getElementById(
            "brawlersPage"
        )
        .classList.add(
            "active"
        );
    document
        .getElementById(
            "navBrawlers"
        )
        .classList.add(
            "active"
        );
    renderBrawlers();
}
function showBoxes() {
    hideAllPages();
    document
        .getElementById(
            "boxesPage"
        )
        .classList.add(
            "active"
        );
    document
        .getElementById(
            "boxTokenCount"
        )
        .innerText =
            state.resources.tokens;
}
/* =====================================================
   SHOP
===================================================== */
function showShop() {
    hideAllPages();
    document
        .getElementById(
            "shopPage"
        )
        .classList.add(
            "active"
        );
    document
        .getElementById(
            "navShop"
        )
        .classList.add(
            "active"
        );
    renderShop();
}
function showFriends() {
    hideAllPages();
    document
        .getElementById(
            "friendsPage"
        )
        .classList.add(
            "active"
        );
    document
        .getElementById(
            "navFriends"
        )
        .classList.add(
            "active"
        );
    renderFriends();
}
/* =====================================================
   UNLOCK
===================================================== */
function isBrawlerUnlocked(name) {
    return state.ownedBrawlers.includes(
        name
    );
}
/* =====================================================
   TRI DES BRAWLERS
===================================================== */
let brawlerSortMode =
    "rarity";
const BRAWLER_DEFAULT_ORDER =
    Object.keys(
        brawlers
    );
const BRAWLER_RARITY_ORDER = {
    starter: 0,
    rare: 1,
    superrare: 2,
    "super-rare": 2,
    epic: 3,
    mythic: 4,
    legendary: 5
};
function getBrawlerRarityRank(
    name
) {
    const brawler =
        brawlers[name];
    if (!brawler) {
        return 999;
    }
    return (
        BRAWLER_RARITY_ORDER[
            brawler.rarityClass
        ] ?? 999
    );
}
function compareBrawlersByRarity(
    nameA,
    nameB
) {
    const rankDifference =
        getBrawlerRarityRank(
            nameA
        ) -
        getBrawlerRarityRank(
            nameB
        );
    if (
        rankDifference !== 0
    ) {
        return rankDifference;
    }
    return (
        BRAWLER_DEFAULT_ORDER.indexOf(
            nameA
        ) -
        BRAWLER_DEFAULT_ORDER.indexOf(
            nameB
        )
    );
}
function getSortedBrawlerNames() {
    const names =
        [
            ...BRAWLER_DEFAULT_ORDER
        ];
    if (
        brawlerSortMode ===
        "power"
    ) {
        names.sort(
            (
                nameA,
                nameB
            ) => {
                const powerDifference =
                    (
                        brawlers[nameB]?.power || 0
                    )
                    -
                    (
                        brawlers[nameA]?.power || 0
                    );
                if (
                    powerDifference !== 0
                ) {
                    return powerDifference;
                }
                return compareBrawlersByRarity(
                    nameA,
                    nameB
                );
            }
        );
    }
    else if (
        brawlerSortMode ===
        "trophies"
    ) {
        names.sort(
            (
                nameA,
                nameB
            ) => {
                const trophyDifference =
                    getBrawlerTrophies(
                        nameB
                    )
                    -
                    getBrawlerTrophies(
                        nameA
                    );
                if (
                    trophyDifference !== 0
                ) {
                    return trophyDifference;
                }
                return compareBrawlersByRarity(
                    nameA,
                    nameB
                );
            }
        );
    }
    /*
       Le mode "rareté" garde exactement
       l'ordre actuel du jeu.
    */
    return names;
}
function updateBrawlerSortButtons() {
    const ids = {
        rarity:
            "sortBrawlersRarity",
        power:
            "sortBrawlersPower",
        trophies:
            "sortBrawlersTrophies"
    };
    Object.entries(
        ids
    )
    .forEach(
        (
            [
                mode,
                id
            ]
        ) => {
            const button =
                document.getElementById(
                    id
                );
            if (button) {
                button.classList.toggle(
                    "active",
                    mode ===
                    brawlerSortMode
                );
            }
        }
    );
}
function setBrawlerSort(
    mode
) {
    if (
        mode !== "rarity" &&
        mode !== "power" &&
        mode !== "trophies"
    ) {
        return;
    }
    brawlerSortMode =
        mode;
    updateBrawlerSortButtons();
    renderBrawlers();
}
/* =====================================================
   RENDER BRAWLERS
===================================================== */
function renderBrawlers() {
    const unlockedGrid =
        document.getElementById(
            "unlockedGrid"
        );
    const lockedGrid =
        document.getElementById(
            "lockedGrid"
        );
    unlockedGrid.innerHTML = "";
    lockedGrid.innerHTML = "";
    getSortedBrawlerNames()
    .forEach(
        name => {
            const brawler =
                brawlers[name];
            const unlocked =
                isBrawlerUnlocked(
                    name
                );
            const card =
                document.createElement(
                    "div"
                );
            card.className =
                "brawler-card rarity-" +
                brawler.rarityClass;
            if (unlocked) {
                card.classList.add(
                    "unlocked"
                );
                if (
                    name === "Poco"
                ) {
                    card.classList.add(
                        "poco-card"
                    );
                }
                if (
                    name ===
                    state.selectedBrawler
                ) {
                    card.classList.add(
                        "selected"
                    );
                }
                const trophyGauge =
                    getBrawlerTrophyGaugeData(
                        name
                    );
                card.innerHTML = `

                    <img
                        class="brawler-image"
                        src="${brawler.icon}"
                        alt="${name}"
                    >

                    <div class="brawler-name">
                        ${name}
                    </div>

                    <div
                        class="
                            brawler-rarity
                            ${brawler.rarityClass}
                        "
                    >
                        ${brawler.rarity}
                    </div>

                    <div
                        class="brawler-trophy-gauge"
                        aria-label="${trophyGauge.actual} trophées · palier ${trophyGauge.start} à ${trophyGauge.end}"
                    >
                        <img class="brawler-trophy-gauge-icon" src="Icon/trophy.png" alt="" aria-hidden="true">
                        <span class="brawler-trophy-gauge-track">
                            <span
                                class="brawler-trophy-gauge-fill"
                                style="--trophy-progress:${trophyGauge.progress}%"
                            ></span>
                            <span class="brawler-trophy-gauge-value">${trophyGauge.actual}</span>
                        </span>
                    </div>

                    <div class="brawler-power ${brawler.power >= 10 ? "max-power-number" : ""}">
                        ${brawler.power}
                    </div>

                `;
                card.addEventListener(
                    "click",
                    () => {
                        showBrawlerDetail(
                            name
                        );
                    }
                );
                unlockedGrid.appendChild(
                    card
                );
            }
            else {
                card.classList.add(
                    "locked"
                );
                if (
                    name === "Poco"
                ) {
                    card.classList.add(
                        "poco-card"
                    );
                }
                card.innerHTML = `

                    <img
                        class="brawler-image"
                        src="${brawler.icon}"
                        alt="${name}"
                    >

                    <img
                        class="brawler-lock-image"
                        src="Icon/lock.png"
                        alt="Verrouillé"
                    >

                    <div class="brawler-name">
                        ${name}
                    </div>

                    <div
                        class="
                            brawler-rarity
                            ${brawler.rarityClass}
                        "
                    >
                        ${brawler.rarity}
                    </div>

                `;
                lockedGrid.appendChild(
                    card
                );
            }
        }
    );
    updateBrawlerCount();
    updateBrawlerSortButtons();
}
/* =====================================================
   DETAIL
===================================================== */
function renderBrawlerIntroduction(name) {
    const brawler = brawlers[name];
    if (!brawler) return;
    const badge = document.getElementById('detailBrawlerCategory');
    const biography = document.getElementById('detailBrawlerDescription');
    if (badge) {
        badge.textContent = brawler.categoryIcon + ' ' + brawler.category;
        badge.dataset.category = brawler.category;
        badge.setAttribute('aria-label', 'Catégorie : ' + brawler.category);
    }
    if (biography) biography.textContent = brawler.description;
}
function showBrawlerDetail(name) {
    closeDetailStatsOverlay();
    if (
        !isBrawlerUnlocked(name)
    ) {
        return;
    }
    const brawler =
        brawlers[name];
    state.detailBrawler =
        name;
    renderBrawlerIntroduction(name);
    renderBrawlerSuperStats(
        brawler
    );
    renderBrawlerCapabilitiesStats();
    setBrawlerStatsMode(
        "base"
    );
    document
        .getElementById(
            "detailBrawlerName"
        )
        .innerText =
            name;
    const rarity =
        document.getElementById(
            "detailBrawlerRarity"
        );
    rarity.innerText =
        brawler.rarity;
    rarity.className =
        "brawler-detail-rarity " +
        brawler.rarityClass;
    const detailTrophies =
        document.getElementById(
            "detailBrawlerTrophies"
        );
    if (detailTrophies) {
        detailTrophies.innerText =
            getBrawlerTrophies(
                name
            );
    }
    updateBrawlerTrophyRoadEntryState();
    const detailSkin =
        document.getElementById(
            "detailBrawlerSkin"
        );
    if (
        name === "Nita"
    ) {
        detailSkin.className =
            "brawler-detail-skin skin-nita";
        configureNitaAlternatingPreview(
            detailSkin,
            brawler.image,
            getNitaBearImageForSkin(
                brawler.image
            ),
            {
                detail: true,
                primaryAlt: "Nita",
                bearAlt:
                    getNitaBearImageForSkin(
                        brawler.image
                    ) === NITA_CHAMPION_BEAR_IMAGE
                    ? "Bruce Champion"
                    : "Bruce"
            }
        );
        restartNitaPreviewRotation();
    }
    else {
        clearNitaAlternatingPreview(
            detailSkin
        );
        detailSkin.src =
            brawler.image;
        detailSkin.className =
            "brawler-detail-skin skin-" +
            name
                .toLowerCase()
                .replace(
                    /\s+/g,
                    "-"
                );
    }
    updateBrawlerHealthStat(
        brawler
    );
    updateBrawlerAttackStat(
        brawler
    );
updateBrawlerSpeedStat(
        brawler
    );
    updateBrawlerRangeStat(
        brawler
    );
    updateBrawlerShotFieldStat(
        brawler
    );
    document
        .getElementById(
            "detailPowerLevel"
        )
        .innerText =
            brawler.power;
    updateMaxPowerVisuals(
        brawler
    );
    updateUpgradeButton();
    hideAllPages();
    document
        .getElementById(
            "brawlerDetailPage"
        )
        .classList.add(
            "active"
        );
    saveGame();
}
/* =====================================================
   VISUEL POUVOIR MAX
===================================================== */
function updateMaxPowerVisuals(
    brawler
) {
    const isMax =
        brawler.power >= 10;
    const detailPage =
        document.getElementById(
            "brawlerDetailPage"
        );
    const detailPower =
        document.getElementById(
            "detailPowerLevel"
        );
    if (detailPage) {
        detailPage.classList.toggle(
            "max-power",
            isMax
        );
    }
    if (detailPower) {
        detailPower.classList.toggle(
            "max-power-number",
            isMax
        );
    }
}
/* =====================================================
   UPDATE SELECTED
===================================================== */
function updateSelectedBrawler() {
    const name =
        state.selectedBrawler;
    const brawler =
        brawlers[name];
    if (!brawler) {
        return;
    }
    const image =
        document.getElementById(
            "selectedImage"
        );
    const nameElement =
        document.getElementById(
            "selectedName"
        );
    const rarityElement =
        document.getElementById(
            "selectedRarity"
        );
    const powerElement =
        document.getElementById(
            "selectedPowerLevel"
        );
    image.classList.toggle("home-poco-lowered", name === "Poco");
    image.src =
        brawler.image;
    image.alt =
        name;
    image.style.display =
        "block";
    image.style.opacity =
        "1";
    image.style.visibility =
        "visible";
    nameElement.innerText =
        name;
    rarityElement.innerText =
        brawler.rarity;
    rarityElement.className =
        "selected-rarity rarity-" +
        brawler.rarityClass;
    powerElement.innerText =
        brawler.power;
    powerElement.classList.toggle(
        "max-power-number",
        brawler.power >= 10
    );
    const selectedTrophies =
        document.getElementById(
            "selectedBrawlerTrophies"
        );
    if (selectedTrophies) {
        selectedTrophies.innerText =
            getBrawlerTrophies(
                name
            );
    }
}
/* =====================================================
   CHOOSE
===================================================== */
function confirmBrawlerChoice() {
    const name =
        state.detailBrawler;
    if (
        !isBrawlerUnlocked(name)
    ) {
        return;
    }
    state.selectedBrawler =
        name;
    saveGame();
    updateSelectedBrawler();
    closeDetailStatsOverlay();
    showHome();
}
/* =====================================================
   AFFICHAGE DU COÛT D'AMÉLIORATION
===================================================== */
function updateUpgradeButton() {
    const button =
        document.getElementById("upgradeButton");
    if (!button) return;
    const brawler =
        brawlers[state.detailBrawler];
    if (!brawler) return;
    if (brawler.power >= 10) {
        button.disabled = true;
        button.innerHTML = `
            <span class="upgrade-button-title">
                NIVEAU MAX
            </span>
        `;
        return;
    }
    const cost =
        POWER_UPGRADE_COSTS[brawler.power];
    const enoughCoins =
        state.resources.coins >= cost.coins;
    const enoughPower =
        state.resources.power >= cost.power;
    button.disabled =
        !enoughCoins || !enoughPower;
    button.innerHTML = `
        <span class="upgrade-button-title">
            AMÉLIORER → ${brawler.power + 1}
        </span>

        <span class="upgrade-button-costs">

            <span class="upgrade-cost ${enoughCoins ? "" : "missing"}">
                <img src="Icon/coin.png" alt="Pièces">
                ${cost.coins}
            </span>

            <span class="upgrade-cost ${enoughPower ? "" : "missing"}">
                <img src="Icon/power.png" alt="Points de pouvoir">
                ${cost.power}
            </span>

        </span>
    `;
}
/* =====================================================
   UPGRADE
===================================================== */
function upgradeBrawler() {
    const name =
        state.detailBrawler;
    const brawler =
        brawlers[name];
    if (!brawler || brawler.power >= 10) {
        return;
    }
    const cost =
        POWER_UPGRADE_COSTS[brawler.power];
    if (
        state.resources.coins < cost.coins ||
        state.resources.power < cost.power
    ) {
        return;
    }
    state.resources.coins -=
        cost.coins;
    state.resources.power -=
        cost.power;
    brawler.power++;
    saveGame();
    updateResources();
    document
        .getElementById("detailPowerLevel")
        .innerText =
            brawler.power;
    updateBrawlerHealthStat(
        brawler
    );
    updateBrawlerAttackStat(
        brawler
    );
    renderBrawlerSuperStats(
        brawler
    );
    renderBrawlerCapabilitiesStats();
    updateMaxPowerVisuals(
        brawler
    );
    updateUpgradeButton();
    if (
        state.selectedBrawler === name
    ) {
        updateSelectedBrawler();
    }
    renderBrawlers();
}
/* =====================================================
   BACK DETAIL
===================================================== */
function closeBrawlerDetail() {
    closeDetailStatsOverlay();
    showBrawlers();
}
/* =====================================================
   PROFILE
===================================================== */
let pendingProfileIcon =
    state.profile.icon;
function isProfileIconImage(
    value
) {
    return getAllowedProfileIconPaths().includes(
        value
    );
}
function renderHeaderProfileIcon() {
    const avatar =
        document.getElementById(
            "avatar"
        );
    if (!avatar) {
        return;
    }
    const icon =
        state.profile.icon;
    if (
        isProfileIconImage(
            icon
        )
    ) {
        avatar.innerHTML = `
            <img
                src="${icon}"
                alt="Icône de profil"
            >
        `;
    }
    else {
        avatar.innerHTML = `
            <img
                src="${DEFAULT_PROFILE_ICON}"
                alt="Icône de profil"
            >
        `;
    }
}
function renderProfileIconChoices() {
    const container =
        document.getElementById(
            "profileIconChoices"
        );
    if (!container) {
        return;
    }
    const ownedCount = PROFILE_ICON_CHOICES.filter(choice => isProfileIconUnlocked(choice.icon)).length;
    const countLabel = document.getElementById("profileIconOwnedCount");
    if (countLabel) countLabel.textContent = `${ownedCount} / ${PROFILE_ICON_CHOICES.length}`;
    container.innerHTML =
        PROFILE_ICON_CHOICES.map(
            choice => {
                const selected =
                    pendingProfileIcon ===
                    choice.icon;
                const unlocked =
                    isProfileIconUnlocked(
                        choice.icon
                    );
                const profileBrawlerName =
                    getBrawlerNameFromProfileIcon(choice.icon);
                const lockedReason =
                    profileBrawlerName && !unlocked
                    ? (
                        getBrawlerTrophies(profileBrawlerName) >= 250
                        ? " - Récompense 250 trophées à récupérer"
                        : ` - ${getBrawlerTrophies(profileBrawlerName)} / 250 trophées`
                    )
                    : " - Verrouillée";
                return `
                    <button
                        type="button"
                        class="
                            profile-icon-choice
                            ${selected ? "selected" : ""}
                            ${unlocked ? "" : "locked"}
                        "
                        onclick="${
                            unlocked
                            ?
                            `selectProfileIcon('${choice.icon}')`
                            :
                            "return false"
                        }"
                        aria-label="${choice.name}${unlocked ? "" : lockedReason}"
                        title="${choice.name}${unlocked ? "" : lockedReason}"
                        ${unlocked ? "" : "disabled"}
                    >
                        <img
                            src="${choice.icon}"
                            alt="${choice.name}"
                        >

                        ${
                            unlocked
                            ?
                            ""
                            :
                            `
                                <span class="profile-icon-lock">
                                    <img
                                        src="Icon/lock.png"
                                        alt="Verrouillé"
                                    >
                                </span>
                            `
                        }

                    </button>
                `;
            }
        ).join("");
}
function selectProfileIcon(
    icon
) {
    if (
        !isProfileIconUnlocked(
            icon
        )
    ) {
        return;
    }
    pendingProfileIcon =
        icon;
    renderProfileIconChoices();
}
function openProfile() {
    const popup =
        document.getElementById(
            "profilePopup"
        );
    const input =
        document.getElementById(
            "profileNameInput"
        );
    input.value =
        state.profile.name;
    pendingProfileIcon =
        normalizeProfileIcon(
            state.profile.icon
        );
    renderProfileIconChoices();
    popup.classList.add(
        "active"
    );
    input.focus();
}
function saveProfile() {
    const input =
        document.getElementById(
            "profileNameInput"
        );
    const name =
        input.value.trim();
    if (
        name.length > 0
    ) {
        state.profile.name =
            name;
    }
    if (
        isProfileIconImage(
            pendingProfileIcon
        )
    ) {
        state.profile.icon =
            pendingProfileIcon;
    }
    saveGame();
    document
        .getElementById(
            "playerName"
        )
        .innerText =
            state.profile.name ||
            "JOUEUR";
    renderHeaderProfileIcon();
    closePopup(
        "profilePopup"
    );
}
/* =====================================================
   RÉINITIALISER LE COMPTE
===================================================== */
let appConfirmAction =
    null;
function showAppConfirm({
    title = "CONFIRMER ?",
    message = "",
    confirmLabel = "CONFIRMER",
    kicker = "CONFIRMATION",
    icon = "?",
    danger = false,
    onConfirm = null
} = {}) {
    const overlay =
        document.getElementById(
            "appConfirmOverlay"
        );
    const card =
        document.getElementById(
            "appConfirmCard"
        );
    const iconElement =
        document.getElementById(
            "appConfirmIcon"
        );
    const kickerElement =
        document.getElementById(
            "appConfirmKicker"
        );
    const titleElement =
        document.getElementById(
            "appConfirmTitle"
        );
    const messageElement =
        document.getElementById(
            "appConfirmMessage"
        );
    const acceptButton =
        document.getElementById(
            "appConfirmAccept"
        );
    if (
        !overlay ||
        !card ||
        !acceptButton
    ) {
        if (
            typeof onConfirm ===
            "function"
        ) {
            onConfirm();
        }
        return;
    }
    appConfirmAction =
        typeof onConfirm ===
        "function"
        ?
        onConfirm
        :
        null;
    card.classList.toggle(
        "danger",
        danger
    );
    if (iconElement) {
        iconElement.innerText =
            icon;
    }
    if (kickerElement) {
        kickerElement.innerText =
            kicker;
    }
    if (titleElement) {
        titleElement.innerText =
            title;
    }
    if (messageElement) {
        messageElement.innerText =
            message;
    }
    acceptButton.innerText =
        confirmLabel;
    acceptButton.onclick =
        function() {
            const action =
                appConfirmAction;
            closeAppConfirm();
            if (
                typeof action ===
                "function"
            ) {
                action();
            }
        };
    overlay.classList.add(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}
function closeAppConfirm() {
    const overlay =
        document.getElementById(
            "appConfirmOverlay"
        );
    if (overlay) {
        overlay.classList.remove(
            "active"
        );
        overlay.setAttribute(
            "aria-hidden",
            "true"
        );
    }
    appConfirmAction =
        null;
}
function performAccountReset() {
    localStorage.removeItem(
        SAVE_KEY
    );
    localStorage.removeItem(
        "brawlvs_username"
    );
    location.reload();
}
function resetAccount() {
    showAppConfirm({
        kicker:
            "⚠ ATTENTION",
        icon:
            "!",
        title:
            "RÉINITIALISER LE COMPTE ?",
        message:
            "Toute ta progression sera supprimée : pseudo, ressources, trophées, Brawlers, niveaux, capacités, quêtes, récompenses et amis.\n\nCette action est irréversible.",
        confirmLabel:
            "CONTINUER",
        danger:
            true,
        onConfirm:
            () => {
                showAppConfirm({
                    kicker:
                        "DERNIÈRE CONFIRMATION",
                    icon:
                        "!",
                    title:
                        "TOUT EFFACER ?",
                    message:
                        "Cette fois, appuyer sur RÉINITIALISER supprimera définitivement toutes les données du compte.",
                    confirmLabel:
                        "RÉINITIALISER",
                    danger:
                        true,
                    onConfirm:
                        performAccountReset
                });
            }
    });
}
/* =====================================================
   LOGIN
===================================================== */
function askUsername() {
    const popup =
        document.getElementById(
            "loginPopup"
        );
    const input =
        document.getElementById(
            "usernameInput"
        );
    popup.classList.add(
        "active"
    );
    input.focus();
}
function confirmUsername() {
    const input =
        document.getElementById(
            "usernameInput"
        );
    const name =
        input.value.trim();
    if (
        name.length === 0
    ) {
        return;
    }
    state.profile.name =
        name;
    saveGame();
    localStorage.setItem(
        "brawlvs_username",
        name
    );
    document
        .getElementById(
            "playerName"
        )
        .innerText =
            name;
    closePopup(
        "loginPopup"
    );
}
/* =====================================================
   POPUP
===================================================== */
function closePopup(id) {
    document
        .getElementById(id)
        .classList.remove(
            "active"
        );
}
/* =====================================================
   CONFIGURATION DES BOXES
===================================================== */
const BOXES = {
    brawl: {
        name: "Brawl Box",
        cost: 10,
        currency: "tokens",
        currencyLabel: "tokens",
        currencyIcon: "Icon/Jeton.png",
        draws: 1,
        image: "Icon/Brawl_Box.webp"
    },
    big: {
        name: "Big Box",
        cost: 3,
        currency: "starTokens",
        currencyLabel: "Star Tokens",
        currencyIcon: "Icon/Fly_token.png",
        draws: 3,
        image: "Icon/Big_Box.webp"
    },
    mega: {
        name: "Mega Box",
        cost: 60,
        currency: "gems",
        currencyLabel: "gemmes",
        currencyIcon: "Icon/gemme.png",
        draws: 10,
        image: "Icon/Mega_Box.webp"
    }
};
/* =====================================================
   RÉCOMPENSES
===================================================== */
const BOX_ABILITY_DROP_CHANCE =
    2;
const BOX_STAR_POWER_DROP_CHANCE =
    1;
function getEligibleBoxStarPowers() {
    const eligible =
        [];
    Object.keys(
        BRAWLER_STAR_POWER_CATALOG
    ).forEach(
        brawlerName => {
            const brawler =
                brawlers[
                    brawlerName
                ];
            const starPower =
                getBrawlerStarPower(
                    brawlerName
                );
            if (
                !brawler ||
                !starPower ||
                !state.ownedBrawlers.includes(
                    brawlerName
                ) ||
                (
                    Number(
                        brawler.power
                    ) || 1
                ) <
                starPower.requiredPower ||
                isBrawlerStarPowerOwned(
                    brawlerName,
                    starPower.id
                )
            ) {
                return;
            }
            eligible.push({
                brawlerName,
                starPowerId:
                    starPower.id,
                starPowerName:
                    starPower.name,
                brawlerIcon:
                    brawler.icon
            });
        }
    );
    return eligible;
}
function getRandomEligibleBoxStarPower() {
    const eligible =
        getEligibleBoxStarPowers();
    if (
        eligible.length === 0
    ) {
        return null;
    }
    return eligible[
        Math.floor(
            Math.random() *
            eligible.length
        )
    ];
}
function getEligibleBoxAbilities() {
    const eligible =
        [];
    Object.keys(
        brawlers
    ).forEach(
        brawlerName => {
            const brawler =
                brawlers[
                    brawlerName
                ];
            /*
               Conditions :
               - Brawler déjà possédé
               - Power 7 minimum
               - capacité pas encore obtenue
            */
            if (
                !state.ownedBrawlers.includes(
                    brawlerName
                ) ||
                !brawler ||
                (
                    Number(
                        brawler.power
                    ) || 1
                ) < 7
            ) {
                return;
            }
            getBrawlerAbilityCatalog(
                brawlerName
            ).forEach(
                ability => {
                    if (
                        !isBrawlerAbilityOwned(
                            brawlerName,
                            ability.id
                        )
                    ) {
                        eligible.push({
                            brawlerName,
                            abilityId:
                                ability.id,
                            abilityName:
                                ability.name,
                            brawlerIcon:
                                brawler.icon
                        });
                    }
                }
            );
        }
    );
    return eligible;
}
function getRandomEligibleBoxAbility() {
    const eligible =
        getEligibleBoxAbilities();
    if (
        eligible.length === 0
    ) {
        return null;
    }
    return eligible[
        Math.floor(
            Math.random() *
            eligible.length
        )
    ];
}
const boxRewards = [
    {
        type: "coins",
        icon: "Icon/coin.png",
        name: "Pièces",
        description: "+100 pièces",
        amount: 100,
        rarity: "COMMUN",
        rarityClass: "starter",
        chance: 39.5
    },
    {
        type: "coins",
        icon: "Icon/coin.png",
        name: "Pièces",
        description: "+250 pièces",
        amount: 250,
        rarity: "RARE",
        rarityClass: "rare",
        chance: 15
    },
    {
        type: "gems",
        icon: "Icon/gemme.png",
        name: "Gemmes",
        description: "+3 gemmes",
        amount: 3,
        rarity: "RARE",
        rarityClass: "rare",
        chance: 15
    },
    {
        type: "power",
        icon: "Icon/power.png",
        name: "Pouvoir",
        description: "+100 points de pouvoir",
        amount: 100,
        rarity: "RARE",
        rarityClass: "rare",
        chance: 25
    },
    {
        type: "brawler",
        icon: "⚔️",
        name: "Brawler rare",
        description:
            "Un nouveau Brawler rare rejoint ton équipe !",
        amount: 1,
        rarity: "RARE",
        rarityClass: "rare",
        chance: 2.5
    }
];
/* =====================================================
   TIRAGE : UNE SEULE RÉCOMPENSE PAR TIRAGE
   Le brawler rare conserve exactement 2,5 % par tirage.
===================================================== */
function getRandomReward() {
    const roll =
        Math.random() * 100;
    const coins100 =
        boxRewards.find(
            reward =>
                reward.type === "coins" &&
                reward.amount === 100
        );
    const coins250 =
        boxRewards.find(
            reward =>
                reward.type === "coins" &&
                reward.amount === 250
        );
    const gems3 =
        boxRewards.find(
            reward =>
                reward.type === "gems" &&
                reward.amount === 3
        );
    const power100 =
        boxRewards.find(
            reward =>
                reward.type === "power" &&
                reward.amount === 100
        );
    const brawlerReward =
        boxRewards.find(
            reward =>
                reward.type === "brawler"
        );
    /*
       TAUX EXACTS PAR TIRAGE
       0,0  -> 1,0   : Pouvoir Star       1 %
       1,0  -> 3,0   : Capacité            2 %
       3,0  -> 5,5   : Brawler rare        2,5 %
       5,5  -> 20,5  : 3 gemmes           15 %
       20,5 -> 35,5  : 250 pièces         15 %
       35,5 -> 60,5  : 100 pouvoir        25 %
       60,5 -> 100   : 100 pièces         39,5 %
       Si le tirage tombe sur un Pouvoir Star ou une capacité
       mais qu'aucun n'est actuellement éligible, la récompense
       devient 100 pièces. Cela évite de modifier les autres taux.
    */
    if (roll < 1) {
        const eligibleStarPower =
            getRandomEligibleBoxStarPower();
        if (eligibleStarPower) {
            return {
                type: "starPower",
                chance: 1,
                starPowerDrop: eligibleStarPower
            };
        }
        return coins100;
    }
    if (roll < 3) {
        const eligibleAbility =
            getRandomEligibleBoxAbility();
        if (eligibleAbility) {
            return {
                type: "ability",
                chance: 2,
                abilityDrop: eligibleAbility
            };
        }
        return coins100;
    }
    if (roll < 5.5) {
        return brawlerReward;
    }
    if (roll < 20.5) {
        return gems3;
    }
    if (roll < 35.5) {
        return coins250;
    }
    if (roll < 60.5) {
        return power100;
    }
    return coins100;
}
/* =====================================================
   TIRAGE D'UNE RÉCOMPENSE
===================================================== */
function drawSingleReward() {
    const reward =
        getRandomReward();
    if (
        reward.type ===
        "starPower"
    ) {
        const drop =
            reward.starPowerDrop;
        if (
            !drop ||
            !drop.brawlerName ||
            !drop.starPowerId ||
            isBrawlerStarPowerOwned(
                drop.brawlerName,
                drop.starPowerId
            )
        ) {
            return {
                type: "coins",
                amount: 100,
                fallback: true
            };
        }
        if (
            !grantBrawlerStarPower(
                drop.brawlerName,
                drop.starPowerId
            )
        ) {
            return {
                type: "coins",
                amount: 100,
                fallback: true
            };
        }
        return {
            type: "starPower",
            brawlerName:
                drop.brawlerName,
            starPowerId:
                drop.starPowerId,
            name:
                drop.starPowerName,
            icon:
                drop.brawlerIcon
        };
    }
    if (
        reward.type ===
        "ability"
    ) {
        const drop =
            reward.abilityDrop;
        if (
            !drop ||
            !drop.brawlerName ||
            !drop.abilityId ||
            isBrawlerAbilityOwned(
                drop.brawlerName,
                drop.abilityId
            )
        ) {
            /*
               Sécurité : si le pool a changé entre
               le tirage et l'attribution, compensation.
            */
            return {
                type:
                    "coins",
                amount:
                    100,
                fallback:
                    true
            };
        }
        if (
            !Array.isArray(
                state.brawlerAbilitiesOwned[
                    drop.brawlerName
                ]
            )
        ) {
            state.brawlerAbilitiesOwned[
                drop.brawlerName
            ] = [];
        }
        state.brawlerAbilitiesOwned[
            drop.brawlerName
        ].push(
            drop.abilityId
        );
        return {
            type:
                "ability",
            brawlerName:
                drop.brawlerName,
            abilityId:
                drop.abilityId,
            name:
                drop.abilityName,
            icon:
                drop.brawlerIcon
        };
    }
    if (
        reward.type === "brawler"
    ) {
        const locked =
            Object.keys(
                brawlers
            ).filter(
                name =>
                    brawlers[name]?.rarity === "RARE" &&
                    !state.ownedBrawlers.includes(
                        name
                    )
            );
        if (
            locked.length === 0
        ) {
            return {
                type: "coins",
                amount: 100,
                fallback: true
            };
        }
        const newBrawler =
            locked[
                Math.floor(
                    Math.random() *
                    locked.length
                )
            ];
        state.ownedBrawlers.push(
            newBrawler
        );
        return {
            type: "brawler",
            name: newBrawler,
            icon:
                brawlers[
                    newBrawler
                ].icon
        };
    }
    return {
        type:
            reward.type,
        amount:
            reward.amount,
        icon:
            reward.icon,
        name:
            reward.name,
        rarity:
            reward.rarity,
        rarityClass:
            reward.rarityClass
    };
}
/* =====================================================
   ANIMATION D'OUVERTURE DE BOX
===================================================== */
let boxOpeningActive =
    false;
let boxOpeningWaitingForClick =
    false;
let boxOpeningCompleteCallback =
    null;
function playBoxOpeningAnimation(
    box,
    onComplete
) {
    const overlay =
        document.getElementById(
            "boxOpeningOverlay"
        );
    const image =
        document.getElementById(
            "boxOpeningImage"
        );
    const name =
        document.getElementById(
            "boxOpeningName"
        );
    const label =
        document.getElementById(
            "boxOpeningLabel"
        );
    if (
        !overlay ||
        !image
    ) {
        boxOpeningActive =
            false;
        if (
            typeof onComplete ===
            "function"
        ) {
            onComplete();
        }
        return;
    }
    boxOpeningActive =
        true;
    boxOpeningWaitingForClick =
        true;
    boxOpeningCompleteCallback =
        typeof onComplete ===
        "function"
        ?
        onComplete
        :
        null;
    image.src =
        box.image;
    image.alt =
        box.name;
    if (name) {
        name.innerText =
            box.name;
    }
    if (label) {
        label.innerText =
            "CLIQUE SUR LA BOX POUR L'OUVRIR";
    }
    overlay.classList.remove(
        "appear",
        "shake",
        "opening",
        "waiting-click"
    );
    overlay.classList.add(
        "active"
    );
    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
    void overlay.offsetWidth;
    /*
       La box apparaît au centre,
       puis ATTEND le clic du joueur.
    */
    overlay.classList.add(
        "appear"
    );
    setTimeout(
        () => {
            if (
                !boxOpeningWaitingForClick
            ) {
                return;
            }
            overlay.classList.remove(
                "appear"
            );
            overlay.classList.add(
                "waiting-click"
            );
        },
        480
    );
}
function openDisplayedBox() {
    if (
        !boxOpeningActive ||
        !boxOpeningWaitingForClick
    ) {
        return;
    }
    const overlay =
        document.getElementById(
            "boxOpeningOverlay"
        );
    const label =
        document.getElementById(
            "boxOpeningLabel"
        );
    if (!overlay) {
        return;
    }
    /*
       Un seul clic peut déclencher l'ouverture.
    */
    boxOpeningWaitingForClick =
        false;
    overlay.classList.remove(
        "appear",
        "waiting-click",
        "opening"
    );
    overlay.classList.add(
        "shake"
    );
    if (label) {
        label.innerText =
            "OUVERTURE...";
    }
    /*
       1. Le joueur clique.
       2. La box tremble.
       3. Flash d'ouverture.
       4. Les récompenses apparaissent.
    */
    setTimeout(
        () => {
            overlay.classList.remove(
                "shake"
            );
            overlay.classList.add(
                "opening"
            );
            if (label) {
                label.innerText =
                    "OUVERT !";
            }
        },
        450
    );
    setTimeout(
        () => {
            overlay.classList.remove(
                "active",
                "appear",
                "waiting-click",
                "shake",
                "opening"
            );
            overlay.setAttribute(
                "aria-hidden",
                "true"
            );
            boxOpeningActive =
                false;
            const callback =
                boxOpeningCompleteCallback;
            boxOpeningCompleteCallback =
                null;
            if (
                typeof callback ===
                "function"
            ) {
                callback();
            }
        },
        850
    );
}
/* =====================================================
   OUVRIR UNE BOX
===================================================== */
function give100Tokens() {
    state.resources.tokens +=
        100;
    state.resources.starTokens +=
        100;
    state.resources.gems +=
        100;
    saveGame();
    updateResources();
    const boxTokenCount =
        document.getElementById(
            "boxTokenCount"
        );
    if (boxTokenCount) {
        boxTokenCount.innerText =
            state.resources.tokens;
    }
    const shopBoxTokenCount =
        document.getElementById(
            "shopBoxTokenCount"
        );
    if (shopBoxTokenCount) {
        shopBoxTokenCount.innerText =
            state.resources.tokens;
    }
    const boxStarTokenCount =
        document.getElementById(
            "boxStarTokenCount"
        );
    if (boxStarTokenCount) {
        boxStarTokenCount.innerText =
            state.resources.starTokens;
    }
    const boxGemCount =
        document.getElementById(
            "boxGemCount"
        );
    if (boxGemCount) {
        boxGemCount.innerText =
            state.resources.gems;
    }
}
function openBox(boxId) {
    if (boxOpeningActive) {
        return;
    }
    const box =
        BOXES[boxId];
    if (!box) {
        return;
    }
    const currency =
        box.currency ||
        "tokens";
    const balance =
        Number(
            state.resources[currency]
        ) || 0;
    if (
        balance <
        box.cost
    ) {
        showReward(
            box.currencyIcon,
            "RESSOURCES INSUFFISANTES",
            "Il te faut " +
            box.cost +
            " " +
            box.currencyLabel +
            " pour ouvrir cette boîte.",
            "INFO",
            "rare"
        );
        return;
    }
    showAppConfirm({
        kicker:
            "BOÎTES",
        icon:
            "✓",
        title:
            "OUVRIR CETTE BOX ?",
        message:
            box.name +
            "\n\nPrix : " +
            box.cost +
            " " +
            box.currencyLabel,
        confirmLabel:
            "OUVRIR",
        onConfirm:
            () => {
                executePaidBoxOpening(
                    boxId
                );
            }
    });
    return;
}
function executePaidBoxOpening(
    boxId, seasonal = false
) {
    if (boxOpeningActive) {
        return;
    }
    const box = seasonal
        ? { ...BOXES.mega, cost: 80, currency: "tokens", currencyLabel: "jetons", currencyIcon: "Icon/Jeton.png" }
        : BOXES[boxId];
    if (seasonal && (boxId !== "mega" || state.seasonOne.megaBought >= 3)) return;
    if (!box) {
        return;
    }
    const currency =
        box.currency ||
        "tokens";
    const balance =
        Number(
            state.resources[
                currency
            ]
        ) || 0;
    if (
        balance <
        box.cost
    ) {
        return;
    }
    state.resources[currency] -=
        box.cost;
    if (seasonal) state.seasonOne.megaBought++;
    const results = {
        coins: 0,
        gems: 0,
        power: 0,
        brawlers: [],
        abilities: [],
        starPowers: []
    };
    for (
        let i = 0;
        i < box.draws;
        i++
    ) {
        const reward =
            drawSingleReward();
        if (
            reward.type ===
            "coins"
        ) {
            results.coins +=
                reward.amount;
        }
        else if (
            reward.type ===
            "gems"
        ) {
            results.gems +=
                reward.amount;
        }
        else if (
            reward.type ===
            "power"
        ) {
            results.power +=
                reward.amount;
        }
        else if (
            reward.type ===
            "brawler"
        ) {
            results.brawlers.push(
                reward.name
            );
        }
        else if (reward.type === "ability") {
            results.abilities.push({
                brawlerName: reward.brawlerName,
                abilityId: reward.abilityId,
                name: reward.name,
                icon: reward.icon
            });
        }
        else if (reward.type === "starPower") {
            results.starPowers.push({
                brawlerName: reward.brawlerName,
                starPowerId: reward.starPowerId,
                name: reward.name,
                icon: reward.icon
            });
        }
    }
    state.resources.coins +=
        results.coins;
    state.resources.gems +=
        results.gems;
    state.resources.power +=
        results.power;
    saveGame();
    updateResources();
    updateBrawlerCount();
    renderBrawlers();
    renderAbilityShop();
    renderStarPowerShop();
    renderBrawlerCapabilitiesStats();
    renderBrawlerStarPowerStats();
    playBoxOpeningAnimation(
        box,
        () => {
            showBoxRewards(
                box,
                results
            );
        }
    );
}
/* =====================================================
   AFFICHER LES RÉCOMPENSES GROUPÉES
===================================================== */
function showBoxRewards(
    box,
    results
) {
    const rewardIcon =
        document.getElementById(
            "rewardIcon"
        );
    const rewardName =
        document.getElementById(
            "rewardName"
        );
    const rewardDescription =
        document.getElementById(
            "rewardDescription"
        );
    const rewardRarity =
        document.getElementById(
            "rewardRarity"
        );
    /*
       On utilise le même popup existant.
       Le contenu est remplacé uniquement
       pendant l'affichage des récompenses multiples.
    */
    rewardIcon.innerHTML = `

        <img
            src="${box.image}"
            alt="${box.name}"
        >

    `;
    rewardName.innerText =
        box.name;
    rewardDescription.innerText =
        box.draws +
        (
            box.draws > 1
            ? " récompenses obtenues"
            : " récompense obtenue"
        );
    rewardRarity.innerText =
        "RÉCOMPENSES";
    rewardRarity.className =
        "reward-rarity rarity-rare";
    /*
       Création de la liste
       des récompenses regroupées.
    */
    let list =
        document.getElementById(
            "multiRewardList"
        );
    if (!list) {
        list =
            document.createElement(
                "div"
            );
        list.id =
            "multiRewardList";
        list.className =
            "multi-reward-list";
        const button =
            document.querySelector(
                "#rewardPopup .login-button"
            );
        button.parentNode.insertBefore(
            list,
            button
        );
    }
    list.innerHTML =
        "";
    /*
       PIÈCES
    */
    if (
        results.coins > 0
    ) {
        list.innerHTML += `

            <div class="multi-reward-item">

                <img
                    src="Icon/coin.png"
                    alt="Pièces"
                >

                <div class="multi-reward-item-info">

                    <div class="multi-reward-item-name">
                        Pièces
                    </div>

                    <div class="multi-reward-item-description">
                        Récompenses cumulées
                    </div>

                </div>

                <div class="multi-reward-item-amount">
                    +${results.coins}
                </div>

            </div>

        `;
    }
    /*
       GEMMES
    */
    if (
        results.gems > 0
    ) {
        list.innerHTML += `

            <div class="multi-reward-item">

                <img
                    src="Icon/gemme.png"
                    alt="Gemmes"
                >

                <div class="multi-reward-item-info">

                    <div class="multi-reward-item-name">
                        Gemmes
                    </div>

                    <div class="multi-reward-item-description">
                        Récompenses cumulées
                    </div>

                </div>

                <div class="multi-reward-item-amount">
                    +${results.gems}
                </div>

            </div>

        `;
    }
    /*
       POUVOIR
    */
    if (
        results.power > 0
    ) {
        list.innerHTML += `

            <div class="multi-reward-item">

                <img
                    src="Icon/power.png"
                    alt="Pouvoir"
                >

                <div class="multi-reward-item-info">

                    <div class="multi-reward-item-name">
                        Points de pouvoir
                    </div>

                    <div class="multi-reward-item-description">
                        Récompenses cumulées
                    </div>

                </div>

                <div class="multi-reward-item-amount">
                    +${results.power}
                </div>

            </div>

        `;
    }
    /*
       CAPACITÉS
    */
    if (
        Array.isArray(
            results.abilities
        ) &&
        results.abilities.length >
        0
    ) {
        results.abilities.forEach(
            ability => {
                list.innerHTML += `

                    <div class="multi-reward-item">

                        <img
                            src="${ability.icon}"
                            alt="${ability.brawlerName}"
                        >

                        <div class="multi-reward-item-info">

                            <div class="multi-reward-item-name">
                                ${ability.name}
                            </div>

                            <div class="multi-reward-item-description">
                                Capacité de ${ability.brawlerName}
                            </div>

                        </div>

                        <div class="multi-reward-item-amount">
                            CAPA
                        </div>

                    </div>

                `;
            }
        );
    }
    /*
       BRAWLERS
    */
    if (
        results.brawlers.length > 0
    ) {
        const brawlerNames =
            results.brawlers.join(
                ", "
            );
        list.innerHTML += `

            <div class="multi-reward-item">

                <div class="multi-reward-item-icon">
                    ⚔️
                </div>

                <div class="multi-reward-item-info">

                    <div class="multi-reward-item-name">
                        Nouveau Brawler
                    </div>

                    <div class="multi-reward-item-description">
                        ${results.brawlers.length > 1
                            ? "Nouveaux combattants débloqués"
                            : "Nouveau combattant débloqué"
                        }
                    </div>

                    <div class="multi-brawlers">

                        ${results.brawlers
                            .map(
                                name =>
                                    `
                                    <div class="multi-brawler">
                                        ${name}
                                    </div>
                                    `
                            )
                            .join("")
                        }

                    </div>

                </div>

            </div>

        `;
    }
    /*
       Si, exceptionnellement, aucun résultat
       n'est disponible, on affiche une info.
    */
    if (
        list.innerHTML.trim() === ""
    ) {
        list.innerHTML = `

            <div class="multi-reward-item">

                <div class="multi-reward-item-icon">
                    🎁
                </div>

                <div class="multi-reward-item-info">

                    <div class="multi-reward-item-name">
                        Récompense
                    </div>

                    <div class="multi-reward-item-description">
                        Aucun résultat disponible.
                    </div>

                </div>

            </div>

        `;
    }
    document
        .getElementById(
            "rewardPopup"
        )
        .classList.add(
            "active"
        );
}
/* =====================================================
   SHOW REWARD CLASSIQUE
===================================================== */
function showReward(
    icon,
    name,
    description,
    rarity,
    rarityClass
) {
    const rewardIcon =
        document.getElementById(
            "rewardIcon"
        );
    /*
       Réinitialise complètement l'affichage classique
       pour éviter que l'icône reste cachée après
       une récompense de Brawler / une séquence de box.
    */
    const rewardPopup =
        document.getElementById(
            "rewardPopup"
        );
    rewardPopup.classList.remove(
        "sequence-mode",
        "brawler-unlock-mode"
    );
    rewardIcon.style.display =
        "";
    const rewardHero =
        document.getElementById(
            "rewardHero"
        );
    if (rewardHero) {
        rewardHero.className =
            "reward-hero";
    }
    /*
       On retire une éventuelle
       ancienne liste de récompenses multiples.
    */
    const oldList =
        document.getElementById(
            "multiRewardList"
        );
    if (oldList) {
        oldList.remove();
    }
    if (
        typeof icon === "string" &&
        (
            icon.includes(".png") ||
            icon.includes(".webp") ||
            icon.includes(".jpg") ||
            icon.includes(".jpeg")
        )
    ) {
        rewardIcon.innerHTML = `

            <img
                src="${icon}"
                alt="${name}"
            >

        `;
    }
    else {
        rewardIcon.innerText =
            icon;
    }
    document
        .getElementById(
            "rewardName"
        )
        .innerText =
            name;
    document
        .getElementById(
            "rewardDescription"
        )
        .innerText =
            description;
    const rarityElement =
        document.getElementById(
            "rewardRarity"
        );
    rarityElement.innerText =
        rarity;
    rarityElement.className =
        "reward-rarity rarity-" +
        rarityClass;
    document
        .getElementById(
            "rewardPopup"
        )
        .classList.add(
            "active"
        );
}
/* =====================================================
   BOUTON DE RESSOURCES TEST — ÉCRAN DES BOXES
===================================================== */
/* =====================================================
   RESOURCES
===================================================== */
function updateResources() {
    syncTotalTrophies();
    document
        .getElementById(
            "trophyCount"
        )
        .innerText =
            state.resources.trophies;
    document
        .getElementById(
            "coinCount"
        )
        .innerText =
            state.resources.coins;
    document
        .getElementById(
            "gemCount"
        )
        .innerText =
            state.resources.gems;
    document
        .getElementById(
            "powerCount"
        )
        .innerText =
            state.resources.power;
    const tokenCount =
        document.getElementById(
            "tokenCount"
        );
    if (tokenCount) {
        tokenCount.innerText =
            state.resources.tokens;
    }
    const boxTokenCount =
        document.getElementById(
            "boxTokenCount"
        );
    if (boxTokenCount) {
        boxTokenCount.innerText =
            state.resources.tokens;
    }
    const boxStarTokenCount =
        document.getElementById(
            "boxStarTokenCount"
        );
    if (boxStarTokenCount) {
        boxStarTokenCount.innerText =
            state.resources.starTokens || 0;
    }
    const homeBoxTokenCount =
        document.getElementById(
            "homeBoxTokenCount"
        );
    if (homeBoxTokenCount) {
        homeBoxTokenCount.innerText =
            state.resources.tokens;
    }
    const shopCoinCount =
        document.getElementById(
            "shopCoinCount"
        );
    if (shopCoinCount) {
        shopCoinCount.innerText =
            state.resources.coins;
    }
    const shopBoxTokenCount =
        document.getElementById(
            "shopBoxTokenCount"
        );
    if (shopBoxTokenCount) {
        shopBoxTokenCount.innerText =
            state.resources.tokens;
    }
    renderQuests();
}
/* =====================================================
   COUNT
===================================================== */
function updateBrawlerCount() {
    document
        .getElementById(
            "ownedBrawlers"
        )
        .innerText =
            state.ownedBrawlers.length;
}
/* =====================================================
   BOUTIQUE
===================================================== */
const SHOP_BRAWLER_PRICE =
    3000;
const PROFILE_ICON_SHOP_PRICE =
    500;
const ABILITY_SHOP_PRICE =
    2500;
const STAR_POWER_SHOP_PRICE =
    5000;
const PROFILE_ICON_SHOP_ITEMS = [
    {
        name: "Robot",
        icon: "Profil/robot.webp"
    },
    {
        name: "Bandana",
        icon: "Profil/bandana.webp"
    },
    {
        name: "Little Spike",
        icon: "Profil/little_spike.webp"
    }
];
const shopBrawlers = [
    "Nita",
    "Colt",
    "Bull",
    "El Primo",
    "Poco"
];
let shopBrawlerIndex =
    0;
let shopSlideDirection =
    1;
function changeShopBrawler(
    direction
) {
    shopSlideDirection =
        direction >= 0
        ?
        1
        :
        -1;
    shopBrawlerIndex +=
        direction;
    if (
        shopBrawlerIndex < 0
    ) {
        shopBrawlerIndex =
            shopBrawlers.length - 1;
    }
    if (
        shopBrawlerIndex >=
        shopBrawlers.length
    ) {
        shopBrawlerIndex =
            0;
    }
    renderShop();
}
function renderProfileIconShop() {
    const grid =
        document.getElementById(
            "profileIconShopGrid"
        );
    if (!grid) {
        return;
    }
    grid.innerHTML =
        PROFILE_ICON_SHOP_ITEMS.map(
            item => {
                const unlocked =
                    isProfileIconUnlocked(
                        item.icon
                    );
                return `
                    <div class="profile-shop-card">

                        <div class="profile-shop-preview">

                            <img
                                src="${item.icon}"
                                alt="${item.name}"
                            >

                        </div>

                        <div class="profile-shop-name">
                            ${item.name}
                        </div>

                        <button
                            class="
                                profile-shop-buy-button
                                ${unlocked ? "owned" : ""}
                            "
                            type="button"
                            ${unlocked ? "disabled" : ""}
                            onclick="buyProfileIcon('${item.icon}')"
                        >

                            ${
                                unlocked
                                ?
                                "✓ DÉBLOQUÉ"
                                :
                                `
                                    <img
                                        src="Icon/coin.png"
                                        alt="Pièces"
                                    >
                                    ${PROFILE_ICON_SHOP_PRICE}
                                `
                            }

                        </button>

                    </div>
                `;
            }
        ).join("");
}
function buyProfileIcon(
    iconPath
) {
    const item =
        PROFILE_ICON_SHOP_ITEMS.find(
            current =>
                current.icon ===
                iconPath
        );
    if (!item) {
        return;
    }
    if (
        isProfileIconUnlocked(
            iconPath
        )
    ) {
        return;
    }
    if (
        state.resources.coins <
        PROFILE_ICON_SHOP_PRICE
    ) {
        showReward(
            "Icon/coin.png",
            "PAS ASSEZ DE PIÈCES",
            "Il te faut " + PROFILE_ICON_SHOP_PRICE + " pièces pour acheter cette icône de profil.",
            "BOUTIQUE",
            "rare"
        );
        return;
    }
    showAppConfirm({
        kicker:
            "BOUTIQUE",
        icon:
            "✓",
        title:
            "ACHETER CETTE ICÔNE ?",
        message:
            item.name +
            "\n\nPrix : " +
            PROFILE_ICON_SHOP_PRICE +
            " pièces",
        confirmLabel:
            "ACHETER",
        onConfirm:
            () => {
                if (isProfileIconUnlocked(iconPath) || state.resources.coins < PROFILE_ICON_SHOP_PRICE) return;
                state.resources.coins -=
                    PROFILE_ICON_SHOP_PRICE;
                state.profileIconsUnlocked.push(
                    iconPath
                );
                saveGame();
                updateResources();
                renderShop();
                renderProfileIconChoices();
                showProfileIconRewardAnimation(
                    iconPath,
                    item.name,
                    `${item.name.toUpperCase()} · ACHETÉE DANS LA BOUTIQUE`,
                    "NOUVELLE ICÔNE DE PROFIL"
                );
            }
    });
}
function renderAbilityShop() {
    const grid = document.getElementById('abilityShopGrid');
    if (!grid) return;
    const names = Object.keys(BRAWLER_ABILITY_CATALOG);
    const selected = names.includes(grid.dataset.brawler)
        ? grid.dataset.brawler
        : names.find(isBrawlerUnlocked) || names[0];
    grid.dataset.brawler = selected;
    const abilities = BRAWLER_ABILITY_CATALOG[selected] || [];
    const ownedBrawler = isBrawlerUnlocked(selected);
    const selectedPower = Math.max(1, Number(brawlers[selected]?.power) || 1);
    const canBuyAbilities = ownedBrawler && selectedPower >= 7;
    const count = abilities.filter(ability => isBrawlerAbilityOwned(selected, ability.id)).length;
    grid.innerHTML = '';
    const picker = document.createElement('section');
    picker.className = 'ability-brawler-picker';
    const pickerTop = document.createElement('div');
    pickerTop.className = 'ability-brawler-picker-top';
    const pickerTitle = document.createElement('div');
    pickerTitle.className = 'ability-brawler-picker-title';
    pickerTitle.innerHTML = '<span>✦</span><strong>CHOISIS TON BRAWLER</strong><small>CAPACITÉS</small>';
    const summary = document.createElement('div');
    summary.className = 'ability-brawler-picker-summary';
    summary.textContent = count + ' / ' + abilities.length + ' possédées';
    pickerTop.append(pickerTitle, summary);
    const iconList = document.createElement('div');
    iconList.className = 'ability-brawler-picker-list';
    iconList.setAttribute('role', 'listbox');
    iconList.setAttribute('aria-label', 'Choisir un Brawler pour voir ses capacités');
    for (const name of names) {
        const brawler = brawlers[name];
        if (!brawler) continue;
        const unlocked = isBrawlerUnlocked(name);
        const button = document.createElement('button');
        button.type = 'button';
        const powerLevel = Math.max(1, Number(brawler.power) || 1);
        const powerLocked = unlocked && powerLevel < 7;
        button.className = 'ability-brawler-picker-item' +
            (name === selected ? ' selected' : '') +
            (!unlocked ? ' locked' : '') +
            (powerLocked ? ' power-locked' : '');
        button.setAttribute('role', 'option');
        button.setAttribute('aria-selected', String(name === selected));
        button.setAttribute(
            'aria-label',
            name +
            (!unlocked ? ' · verrouillé' : '') +
            (powerLocked ? ' · pouvoir 7 requis pour acheter une capacité' : '')
        );
        button.title = name +
            (!unlocked ? ' · verrouillé' : '') +
            (powerLocked ? ' · pouvoir 7 requis' : '');
        const portrait = document.createElement('span');
        portrait.className = 'ability-brawler-picker-portrait';
        const image = document.createElement('img');
        image.src = brawler.icon;
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');
        portrait.appendChild(image);
        if (!unlocked || powerLocked) {
            const lock = document.createElement('span');
            lock.className = 'ability-brawler-picker-lock';
            lock.setAttribute('aria-hidden', 'true');
            const lockImg = document.createElement('img');
            lockImg.src = 'Icon/lock.png';
            lockImg.alt = '';
            lock.appendChild(lockImg);
            portrait.appendChild(lock);
        }
        const nameLabel = document.createElement('span');
        nameLabel.className = 'ability-brawler-picker-name';
        nameLabel.textContent = name;
        const powerLabel = document.createElement('span');
        powerLabel.className = 'ability-brawler-picker-power';
        powerLabel.textContent = 'P' + powerLevel + (powerLocked ? ' · P7 requis' : '');
        button.append(portrait, nameLabel, powerLabel);
        button.onclick = () => {
            grid.dataset.brawler = name;
            renderAbilityShop();
        };
        iconList.appendChild(button);
    }
    picker.append(pickerTop, iconList);
    grid.appendChild(picker);
    for (const ability of abilities) {
        const owned = isBrawlerAbilityOwned(selected, ability.id);
        const affordable = state.resources.coins >= ABILITY_SHOP_PRICE;
        const card = document.createElement('article');
        card.className = 'ability-shop-card' +
            (owned ? ' owned' : '') +
            (ownedBrawler && !canBuyAbilities && !owned ? ' power-locked' : '');
        const heading = document.createElement('div');
        heading.className = 'ability-shop-brawler';
        const portrait = document.createElement('span');
        portrait.className = 'ability-shop-card-portrait';
        const img = document.createElement('img');
        img.src = brawlers[selected].icon;
        img.alt = selected;
        portrait.appendChild(img);
        const headingCopy = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = ability.name;
        const brawlerNameLabel = document.createElement('span');
        brawlerNameLabel.textContent = selected.toUpperCase() + ' · CAPACITÉ';
        headingCopy.append(title, brawlerNameLabel);
        heading.append(portrait, headingCopy);
        const description = document.createElement('p');
        description.className = 'ability-shop-description';
        description.textContent = ability.description;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ability-shop-buy-button' + (owned ? ' owned' : '');
        button.disabled = owned || !ownedBrawler || !canBuyAbilities || !affordable;
        if (owned) {
            button.textContent = '✓ POSSÉDÉE';
        } else if (!ownedBrawler) {
            button.textContent = 'BRAWLER À DÉBLOQUER';
        } else if (!canBuyAbilities) {
            button.textContent = '🔒 POUVOIR 7 REQUIS';
        } else {
            const coin = document.createElement('img');
            coin.src = 'Icon/coin.png';
            coin.alt = 'Pièces';
            button.append(
                coin,
                document.createTextNode(
                    ABILITY_SHOP_PRICE.toLocaleString('fr-FR') +
                    (affordable ? ' · ACHETER' : ' · PIÈCES INSUFFISANTES')
                )
            );
        }
        button.onclick = () => buyBrawlerAbility(selected, ability.id);
        card.append(heading, description, button);
        grid.appendChild(card);
    }
    const subtitle = document.querySelector('.ability-shop-subtitle');
    if (subtitle) subtitle.textContent = 'Choisis ton Brawler · Achat des capacités au pouvoir 7 · Équipement aux pouvoirs 7 et 9';
}
function showAbilityUnlockAnimation(brawlerName, abilityId) {
    const ability = getBrawlerAbilityById(brawlerName, abilityId);
    const brawler = brawlers[brawlerName];
    if (!ability || !brawler) return;
    ensureRewardUI();
    resetRewardPopupUI();
    resetSequentialRewardState();
    boxRewardSequence = [{
        type: 'ability',
        name: ability.name,
        brawlerName,
        abilityId,
        icon: brawler.icon
    }];
    boxRewardSequenceIndex = 0;
    boxRewardSequenceActive = true;
    renderSequentialReward();
}
function buyBrawlerAbility(
    brawlerName,
    abilityId
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    const ability =
        getBrawlerAbilityById(
            brawlerName,
            abilityId
        );
    if (
        !brawler ||
        !ability ||
        !isBrawlerUnlocked(
            brawlerName
        ) ||
        isBrawlerAbilityOwned(
            brawlerName,
            abilityId
        )
    ) {
        return;
    }
    if (
        Number(brawler.power) < 7
    ) {
        showReward(
            "Icon/power.png",
            "POUVOIR 7 REQUIS",
            brawlerName + " doit atteindre le pouvoir 7 avant de pouvoir acheter une capacité.",
            "CAPACITÉ",
            "epic"
        );
        return;
    }
    if (
        state.resources.coins <
        ABILITY_SHOP_PRICE
    ) {
        showReward(
            "Icon/coin.png",
            "PAS ASSEZ DE PIÈCES",
            "Il te faut " + ABILITY_SHOP_PRICE + " pièces pour acheter cette capacité.",
            "CAPACITÉ",
            "rare"
        );
        return;
    }
    showAppConfirm({
        kicker:
            "CAPACITÉ",
        icon:
            "✓",
        title:
            "ACHETER " +
            ability.name +
            " ?",
        message:
            brawlerName +
            "\\n" +
            ability.description +
            "\\n\\nPrix : " +
            ABILITY_SHOP_PRICE +
            " pièces",
        confirmLabel:
            "ACHETER",
        onConfirm:
            () => {
                if (
                    !isBrawlerUnlocked(brawlerName) ||
                    Number(brawlers[brawlerName]?.power) < 7 ||
                    isBrawlerAbilityOwned(brawlerName, abilityId) ||
                    state.resources.coins < ABILITY_SHOP_PRICE
                ) return;
                state.resources.coins -=
                    ABILITY_SHOP_PRICE;
                if (
                    !Array.isArray(
                        state.brawlerAbilitiesOwned[
                            brawlerName
                        ]
                    )
                ) {
                    state.brawlerAbilitiesOwned[
                        brawlerName
                    ] = [];
                }
                state.brawlerAbilitiesOwned[
                    brawlerName
                ].push(
                    abilityId
                );
                saveGame();
                updateResources();
                renderAbilityShop();
                renderStarPowerShop();
                renderBrawlerCapabilitiesStats();
                renderBrawlerStarPowerStats();
                showAbilityUnlockAnimation(
                    brawlerName,
                    abilityId
                );
            }
    });
}
let starPowerShopFilter = "all";
function setStarPowerShopFilter(filter) {
    const allowed = ["all", "ready", "owned"];
    starPowerShopFilter =
        allowed.includes(filter)
        ? filter
        : "all";
    renderStarPowerShop();
}
function renderStarPowerShop() {
    const grid =
        document.getElementById(
            "starPowerShopGrid"
        );
    if (!grid) return;
    const availableNames =
        Object.keys(
            BRAWLER_STAR_POWER_CATALOG
        );
    if (availableNames.length === 0) {
        grid.innerHTML =
            '<div class="star-shop-empty">Aucun pouvoir star disponible.</div>';
        return;
    }
    const cards =
        availableNames
        .map(
            brawlerName => {
                const brawler =
                    brawlers[brawlerName];
                const starPower =
                    getBrawlerStarPower(
                        brawlerName
                    );
                if (!brawler || !starPower) return null;
                const ownedBrawler =
                    isBrawlerUnlocked(
                        brawlerName
                    );
                const power =
                    Math.max(
                        1,
                        Number(
                            brawler.power
                        ) || 1
                    );
                const powerReady =
                    ownedBrawler &&
                    power >= starPower.requiredPower;
                const owned =
                    isBrawlerStarPowerOwned(
                        brawlerName,
                        starPower.id
                    );
                const affordable =
                    state.resources.coins >=
                    STAR_POWER_SHOP_PRICE;
                let statusText =
                    "BRAWLER VERROUILLÉ";
                let statusClass =
                    "locked";
                if (owned) {
                    statusText = "✓ POSSÉDÉ";
                    statusClass = "owned";
                }
                else if (powerReady) {
                    statusText = "★ PRÊT";
                    statusClass = "ready";
                }
                else if (ownedBrawler) {
                    statusText =
                        "POWER " +
                        starPower.requiredPower +
                        " REQUIS";
                }
                let buttonContent;
                if (owned) {
                    buttonContent = "✓ POUVOIR STAR POSSÉDÉ";
                }
                else if (!ownedBrawler) {
                    buttonContent = "🔒 DÉBLOQUE D'ABORD LE BRAWLER";
                }
                else if (!powerReady) {
                    buttonContent =
                        "🔒 ATTEINS LE POWER " +
                        starPower.requiredPower;
                }
                else {
                    buttonContent = `
                        <img src="Icon/coin.png" alt="Pièces">
                        ${STAR_POWER_SHOP_PRICE.toLocaleString("fr-FR")}
                        ${affordable ? "· ACHETER" : "· PAS ASSEZ"}
                    `;
                }
                return {
                    brawlerName,
                    brawler,
                    starPower,
                    ownedBrawler,
                    power,
                    powerReady,
                    owned,
                    affordable,
                    statusText,
                    statusClass,
                    buttonContent
                };
            }
        )
        .filter(Boolean);
    const ownedCount =
        cards.filter(
            card => card.owned
        ).length;
    const filteredCards =
        cards.filter(
            card => {
                if (starPowerShopFilter === "owned") {
                    return card.owned;
                }
                if (starPowerShopFilter === "ready") {
                    return card.powerReady && !card.owned;
                }
                return true;
            }
        );
    const cardsHtml =
        filteredCards.length
        ? filteredCards.map(
            card => {
                const progress =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            (card.power / card.starPower.requiredPower) * 100
                        )
                    );
                const cardClass =
                    card.owned
                    ? "owned"
                    : card.powerReady
                    ? "ready"
                    : "locked";
                return `
                    <article class="star-shop-card-premium ${cardClass}">

                        <div class="star-shop-card-head">

                            <div class="star-shop-portrait">
                                <img src="${card.brawler.icon}" alt="${card.brawlerName}">
                                <span class="star-shop-portrait-star">★</span>
                            </div>

                            <div class="star-shop-card-copy">
                                <div class="star-shop-brawler-name">
                                    ${card.brawlerName.toUpperCase()} · PASSIF
                                </div>
                                <div class="star-shop-power-name">
                                    ${card.starPower.name}
                                </div>
                            </div>

                            <div class="star-shop-status ${card.statusClass}">
                                ${card.statusText}
                            </div>

                        </div>

                        <div class="star-shop-power-track">
                            <span>POWER ${card.power}</span>
                            <div class="star-shop-power-bar">
                                <div class="star-shop-power-fill" style="width:${progress}%"></div>
                            </div>
                            <strong>${card.starPower.requiredPower}</strong>
                        </div>

                        <p class="star-shop-description-premium">
                            ${card.starPower.description}
                        </p>

                        <button
                            type="button"
                            class="star-shop-buy ${card.owned ? "owned" : ""}"
                            ${card.owned || !card.ownedBrawler || !card.powerReady || !card.affordable ? "disabled" : ""}
                            onclick="buyBrawlerStarPower('${card.brawlerName}', '${card.starPower.id}')"
                        >
                            ${card.buttonContent}
                        </button>

                    </article>
                `;
            }
        ).join("")
        : '<div class="star-shop-empty">Aucun pouvoir star dans ce filtre.</div>';
    grid.innerHTML = `
        <div class="star-shop-shell">

            <div class="star-shop-dashboard">
                <div class="star-shop-dashboard-icon">★</div>
                <div class="star-shop-dashboard-copy">
                    <div class="star-shop-dashboard-kicker">ARSENAL STAR</div>
                    <div class="star-shop-dashboard-title">POUVOIRS PASSIFS</div>
                    <div class="star-shop-dashboard-progress">
                        ${ownedCount}/${cards.length} POSSÉDÉS · POWER 10 REQUIS
                    </div>
                </div>
                <div class="star-shop-dashboard-price">
                    <img src="Icon/coin.png" alt="Pièces">
                    ${STAR_POWER_SHOP_PRICE.toLocaleString("fr-FR")}
                </div>
            </div>

            <div class="star-shop-filters">
                <button type="button" class="star-shop-filter ${starPowerShopFilter === "all" ? "active" : ""}" onclick="setStarPowerShopFilter('all')">TOUS · ${cards.length}</button>
                <button type="button" class="star-shop-filter ${starPowerShopFilter === "ready" ? "active" : ""}" onclick="setStarPowerShopFilter('ready')">PRÊTS · ${cards.filter(card => card.powerReady && !card.owned).length}</button>
                <button type="button" class="star-shop-filter ${starPowerShopFilter === "owned" ? "active" : ""}" onclick="setStarPowerShopFilter('owned')">POSSÉDÉS · ${ownedCount}</button>
            </div>

            <div class="star-shop-list">
                ${cardsHtml}
            </div>

        </div>
    `;
}
function showStarPowerUnlockAnimation(
    brawlerName,
    starPowerId
) {
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    const brawler =
        brawlers[
            brawlerName
        ];
    if (
        !starPower ||
        starPower.id !== starPowerId ||
        !brawler
    ) {
        return;
    }
    ensureRewardUI();
    resetRewardPopupUI();
    resetSequentialRewardState();
    boxRewardSequence = [
        {
            type: "starPower",
            name: starPower.name,
            brawlerName,
            starPowerId,
            icon: brawler.icon
        }
    ];
    boxRewardSequenceIndex = 0;
    boxRewardSequenceActive = true;
    renderSequentialReward();
}
function buyBrawlerStarPower(
    brawlerName,
    starPowerId
) {
    const brawler =
        brawlers[
            brawlerName
        ];
    const starPower =
        getBrawlerStarPower(
            brawlerName
        );
    if (
        !brawler ||
        !starPower ||
        starPower.id !== starPowerId ||
        !isBrawlerUnlocked(
            brawlerName
        ) ||
        isBrawlerStarPowerOwned(
            brawlerName,
            starPowerId
        )
    ) {
        return;
    }
    if (
        Number(
            brawler.power
        ) <
        starPower.requiredPower
    ) {
        showReward(
            "Icon/power.png",
            "POUVOIR 10 REQUIS",
            brawlerName + " doit atteindre le pouvoir 10 avant de pouvoir débloquer son pouvoir star.",
            "POUVOIR STAR",
            "legendary"
        );
        return;
    }
    if (
        state.resources.coins <
        STAR_POWER_SHOP_PRICE
    ) {
        showReward(
            "Icon/coin.png",
            "PAS ASSEZ DE PIÈCES",
            "Il te faut " + STAR_POWER_SHOP_PRICE.toLocaleString("fr-FR") + " pièces pour acheter ce pouvoir star.",
            "POUVOIR STAR",
            "legendary"
        );
        return;
    }
    showAppConfirm({
        kicker:
            "POUVOIR STAR",
        icon:
            "★",
        title:
            "ACHETER " +
            starPower.name +
            " ?",
        message:
            brawlerName +
            "\\n" +
            starPower.description +
            "\\n\\nPrix : " +
            STAR_POWER_SHOP_PRICE.toLocaleString("fr-FR") +
            " pièces",
        confirmLabel:
            "ACHETER",
        onConfirm:
            () => {
                if (
                    !isBrawlerUnlocked(
                        brawlerName
                    ) ||
                    Number(
                        brawlers[
                            brawlerName
                        ]?.power
                    ) <
                    starPower.requiredPower ||
                    isBrawlerStarPowerOwned(
                        brawlerName,
                        starPowerId
                    ) ||
                    state.resources.coins <
                    STAR_POWER_SHOP_PRICE
                ) {
                    return;
                }
                state.resources.coins -=
                    STAR_POWER_SHOP_PRICE;
                if (
                    !grantBrawlerStarPower(
                        brawlerName,
                        starPowerId
                    )
                ) {
                    state.resources.coins +=
                        STAR_POWER_SHOP_PRICE;
                    return;
                }
                saveGame();
                updateResources();
                renderStarPowerShop();
                renderBrawlerStarPowerStats();
                showStarPowerUnlockAnimation(
                    brawlerName,
                    starPowerId
                );
            }
    });
}
function renderShop() {
    ensureSeasonShop();
    renderSeasonShop();
    renderDailyGift();
    const grid =
        document.getElementById(
            "shopBrawlerGrid"
        );
    const counter =
        document.getElementById(
            "shopSliderCounter"
        );
    if (!grid) {
        return;
    }
    if (
        shopBrawlerIndex < 0 ||
        shopBrawlerIndex >=
        shopBrawlers.length
    ) {
        shopBrawlerIndex =
            0;
    }
    const name =
        shopBrawlers[
            shopBrawlerIndex
        ];
    const brawler =
        brawlers[name];
    if (!brawler) {
        return;
    }
    const unlocked =
        isBrawlerUnlocked(
            name
        );
    const slideClass =
        shopSlideDirection >= 0
        ?
        "slide-from-right"
        :
        "slide-from-left";
    grid.innerHTML = `

        <div class="shop-card">

            <div class="shop-card-rarity">
                ${brawler.rarity}
            </div>

            <div class="shop-slide-content ${slideClass}">

                <img
                    class="shop-card-image"
                    src="${getDefaultSkinImage(name)}"
                    alt="${name}"
                >

                <div class="shop-card-name">
                    ${name}
                </div>

                <div class="shop-card-description">
                    Brawler rare
                </div>

            </div>

            <button
                class="
                    shop-buy-button
                    ${unlocked ? "locked-buy" : ""}
                "
                ${unlocked ? "disabled" : ""}
                onclick="buyRareBrawler('${name}')"
            >

                ${
                    unlocked
                    ?
                    "✓ DÉBLOQUÉ"
                    :
                    `
                        <img
                            src="Icon/coin.png"
                            alt="Pièces"
                        >
                        ${SHOP_BRAWLER_PRICE}
                    `
                }

            </button>

        </div>

    `;
    if (counter) {
        counter.innerHTML =
            shopBrawlers.map(
                (
                    brawlerName,
                    index
                ) => `
                    <span
                        class="shop-slider-dot ${
                            index === shopBrawlerIndex
                            ?
                            "active"
                            :
                            ""
                        }"
                        aria-label="${
                            index === shopBrawlerIndex
                            ?
                            "Brawler affiché"
                            :
                            "Brawler " + (index + 1)
                        }"
                    ></span>
                `
            ).join("");
    }
    renderProfileIconShop();
    renderAbilityShop();
    renderStarPowerShop();
    updateResources();
}
function buyRareBrawler(name) {
    const brawler =
        brawlers[name];
    if (!brawler) {
        return;
    }
    if (
        brawler.rarityClass !==
        "rare"
    ) {
        return;
    }
    if (
        isBrawlerUnlocked(name)
    ) {
        return;
    }
    if (
        state.resources.coins <
        SHOP_BRAWLER_PRICE
    ) {
        showReward(
            "Icon/coin.png",
            "PAS ASSEZ DE PIÈCES",
            "Il te faut 3000 pièces pour débloquer ce Brawler.",
            "RARE",
            "rare"
        );
        return;
    }
    showAppConfirm({
        kicker:
            "BOUTIQUE",
        icon:
            "✓",
        title:
            "ACHETER CE BRAWLER ?",
        message:
            name +
            "\n\nPrix : " +
            SHOP_BRAWLER_PRICE +
            " pièces",
        confirmLabel:
            "ACHETER",
        onConfirm:
            () => {
                state.resources.coins -=
                    SHOP_BRAWLER_PRICE;
                state.ownedBrawlers.push(
                    name
                );
                saveGame();
                updateResources();
                updateBrawlerCount();
                renderShop();
                renderBrawlers();
                renderSeasonShop();
                showReward(
                    brawler.icon,
                    name,
                    "Tu viens de débloquer ce Brawler rare !",
                    "NOUVEAU",
                    "rare"
                );
            }
    });
}
/* =====================================================
   TRANSITIONS DE CHARGEMENT
===================================================== */
let battleLaunchIntroTimer =
    null;
let transitionLoadingTimer =
    null;
function playBattleLaunchIntro(
    playerName,
    enemyName,
    callback,
    duration = 900
) {
    const intro =
        document.getElementById(
            "battleLaunchScreen"
        );
    const versus =
        document.getElementById(
            "battleLaunchVersus"
        );
    if (!intro) {
        if (
            typeof callback ===
            "function"
        ) {
            callback();
        }
        return;
    }
    if (versus) {
        versus.innerText =
            playerName +
            "  VS  " +
            enemyName;
    }
    intro.classList.add(
        "active"
    );
    intro.setAttribute(
        "aria-hidden",
        "false"
    );
    if (
        battleLaunchIntroTimer
    ) {
        clearTimeout(
            battleLaunchIntroTimer
        );
        battleLaunchIntroTimer =
            null;
    }
    battleLaunchIntroTimer =
        setTimeout(
            () => {
                intro.classList.remove(
                    "active"
                );
                intro.setAttribute(
                    "aria-hidden",
                    "true"
                );
                battleLaunchIntroTimer =
                    setTimeout(
                        () => {
                            battleLaunchIntroTimer =
                                null;
                            if (
                                typeof callback ===
                                "function"
                            ) {
                                callback();
                            }
                        },
                        180
                    );
            },
            duration
        );
}
function playTransitionLoading(
    subtitle,
    callback,
    duration = 1000
) {
    const loadingScreen =
        document.getElementById(
            "appLoadingScreen"
        );
    const loadingBar =
        document.getElementById(
            "appLoadingBar"
        );
    const loadingPercent =
        document.getElementById(
            "appLoadingPercent"
        );
    const loadingSubtitle =
        document.querySelector(
            ".app-loading-subtitle"
        );
    if (
        !loadingScreen ||
        !loadingBar ||
        !loadingPercent
    ) {
        if (
            typeof callback ===
            "function"
        ) {
            callback();
        }
        return;
    }
    if (
        transitionLoadingTimer
    ) {
        clearTimeout(
            transitionLoadingTimer
        );
        transitionLoadingTimer =
            null;
    }
    if (loadingSubtitle) {
        loadingSubtitle.innerText =
            subtitle;
    }
    loadingBar.style.width =
        "0%";
    loadingPercent.innerText =
        "0%";
    loadingScreen.classList.remove(
        "finished"
    );
    const startTime =
        performance.now();
    function animateTransitionLoading(
        now
    ) {
        const elapsed =
            now -
            startTime;
        const progress =
            Math.min(
                1,
                elapsed /
                duration
            );
        const eased =
            1 -
            Math.pow(
                1 - progress,
                1.75
            );
        const percent =
            Math.min(
                100,
                Math.floor(
                    eased *
                    100
                )
            );
        loadingBar.style.width =
            percent +
            "%";
        loadingPercent.innerText =
            percent +
            "%";
        if (
            progress <
            1
        ) {
            requestAnimationFrame(
                animateTransitionLoading
            );
            return;
        }
        loadingBar.style.width =
            "100%";
        loadingPercent.innerText =
            "100%";
        /*
           On prépare la destination derrière l'écran
           de chargement, puis on masque celui-ci.
        */
        if (
            typeof callback ===
            "function"
        ) {
            callback();
        }
        transitionLoadingTimer =
            setTimeout(
                () => {
                    transitionLoadingTimer =
                        null;
                    loadingScreen.classList.add(
                        "finished"
                    );
                },
                120
            );
    }
    requestAnimationFrame(
        animateTransitionLoading
    );
}
/* =====================================================
   DUEL
===================================================== */
function play() {
    const selectedName =
        state.selectedBrawler;
    const enemyName =
        getRandomEnemyName(
            selectedName
        );
    playBattleLaunchIntro(
        selectedName,
        enemyName,
        () => {
            playTransitionLoading(
                "CHARGEMENT DU COMBAT",
                () => {
                    renderBattle(
                        selectedName,
                        enemyName
                    );
                    showBattle();
                    startBattleLaunchTransition();
                },
                1800
            );
        },
        900
    );
}
/* =====================================================
   CHARGEMENT DE L'APPLICATION
===================================================== */
function startAppLoading() {
    const loadingScreen =
        document.getElementById(
            "appLoadingScreen"
        );
    const loadingBar =
        document.getElementById(
            "appLoadingBar"
        );
    const loadingPercent =
        document.getElementById(
            "appLoadingPercent"
        );
    /*
       Sécurité : si l'interface de chargement
       n'existe plus, on ouvre directement le lobby.
    */
    if (
        !loadingScreen ||
        !loadingBar ||
        !loadingPercent
    ) {
        showHome();
        if (
            !state.profile.name
        ) {
            setTimeout(
                askUsername,
                250
            );
        }
        return;
    }
    const LOADING_DURATION =
        2800;
    const startTime =
        performance.now();
    function animateLoading(
        now
    ) {
        const elapsed =
            now -
            startTime;
        const rawProgress =
            Math.min(
                1,
                elapsed /
                LOADING_DURATION
            );
        /*
           Petite courbe d'accélération / ralentissement
           pour rendre la jauge plus naturelle.
        */
        const easedProgress =
            1 -
            Math.pow(
                1 - rawProgress,
                1.7
            );
        const percent =
            Math.min(
                100,
                Math.floor(
                    easedProgress *
                    100
                )
            );
        loadingBar.style.width =
            percent +
            "%";
        loadingPercent.innerText =
            percent +
            "%";
        if (
            rawProgress <
            1
        ) {
            requestAnimationFrame(
                animateLoading
            );
            return;
        }
        /*
           On force exactement 100 % avant
           d'afficher le lobby.
        */
        loadingBar.style.width =
            "100%";
        loadingPercent.innerText =
            "100%";
        setTimeout(
            () => {
                showHome();
                loadingScreen.classList.add(
                    "finished"
                );
                /*
                   La demande de pseudo du premier
                   lancement arrive seulement APRÈS
                   l'écran de chargement.
                */
                if (
                    !state.profile.name
                ) {
                    setTimeout(
                        askUsername,
                        450
                    );
                }
            },
            320
        );
    }
    requestAnimationFrame(
        animateLoading
    );
}
/* =====================================================
   INITIALISATION
===================================================== */
document.addEventListener(
    "DOMContentLoaded",
    function() {
        ensureDailyQuests();
        document
            .getElementById(
                "playerName"
            )
            .innerText =
                state.profile.name ||
                "JOUEUR";
        renderHeaderProfileIcon();
        syncTotalTrophies();
        updateResources();
        updateBrawlerCount();
        updateSelectedBrawler();
        renderBrawlers();
        renderShop();
        renderFriends();
        const friendSearchInput =
            document.getElementById(
                "friendSearchInput"
            );
        if (friendSearchInput) {
            friendSearchInput.addEventListener(
                "keydown",
                function(event) {
                    if (
                        event.key === "Enter"
                    ) {
                        sendFriendRequest();
                    }
                }
            );
        }
        saveGame();
        /*
           Le lobby n'est révélé qu'après
           le chargement jusqu'à 100 %.
        */
        startAppLoading();
    }
);
/* =====================================================
   REWARD POPUP UPGRADE — helpers + nouvelles animations
===================================================== */
function ensureRewardUI() {
    const popup =
        document.getElementById(
            "rewardPopup"
        );
    if (!popup) {
        return;
    }
    const box =
        popup.querySelector(
            ".popup-box"
        );
    if (
        !document.getElementById(
            "rewardHero"
        )
    ) {
        const hero =
            document.createElement(
                "div"
            );
        hero.id =
            "rewardHero";
        hero.className =
            "reward-hero";
        hero.innerHTML = `

            <div
                id="rewardHeroLabel"
                class="reward-hero-label"
            >
                NOUVEAU BRAWLER
            </div>

            <div
                class="reward-hero-frame"
            >
                <img
                    id="rewardHeroSilhouette"
                    class="reward-hero-silhouette"
                    alt=""
                    aria-hidden="true"
                >
                <img
                    id="rewardHeroImage"
                    class="reward-hero-revealed"
                    alt=""
                >
            </div>

        `;
        box.insertBefore(
            hero,
            document.getElementById(
                "rewardIcon"
            )
        );
    }
    const button =
        popup.querySelector(
            ".login-button"
        );
    if (button) {
        button.innerText =
            "CONTINUER";
    }
}
function resetRewardPopupUI() {
    ensureRewardUI();
    const popup =
        document.getElementById(
            "rewardPopup"
        );
    popup.classList.remove(
        "brawler-unlock-mode",
        "ability-unlock-mode",
        "star-power-unlock-mode",
        "profile-icon-unlock-mode",
        "rewards-mode",
        "brawler-rarity-bg-starter",
        "brawler-rarity-bg-rare",
        "brawler-rarity-bg-epic",
        "brawler-rarity-bg-mythic",
        "brawler-rarity-bg-legendary"
    );
    const hero =
        document.getElementById(
            "rewardHero"
        );
    if (hero) {
        hero.className =
            "reward-hero";
        hero.style.display =
            "";
    }
    const heroImage =
        document.getElementById(
            "rewardHeroImage"
        );
    const heroSilhouette =
        document.getElementById(
            "rewardHeroSilhouette"
        );
    if (heroImage) {
        heroImage.removeAttribute(
            "src"
        );
        heroImage.alt = "";
    }
    if (heroSilhouette) {
        heroSilhouette.removeAttribute(
            "src"
        );
        heroSilhouette.alt = "";
    }
    const oldList =
        document.getElementById(
            "multiRewardList"
        );
    if (oldList) {
        oldList.remove();
    }
}
const transparentBrawlerImageCache = new Map();
function removeConnectedGreenBackground(imagePath) {
    if (transparentBrawlerImageCache.has(imagePath)) {
        return transparentBrawlerImageCache.get(imagePath);
    }
    const promise = new Promise(resolve => {
        const image = new Image();
        image.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d", { willReadFrequently: true });
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                context.drawImage(image, 0, 0);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                const totalPixels = canvas.width * canvas.height;
                /*
                   Supprime tous les verts dominants du fond, même lorsqu'ils
                   ne touchent pas directement les bords. Le bleu doit rester
                   assez éloigné du vert afin de conserver les zones cyan du personnage.
                */
                for (let index = 0; index < totalPixels; index++) {
                    const offset = index * 4;
                    const red = pixels[offset];
                    const green = pixels[offset + 1];
                    const blue = pixels[offset + 2];
                    const redDifference = green - red;
                    const blueDifference = green - blue;
                    if (
                        green > 68 &&
                        redDifference > 28 &&
                        blueDifference > 32
                    ) {
                        const dominance = Math.min(redDifference, blueDifference);
                        const dominanceStrength = Math.min(1, Math.max(0, (dominance - 25) / 42));
                        const lightStrength = Math.min(1, Math.max(0, (green - 58) / 62));
                        const removal = dominanceStrength * lightStrength;
                        pixels[offset + 3] = Math.round(pixels[offset + 3] * (1 - removal));
                    }
                }
                context.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            }
            catch (error) {
                /* En fichier local, le navigateur peut bloquer la lecture du canvas. */
                resolve(null);
            }
        };
        image.onerror = () => resolve(null);
        image.src = imagePath;
    });
    transparentBrawlerImageCache.set(imagePath, promise);
    return promise;
}
function showUnlockedBrawlerHero(
    brawlerName,
    labelText = "NOUVEAU BRAWLER"
) {
    ensureRewardUI();
    const brawler = brawlers[brawlerName];
    if (!brawler) return;
    const popup = document.getElementById("rewardPopup");
    const hero = document.getElementById("rewardHero");
    const heroLabel = document.getElementById("rewardHeroLabel");
    const heroImage = document.getElementById("rewardHeroImage");
    const heroSilhouette = document.getElementById("rewardHeroSilhouette");
    const rarityClass = brawler.rarityClass || "rare";
    // Taille propre au déblocage, réinitialisée pour chaque personnage.
    hero.style.setProperty("--unlock-skin-size", brawlerName === "Nita" ? "90%" : "100%");
    /*
       Réinitialise aussi les animations du fond, du nom et du bouton.
       Le recalcul de style est indispensable entre deux Brawlers successifs,
       même lorsqu'ils ont la même rareté.
    */
    popup.classList.remove("brawler-unlock-mode");
    void popup.offsetWidth;
    popup.classList.remove(
        "brawler-rarity-bg-starter",
        "brawler-rarity-bg-rare",
        "brawler-rarity-bg-epic",
        "brawler-rarity-bg-mythic",
        "brawler-rarity-bg-legendary"
    );
    popup.classList.add(
        "brawler-unlock-mode",
        "brawler-rarity-bg-" + rarityClass
    );
    /* Force un nouveau cycle même si deux Brawlers ont la même rareté. */
    hero.className = "reward-hero is-processing";
    heroImage.removeAttribute("src");
    heroSilhouette.removeAttribute("src");
    void hero.offsetWidth;
    heroLabel.innerText = labelText;
    Promise.resolve(brawler.image).then(cleanImage => {
        /* Ignore un ancien chargement si la récompense a déjà changé. */
        if (boxRewardSequenceActive) {
            const currentReward = boxRewardSequence[boxRewardSequenceIndex];
            if (currentReward && currentReward.type === "brawler" && currentReward.name !== brawlerName) {
                return;
            }
        }
        /* Toujours conserver le skin complet du Brawler. */
        const safeImage = cleanImage || brawler.image;
        heroSilhouette.src = safeImage;
        heroSilhouette.alt = "Silhouette de " + brawlerName;
        heroImage.src = safeImage;
        heroImage.alt = brawlerName;
        hero.className = "reward-hero";
        void hero.offsetWidth;
        hero.className = "reward-hero active rarity-" + rarityClass;
    });
}
function getRewardList() {
    let list =
        document.getElementById(
            "multiRewardList"
        );
    if (!list) {
        list =
            document.createElement(
                "div"
            );
        list.id =
            "multiRewardList";
        list.className =
            "multi-reward-list";
        const button =
            document.querySelector(
                "#rewardPopup .login-button"
            );
        button.parentNode.insertBefore(
            list,
            button
        );
    }
    list.innerHTML = "";
    return list;
}
function buildRewardItem(
    {
        icon = "",
        image = "",
        name = "Récompense",
        description = "",
        amount = "",
        rarityClass = ""
    }
) {
    const thumb =
        image
        ?
        `
            <img
                src="${image}"
                alt="${name}"
            >
        `
        :
        (
            typeof icon ===
            "string" &&
            (
                icon.includes(".png") ||
                icon.includes(".webp") ||
                icon.includes(".jpg") ||
                icon.includes(".jpeg")
            )
            ?
            `
                <img
                    src="${icon}"
                    alt="${name}"
                >
            `
            :
            `
                <div class="multi-reward-item-icon">
                    ${icon || "🎁"}
                </div>
            `
        );
    const isBrawlerUnlock =
        (
            typeof description ===
            "string"
        ) &&
        description
            .toLowerCase()
            .includes(
                "brawler"
            );
    const amountBlock =
        amount
        ?
        `
            <div class="
                multi-reward-item-amount
                ${isBrawlerUnlock ? "brawler-reward-amount" : ""}
            ">
                ${amount}
            </div>
        `
        :
        "";
    return `

        <div
            class="
                multi-reward-item
                ${rarityClass ? "type-" + rarityClass : ""}
            "
        >

            ${thumb}

            <div class="multi-reward-item-info">

                <div class="multi-reward-item-name">
                    ${name}
                </div>

                <div class="multi-reward-item-description">
                    ${description}
                </div>

            </div>

            ${amountBlock}

        </div>

    `;
}
/* =====================================================
   OVERRIDE POPUP
===================================================== */
function closePopup(id) {
    const popup =
        document.getElementById(
            id
        );
    if (!popup) {
        return;
    }
    popup.classList.remove(
        "active"
    );
    if (
        id ===
        "rewardPopup"
    ) {
        setTimeout(
            resetRewardPopupUI,
            120
        );
    }
}
/* =====================================================
   OVERRIDE SHOW REWARD
===================================================== */
function showReward(
    icon,
    name,
    description,
    rarity,
    rarityClass
) {
    ensureRewardUI();
    resetRewardPopupUI();
    const rewardPopup =
        document.getElementById(
            "rewardPopup"
        );
    const rewardIcon =
        document.getElementById(
            "rewardIcon"
        );
    if (
        typeof icon === "string" &&
        (
            icon.includes(".png") ||
            icon.includes(".webp") ||
            icon.includes(".jpg") ||
            icon.includes(".jpeg")
        )
    ) {
        rewardIcon.innerHTML = `

            <img
                src="${icon}"
                alt="${name}"
            >

        `;
    }
    else {
        rewardIcon.innerText =
            icon || "🎁";
    }
    document
        .getElementById(
            "rewardName"
        )
        .innerText =
            name;
    document
        .getElementById(
            "rewardDescription"
        )
        .innerText =
            description;
    const rarityElement =
        document.getElementById(
            "rewardRarity"
        );
    rarityElement.innerText =
        rarity;
    rarityElement.className =
        "reward-rarity rarity-" +
        (rarityClass || "rare");
    const isUnlockedBrawler =
        !!brawlers[name] &&
        (
            rarity ===
            "NOUVEAU" ||
            icon ===
            brawlers[name].icon ||
            icon ===
            brawlers[name].image ||
            (
                typeof description ===
                "string" &&
                description
                    .toLowerCase()
                    .includes(
                        "brawler"
                    )
            )
        );
    if (
        isUnlockedBrawler
    ) {
        const brawler =
            brawlers[name];
        showUnlockedBrawlerHero(
            name
        );
        rewardIcon.innerHTML = `
            <img
                src="${brawler.icon}"
                alt="${name}"
            >
        `;
        document
            .getElementById(
                "rewardDescription"
            )
            .innerText =
                description ||
                "Tu viens de débloquer ce Brawler !";
        rarityElement.innerText =
            (
                brawler.rarity ||
                rarity ||
                "NOUVEAU"
            ).toUpperCase();
        rarityElement.className =
            "reward-rarity rarity-" +
            (
                brawler.rarityClass ||
                rarityClass ||
                "rare"
            );
    }
    rewardPopup.classList.add(
        "active"
    );
}
/* =====================================================
   OVERRIDE SHOW BOX REWARDS
===================================================== */
function showBoxRewards(
    box,
    results
) {
    ensureRewardUI();
    resetRewardPopupUI();
    const rewardPopup =
        document.getElementById(
            "rewardPopup"
        );
    const rewardIcon =
        document.getElementById(
            "rewardIcon"
        );
    const rewardName =
        document.getElementById(
            "rewardName"
        );
    const rewardDescription =
        document.getElementById(
            "rewardDescription"
        );
    const rewardRarity =
        document.getElementById(
            "rewardRarity"
        );
    rewardPopup.classList.add(
        "rewards-mode"
    );
    rewardIcon.innerHTML = `

        <img
            src="${box.image}"
            alt="${box.name}"
        >

    `;
    if (
        results.brawlers.length > 0
    ) {
        const firstBrawler =
            results.brawlers[0];
        const firstData =
            brawlers[firstBrawler];
        showUnlockedBrawlerHero(
            firstBrawler,
            results.brawlers.length > 1
            ? "NOUVEAUX BRAWLERS"
            : "NOUVEAU BRAWLER"
        );
        rewardName.innerText =
            results.brawlers.length > 1
            ?
            "Nouveaux Brawlers"
            :
            firstBrawler;
        rewardDescription.innerText =
            results.brawlers.length > 1
            ?
            "Tu as débloqué plusieurs combattants !"
            :
            "Tu as débloqué un nouveau combattant !";
        rewardRarity.innerText =
            results.brawlers.length > 1
            ?
            "DÉBLOQUÉS"
            :
            (
                firstData.rarity ||
                "NOUVEAU"
            ).toUpperCase();
        rewardRarity.className =
            "reward-rarity rarity-" +
            (
                firstData.rarityClass ||
                "rare"
            );
    }
    else {
        rewardName.innerText =
            box.name;
        rewardDescription.innerText =
            box.draws +
            (
                box.draws > 1
                ? " récompenses obtenues"
                : " récompense obtenue"
            );
        rewardRarity.innerText =
            "RÉCOMPENSES";
        rewardRarity.className =
            "reward-rarity rarity-rare";
    }
    const list =
        getRewardList();
    if (
        results.coins > 0
    ) {
        list.innerHTML +=
            buildRewardItem(
                {
                    icon:
                        "Icon/coin.png",
                    name:
                        "Pièces",
                    description:
                        "Récompense",
                    amount:
                        "+" +
                        results.coins
                }
            );
    }
    if (
        results.gems > 0
    ) {
        list.innerHTML +=
            buildRewardItem(
                {
                    icon:
                        "Icon/gemme.png",
                    name:
                        "Gemmes",
                    description:
                        "Récompense",
                    amount:
                        "+" +
                        results.gems
                }
            );
    }
    if (
        results.power > 0
    ) {
        list.innerHTML +=
            buildRewardItem(
                {
                    icon:
                        "Icon/power.png",
                    name:
                        "Points de pouvoir",
                    description:
                        "Récompense",
                    amount:
                        "+" +
                        results.power
                }
            );
    }
    if (
        results.brawlers.length > 0
    ) {
        results.brawlers.forEach(
            name => {
                const brawler =
                    brawlers[name];
                list.innerHTML +=
                    buildRewardItem(
                        {
                            image:
                                brawler.icon,
                            name:
                                name,
                            description:
                                "Nouveau Brawler débloqué",
                            amount:
                                "NEW",
                            rarityClass:
                                brawler.rarityClass
                        }
                    );
            }
        );
    }
    if (
        list.innerHTML.trim() ===
        ""
    ) {
        list.innerHTML =
            buildRewardItem(
                {
                    icon: "🎁",
                    name:
                        "Récompense",
                    description:
                        "Aucun résultat disponible"
                }
            );
    }
    rewardPopup.classList.add(
        "active"
    );
}
/* =====================================================
   BOX REWARDS V2 — une récompense à la fois
   Les Brawlers sont toujours affichés en dernier.
===================================================== */
let boxRewardSequence = [];
let boxRewardSequenceIndex = 0;
let boxRewardSequenceActive = false;
function ensureRewardProgress() {
    ensureRewardUI();
    let progress =
        document.getElementById(
            "rewardProgress"
        );
    if (!progress) {
        progress =
            document.createElement(
                "div"
            );
        progress.id =
            "rewardProgress";
        progress.className =
            "reward-progress";
        const button =
            document.querySelector(
                "#rewardPopup .login-button"
            );
        button.parentNode.insertBefore(
            progress,
            button
        );
    }
    return progress;
}
function resetSequentialRewardState() {
    boxRewardSequence = [];
    boxRewardSequenceIndex = 0;
    boxRewardSequenceActive = false;
    const popup =
        document.getElementById(
            "rewardPopup"
        );
    if (popup) {
        popup.classList.remove(
            "sequence-mode",
            "brawler-unlock-mode",
            "ability-unlock-mode"
        );
    }
    const progress =
        document.getElementById(
            "rewardProgress"
        );
    if (progress) {
        progress.innerText = "";
    }
    const button =
        document.querySelector(
            "#rewardPopup .login-button"
        );
    if (button) {
        button.innerText =
            "CONTINUER";
        button.setAttribute(
            "onclick",
            "closePopup('rewardPopup')"
        );
    }
}
function animateRewardStep() {
    const box =
        document.querySelector(
            "#rewardPopup .popup-box"
        );
    if (!box) {
        return;
    }
    box.classList.remove(
        "reward-step-animate"
    );
    void box.offsetWidth;
    box.classList.add(
        "reward-step-animate"
    );
}
function renderSequentialReward() {
    const popup =
        document.getElementById(
            "rewardPopup"
        );
    if (
        !boxRewardSequenceActive ||
        !boxRewardSequence.length
    ) {
        closePopup(
            "rewardPopup"
        );
        return;
    }
    const reward =
        boxRewardSequence[
            boxRewardSequenceIndex
        ];
    const rewardIcon =
        document.getElementById(
            "rewardIcon"
        );
    const rewardName =
        document.getElementById(
            "rewardName"
        );
    const rewardDescription =
        document.getElementById(
            "rewardDescription"
        );
    const rewardRarity =
        document.getElementById(
            "rewardRarity"
        );
    const progress =
        ensureRewardProgress();
    const oldList =
        document.getElementById(
            "multiRewardList"
        );
    if (oldList) {
        oldList.remove();
    }
    popup.classList.add(
        "sequence-mode"
    );
    popup.classList.remove(
        "brawler-unlock-mode",
        "ability-unlock-mode",
        "star-power-unlock-mode"
    );
    const hero =
        document.getElementById(
            "rewardHero"
        );
    if (hero) {
        hero.className =
            "reward-hero";
    }
    rewardIcon.style.display =
        "";
    if (
        reward.type ===
        "starPower"
    ) {
        /* Force le redémarrage complet de l'animation, même si
           deux Pouvoirs Star sont révélés à la suite. */
        popup.classList.remove(
            "star-power-unlock-mode"
        );
        void popup.offsetWidth;
        popup.classList.add(
            "star-power-unlock-mode"
        );
        rewardIcon.style.display =
            "";
        rewardIcon.innerHTML = `
            <div class="star-power-reveal-stage" aria-hidden="true">
                <div class="star-power-reveal-rays"></div>
                <div class="star-power-shockwave star-power-shockwave-one"></div>
                <div class="star-power-shockwave star-power-shockwave-two"></div>
                <div class="star-power-shockwave star-power-shockwave-three"></div>
                <div class="star-power-particles">
                    ${Array.from({ length: 26 }, (_, index) => `<i style="--i:${index}">★</i>`).join("")}
                </div>
                <div class="star-power-brawler-ring">
                    <img src="${reward.icon}" alt="${reward.brawlerName}">
                </div>
                <div class="star-power-emblem">★</div>
            </div>
        `;
        rewardName.innerText =
            reward.name;
        rewardDescription.innerText =
            "POUVOIR STAR DE " +
            reward.brawlerName +
            " DÉBLOQUÉ";
        rewardRarity.innerText =
            "POUVOIR STAR";
        rewardRarity.className =
            "reward-rarity rarity-legendary";
    }
    else if (
        reward.type ===
        "ability"
    ) {
        popup.classList.add(
            "ability-unlock-mode"
        );
        rewardIcon.style.display =
            "";
        rewardIcon.innerHTML = `

            <img
                src="${reward.icon}"
                alt="${reward.brawlerName}"
            >

        `;
        rewardName.innerText =
            reward.name;
        rewardDescription.innerText =
            "CAPACITÉ DE " +
            reward.brawlerName +
            " DÉBLOQUÉE";
        rewardRarity.innerText =
            "NOUVELLE CAPACITÉ";
        rewardRarity.className =
            "reward-rarity rarity-epic";
    }
    else if (
        reward.type ===
        "brawler"
    ) {
        const brawler =
            brawlers[
                reward.name
            ];
        showUnlockedBrawlerHero(
            reward.name,
            "NOUVEAU BRAWLER"
        );
        popup.classList.add(
            "brawler-unlock-mode"
        );
        rewardIcon.style.display =
            "none";
        rewardName.innerText =
            reward.name;
        rewardDescription.innerText =
            "Un nouveau combattant rejoint ton équipe";
        rewardRarity.innerText =
            (
                brawler.rarity ||
                "NOUVEAU"
            ).toUpperCase();
        rewardRarity.className =
            "reward-rarity rarity-" +
            (
                brawler.rarityClass ||
                "rare"
            );
    }
    else {
        rewardIcon.style.display =
            "";
        rewardIcon.innerHTML = `

            <img
                src="${reward.icon}"
                alt="${reward.name}"
            >

        `;
        rewardName.innerText =
            reward.amount
            ?
            "+" + reward.amount
            :
            reward.name;
        rewardDescription.innerText =
            reward.name;
        rewardRarity.innerText =
            "RÉCOMPENSE";
        rewardRarity.className =
            "reward-rarity rarity-rare";
    }
    progress.innerText =
        (
            boxRewardSequenceIndex + 1
        ) +
        " / " +
        boxRewardSequence.length;
    const button =
        document.querySelector(
            "#rewardPopup .login-button"
        );
    const isLast =
        boxRewardSequenceIndex ===
        boxRewardSequence.length - 1;
    button.innerText =
        isLast
        ?
        (reward.type === "brawler" ? "C’EST PARTI !" : "TERMINER")
        :
        "CONTINUER";
    button.setAttribute(
        "onclick",
        "advanceBoxReward()"
    );
    animateRewardStep();
    popup.classList.add(
        "active"
    );
}
function advanceBoxReward() {
    if (!boxRewardSequenceActive) {
        closePopup(
            "rewardPopup"
        );
        return;
    }
    const isLast =
        boxRewardSequenceIndex >=
        boxRewardSequence.length - 1;
    if (isLast) {
        const popup =
            document.getElementById(
                "rewardPopup"
            );
        popup.classList.remove(
            "active"
        );
        setTimeout(
            () => {
                resetRewardPopupUI();
                resetSequentialRewardState();
            },
            120
        );
        return;
    }
    boxRewardSequenceIndex++;
    renderSequentialReward();
}
/* =====================================================
   OVERRIDE — BOX REWARDS
===================================================== */
function showBoxRewards(
    box,
    results
) {
    ensureRewardUI();
    resetRewardPopupUI();
    resetSequentialRewardState();
    /*
       IMPORTANT :
       toutes les récompenses normales sont ajoutées
       AVANT les Brawlers.
       Les Brawlers seront donc toujours à la fin.
    */
    const normalRewards = [];
    const abilityRewards = [];
    const starPowerRewards = [];
    const brawlerRewards = [];
    if (
        results.coins > 0
    ) {
        normalRewards.push(
            {
                type: "resource",
                name: "Pièces",
                amount: results.coins,
                icon: "Icon/coin.png"
            }
        );
    }
    if (
        results.gems > 0
    ) {
        normalRewards.push(
            {
                type: "resource",
                name: "Gemmes",
                amount: results.gems,
                icon: "Icon/gemme.png"
            }
        );
    }
    if (
        results.power > 0
    ) {
        normalRewards.push(
            {
                type: "resource",
                name: "Points de pouvoir",
                amount: results.power,
                icon: "Icon/power.png"
            }
        );
    }
    if (
        Array.isArray(
            results.abilities
        )
    ) {
        results.abilities.forEach(
            ability => {
                abilityRewards.push(
                    {
                        type: "ability",
                        name: ability.name,
                        brawlerName:
                            ability.brawlerName,
                        abilityId:
                            ability.abilityId,
                        icon:
                            ability.icon
                    }
                );
            }
        );
    }
    if (
        Array.isArray(
            results.starPowers
        )
    ) {
        results.starPowers.forEach(
            starPower => {
                starPowerRewards.push(
                    {
                        type: "starPower",
                        name: starPower.name,
                        brawlerName:
                            starPower.brawlerName,
                        starPowerId:
                            starPower.starPowerId,
                        icon:
                            starPower.icon
                    }
                );
            }
        );
    }
    results.brawlers.forEach(
        name => {
            brawlerRewards.push(
                {
                    type: "brawler",
                    name: name
                }
            );
        }
    );
    boxRewardSequence =
        normalRewards
        .concat(
            abilityRewards
        )
        .concat(
            starPowerRewards
        )
        .concat(
            brawlerRewards
        );
    /*
       Sécurité : si la box n'a exceptionnellement
       rien généré, on affiche quand même un écran.
    */
    if (
        boxRewardSequence.length === 0
    ) {
        boxRewardSequence.push(
            {
                type: "resource",
                name: box.name,
                amount: "",
                icon: box.image
            }
        );
    }
    boxRewardSequenceIndex = 0;
    boxRewardSequenceActive = true;
    renderSequentialReward();
}
/* =====================================================
   OVERRIDE — REWARD CLASSIQUE
   Désactive le mode séquentiel pour les autres popups.
===================================================== */
const previousShowReward =
    showReward;
showReward =
    function(
        icon,
        name,
        description,
        rarity,
        rarityClass
    ) {
        resetSequentialRewardState();
        previousShowReward(
            icon,
            name,
            description,
            rarity,
            rarityClass
        );
    };
/* =====================================================
   OVERRIDE — FERMETURE
===================================================== */
const previousClosePopup =
    closePopup;
closePopup =
    function(id) {
        previousClosePopup(
            id
        );
        if (
            id ===
            "rewardPopup"
        ) {
            setTimeout(
                resetSequentialRewardState,
                120
            );
        }
    };
/* Saison 1 : boutique découpée en GLOBAL / SHELLY STAR / COLT CHALLENGER. */
const SHELLY_STAR_IMAGE = 'Brawlers_skin/shelly_star.png';
const SHELLY_DEFAULT_IMAGE = brawlers.Shelly.image;
const COLT_CHALLENGER_IMAGE = 'Brawlers_skin/Colt_Skin-Challenger.webp';
const COLT_DEFAULT_IMAGE = brawlers.Colt.image;
if (state.seasonOne.skinEquipped) {
    brawlers.Shelly.image = SHELLY_STAR_IMAGE;
}
if (state.seasonOne.coltSkinEquipped) {
    brawlers.Colt.image = COLT_CHALLENGER_IMAGE;
}
applyChampionSkinsFromState();
function ensureSeasonShop() {
    const page =
        document.getElementById(
            'shopPage'
        );
    if (
        !page ||
        document.getElementById(
            'shopGlobalPanel'
        )
    ) {
        return;
    }
    const global =
        document.createElement(
            'div'
        );
    global.id =
        'shopGlobalPanel';
    const heading =
        page.querySelector(
            '.shop-header'
        );
    [
        ...page.children
    ]
    .filter(
        element =>
            element !== heading
    )
    .forEach(
        element =>
            global.appendChild(
                element
            )
    );
    const tabs =
        document.createElement(
            'div'
        );
    tabs.className =
        'shop-tabs';
    tabs.setAttribute(
        'role',
        'tablist'
    );
    tabs.innerHTML =
        '<button id="globalShopTab" type="button" role="tab" aria-controls="shopGlobalPanel" aria-selected="true" onclick="switchShopTab(false)">SHOP GLOBAL</button>' +
        '<button id="seasonShopTab" type="button" role="tab" aria-controls="shopSeasonPanel" aria-selected="false" onclick="switchShopTab(true)">★ SAISON 1</button>';
    const seasonal =
        document.createElement(
            'div'
        );
    seasonal.id =
        'shopSeasonPanel';
    seasonal.hidden =
        true;
    global.setAttribute(
        'role',
        'tabpanel'
    );
    global.setAttribute(
        'aria-labelledby',
        'globalShopTab'
    );
    seasonal.setAttribute(
        'role',
        'tabpanel'
    );
    seasonal.setAttribute(
        'aria-labelledby',
        'seasonShopTab'
    );
    page.append(
        tabs,
        global,
        seasonal
    );
}
function switchShopTab(
    seasonal
) {
    ensureSeasonShop();
    document.getElementById(
        'shopGlobalPanel'
    ).hidden =
        seasonal;
    document.getElementById(
        'shopSeasonPanel'
    ).hidden =
        !seasonal;
    document.getElementById(
        'globalShopTab'
    ).setAttribute(
        'aria-selected',
        String(
            !seasonal
        )
    );
    document.getElementById(
        'seasonShopTab'
    ).setAttribute(
        'aria-selected',
        String(
            seasonal
        )
    );
    renderSeasonShop();
}
function seasonOfferAvailable(
    type
) {
    const s =
        state.seasonOne;
    if (
        type ===
        'mega'
    ) {
        return s.megaBought < 3;
    }
    if (
        type ===
        'gems'
    ) {
        return s.gemsBought < 3;
    }
    if (
        type ===
        'coins'
    ) {
        return !s.coinsBought;
    }
    if (
        type ===
        'globalIcon'
    ) {
        return !s.globalIconOwned;
    }
    if (
        type ===
        'shellyIcon' ||
        type ===
        'icon'
    ) {
        return !s.shellyIconOwned && s.shellyWins >= 10;
    }
    if (
        type ===
        'shellySkin' ||
        type ===
        'skin'
    ) {
        return (
            !s.skinOwned && s.shellyWins >= 30
        );
    }
    if (
        type ===
        'coltIcon'
    ) {
        return !s.coltIconOwned && s.coltWins >= 10;
    }
    if (
        type ===
        'coltSkin'
    ) {
        return (
            !s.coltSkinOwned && s.coltWins >= 30 &&
            isBrawlerUnlocked(
                'Colt'
            )
        );
    }
    return false;
}
function getSeasonOfferButtonHtml(
    type,
    cost,
    ownedLabel = '',
    currency = 'tokens'
) {
    const available =
        seasonOfferAvailable(
            type
        );
    const balance =
        currency ===
        'coins'
        ?
        state.resources.coins
        :
        state.resources.tokens;
    const icon =
        currency ===
        'coins'
        ?
        'Icon/coin.png'
        :
        'Icon/Jeton.png';
    const alt =
        currency ===
        'coins'
        ?
        'Pièces'
        :
        'Jetons';
    const disabled =
        !available ||
        balance < cost;
    return `
        <button
            type="button"
            onclick="buySeasonOffer('${type}')"
            ${disabled ? 'disabled' : ''}
        >
            ${
                ownedLabel ||
                (cost === 0 ? 'GRATUIT' :
                (
                    '<img class="season-token" src="' +
                    icon +
                    '" alt="' +
                    alt +
                    '">' +
                    cost
                ))
            }
        </button>
    `;
}
function renderSeasonShop() {
    const panel =
        document.getElementById(
            'shopSeasonPanel'
        );
    if (!panel) {
        return;
    }
    const s =
        state.seasonOne;
    const coltUnlocked =
        isBrawlerUnlocked(
            'Colt'
        );
    const megaButton =
        getSeasonOfferButtonHtml(
            'mega',
            80,
            s.megaBought >= 3
            ?
            'ÉPUISÉ'
            :
            ''
        );
    const gemsButton =
        getSeasonOfferButtonHtml(
            'gems',
            10,
            s.gemsBought >= 3
            ?
            'ÉPUISÉ'
            :
            ''
        );
    const coinsButton =
        getSeasonOfferButtonHtml(
            'coins',
            30,
            s.coinsBought
            ?
            'ACHETÉ'
            :
            ''
        );
    const globalIconButton =
        getSeasonOfferButtonHtml(
            'globalIcon',
            200,
            s.globalIconOwned
            ?
            'POSSÉDÉE'
            :
            ''
        );
    const shellyIconButton =
        getSeasonOfferButtonHtml(
            'shellyIcon',
            250,
            s.shellyIconOwned
            ?
            'POSSÉDÉE'
            :
            s.shellyWins < 10
            ?
            'VERROUILLÉ · 10 VICTOIRES'
            :
            ''
        );
    const shellySkinButton =
        s.skinOwned
        ?
        `
            <button
                type="button"
                onclick="toggleSeasonSkin()"
            >
                ${
                    s.skinEquipped
                    ?
                    'REMETTRE LE SKIN CLASSIQUE'
                    :
                    'ÉQUIPER SHELLY STAR'
                }
            </button>
        `
        :
        getSeasonOfferButtonHtml(
            'shellySkin',
            1000,
            s.shellyWins < 30 ? 'VERROUILLÉ · 30 VICTOIRES' : ''
        );
    const coltIconButton =
        getSeasonOfferButtonHtml(
            'coltIcon',
            250,
            s.coltIconOwned
            ?
            'POSSÉDÉE'
            :
            s.coltWins < 10
            ?
            'VERROUILLÉ · 10 VICTOIRES'
            :
            ''
        );
    const coltSkinButton =
        s.coltSkinOwned
        ?
        `
            <button
                type="button"
                onclick="toggleColtChallengerSkin()"
            >
                ${
                    s.coltSkinEquipped
                    ?
                    'REMETTRE LE SKIN CLASSIQUE'
                    :
                    'ÉQUIPER COLT CHALLENGER'
                }
            </button>
        `
        :
        getSeasonOfferButtonHtml(
            'coltSkin',
            1000,
            !coltUnlocked
            ?
            'DÉBLOQUE COLT D’ABORD'
            :
            s.coltWins < 30 ? 'VERROUILLÉ · 30 VICTOIRES' : ''
        );
    panel.innerHTML = `

        <section
            class="season-zone season-zone-global"
        >

            <div
                class="season-zone-banner season-zone-banner-global"
            >

                <div class="season-zone-banner-copy">

                    <h2>
                        Saison 1 : Stars de l’arène
                    </h2>

                </div>

            </div>


            <div class="season-zone-title">

                <div>

                    <span>
                        OFFRES GLOBALES
                    </span>

                    <strong>
                        Récompenses de la saison
                    </strong>

                </div>

            </div>


            <div class="season-offers">

                <article class="season-offer">

                    <img
                        src="Icon/Mega_Box.webp"
                        alt="Mégaboîte"
                    >

                    <h3>
                        Mégaboîte
                    </h3>

                    <p>
                        ${3 - s.megaBought} / 3 disponibles
                        <br>
                        80 jetons l’unité
                    </p>

                    ${megaButton}

                </article>


                <article class="season-offer">

                    <img
                        src="Icon/coin.png"
                        alt="Pièces"
                    >

                    <h3>
                        1 000 pièces
                    </h3>

                    <p>
                        Fais le plein de pièces
                        <br>
                        1 achat maximum
                    </p>

                    ${coinsButton}

                </article>


                <article class="season-offer">

                    <img
                        src="Icon/gemme.png"
                        alt="Gemmes"
                    >

                    <h3>
                        10 gemmes
                    </h3>

                    <p>
                        ${3 - s.gemsBought} / 3 disponibles
                        <br>
                        10 jetons l’achat
                    </p>

                    ${gemsButton}

                </article>


                <article class="season-offer">

                    <img
                        src="${SEASON_ONE_GLOBAL_ICON}"
                        alt="Icône Saison 1"
                    >

                    <h3>
                        Saison 1
                    </h3>

                    <p>
                        Icône de profil
                        <br>
                        exclusive Saison 1
                    </p>

                    ${globalIconButton}

                </article>

            </div>

        </section>


        <section
            class="season-zone season-zone-shelly"
        >

            <div
                class="season-zone-banner season-zone-banner-shelly"
            >

                <div class="season-zone-banner-copy">

                    <small>
                        SHELLY STAR
                    </small>

                    <h2>
                        Shelly Star
                    </h2>

                    <p>
                        Collection exclusive Saison 1
                    </p>

                </div>

            </div>


            <div class="season-zone-title shelly">

                <div>

                    <span>
                        COLLECTION SHELLY STAR
                    </span>

                    <strong>
                        Icône + skin
                    </strong>

                </div>

            </div>


            <div class="season-offers">

                <article class="season-offer">

                    <img
                        src="${SEASON_ONE_ICON}"
                        alt="Icône Shelly Star"
                    >

                    <h3>
                        Icône Shelly Star
                    </h3>

                    <p>
                        Gagne 10 parties avec Shelly
                        <br>
                        ${Math.min(10, s.shellyWins)} / 10 victoires · 250 jetons
                    </p>

                    <progress max="10" value="${Math.min(10, s.shellyWins)}" aria-label="Victoires avec Shelly"></progress>
                    ${shellyIconButton}

                </article>


                <article
                    class="season-offer skin-offer"
                >

                    <div class="season-card-badge">
                        SHELLY STAR
                    </div>

                    <img
                        src="${SHELLY_STAR_IMAGE}"
                        alt="Shelly Star"
                        onerror="this.hidden=true"
                    >

                    <h3>
                        Skin Shelly Star
                    </h3>

                    <p>
                        Gagne 30 parties avec Shelly pour acheter ce skin.
                        <br>Prix : 1 000 jetons
                        <br>${Math.min(30, s.shellyWins)} / 30 victoires
                    </p>

                    <progress max="30" value="${Math.min(30, s.shellyWins)}" aria-label="Victoires avec Shelly"></progress>
                    ${shellySkinButton}

                </article>

            </div>

        </section>


        <section
            class="season-zone season-zone-colt"
        >

            <div
                class="season-zone-banner season-zone-banner-colt"
            >

                <div class="season-zone-banner-copy">

                    <small>
                        COLT CHALLENGER
                    </small>

                    <h2>
                        Colt Challenger
                    </h2>

                    <p>
                        Entre dans l’arène avec style
                    </p>

                </div>

            </div>


            <div class="season-zone-title colt">

                <div>

                    <span>
                        COLLECTION COLT CHALLENGER
                    </span>

                    <strong>
                        Brawler + icône + skin
                    </strong>

                </div>

            </div>


            <div class="season-offers">

                <article
                    class="season-offer season-brawler-offer"
                >

                    <img
                        src="${COLT_DEFAULT_IMAGE}"
                        alt="Colt"
                    >

                    <h3>
                        Colt
                    </h3>

                    <p>
                        ${
                            coltUnlocked
                            ?
                            'Colt est déjà débloqué.'
                            :
                            'Débloque Colt directement depuis la Saison 1.'
                        }
                    </p>

                    <button
                        type="button"
                        onclick="buyRareBrawler('Colt')"
                        ${coltUnlocked || state.resources.coins < SHOP_BRAWLER_PRICE ? 'disabled' : ''}
                    >

                        ${
                            coltUnlocked
                            ?
                            '✓ DÉBLOQUÉ'
                            :
                            `
                                <img
                                    class="season-token"
                                    src="Icon/coin.png"
                                    alt="Pièces"
                                >
                                ${SHOP_BRAWLER_PRICE}
                            `
                        }

                    </button>

                </article>


                <article class="season-offer">

                    <img
                        src="${COLT_CHALLENGER_ICON}"
                        alt="Icône Colt Challenger"
                    >

                    <h3>
                        Icône Challenger
                    </h3>

                    <p>
                        Gagne 10 parties avec Colt
                        <br>
                        ${Math.min(10, s.coltWins)} / 10 victoires · 250 jetons
                    </p>

                    <progress max="10" value="${Math.min(10, s.coltWins)}" aria-label="Victoires avec Colt"></progress>
                    ${coltIconButton}

                </article>


                <article
                    class="season-offer skin-offer colt-skin-offer"
                >

                    <div class="season-card-badge">
                        COLT CHALLENGER
                    </div>

                    <img
                        src="${COLT_CHALLENGER_IMAGE}"
                        alt="Colt Challenger"
                        onerror="this.hidden=true"
                    >

                    <h3>
                        Skin Colt Challenger
                    </h3>

                    <p>
                        ${
                            coltUnlocked
                            ?
                            'Gagne 30 parties avec Colt pour acheter ce skin. Prix : 1 000 jetons.'
                            :
                            'Débloque Colt avant de pouvoir acheter ce skin.'
                        }
                    </p>

                    <p>${Math.min(30, s.coltWins)} / 30 victoires</p>
<progress max="30" value="${Math.min(30, s.coltWins)}" aria-label="Victoires avec Colt"></progress>
                    ${coltSkinButton}

                </article>

            </div>

        </section>


        <p class="season-notice">
            Les achats, les skins, les icônes et ta progression
            de Saison 1 sont sauvegardés automatiquement.
        </p>
    `;
}
function buySeasonOffer(
    type
) {
    const prices = {
        mega: 80,
        coins: 30,
        gems: 10,
        globalIcon: 200,
        shellyIcon: 250,
        shellySkin: 1000,
        coltIcon: 250,
        coltSkin: 1000
    };
    const names = {
        mega: 'une mégaboîte',
        coins: '1 000 pièces',
        gems: '10 gemmes',
        globalIcon: 'l’icône Saison 1',
        shellyIcon: 'l’icône Shelly Star',
        shellySkin: 'le skin Shelly Star',
        coltIcon: 'l’icône Colt Challenger',
        coltSkin: 'le skin Colt Challenger'
    };
    // Compatibilité avec d'anciens appels.
    if (
        type ===
        'icon'
    ) {
        type =
            'shellyIcon';
    }
    if (
        type ===
        'skin'
    ) {
        type =
            'shellySkin';
    }
    const cost =
        prices[
            type
        ];
    if (
        !Number.isFinite(
            cost
        ) ||
        !seasonOfferAvailable(
            type
        ) ||
        state.resources.tokens < cost ||
        boxOpeningActive
    ) {
        return;
    }
    showAppConfirm({
        kicker:
            'SAISON 1',
        icon:
            '★',
        title:
            'CONFIRMER L’ACHAT',
        message:
            cost === 0 ? `Récupérer gratuitement ${names[type]} ?` : `Acheter ${names[type]} pour ${cost} jetons ?`,
        confirmLabel:
            cost === 0 ? 'RÉCUPÉRER' : 'ACHETER',
        onConfirm:
            () =>
                executeSeasonPurchase(
                    type
                )
    });
}
function executeSeasonPurchase(
    type
) {
    const prices = {
        mega: 80,
        coins: 30,
        gems: 10,
        globalIcon: 200,
        shellyIcon: 250,
        shellySkin: 1000,
        coltIcon: 250,
        coltSkin: 1000
    };
    if (
        type ===
        'icon'
    ) {
        type =
            'shellyIcon';
    }
    if (
        type ===
        'skin'
    ) {
        type =
            'shellySkin';
    }
    const cost =
        prices[
            type
        ];
    if (
        !Number.isFinite(
            cost
        ) ||
        !seasonOfferAvailable(
            type
        ) ||
        state.resources.tokens < cost ||
        boxOpeningActive
    ) {
        return false;
    }
    if (
        type ===
        'mega'
    ) {
        executePaidBoxOpening(
            'mega',
            true
        );
        renderSeasonShop();
        return true;
    }
    state.resources.tokens -=
        cost;
    if (
        type ===
        'gems'
    ) {
        state.resources.gems +=
            10;
        state.seasonOne.gemsBought++;
    }
    if (
        type ===
        'coins'
    ) {
        state.resources.coins +=
            1000;
        state.seasonOne.coinsBought =
            true;
    }
    if (
        type ===
        'globalIcon'
    ) {
        state.seasonOne.globalIconOwned =
            true;
        if (
            !state.profileIconsUnlocked.includes(
                SEASON_ONE_GLOBAL_ICON
            )
        ) {
            state.profileIconsUnlocked.push(
                SEASON_ONE_GLOBAL_ICON
            );
        }
    }
    if (
        type ===
        'shellyIcon'
    ) {
        state.seasonOne.iconOwned =
            true;
        state.seasonOne.shellyIconOwned =
            true;
        if (
            !state.profileIconsUnlocked.includes(
                SEASON_ONE_ICON
            )
        ) {
            state.profileIconsUnlocked.push(
                SEASON_ONE_ICON
            );
        }
    }
    if (
        type ===
        'shellySkin'
    ) {
        state.seasonOne.skinOwned =
            true;
    }
    if (
        type ===
        'coltIcon'
    ) {
        state.seasonOne.coltIconOwned =
            true;
        if (
            !state.profileIconsUnlocked.includes(
                COLT_CHALLENGER_ICON
            )
        ) {
            state.profileIconsUnlocked.push(
                COLT_CHALLENGER_ICON
            );
        }
    }
    if (
        type ===
        'coltSkin'
    ) {
        state.seasonOne.coltSkinOwned =
            true;
    }
    saveGame();
    updateResources();
    renderSeasonShop();
    if (
        type ===
        'globalIcon' ||
        type ===
        'shellyIcon' ||
        type ===
        'coltIcon'
    ) {
        renderProfileIconChoices();
    }
    if (
        type ===
        'gems'
    ) {
        showReward(
            'Icon/gemme.png',
            '+10 gemmes',
            'Achat saisonnier',
            'SAISON 1',
            'rare'
        );
    }
    if (
        type ===
        'coins'
    ) {
        showReward(
            'Icon/coin.png',
            '+1 000 pièces',
            'Achat saisonnier',
            'SAISON 1',
            'rare'
        );
    }
    if (
        type ===
        'globalIcon'
    ) {
        showProfileIconRewardAnimation(
            SEASON_ONE_GLOBAL_ICON,
            'Saison 1',
            'SAISON 1 · ICÔNE EXCLUSIVE',
            'SAISON 1 · ICÔNE DE PROFIL'
        );
    }
    if (
        type ===
        'shellyIcon'
    ) {
        showProfileIconRewardAnimation(
            SEASON_ONE_ICON,
            'Shelly Star',
            'SHELLY STAR · ICÔNE EXCLUSIVE',
            'SAISON 1 · SHELLY STAR'
        );
    }
    if (
        type ===
        'coltIcon'
    ) {
        showProfileIconRewardAnimation(
            COLT_CHALLENGER_ICON,
            'Colt Challenger',
            'COLT CHALLENGER · ICÔNE EXCLUSIVE',
            'SAISON 1 · COLT CHALLENGER'
        );
    }
    if (
        type ===
        'shellySkin'
    ) {
        showSeasonSkinUnlock(
            'Shelly',
            'Shelly Star',
            SHELLY_STAR_IMAGE,
            {
                sourceLabel: 'SAISON 1 · SHELLY STAR',
                description: 'Skin exclusif débloqué · Tu peux l’équiper maintenant.',
                equipType: 'season'
            }
        );
    }
    if (
        type ===
        'coltSkin'
    ) {
        showSeasonSkinUnlock(
            'Colt',
            'Colt Challenger',
            COLT_CHALLENGER_IMAGE,
            {
                sourceLabel: 'SAISON 1 · COLT CHALLENGER',
                description: 'Skin exclusif débloqué · Tu peux l’équiper maintenant.',
                equipType: 'season'
            }
        );
    }
    return true;
}
function toggleSeasonSkin() {
    if (
        !state.seasonOne.skinOwned
    ) {
        return;
    }
    state.seasonOne.skinEquipped =
        !state.seasonOne.skinEquipped;
    if (state.seasonOne.skinEquipped) {
        ensureChampionSkinState('Shelly').equipped = false;
    }
    brawlers.Shelly.image =
        state.seasonOne.skinEquipped
        ?
        SHELLY_STAR_IMAGE
        :
        SHELLY_DEFAULT_IMAGE;
    saveGame();
    updateSelectedBrawler();
    renderBrawlers();
    renderSeasonShop();
}
function toggleColtChallengerSkin() {
    if (
        !state.seasonOne.coltSkinOwned ||
        !isBrawlerUnlocked(
            'Colt'
        )
    ) {
        return;
    }
    state.seasonOne.coltSkinEquipped =
        !state.seasonOne.coltSkinEquipped;
    if (state.seasonOne.coltSkinEquipped) {
        ensureChampionSkinState('Colt').equipped = false;
    }
    brawlers.Colt.image =
        state.seasonOne.coltSkinEquipped
        ?
        COLT_CHALLENGER_IMAGE
        :
        COLT_DEFAULT_IMAGE;
    saveGame();
    updateSelectedBrawler();
    renderBrawlers();
    renderSeasonShop();
}
function getBrawlerSkins(
    name
) {
    if (
        !brawlers[
            name
        ]
    ) {
        return [];
    }
    const championState =
        state.championSkins?.[name] || {
            owned: false,
            equipped: false
        };
    const championSkin =
        CHAMPION_SKIN_IMAGES[name]
        ? {
            id: 'champion',
            name: getChampionSkinDisplayName(name),
            image: CHAMPION_SKIN_IMAGES[name],
            secondaryImage: name === 'Nita' ? NITA_CHAMPION_BEAR_IMAGE : '',
            secondaryLabel: name === 'Nita' ? 'Nita Championne + Bruce Champion' : '',
            owned: championState.owned === true,
            equipped: championState.owned === true && championState.equipped === true
        }
        : null;
    if (
        name ===
        'Shelly'
    ) {
        const starEquipped =
            state.seasonOne.skinOwned &&
            state.seasonOne.skinEquipped;
        return [
            {
                id: 'default',
                name: 'Classique',
                image: SHELLY_DEFAULT_IMAGE,
                owned: true,
                equipped: !starEquipped && !(championSkin && championSkin.equipped)
            },
            {
                id: 'star',
                name: 'Shelly Star',
                image: SHELLY_STAR_IMAGE,
                owned: state.seasonOne.skinOwned,
                equipped: !!starEquipped
            },
            championSkin
        ]
        .filter(
            skin =>
                skin && skin.owned
        );
    }
    if (
        name ===
        'Colt'
    ) {
        const challengerEquipped =
            state.seasonOne.coltSkinOwned &&
            state.seasonOne.coltSkinEquipped;
        return [
            {
                id: 'default',
                name: 'Classique',
                image: COLT_DEFAULT_IMAGE,
                owned: true,
                equipped: !challengerEquipped && !(championSkin && championSkin.equipped)
            },
            {
                id: 'challenger',
                name: 'Colt Challenger',
                image: COLT_CHALLENGER_IMAGE,
                owned: state.seasonOne.coltSkinOwned,
                equipped: !!challengerEquipped
            },
            championSkin
        ]
        .filter(
            skin =>
                skin && skin.owned
        );
    }
    if (championSkin) {
        return [
            {
                id: 'default',
                name: 'Classique',
                image: getDefaultSkinImage(name),
                secondaryImage: name === 'Nita' ? NITA_DEFAULT_BEAR_IMAGE : '',
                secondaryLabel: name === 'Nita' ? 'Nita + Bruce' : '',
                owned: true,
                equipped: !championSkin.equipped
            },
            championSkin
        ]
        .filter(
            skin =>
                skin && skin.owned
        );
    }
    return [
        {
            id: 'default',
            name: 'Classique',
            image: getDefaultSkinImage(name),
            owned: true,
            equipped: true
        }
    ];
}
/* =====================================================
   MODE DE JEU SÉLECTIONNÉ
===================================================== */
let selectedGameMode = 'training';
try {
    const savedGameMode = localStorage.getItem('brawlVS.selectedGameMode');
    if (savedGameMode === 'training') selectedGameMode = savedGameMode;
} catch (_) {}
function getSelectedGameModeInfo() {
    if (selectedGameMode === 'training') {
        return {
            name: 'Arène principale',
            playLabel: 'ARÈNE PRINCIPALE · SOLO'
        };
    }
    return {
        name: 'Arène principale',
        playLabel: 'ARÈNE PRINCIPALE · SOLO'
    };
}
function refreshSelectedGameModeUI() {
    const info = getSelectedGameModeInfo();
    const playLabel = document.getElementById('playSelectedModeText');
    const homeModeName = document.getElementById('homeSelectedModeName');
    if (playLabel) playLabel.textContent = info.playLabel;
    if (homeModeName) homeModeName.textContent = info.name;
}
function openHomeMenu(mode) {
    let dialog = document.getElementById('homeMenuDialog');
    if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'homeMenuDialog';
        dialog.setAttribute('aria-labelledby', 'homeMenuTitle');
        mountPhoneSkinDialog(dialog);
    }
    const modes = mode === 'modes';
    dialog.innerHTML = `
        <div class="skin-catalog-heading">
            <h2 id="homeMenuTitle">${modes ? 'MODE DE JEU' : 'OPTIONS'}</h2>
            <button type="button" class="skin-catalog-close" onclick="document.getElementById('homeMenuDialog').close()" aria-label="Fermer">×</button>
        </div>
        ${modes ? `
            <button type="button" class="home-menu-card selected" onclick="selectTrainingMode()">
                <strong>🎯 Arène principale <span>✓ SÉLECTIONNÉ</span></strong>
                <small>Affronte les bots avec le fonctionnement actuel du jeu.</small>
            </button>
            <button type="button" class="home-menu-card locked" disabled>
                <strong>🔒 Duel <span>VERROUILLÉ</span></strong>
                <small>Parties entre amis · Bientôt disponible</small>
            </button>
        ` : `
            <section class="audio-options" aria-labelledby="audioOptionsTitle">
                <h3 id="audioOptionsTitle">♫ AUDIO</h3>
                <div class="audio-volume-heading">
                    <label for="musicVolume">Volume de la musique</label>
                    <output id="musicVolumeValue" for="musicVolume">${window.brawlMusic.getVolume()} %</output>
                </div>
                <input id="musicVolume" type="range" min="0" max="100" step="1"
                    value="${window.brawlMusic.getVolume()}"
                    oninput="window.brawlMusic.setVolume(this.value)"
                    style="--volume:${window.brawlMusic.getVolume()}%">
                <div class="audio-volume-scale"><span>0 · Muet</span><span>100 · Maximum</span></div>
                <p>Le même volume s’applique au menu et aux combats.</p>
                <button id="musicControl" type="button">♪ Activer le son</button>

                <div class="sfx-options-separator"></div>

                <div class="audio-volume-heading">
                    <label for="sfxVolume">Volume des effets sonores</label>
                    <output id="sfxVolumeValue" for="sfxVolume">${window.brawlSfx ? window.brawlSfx.getVolume() : 70} %</output>
                </div>
                <input id="sfxVolume" type="range" min="0" max="100" step="1"
                    value="${window.brawlSfx ? window.brawlSfx.getVolume() : 70}"
                    oninput="window.brawlSfx && window.brawlSfx.setVolume(this.value)"
                    style="--volume:${window.brawlSfx ? window.brawlSfx.getVolume() : 70}%">
                <div class="audio-volume-scale"><span>0 · Muet</span><span>100 · Maximum</span></div>
                <p>Sons des boutons, menus, coffres et actions de combat.</p>
                <button id="sfxControl" type="button">🔊 Effets sonores</button>
            </section>
        `}`;
    dialog.openInPhone();
    if (!modes) {
        window.brawlMusic.refresh();
        if (window.brawlSfx) window.brawlSfx.refresh();
    }
}
function selectTrainingMode() {
    selectedGameMode = 'training';
    try {
        localStorage.setItem('brawlVS.selectedGameMode', selectedGameMode);
    } catch (_) {}
    refreshSelectedGameModeUI();
    if (window.brawlSfx) {
        window.brawlSfx.play('select');
    }
    document.getElementById('homeMenuDialog')?.close();
}
function mountPhoneSkinDialog(dialog) {
    const phone = document.querySelector('.phone');
    const overlay = document.createElement('div');
    overlay.className = 'phone-skin-overlay';
    overlay.hidden = true;
    phone.appendChild(overlay);
    overlay.appendChild(dialog);
    dialog.setAttribute('aria-modal', 'true');
    dialog.tabIndex = -1;
    let previousFocus = null;
    let inertSiblings = [];
    dialog.openInPhone = () => {
        if (dialog.open) return;
        phone.querySelectorAll('.phone-skin-overlay dialog[open]').forEach(other => other.close());
        previousFocus = document.activeElement;
        inertSiblings = [...phone.children].filter(el => el !== overlay).map(el => [el, el.inert]);
        inertSiblings.forEach(([el]) => { el.inert = true; });
        overlay.hidden = false;
        dialog.show();
        dialog.scrollTop = 0;
        (dialog.querySelector('button:not(:disabled)') || dialog).focus({preventScroll:true});
    };
    const restorePhone = () => {
        if (dialog.open || overlay.hidden) return;
        overlay.hidden = true;
        inertSiblings.forEach(([el, wasInert]) => { el.inert = wasInert; });
        inertSiblings = [];
        if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
    };
    const nativeClose = dialog.close.bind(dialog);
    dialog.close = (...args) => { nativeClose(...args); restorePhone(); };
    dialog.addEventListener('close', restorePhone);
    overlay.addEventListener('click', event => {
        if (event.target === overlay) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            dialog.close();
        }
        if (event.key === 'Tab') {
            const buttons = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), [href], [tabindex="0"]')];
            const first = buttons[0], last = buttons[buttons.length - 1];
            if (!first) { event.preventDefault(); dialog.focus(); }
            else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });
}
function openSkinCatalog(
    name
) {
    if (
        !brawlers[
            name
        ] ||
        !isBrawlerUnlocked(
            name
        )
    ) {
        return;
    }
    let dialog =
        document.getElementById(
            'skinCatalogDialog'
        );
    if (!dialog) {
        dialog =
            document.createElement(
                'dialog'
            );
        dialog.id =
            'skinCatalogDialog';
        dialog.setAttribute(
            'aria-labelledby',
            'skinCatalogTitle'
        );
        dialog.addEventListener(
            'click',
            event => {
                if (
                    event.target !==
                    dialog
                ) {
                    return;
                }
                const rect =
                    dialog.getBoundingClientRect();
                if (
                    event.clientX <
                        rect.left ||
                    event.clientX >
                        rect.right ||
                    event.clientY <
                        rect.top ||
                    event.clientY >
                        rect.bottom
                ) {
                    dialog.close();
                }
            }
        );
        mountPhoneSkinDialog(dialog);
    }
    dialog.replaceChildren();
    const heading =
        document.createElement(
            'div'
        );
    heading.className =
        'skin-catalog-heading';
    const title =
        document.createElement(
            'h2'
        );
    title.id =
        'skinCatalogTitle';
    title.textContent =
        'Skins · ' +
        name;
    const close =
        document.createElement(
            'button'
        );
    close.type =
        'button';
    close.className =
        'skin-catalog-close';
    close.textContent =
        '×';
    close.setAttribute(
        'aria-label',
        'Fermer le catalogue'
    );
    close.onclick =
        () =>
            dialog.close();
    heading.append(
        title,
        close
    );
    dialog.appendChild(
        heading
    );
    const grid =
        document.createElement(
            'div'
        );
    grid.className =
        'skin-catalog-grid';
    for (
        const skin of
        getBrawlerSkins(
            name
        )
    ) {
        const card =
            document.createElement(
                'article'
            );
        card.className =
            'skin-catalog-card' +
            (
                skin.equipped
                ?
                ' is-equipped'
                :
                ''
            );
        const preview =
            document.createElement(
                'div'
            );
        preview.className =
            'skin-catalog-preview' +
            (
                skin.secondaryImage
                ?
                ' rotating'
                :
                ''
            );
        const img =
            document.createElement(
                'img'
            );
        img.src =
            skin.image;
        img.alt =
            skin.name;
        preview.appendChild(
            img
        );
        if (
            name === 'Nita' &&
            skin.secondaryImage
        ) {
            configureNitaAlternatingPreview(
                img,
                skin.image,
                skin.secondaryImage,
                {
                    primaryAlt: skin.name,
                    bearAlt: skin.id === 'champion'
                        ? 'Bruce Champion'
                        : 'Bruce'
                }
            );
        }
        const label =
            document.createElement(
                'strong'
            );
        label.textContent =
            skin.name;
        const button =
            document.createElement(
                'button'
            );
        button.type =
            'button';
        button.textContent =
            skin.equipped
            ?
            'ÉQUIPÉ'
            :
            skin.owned
            ?
            'ÉQUIPER'
            :
            'VERROUILLÉ';
        button.disabled =
            skin.equipped ||
            !skin.owned;
        button.onclick =
            () =>
                equipCatalogSkin(
                    name,
                    skin.id
                );
        card.append(
            preview,
            label
        );
        if (
            skin.secondaryLabel
        ) {
            const secondaryLabel =
                document.createElement(
                    'small'
                );
            secondaryLabel.className =
                'skin-catalog-secondary-label';
            secondaryLabel.textContent =
                skin.secondaryLabel;
            card.appendChild(
                secondaryLabel
            );
        }
        card.appendChild(
            button
        );
        grid.appendChild(
            card
        );
    }
    dialog.appendChild(
        grid
    );
    if (
        name === 'Nita'
    ) {
        restartNitaPreviewRotation();
    }
    if (
        !dialog.open
    ) {
        dialog.openInPhone();
    }
}
function equipCatalogSkin(
    name,
    id
) {
    if (
        !isBrawlerUnlocked(
            name
        )
    ) {
        return false;
    }
    const skin =
        getBrawlerSkins(
            name
        )
        .find(
            item =>
                item.id === id
        );
    if (
        !skin ||
        !skin.owned
    ) {
        return false;
    }
    const championState =
        CHAMPION_SKIN_IMAGES[name]
        ? ensureChampionSkinState(name)
        : null;
    if (
        name ===
        'Shelly'
    ) {
        state.seasonOne.skinEquipped =
            id ===
            'star';
        if (championState) {
            championState.equipped = id === 'champion';
        }
        brawlers.Shelly.image =
            championState && championState.equipped
            ? CHAMPION_SKIN_IMAGES.Shelly
            : state.seasonOne.skinEquipped
            ? SHELLY_STAR_IMAGE
            : SHELLY_DEFAULT_IMAGE;
    }
    else if (
        name ===
        'Colt'
    ) {
        state.seasonOne.coltSkinEquipped =
            id ===
            'challenger';
        if (championState) {
            championState.equipped = id === 'champion';
        }
        brawlers.Colt.image =
            championState && championState.equipped
            ? CHAMPION_SKIN_IMAGES.Colt
            : state.seasonOne.coltSkinEquipped
            ? COLT_CHALLENGER_IMAGE
            : COLT_DEFAULT_IMAGE;
    }
    else if (
        championState
    ) {
        championState.equipped =
            id ===
            'champion';
        brawlers[name].image =
            championState.equipped
            ? CHAMPION_SKIN_IMAGES[name]
            : getDefaultSkinImage(name);
    }
    else {
        brawlers[name].image =
            skin.image;
    }
    saveGame();
    updateSelectedBrawler();
    renderBrawlers();
    renderSeasonShop();
    showBrawlerDetail(
        name
    );
    openSkinCatalog(
        name
    );
    return true;
}
function showSeasonSkinUnlock(
    brawlerName,
    skinName,
    skinImage,
    options = {}
) {
    let dialog =
        document.getElementById(
            'skinUnlockDialog'
        );
    if (!dialog) {
        dialog =
            document.createElement(
                'dialog'
            );
        dialog.id =
            'skinUnlockDialog';
        dialog.setAttribute(
            'aria-labelledby',
            'skinUnlockTitle'
        );
        mountPhoneSkinDialog(dialog);
    }
    const sourceLabel =
        options.sourceLabel ||
        'NOUVEAU SKIN';
    const description =
        options.description ||
        'Ce skin rejoint ta collection.';
    const equipType =
        options.equipType ||
        'season';
    dialog.innerHTML = `
        <div class="skin-unlock-shell">

            <div class="skin-unlock-burst"></div>
            <div class="skin-unlock-rays"></div>

            <div class="skin-unlock-kicker">
                NOUVEAU SKIN DÉBLOQUÉ
            </div>

            <h2 id="skinUnlockTitle">
                ${skinName}
            </h2>

            <div class="skin-unlock-source">
                ${sourceLabel}
            </div>

            <div class="skin-unlock-stage">

                <div class="skin-unlock-ring"></div>
                <span class="skin-unlock-spark s1"></span>
                <span class="skin-unlock-spark s2"></span>
                <span class="skin-unlock-spark s3"></span>
                <span class="skin-unlock-spark s4"></span>
                <span class="skin-unlock-spark s5"></span>

                <img
                    class="skin-unlock-skin"
                    src="${skinImage}"
                    alt="${skinName}"
                >

            </div>

            <p class="skin-unlock-description">
                ${description}
            </p>
        </div>

        <div class="skin-unlock-actions">

            <button
                type="button"
                id="skinUnlockEquip"
            >
                ✨ ÉQUIPER MAINTENANT
            </button>

            <button
                type="button"
                id="skinUnlockClose"
            >
                CONTINUER
            </button>

        </div>
    `;
    dialog.querySelector(
        '#skinUnlockEquip'
    ).onclick =
        () => {
            if (
                equipType === 'champion' &&
                CHAMPION_SKIN_IMAGES[brawlerName]
            ) {
                const championState =
                    ensureChampionSkinState(
                        brawlerName
                    );
                if (!championState.owned) {
                    return;
                }
                championState.equipped = true;
                if (
                    brawlerName === 'Shelly'
                ) {
                    state.seasonOne.skinEquipped = false;
                }
                if (
                    brawlerName === 'Colt'
                ) {
                    state.seasonOne.coltSkinEquipped = false;
                }
                brawlers[brawlerName].image =
                    CHAMPION_SKIN_IMAGES[brawlerName];
            }
            else if (
                brawlerName ===
                'Shelly'
            ) {
                if (
                    !state.seasonOne.skinOwned
                ) {
                    return;
                }
                state.seasonOne.skinEquipped =
                    true;
                ensureChampionSkinState('Shelly').equipped = false;
                brawlers.Shelly.image =
                    SHELLY_STAR_IMAGE;
            }
            else if (
                brawlerName ===
                'Colt'
            ) {
                if (
                    !state.seasonOne.coltSkinOwned
                ) {
                    return;
                }
                state.seasonOne.coltSkinEquipped =
                    true;
                ensureChampionSkinState('Colt').equipped = false;
                brawlers.Colt.image =
                    COLT_CHALLENGER_IMAGE;
            }
            saveGame();
            updateSelectedBrawler();
            renderBrawlers();
            renderSeasonShop();
            if (state.detailBrawler === brawlerName) {
                showBrawlerDetail(brawlerName);
            }
            dialog.close();
        };
    dialog.querySelector(
        '#skinUnlockClose'
    ).onclick =
        () =>
            dialog.close();
    if (
        dialog.open
    ) {
        dialog.close();
    }
    dialog.openInPhone();
}
// Ancien nom conservé pour les appels déjà présents.
function showSkinUnlock() {
    showSeasonSkinUnlock(
        'Shelly',
        'Shelly Star',
        SHELLY_STAR_IMAGE,
        {
            sourceLabel: 'SAISON 1 · SHELLY STAR',
            description: 'Skin exclusif débloqué · Tu peux l’équiper maintenant.',
            equipType: 'season'
        }
    );
}
/* =====================================================
   COMBAT · CHANCE DE TOUCHER SUR LES BOUTONS D'ACTION
===================================================== */
function getBattleHitChancePercentWithShotFieldForUI(
    defenderName,
    shotField,
    defenderSide = "enemy"
) {
    if (
        battleState.currentDistance ===
        1
    ) {
        return 100;
    }
    const defender =
        brawlers[
            defenderName
        ];
    if (!defender) {
        return 100;
    }
    const defenderSpeed =
        getBattleEffectiveSpeed(
            defenderSide,
            defenderName
        );
    const safeShotField =
        Math.max(
            0,
            Number(
                shotField
            ) || 0
        );
    const attackScore =
        BATTLE_DODGE_BASE +
        safeShotField;
    const totalScore =
        attackScore +
        defenderSpeed;
    if (totalScore <= 0) {
        return 100;
    }
    return Math.round(
        (
            attackScore /
            totalScore
        ) * 100
    );
}
function setBattleActionHitChanceBadge(
    element,
    percent
) {
    if (!element) {
        return;
    }
    element.classList.remove(
        "hit-chance-high",
        "hit-chance-mid",
        "hit-chance-low",
        "hit-chance-zero"
    );
    if (
        percent === null ||
        percent === undefined ||
        !Number.isFinite(
            Number(
                percent
            )
        )
    ) {
        element.removeAttribute(
            "data-hit-chance"
        );
        return;
    }
    const safePercent =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(
                    Number(
                        percent
                    )
                )
            )
        );
    element.setAttribute(
        "data-hit-chance",
        safePercent + "%"
    );
    if (safePercent >= 75) {
        element.classList.add(
            "hit-chance-high"
        );
    }
    else if (safePercent >= 50) {
        element.classList.add(
            "hit-chance-mid"
        );
    }
    else if (safePercent > 0) {
        element.classList.add(
            "hit-chance-low"
        );
    }
    else {
        element.classList.add(
            "hit-chance-zero"
        );
    }
}
function updateBattleActionHitChanceUI() {
    const attackButton =
        document.getElementById(
            "battleAttackButton"
        );
    const superButton =
        document.getElementById(
            "battleSuperButton"
        );
    const slot1 =
        document.getElementById(
            "battleAbilitySlot1"
        );
    const slot2 =
        document.getElementById(
            "battleAbilitySlot2"
        );
    const distance =
        Number(
            battleState.currentDistance
        );
    /*
       Tant qu'aucune distance n'est choisie,
       on ne montre aucun pourcentage.
    */
    if (
        !battleState.distanceChosen ||
        !Number.isFinite(
            distance
        )
    ) {
        setBattleActionHitChanceBadge(
            attackButton,
            null
        );
        setBattleActionHitChanceBadge(
            superButton,
            null
        );
        setBattleActionHitChanceBadge(
            slot1,
            null
        );
        setBattleActionHitChanceBadge(
            slot2,
            null
        );
        return;
    }
    /*
       ATTAQUE DE BASE
    */
    const basicInRange =
        isBattleTargetInRange(
            battleState.playerName,
            distance,
            false
        );
    setBattleActionHitChanceBadge(
        attackButton,
        basicInRange
        ?
        getBattleHitChancePercent(
            battleState.playerName,
            battleState.enemyName,
            false,
            "enemy"
        )
        :
        0
    );
    /*
       SUPER
       Poco = soin
       Nita = invocation
       donc aucun pourcentage de toucher.
    */
    if (
        battleState.playerName ===
            "Poco" ||
        battleState.playerName ===
            "Nita"
    ) {
        setBattleActionHitChanceBadge(
            superButton,
            null
        );
    }
    else if (
        battleState.playerName ===
        "Bull"
    ) {
        const bull =
            brawlers[
                "Bull"
            ];
        const bullCanHitDuringRush =
            distance <=
            (
                bull?.superStats?.range ||
                0
            );
        setBattleActionHitChanceBadge(
            superButton,
            bullCanHitDuringRush
            ?
            getBattleHitChancePercent(
                battleState.playerName,
                battleState.enemyName,
                true,
                "enemy"
            )
            :
            0
        );
    }
    else {
        const superInRange =
            isBattleTargetInRange(
                battleState.playerName,
                distance,
                true
            );
        setBattleActionHitChanceBadge(
            superButton,
            superInRange
            ?
            getBattleHitChancePercent(
                battleState.playerName,
                battleState.enemyName,
                true,
                "enemy"
            )
            :
            0
        );
    }
    /*
       CAPACITÉS
       On affiche un pourcentage uniquement
       pour celles qui peuvent réellement toucher
       ou infliger directement des dégâts.
    */
    const loadout =
        getBrawlerAbilityLoadout(
            battleState.playerName
        );
    function updateAbilityChance(
        element,
        slotNumber
    ) {
        if (!element) {
            return;
        }
        const abilityId =
            loadout[
                String(
                    slotNumber
                )
            ];
        const ability =
            getBrawlerAbilityById(
                battleState.playerName,
                abilityId
            );
        if (
            !ability ||
            isBattleAbilityUsed(
                ability.id
            )
        ) {
            setBattleActionHitChanceBadge(
                element,
                null
            );
            return;
        }
        let chance =
            null;
        if (
            ability.id ===
            "shelly-ability-b"
        ) {
            chance =
                isBattleTargetInRange(
                    "Shelly",
                    distance,
                    false
                )
                ?
                getBattleHitChancePercentWithShotFieldForUI(
                    battleState.enemyName,
                    2
                )
                :
                0;
        }
        else if (
            ability.id ===
            "colt-ability-a"
        ) {
            chance =
                distance <= 6
                ?
                getBattleHitChancePercentWithShotFieldForUI(
                    battleState.enemyName,
                    3
                )
                :
                0;
        }
        else if (
            ability.id ===
            "nita-ability-a"
        ) {
            chance =
                isBattleTargetInRange(
                    "Nita",
                    distance,
                    false
                )
                ?
                getBattleHitChancePercent(
                    "Nita",
                    battleState.enemyName,
                    false,
                    "enemy"
                )
                :
                0;
        }
        else if (
            ability.id ===
            "bull-ability-b"
        ) {
            /*
               GROS SABOTS :
               aucune esquive si la cible est dans
               la portée de 3.
            */
            chance =
                distance <= 3
                ?
                100
                :
                0;
        }
        else if (
            ability.id ===
            "el-primo-ability-a"
        ) {
            /*
               SUPLEX FATAL :
               utilisable uniquement à distance 1,
               donc touche automatiquement.
            */
            chance =
                distance === 1
                ?
                100
                :
                0;
        }
        else if (
            ability.effect?.type ===
            "damage" &&
            ability.id !==
            "el-primo-ability-b"
        ) {
            /*
               Les capacités de dégâts génériques
               sont définies dans ton système comme
               dégâts garantis, sans test d'esquive.
            */
            chance =
                100;
        }
        setBattleActionHitChanceBadge(
            element,
            chance
        );
    }
    updateAbilityChance(
        slot1,
        1
    );
    updateAbilityChance(
        slot2,
        2
    );
}

;

document.addEventListener('DOMContentLoaded', () => {
    refreshDailyContent();
    setInterval(refreshDailyContent, 1000);
    document.addEventListener('visibilitychange', () => {if (!document.hidden) refreshDailyContent();});
    window.addEventListener('focus', refreshDailyContent);
});

;

/* =====================================================
   MUSIQUE BRAWL VS
   - HOME : Son/Home_ss1.mp3
   - COMBAT : Son/Combat_ss1.mp3
   - L'état ON/OFF est mémorisé.
   - Aucun clic du jeu ne peut réactiver une musique coupée.
   - On tente l'autoplay dès le lancement.
   - Si Chrome bloque l'autoplay sonore, le premier geste
     utilisateur ne fait QUE déverrouiller l'audio si celui-ci
     est toujours réglé sur ON.
===================================================== */
(() => {
    const music = document.getElementById('backgroundMusic');
    const notice = document.getElementById('musicNotice');
    const battlePage = document.getElementById('battlePage');
    let volume = 60;
    let enabled = true;
    let currentTrack = 'Son/Home_ss1.mp3';
    let pending = false;
    let generation = 0;
    let autoplayBlocked = false;
    try {
        const storedVolume = localStorage.getItem('brawlVS.musicVolume');
        if (storedVolume !== null && Number.isFinite(Number(storedVolume))) {
            volume = Math.max(0, Math.min(100, Math.round(Number(storedVolume))));
        }
        const storedEnabled = localStorage.getItem('brawlVS.musicEnabled');
        if (storedEnabled !== null) {
            enabled = storedEnabled === 'true';
        }
    } catch (_) {}
    music.volume = volume / 100;
    music.autoplay = true;
    function saveEnabled() {
        try {
            localStorage.setItem('brawlVS.musicEnabled', String(enabled));
        } catch (_) {}
    }
    function message(text) {
        if (!notice) return;
        notice.textContent = text;
        notice.hidden = !text;
    }
    function refreshButton() {
        const control = document.getElementById('musicControl');
        if (!control) return;
        if (enabled) {
            control.textContent = autoplayBlocked
                ? '♪ Musique ON · en attente'
                : '♪ Musique activée';
            control.setAttribute('aria-label', 'Désactiver la musique');
            control.setAttribute('aria-pressed', 'true');
        } else {
            control.textContent = '♪ Musique désactivée';
            control.setAttribute('aria-label', 'Activer la musique');
            control.setAttribute('aria-pressed', 'false');
        }
    }
    function reportMediaError() {
        if (!enabled) return;
        const code = music.error && music.error.code;
        if (code === 1) return;
        message(
            'Impossible de lire ' + currentTrack +
            '. Vérifie que le fichier MP3 existe bien dans le dossier Son.'
        );
        refreshButton();
    }
    function desiredTrack() {
        return battlePage && battlePage.classList.contains('active')
            ? 'Son/Combat_ss1.mp3'
            : 'Son/Home_ss1.mp3';
    }
    function setCorrectTrack(forceReload = false) {
        const track = desiredTrack();
        if (track !== currentTrack || forceReload) {
            music.pause();
            currentTrack = track;
            generation++;
            pending = false;
            if (music.getAttribute('src') !== track || forceReload) {
                music.src = track;
                music.load();
            }
        }
    }
    function syncMusic(retry = false) {
        const track = desiredTrack();
        if (track !== currentTrack) {
            music.pause();
            currentTrack = track;
            generation++;
            pending = false;
            music.src = track;
            music.load();
            message('');
        } else if (retry && music.error) {
            generation++;
            pending = false;
            music.src = track;
            music.load();
        }
        // RÈGLE ABSOLUE : OFF = aucune fonction ne peut relancer la musique.
        if (!enabled) {
            autoplayBlocked = false;
            pending = false;
            music.pause();
            message('');
            refreshButton();
            return;
        }
        // Quand l'onglet est caché on met en pause sans changer le choix ON/OFF.
        if (document.hidden) {
            music.pause();
            refreshButton();
            return;
        }
        if (!music.paused || pending) {
            autoplayBlocked = false;
            refreshButton();
            return;
        }
        const requestGeneration = generation;
        pending = true;
        let attempt;
        try {
            attempt = music.play();
        } catch (error) {
            failed(error);
            return;
        }
        Promise.resolve(attempt).then(() => {
            if (requestGeneration !== generation) return;
            pending = false;
            autoplayBlocked = false;
            message('');
            refreshButton();
        }, failed);
        function failed(error) {
            if (requestGeneration !== generation) return;
            pending = false;
            refreshButton();
            if (error && error.name === 'AbortError') return;
            if (error && error.name === 'NotAllowedError') {
                autoplayBlocked = true;
                message('Chrome bloque le son automatique : le premier toucher déverrouillera la musique.');
                refreshButton();
                return;
            }
            autoplayBlocked = false;
            reportMediaError();
            if (!music.error) {
                message('Lecture audio impossible pour le moment.');
            }
        }
    }
    /* Bouton ON / OFF dans Options.
       On teste ENABLED, et non music.paused :
       même si Chrome bloque l'autoplay, cliquer ici peut bien passer sur OFF. */
    document.addEventListener('click', event => {
        const control = event.target.closest('#musicControl');
        if (!control) return;
        enabled = !enabled;
        saveEnabled();
        if (!enabled) {
            generation++;
            pending = false;
            autoplayBlocked = false;
            music.pause();
            message('');
            refreshButton();
            return;
        }
        syncMusic(true);
    });
    /* Déverrouillage navigateur :
       IMPORTANT : ceci ne réactive JAMAIS une musique réglée sur OFF. */
    function unlockAudioFromGesture(event) {
        if (!enabled) return;
        if (
            event &&
            event.target &&
            event.target.closest &&
            event.target.closest('#musicControl, #musicVolume')
        ) {
            return;
        }
        if (music.paused || autoplayBlocked) {
            syncMusic(true);
        }
    }
    document.addEventListener('pointerdown', unlockAudioFromGesture, {
        capture: true,
        passive: true
    });
    document.addEventListener('keydown', unlockAudioFromGesture, true);
    music.addEventListener('error', reportMediaError);
    music.addEventListener('playing', () => {
        autoplayBlocked = false;
        message('');
        refreshButton();
    });
    music.addEventListener('pause', refreshButton);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            music.pause();
        } else {
            syncMusic();
        }
    });
    window.addEventListener('pagehide', () => {
        music.pause();
    });
    window.addEventListener('pageshow', () => {
        syncMusic();
    });
    if (battlePage) {
        new MutationObserver(() => {
            syncMusic();
        }).observe(battlePage, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    window.brawlMusic = {
        getVolume() {
            return volume;
        },
        isEnabled() {
            return enabled;
        },
        refresh() {
            refreshButton();
        },
        playHome() {
            // Changer de page ne modifie JAMAIS le choix ON/OFF.
            syncMusic(true);
        },
        playCurrent() {
            // Déverrouille uniquement si la musique est déjà réglée sur ON.
            if (!enabled) {
                music.pause();
                refreshButton();
                return;
            }
            syncMusic(true);
        },
        setVolume(value) {
            const number = Number(value);
            if (!Number.isFinite(number)) return;
            volume = Math.max(0, Math.min(100, Math.round(number)));
            music.volume = volume / 100;
            try {
                localStorage.setItem('brawlVS.musicVolume', String(volume));
            } catch (_) {}
            const output = document.getElementById('musicVolumeValue');
            const slider = document.getElementById('musicVolume');
            if (output) {
                output.textContent = volume + ' %';
            }
            if (slider) {
                slider.value = volume;
                slider.style.setProperty('--volume', volume + '%');
            }
            // Modifier le volume ne rallume pas une musique désactivée.
            if (enabled) {
                syncMusic(true);
            } else {
                refreshButton();
            }
        }
    };
    /* Tentatives d'autoplay immédiates.
       Elles fonctionnent là où le navigateur l'autorise.
       Sur Chrome/Android, le son peut rester bloqué jusqu'au premier geste. */
    syncMusic(true);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => syncMusic(true), {
            once: true
        });
    } else {
        syncMusic(true);
    }
    window.addEventListener('load', () => syncMusic(true), {
        once: true
    });
})();

;

/* =====================================================
   EFFETS SONORES BRAWL VS
   Aucun fichier supplémentaire requis :
   les SFX sont synthétisés avec Web Audio.
===================================================== */
(() => {
    let ctx = null;
    let master = null;
    let volume = 70;
    let enabled = true;
    let rewardWasOpen = false;
    try {
        const v = localStorage.getItem('brawlVS.sfxVolume');
        if (v !== null && Number.isFinite(Number(v))) {
            volume = Math.max(0, Math.min(100, Math.round(Number(v))));
        }
        const e = localStorage.getItem('brawlVS.sfxEnabled');
        if (e !== null) enabled = e === 'true';
    } catch (_) {}
    function ensureAudio() {
        if (!ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return false;
            ctx = new AudioContextClass();
            master = ctx.createGain();
            master.gain.value = enabled ? (volume / 100) * 1 : 0;
            master.connect(ctx.destination);
        }
        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
        return true;
    }
    function updateMaster() {
        if (!master || !ctx) return;
        const target = enabled ? (volume / 100) * 0.30 : 0;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(target, ctx.currentTime, 0.012);
    }
    function tone({
        frequency = 440,
        endFrequency = frequency,
        duration = 0.07,
        delay = 0,
        type = 'sine',
        gain = 0.22
    } = {}) {
        if (!enabled || volume <= 0 || !ensureAudio()) return;
        const now = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(Math.max(30, frequency), now);
        osc.frequency.exponentialRampToValueAtTime(
            Math.max(30, endFrequency),
            now + duration
        );
        amp.gain.setValueAtTime(0.0001, now);
        amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), now + 0.008);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(amp);
        amp.connect(master);
        osc.start(now);
        osc.stop(now + duration + 0.025);
    }
    function play(name) {
        if (!enabled || volume <= 0) return;
        ensureAudio();
        switch (name) {
            case 'tap':
                tone({ frequency:520, endFrequency:420, duration:.045, type:'triangle', gain:.12 });
                break;
            case 'nav':
                tone({ frequency:430, endFrequency:620, duration:.055, type:'triangle', gain:.12 });
                tone({ frequency:680, endFrequency:820, duration:.045, delay:.045, type:'sine', gain:.08 });
                break;
            case 'select':
                tone({ frequency:620, endFrequency:850, duration:.07, type:'triangle', gain:.14 });
                tone({ frequency:900, endFrequency:1120, duration:.08, delay:.05, type:'sine', gain:.10 });
                break;
            case 'play':
                tone({ frequency:155, endFrequency:260, duration:.10, type:'sawtooth', gain:.16 });
                tone({ frequency:330, endFrequency:660, duration:.13, delay:.055, type:'triangle', gain:.15 });
                tone({ frequency:820, endFrequency:1120, duration:.09, delay:.14, type:'sine', gain:.09 });
                break;
            case 'box':
                tone({ frequency:180, endFrequency:340, duration:.10, type:'square', gain:.10 });
                tone({ frequency:420, endFrequency:720, duration:.12, delay:.07, type:'triangle', gain:.12 });
                tone({ frequency:880, endFrequency:1320, duration:.10, delay:.15, type:'sine', gain:.09 });
                break;
            case 'attack':
                tone({ frequency:210, endFrequency:75, duration:.11, type:'sawtooth', gain:.18 });
                tone({ frequency:95, endFrequency:55, duration:.09, delay:.025, type:'square', gain:.11 });
                break;
            case 'super':
                tone({ frequency:180, endFrequency:360, duration:.10, type:'sawtooth', gain:.15 });
                tone({ frequency:360, endFrequency:720, duration:.11, delay:.07, type:'triangle', gain:.16 });
                tone({ frequency:720, endFrequency:1280, duration:.15, delay:.15, type:'square', gain:.10 });
                tone({ frequency:980, endFrequency:1560, duration:.13, delay:.24, type:'sine', gain:.10 });
                break;
            case 'enemyAttack':
                tone({ frequency:245, endFrequency:105, duration:.10, type:'sawtooth', gain:.15 });
                tone({ frequency:150, endFrequency:78, duration:.09, delay:.025, type:'square', gain:.08 });
                break;
            case 'enemySuper':
                tone({ frequency:150, endFrequency:290, duration:.10, type:'sawtooth', gain:.14 });
                tone({ frequency:300, endFrequency:560, duration:.12, delay:.07, type:'square', gain:.12 });
                tone({ frequency:700, endFrequency:1040, duration:.15, delay:.16, type:'triangle', gain:.11 });
                break;
            case 'impact':
                tone({ frequency:115, endFrequency:62, duration:.075, type:'square', gain:.16 });
                tone({ frequency:310, endFrequency:145, duration:.055, delay:.01, type:'sawtooth', gain:.09 });
                break;
            case 'hurt':
                tone({ frequency:185, endFrequency:78, duration:.12, type:'sawtooth', gain:.17 });
                tone({ frequency:92, endFrequency:48, duration:.10, delay:.02, type:'square', gain:.10 });
                break;
            case 'heal':
                tone({ frequency:520, endFrequency:700, duration:.08, type:'sine', gain:.09 });
                tone({ frequency:690, endFrequency:940, duration:.10, delay:.06, type:'triangle', gain:.10 });
                break;
            case 'dodge':
                tone({ frequency:760, endFrequency:1180, duration:.08, type:'triangle', gain:.09 });
                tone({ frequency:980, endFrequency:1450, duration:.065, delay:.055, type:'sine', gain:.07 });
                break;
            case 'shield':
                tone({ frequency:240, endFrequency:420, duration:.08, type:'triangle', gain:.10 });
                tone({ frequency:960, endFrequency:720, duration:.12, delay:.015, type:'sine', gain:.09 });
                break;
            case 'turn':
                tone({ frequency:360, endFrequency:480, duration:.06, type:'triangle', gain:.07 });
                tone({ frequency:520, endFrequency:620, duration:.07, delay:.055, type:'sine', gain:.06 });
                break;
            case 'victory':
                tone({ frequency:523.25, endFrequency:523.25, duration:.13, type:'triangle', gain:.11 });
                tone({ frequency:659.25, endFrequency:659.25, duration:.13, delay:.10, type:'triangle', gain:.11 });
                tone({ frequency:783.99, endFrequency:783.99, duration:.15, delay:.20, type:'triangle', gain:.12 });
                tone({ frequency:1046.5, endFrequency:1318.5, duration:.24, delay:.31, type:'sine', gain:.12 });
                break;
            case 'defeat':
                tone({ frequency:330, endFrequency:260, duration:.16, type:'triangle', gain:.10 });
                tone({ frequency:260, endFrequency:196, duration:.18, delay:.13, type:'sawtooth', gain:.09 });
                tone({ frequency:196, endFrequency:130, duration:.24, delay:.29, type:'triangle', gain:.09 });
                break;
            case 'reward':
                tone({ frequency:523.25, endFrequency:523.25, duration:.11, type:'triangle', gain:.11 });
                tone({ frequency:659.25, endFrequency:659.25, duration:.12, delay:.08, type:'triangle', gain:.11 });
                tone({ frequency:783.99, endFrequency:783.99, duration:.14, delay:.16, type:'triangle', gain:.12 });
                tone({ frequency:1046.5, endFrequency:1046.5, duration:.18, delay:.24, type:'sine', gain:.10 });
                break;
            case 'back':
                tone({ frequency:420, endFrequency:250, duration:.07, type:'triangle', gain:.10 });
                break;
            case 'locked':
                tone({ frequency:145, endFrequency:120, duration:.08, type:'square', gain:.08 });
                tone({ frequency:120, endFrequency:105, duration:.08, delay:.09, type:'square', gain:.07 });
                break;
        }
    }
    function refresh() {
        const control = document.getElementById('sfxControl');
        const slider = document.getElementById('sfxVolume');
        const output = document.getElementById('sfxVolumeValue');
        if (control) {
            control.textContent = enabled ? '🔊 Effets sonores activés' : '🔇 Effets sonores désactivés';
            control.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        }
        if (slider) {
            slider.value = volume;
            slider.style.setProperty('--volume', volume + '%');
        }
        if (output) output.textContent = volume + ' %';
    }
    function setVolume(value) {
        const n = Number(value);
        if (!Number.isFinite(n)) return;
        volume = Math.max(0, Math.min(100, Math.round(n)));
        try {
            localStorage.setItem('brawlVS.sfxVolume', String(volume));
        } catch (_) {}
        updateMaster();
        refresh();
        if (enabled && volume > 0) play('tap');
    }
    function setEnabled(value) {
        enabled = !!value;
        try {
            localStorage.setItem('brawlVS.sfxEnabled', String(enabled));
        } catch (_) {}
        ensureAudio();
        updateMaster();
        refresh();
        if (enabled) play('select');
    }
    window.brawlSfx = {
        play,
        getVolume: () => volume,
        isEnabled: () => enabled,
        setVolume,
        setEnabled,
        refresh
    };
    // Le premier geste prépare Web Audio.
    document.addEventListener('pointerdown', () => {
        if (enabled) ensureAudio();
    }, { capture:true, passive:true });
    // Toggle SFX dans Options.
    document.addEventListener('click', event => {
        const sfxControl = event.target.closest('#sfxControl');
        if (sfxControl) {
            setEnabled(!enabled);
            return;
        }
        const target = event.target.closest('button, .brawler-card, .box-option, [role="button"]');
        if (!target || target.disabled) return;
        if (target.id === 'musicControl' || target.id === 'sfxControl') return;
        if (target.id === 'battleAttackButton') {
            play('attack');
            return;
        }
        if (target.id === 'battleSuperButton') {
            play('super');
            return;
        }
        if (target.classList.contains('duel-button')) {
            play('play');
            return;
        }
        if (target.classList.contains('box-option')) {
            play('box');
            return;
        }
        if (
            target.classList.contains('nav') ||
            target.classList.contains('home-mode-button')
        ) {
            play('nav');
            return;
        }
        if (
            target.classList.contains('battle-distance-card') ||
            target.classList.contains('choose-brawler-button') ||
            target.classList.contains('home-menu-card')
        ) {
            play('select');
            return;
        }
        if (
            target.classList.contains('skin-catalog-close') ||
            target.classList.contains('battle-back-button') ||
            target.classList.contains('brawler-back-button') ||
            target.classList.contains('cancel-button')
        ) {
            play('back');
            return;
        }
        if (target.classList.contains('locked') || target.disabled) {
            play('locked');
            return;
        }
        play('tap');
    });
    // Petit son quand une popup de récompense apparaît.
    const rewardPopup = document.getElementById('rewardPopup');
    if (rewardPopup) {
        const observer = new MutationObserver(() => {
            const open = rewardPopup.classList.contains('active');
            if (open && !rewardWasOpen) play('reward');
            rewardWasOpen = open;
        });
        observer.observe(rewardPopup, {
            attributes:true,
            attributeFilter:['class']
        });
    }
    document.addEventListener('DOMContentLoaded', refresh, { once:true });
})();

;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof refreshSelectedGameModeUI === 'function') {
        refreshSelectedGameModeUI();
    }
});
