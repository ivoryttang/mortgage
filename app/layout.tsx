//@ts-nocheck
import '@/app/ui/global.css';
import { ClerkProvider } from '@clerk/nextjs'
import { light } from '@clerk/themes';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    publishableKey="pk_live_Y2xlcmsuZG9tdXNub3cuY29tJA"
    appearance={{
      baseTheme: [light],
      variables: { colorPrimary: 'green' },
      signIn: { 
        baseTheme: [light], 
        variables: { colorPrimary: 'green' }
      }
    }}>
    <html lang='en'>
      <body>{children}</body>
    </html>
  </ClerkProvider>
  );
}
