import DocumentsTable from '@/app/ui/documents/table';
import { fetchDocuments, addDocument } from '@/app/lib/data';


export default async function Page() {
    const documents = await fetchDocuments()
    const formattedDocuments = documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      upload_date: new Date(doc.upload_date).toISOString().split('T')[0],
      description: doc.description,
      due_date: new Date(doc.due_date).toISOString().split('T')[0],
      status: doc.status
    }));
    
    return <DocumentsTable documents={formattedDocuments}/>;
  }