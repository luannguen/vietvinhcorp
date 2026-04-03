import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function updateBranding() {
  const client = await pool.connect();
  try {
    console.log('--- Updating VRC to VVC in Database Content ---');
    
    const tables = [
      { name: 'products', columns: ['name', 'slug', 'description'] },
      { name: 'news', columns: ['title', 'slug', 'summary', 'content', 'author'] },
      { name: 'projects', columns: ['name', 'slug', 'description', 'content', 'client'] },
      { name: 'events', columns: ['title', 'slug', 'summary', 'content', 'location', 'organizer'] },
      { name: 'team_members', columns: ['name', 'bio', 'position'] },
      { name: 'banners', columns: ['title', 'subtitle', 'button_text'] },
      { name: 'pages', columns: ['title', 'slug', 'excerpt', 'content'] },
      { name: 'categories', columns: ['name', 'slug'] }
    ];

    for (const table of tables) {
      console.log(`Updating table: ${table.name}...`);
      for (const col of table.columns) {
        // Simple case-sensitive replace for 'VRC' to 'VVC'
        const query = `
          UPDATE ${table.name} 
          SET ${col} = REPLACE(${col}, 'VRC', 'VVC')
          WHERE ${col} LIKE '%VRC%';
        `;
        const res = await client.query(query);
        if (res.rowCount > 0) {
          console.log(`  Updated ${res.rowCount} rows in ${table.name}.${col}`);
        }
      }
    }

    console.log('✅ Database branding update complete.');
  } catch (err) {
    console.error('❌ Error updating database:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

updateBranding();
