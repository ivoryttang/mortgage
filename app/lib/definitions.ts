// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: string;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  status: boolean;
  date: string;
  lender: string;
  lender_type: string;
  loan_type: string[];
  term: number[];
  rate: number;
  upfront: number[];
  amount: number[];
  rating: number;
  time_to_close: number;
  lender_info: string;
};


// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number[];
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type DocumentsTableType = {
  id: string;
  name: string;
  upload_date: string;
  description: string;
  due_date: string;
  status: string;
};

export type FormattedDocumentsTable = {
  id: string;
  name: string;
  upload_date: string;
  description: string;
  due_date: string;
  status: string;
};

export type DocumentField = {
  id: string;
  name: string;
  upload_date: string;
  description: string;
  due_date: string;
  status: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
