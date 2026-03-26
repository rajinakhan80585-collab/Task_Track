const bcrypt = require('bcryptjs');
const pool = require('./connection');

const seedData = async () => {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seed...\n');

    // Hash password for demo users
    const hashedPassword = await bcrypt.hash('Abc@123', 10);

    // Insert demo users
    console.log('📝 Inserting demo users...');
    const userResult = await client.query(
      `INSERT INTO users (name, email, mobile, password_hash) 
       VALUES 
       ($1, $2, $3, $4),
       ($5, $6, $7, $8),
       ($9, $10, $11, $12)
       RETURNING user_id, name, email;`,
      [
        'Rajina', 'rajina@example.com', '+1-905-123-4567', hashedPassword,
        'Alex Johnson', 'alex@example.com', '+1-416-789-0123', hashedPassword,
        'Sarah Smith', 'sarah@example.com', '+1-647-456-7890', hashedPassword
      ]
    );

    const users = userResult.rows;
    console.log(`✅ ${users.length} users created`);
    users.forEach(u => console.log(`   - ${u.name} (${u.email})`));

    // Insert categories for each user
    console.log('\n📂 Inserting categories...');
    for (const user of users) {
      const categories = [
        { user_id: user.user_id, name: 'Work' },
        { user_id: user.user_id, name: 'Personal' },
        { user_id: user.user_id, name: 'Shopping' },
        { user_id: user.user_id, name: 'Health' }
      ];

      for (const cat of categories) {
        await client.query(
          'INSERT INTO categories (user_id, name) VALUES ($1, $2)',
          [cat.user_id, cat.name]
        );
      }
      console.log(`✅ 4 categories created for ${user.name}`);
    }

    // Get category IDs for tasks
    const categoryResult = await client.query(
      'SELECT category_id, user_id, name FROM categories ORDER BY user_id, name'
    );
    const categories = categoryResult.rows;

    // Insert sample tasks
    console.log('\n✅ Inserting sample tasks...');
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 604800000).toISOString().split('T')[0];

    const tasks = [
      // Rajina's tasks (user_id = 1)
      {
        user_id: 1,
        category_id: categories.find(c => c.user_id === 1 && c.name === 'Work')?.category_id,
        title: 'Complete Sprint 2 project',
        description: 'Finish the Task Track application with mobile field integration',
        status: 'In Progress',
        due_date: tomorrow
      },
      {
        user_id: 1,
        category_id: categories.find(c => c.user_id === 1 && c.name === 'Work')?.category_id,
        title: 'Review code and deploy to production',
        description: 'Deploy the application on Render hosting',
        status: 'Pending',
        due_date: nextWeek
      },
      {
        user_id: 1,
        category_id: categories.find(c => c.user_id === 1 && c.name === 'Personal')?.category_id,
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, vegetables',
        status: 'Pending',
        due_date: today
      },
      {
        user_id: 1,
        category_id: categories.find(c => c.user_id === 1 && c.name === 'Health')?.category_id,
        title: 'Morning exercise',
        description: 'Yoga and 30-minute run',
        status: 'Completed',
        due_date: today
      },
      // Alex's tasks (user_id = 2)
      {
        user_id: 2,
        category_id: categories.find(c => c.user_id === 2 && c.name === 'Work')?.category_id,
        title: 'Team meeting preparation',
        description: 'Prepare slides for the quarterly review',
        status: 'Pending',
        due_date: tomorrow
      },
      {
        user_id: 2,
        category_id: categories.find(c => c.user_id === 2 && c.name === 'Shopping')?.category_id,
        title: 'Order laptop monitor',
        description: '27-inch 4K monitor with USB-C',
        status: 'Pending',
        due_date: nextWeek
      },
      // Sarah's tasks (user_id = 3)
      {
        user_id: 3,
        category_id: categories.find(c => c.user_id === 3 && c.name === 'Personal')?.category_id,
        title: 'Plan weekend trip',
        description: 'Research destinations and book accommodation',
        status: 'Pending',
        due_date: nextWeek
      },
      {
        user_id: 3,
        category_id: categories.find(c => c.user_id === 3 && c.name === 'Health')?.category_id,
        title: 'Doctor appointment',
        description: 'Annual checkup scheduled',
        status: 'Pending',
        due_date: tomorrow
      }
    ];

    let taskCount = 0;
    for (const task of tasks) {
      if (task.category_id) {
        await client.query(
          `INSERT INTO tasks (user_id, category_id, title, description, status, due_date) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [task.user_id, task.category_id, task.title, task.description, task.status, task.due_date]
        );
        taskCount++;
      }
    }
    console.log(`✅ ${taskCount} sample tasks created`);

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('   User 1: rajina@example.com / Abc@123');
    console.log('   User 2: alex@example.com / Abc@123');
    console.log('   User 3: sarah@example.com / Abc@123');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = seedData;
