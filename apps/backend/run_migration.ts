import { DatabaseService } from "./src/services/DatabaseService";

async function addColumn(db: DatabaseService, table: string, colName: string, type: string) {
    try {
        await db.query(`ALTER TABLE ${table} ADD COLUMN ${colName} ${type}`);
        console.log(`Added column ${colName} to ${table}`);
    } catch (err: any) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log(`Column ${colName} already exists in ${table}, skipping.`);
        } else {
            console.error(`Failed to add column ${colName} to ${table}:`, err);
        }
    }
}

async function run() {
    const db = new DatabaseService();
    console.log("Adding language columns to ads table...");
    await addColumn(db, 'ads', 'title_en', 'VARCHAR(255)');
    await addColumn(db, 'ads', 'description_en', 'TEXT');
    await addColumn(db, 'ads', 'buttonText_en', 'VARCHAR(100)');
    
    await addColumn(db, 'ads', 'title_es', 'VARCHAR(255)');
    await addColumn(db, 'ads', 'description_es', 'TEXT');
    await addColumn(db, 'ads', 'buttonText_es', 'VARCHAR(100)');

    await addColumn(db, 'ads', 'title_de', 'VARCHAR(255)');
    await addColumn(db, 'ads', 'description_de', 'TEXT');
    await addColumn(db, 'ads', 'buttonText_de', 'VARCHAR(100)');

    console.log("Migration finished.");
    process.exit();
}
run();
