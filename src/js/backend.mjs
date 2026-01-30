import PocketBase from "pocketbase";
const db = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
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
    const records = await db.collection("maison").getFullList({ filter: "favori = true" });
    return records;
}

export async function allMaisonsSorted() {
    const records = await db.collection("maison").getFullList({ sort: "prix" });
    return records;
}

export async function allMaisonsbySurface(surface) {
    const records = await db.collection("maison").getFullList({ filter: `surface > ${surface}` });
    return records;
}

export async function allMaisonssurfaceOrprice(surface, price) {
    const records = await db.collection("maison").getFullList({ filter: `surface > ${surface} || prix < ${price}` });
    return records;
}

export async function allMaisonsAgent(id) {
    const record = await db.collection("agent").getOne(id);
    return record;
}