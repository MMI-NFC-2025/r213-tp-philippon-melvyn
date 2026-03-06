import PocketBase from "pocketbase";
const db = new PocketBase("https://agence.melvyn-philippon.fr/");

export async function getOffres() {
    try {
        let data = await db.collection("maison").getFullList({
            sort: "-created",
        });
        return data;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant la liste des maisons",
            error
        );
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function allMaisons() {
    const records = await db.collection("maison").getFullList();
    return records;
}

export async function allMaisonsoneID(id) {
    const record = await db.collection("maison").getOne(id);
    return record;
}

export async function allMaisonsFavori() {
    const records = await db
        .collection("maison")
        .getFullList({ filter: "favori = true" });
    return records;
}

export async function allMaisonsSorted() {
    const records = await db.collection("maison").getFullList({ sort: "prix" });
    return records;
}

export async function allMaisonsbySurface(surface) {
    const records = await db
        .collection("maison")
        .getFullList({ filter: `surface > ${surface}` });
    return records;
}

export async function allMaisonssurfaceOrprice(surface, price) {
    const records = await db
        .collection("maison")
        .getFullList({ filter: `surface > ${surface} || prix < ${price}` });
    return records;
}

export async function allMaisonsAgent(id) {
    const record = await db.collection("agent").getOne(id);
    return record;
}

export async function getOffre(id) {
    try {
        const data = await db.collection("maison").getOne(id);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant la maison", error);
        return null;
    }
}

export async function getOffresSup80() {
    try {
        const records = await db
            .collection("maison")
            .getFullList({ filter: `surface > 80` });
        return records;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant les maisons avec surface > 80",
            error
        );
        return null;
    }
}

export async function addOffre(house) {
    try {
        await db.collection("maison").create(house);
        return {
            success: true,
            message: "Offre ajoutée avec succès",
        };
    } catch (error) {
        console.log("Une erreur est survenue en ajoutant la maison", error);
        return {
            success: false,
            message: "Une erreur est survenue en ajoutant la maison",
        };
    }
}


export async function getAgents() {
    try {
        const data = await db.collection("agent").getFullList({
            sort: "-created",
        });
        return data;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant la liste des agents",
            error
        );
        return [];
    }
}

export async function getAgent(id) {
    try {
        const data = await db.collection("agent").getOne(id);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant l'agent", error);
        return null;
    }
}

export async function allAgents() {
    try {
        const records = await db.collection("agent").getFullList();
        return records;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant tous les agents",
            error
        );
        return [];
    }
}

export async function allAgentsOneId(id) {
    try {
        const record = await db.collection("agent").getOne(id);
        return record;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant un agent par son id",
            error
        );
        return null;
    }
}

export async function addAgent(agent) {
    try {
        await db.collection("agent").create(agent);
        return {
            success: true,
            message: "Agent ajouté avec succès",
        };
    } catch (error) {
        console.log("Une erreur est survenue en ajoutant l'agent", error);
        return {
            success: false,
            message: "Une erreur est survenue en ajoutant l'agent",
        };
    }
}

export async function getOffresByAgent(agentId) {
    try {
        const records = await db.collection("maison").getFullList({
            filter: `agent = "${agentId}"`,
            sort: "-created",
        });
        return records;
    } catch (error) {
        console.log(
            "Une erreur est survenue en lisant les offres de l'agent",
            error
        );
        return [];
    }
}

export async function setFavori(house) {
    await db.collection('maison').update(house.id, { favori: !house.favori });
}