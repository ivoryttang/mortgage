import { unstable_noStore as noStore } from 'next/cache';
import { sql,db } from '@vercel/postgres';
import {
  DocumentField,
  DocumentsTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';




export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestRatesheets() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT *
      FROM ratesheets
      ORDER BY ratesheets.date DESC
      LIMIT 5`;

    const latestRatesheets = data.rows.map((ratesheet) => ({
      ...ratesheet
    }));
    return latestRatesheets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest ratesheets.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM ratesheets`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM ratesheets`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredRatesheets(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const ratesheets = await sql<InvoicesTable>`
      SELECT
      ratesheets.id,
      ratesheets.amount,
      ratesheets.date,
      ratesheets.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM ratesheets
      JOIN customers ON ratesheets.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        ratesheets.amount::text ILIKE ${`%${query}%`} OR
        ratesheets.date::text ILIKE ${`%${query}%`} OR
        ratesheets.status ILIKE ${`%${query}%`}
      ORDER BY ratesheets.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return ratesheets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ratesheets.');
  }
}

export async function fetchRatesheetsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM ratesheets
    JOIN customers ON ratesheets.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      ratesheets.amount::text ILIKE ${`%${query}%`} OR
      ratesheets.date::text ILIKE ${`%${query}%`} OR
      ratesheets.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of ratesheets.');
  }
}

export async function fetchRatesheetById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        ratesheets.id,
        ratesheets.customer_id,
        ratesheets.amount,
        ratesheets.status
      FROM ratesheets
      WHERE ratesheets.id = ${id};
    `;

    const ratesheet = data.rows.map((ratesheet) => ({
      ...ratesheet,
      // Convert amount from cents to dollars
      amount: ratesheet.amount / 100,
    }));

    return ratesheet[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchDocuments() {
  try {
    const data = await sql<DocumentField>`
      SELECT *
      FROM documents
      ORDER BY upload_date DESC
    `;

    const documents = data.rows;
    return documents;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all documents.');
  }
}

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<DocumentsTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

