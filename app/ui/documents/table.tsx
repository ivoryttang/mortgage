"use client"
import Search from '@/app/ui/search';
import { useState } from 'react';
import {
  DocumentsTableType,
  FormattedDocumentsTable,
} from '@/app/lib/definitions';

export default function DocumentsTable({
  documents,
}: {
  documents: FormattedDocumentsTable[];
}) {
  const [selectedPdfType, setSelectedPdfType] = useState("Paystub")
  const [uploadedFile, setUploadedFile] = useState<undefined | File>(undefined)
  function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setUploadedFile(file ?? undefined)
  }
  function handleFileUpload() {
    // perform sql operation and add uploaded file to database
  }
  function handlePdfTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedPdfType(event.target.value)
  }
  return (
    <div className="w-full mt-5">
      <Search placeholder="Search documents..." />
      <br></br>
      <div className='flex'><select className="rounded" value={selectedPdfType} onChange={handlePdfTypeChange}>
      <option value="paystub">PayStub</option>
    <option value="bank">Bank Statement</option>
    <option value="w2">W-2</option>
        </select> 
        <div className='flex'>
        <input className="ml-4 w-[250px]" type="file" id="pdfUpload" accept=".pdf" onChange={handleSetFile}/></div>
        <button type="button" className='rounded bg-gray-400 text-white p-2' onClick={handleFileUpload}>Upload </button>
        </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Document Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Description
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    Date Uploaded
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Due Date
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {documents.map((document) => (
                    <tr key={document.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                          {document.name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {document.description}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {document.upload_date}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {document.due_date}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {document.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
